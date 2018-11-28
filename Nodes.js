var fpscap=240,//FPS CAP
njoin=350,//NODE CONJOINMENT DISTANCE
cfps=0,//CURRENT FPS
fpsc,//FINAL FPS
nodes=[],//NODE ARRAY
nsize=5,//NODE SIZE
nodec=30,//NODE COUNT
tapsize=80,//MOUSE DETECTION
nspeed=1,//SPEED
color="255,255,255",//RGB COLOR
s={
	x:-100000,
	y:-100000
},//MOUSE POSITION
mul=7,//DISTANCE MULTIPLIER
linew=2;//LINE WIDTH
setInterval(()=>{//MAKE A LOOP WHICH RUNS EVERY .5 SECONDS
fpsc=cfps;//ASSIGN FINAL FPS
cfps=0;//RESET CURRENT FPS
},500);
function gdis(a,b,c,d) {//MAKE A FUNCTION WHICH CALCULATES DISTANCE
	//GET DISTANCE
	return Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2));
	//a²+b²=c² so get the square root of c
}
function float(a) {//MAKE A FuNCTION WHICH CONVERTS INTO FLOAT (string to float)
	return parseFloat(a);
}
document.addEventListener("mousemove",e=>{//EVENT LISTENER WHICH TRIGGERS WHEN MOUSE MOVES
	s.x=e.clientX;
	s.y=e.clientY;
	//ASSIGN MOUSE X AND Y TO A VARIABLE
});
function frame() {//MAKE A MAIN FUNCTION WHICH RUNS EVERYTHING
cfps+=2;//ADD FPS(this makes the fps inaccurate by 1 at most)
//-=-//
c=document.querySelector("canvas");
c.width=innerWidth;
c.height=innerHeight;
ctx=c.getContext("2d");
//MAKE A CANVAS
//-=-//
for(i=0;i<nodec;i++) {//GOING THROUGH ARRAY/CREATING NODES
	if(!nodes[i]) {
		//CHECK IF NODE AT INDEX {i} EXISTS
		var x=Math.random()*innerWidth;
		var y=Math.random()*innerHeight;
		//POSITION
		var sx=Math.random()*(nspeed*2)-nspeed;
		var sy=Math.random()*(nspeed*2)-nspeed;
		//X AND Y VELOCITY
		return nodes.push(`${x}$${y}$${sx}$${sy}`);
		//PUSH TO ARRAY
	}
	var x=float(nodes[i].split("$")[0]);
	var y=float(nodes[i].split("$")[1]);
	var sx=float(nodes[i].split("$")[2]);
	var sy=float(nodes[i].split("$")[3]);
	//THEY HAVE SPECIFIC INDEXES

	if(gdis(s.x,s.y,x,y)<tapsize) {//IF DISTANCE IS LESS THAN TAPSIZE THEN TRIGGER
		if(x-s.x<0) x-=(gdis(s.x,s.y,x,y)/tapsize)*mul;
		if(x-s.x>0) x+=(gdis(s.x,s.y,x,y)/tapsize)*mul;
		if(y-s.y<0) y-=(gdis(s.x,s.y,x,y)/tapsize)*mul;
		if(y-s.y>0) y+=(gdis(s.x,s.y,x,y)/tapsize)*mul;
		//MOVE ACCORDING TO POSITION
	} else {//ELSE
		x+=sx;
		y+=sy;
		//MOVE NODES MANUALLY
	}

	if(x>innerWidth-nsize) sx=-sx;
	if(x<nsize) sx=-sx;
	if(y>innerHeight-nsize) sy=-sy;
	if(y<nsize) sy=-sy;
	//BOUNCE EFFECT
	if(x>innerWidth) x=Math.random()*innerWidth;
	if(x<0) x=Math.random()*innerWidth;
	if(y>innerHeight) y=Math.random()*innerHeight;
	if(y<0) y=Math.random()*innerHeight;
	//GOES BEHIND SCREEN RESETS THE NODE
	ctx.beginPath();
	ctx.fillStyle=`rgba(${color})`;
	//CREATING THE NODE
	ctx.arc(x,y,nsize,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	nodes[i]=`${x}$${y}$${sx}$${sy}`;
	//ASSIGN NODES FOR NEXT MOVEMENT
	for(j=0;j<nodes.length;j++) {//GO THROUGH NODES ARRAY
		var x0=float(nodes[j].split("$")[0]);
		var y0=float(nodes[j].split("$")[1]);
		//GETS POSITION
		var codis=1-gdis(x,y,x0,y0)/njoin;
		//GETS DISTANCE FOR OPACITY OF LINES
		ctx.beginPath();
		ctx.strokeStyle=`rgba(${color},${codis})`;
		//CREATE LINE
		ctx.lineWidth=linew;
		//SET LINEWIDTH
		ctx.moveTo(x,y);
		ctx.lineTo(x0,y0);
		//MOVE TO POSITION
		ctx.stroke();
		ctx.closePath();
	}
}
ctx.fillStyle="white";
//CREATE FPS TEXT WHITE
ctx.fillText(fpsc+" FPS",0,10);
//DRAW FPS TEXT
}
(()=>setInterval(frame,1000/fpscap))(); //MAKE LOOP ONLOAD