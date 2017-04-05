/*
* 	Game object
*/

function Game(canvasTarget, fps){ // (string, int, 2d array with objects)
	var self = this; // Overcome the encapsulation
	this.loopsRunning = 0;
	this.fps = fps;
	this.createContext(canvasTarget);
	this.setSize(); // Make sure to set the size
	this.mouse = new Mouse(); // Track the mouse movement
	this.mouse.weight = 1; // Add the weight for the gravity
	this.mouse.x = this.canvas.width / 2;
	this.mouse.y = this.canvas.height / 2;
	this.list = []; // Array of enteties
	this.gravityPoint = [this.mouse]; // Array of gravity points(x,y containing objects)
	
	// For the resizing of the client
	window.addEventListener("resize", function(){
		self.setSize();
	});

	// Start this shit!
	this.start();
}


// Start the game loop
Game.prototype.start = function(){
	if(this.loopsRunning >= 1){
		return false; // Already running a loop
	}
	// The loop starting
	var self = this; // Overcome the encapsulation
	this.loop = setInterval(function(){
		self.eventLoop();
	}, 1000 / this.fps);
	this.loopsRunning++; // +1 loops currently running
}

// Start the game loop
Game.prototype.stop = function(){
	clearInterval(this.loop);
	this.loopsRunning <= 0?this.loopsRunning=0:this.loopsRunning--; // Make sure the amount never gets below 0
}

// Create the context
Game.prototype.createContext = function(target){
	this.canvas = document.getElementById(target);
	this.ctx = this.canvas.getContext("2d");
}

// When the screen resizes
Game.prototype.setSize = function(){
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
}

Game.prototype.addEnteties = function(enteties){
	this.list.push(enteties); // Add them
}

/* -- Gravity points -- */

// Set the gravity points to the standard mouse value
Game.prototype.resetGravity = function(){
	this.gravityPoint = [this.mouse];
}

// Fetch the gravity points
Game.prototype.getGravity = function(){
	return this.gravityPoint;
}

// Empty the gravity points
Game.prototype.clearGravity = function(){
	this.gravityPoint = [];
}

// Add a gravity point
Game.prototype.addGravity = function(point){
	if(point.constructor === Array){ // If point is array
		for(var i = 0; i < point.length; i++){
			this.gravityPoint.push(point[i]);
		}
	}
	else{
		this.gravityPoint.push(point);
	}
}

/* -- --- * -- Methods doing all the hard work -- * --- -- */

// Render method of the entire game
Game.prototype.eventLoop = function(){ // Loop throught the Array containing an Array of all Objects
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	var li, obj;
	for(li = 0; li < this.list.length; li++){ // Loop the list of arrays
		for(obj = 0; obj < this.list[li].length; obj++){
			this.list[li][obj].physics(this.gravityPoint, this.canvas.width, this.canvas.height);
			this.list[li][obj].render(this.ctx);
		}
	}
}
