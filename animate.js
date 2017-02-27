//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var stopButton = document.getElementById( "stop" );
var growButton = document.getElementById( "grow" );
var bounceButton = document.getElementById( "bounce" );
//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//preload logo
var logo = new Image();
logo.src = "DVD_Logo.png";

//set fill color to lello
ctx.fillStyle = "#ffff00";


var requestID;
var mode = "grow";

var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};


//wrapper function will allow inner function to keep track of
// its own complement of local variables (radius, xcor...)
var grow = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var inc = 1;
    var radius = 50;
    var maxrad = Math.min(c.width, c.height) / 2;
    
    //Q: what happens w/ & w/o next line?
    //window.cancelAnimationFrame( requestID );

    var tick = function() {
    	console.log( requestID )

    	ctx.clearRect( 0, 0, c.width, c.height );
    	
    	ctx.beginPath();
    	ctx.arc(c.width / 2, c.height / 2, radius, 0, 2 * Math.PI );
    	ctx.stroke();
    	ctx.fill();

    	radius += inc;
    	if(radius > maxrad || radius <= 0) {
    	    inc = -inc;
    	}
    	requestID = window.requestAnimationFrame( tick );
    };
    tick();
};

var bounce = function() {
    window.cancelAnimationFrame(requestID);
    var x = 150;
    var y = 100;
    var xvel = 1;
    var yvel = 1;
    var width = 200;
    var height = logo.height * width / logo.width;  // scales height
    var tick = function() {
    	console.log(requestID);
    	ctx.clearRect(0, 0, c.width, c.height);
    	ctx.drawImage(logo, x, y, width, height);    	
        x += xvel;
    	y += yvel;
    	if (x > c.width - width || x < 0)
    	    xvel = -xvel;
    	if (y > c.height - height || y < 0)
    	    yvel = -yvel;
    	requestID = window.requestAnimationFrame(tick);
    }
    tick();
}

var doAnime = function() {
    if(mode == "grow")
	   grow();
    if(mode == "bounce")
	   bounce();
}


var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};


//tie click-on-canvas to anime function
c.addEventListener( "click", doAnime )

//ideally, clicking stop will make the animation stop
stopButton.addEventListener( "click",  stopIt );
growButton.addEventListener( "click",  function() {
    mode = "grow";
    doAnime();
    stopIt();  // draw first frame and pause
});
bounceButton.addEventListener( "click", function() {
    mode = "bounce";
    doAnime();
    stopIt();
});

doAnime();
stopIt();
