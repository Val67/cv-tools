var triSize = 80;
var c1 = [68, 225, 130];
var c2 = [255, 255, 255];

var canvas = document.getElementById("canvas");
canvas.width  = 1536;
canvas.height = 300;

var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fill();

function tri(x, y, color, otherTri = false)
{
	x *= triSize;
	y *= triSize;
	
	ctx.fillStyle = color;
	ctx.beginPath();
	
	var tA = otherTri ? 1 : -1;
	var tB = otherTri ? 0 : triSize/2;
	
	ctx.moveTo(x,y+tB);
	ctx.lineTo(x+triSize*tA,y+triSize/2+tB);
	ctx.lineTo(x+triSize*tA,y-triSize/2+tB);
	ctx.fill();
}

function deg1(s)
{
	s *= Math.asin(s);
	
	var col = [Math.floor(c1[0]+s*(c2[0]-c1[0])),
		Math.floor(c1[1]+s*(c2[1]-c1[1])),
		Math.floor(c1[2]+s*(c2[2]-c1[2]))];
	
	return "rgb(" + col.join() + ")";
}


function rb(z=0.5) { return Math.random() >= z; }
function avg(a,b) { return (a+b)/2; }
function norm(z) { return Math.floor(254*z); }

// Number of triangles on width/height
var triNW = canvas.width/triSize+1, triNH = canvas.height/triSize+1;

for(var i = 0; i<triNW; i++)
{
	for(var j = 0; j<triNH; j++)
	{
		if(i < 30)
		{
			if(rb(0.2)) tri(i, j, deg1(avg(j/triNW, i/triNH)), false);
			if(rb(0.2)) tri(i, j, deg1(avg(j/triNW, i/triNH)), true);
		}
	}
}

