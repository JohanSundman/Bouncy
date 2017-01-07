/*
* 	Game object
*/

function Game(canvasTarget, fps){ // (string, int, 2d array with objects)
	var self = this; // Overcome the encapsulation
	this.mouse = new Mouse(); // Track the mouse movement
	this.fps = fps;
	this.list = []; // Array of enteties
	this.createContext(canvasTarget);
	
	// For the resizing of the client
	window.addEventListener("resize", function(){
		self.setSize();
	});

	// Start this shit!
	this.start();
}


// Start the game loop
Game.prototype.start = function(){
	var self = this; // Overcome the encapsulation
	this.loop = setInterval(function(){
		self.eventLoop();
	}, 1000 / this.fps);
}

// Start the game loop
Game.prototype.stop = function(){
	clearInterval(this.loop);
}

// Create the context
Game.prototype.createContext = function(target){
	this.canvas = document.getElementById(target);
	this.ctx = this.canvas.getContext("2d");
	this.setSize(); // Make sure to set the size
}

// When the screen resizes
Game.prototype.setSize = function(){
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
}

Game.prototype.addEnteties = function(enteties){
	this.list.push(enteties); // Add them
}


/* -- --- * -- Methods doing all the hard work -- * --- -- */

// Render method of the entire game
Game.prototype.eventLoop = function(){ // Loop throught the Array containing an Array of all Objects
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	var li, obj;
	for(li = 0; li < this.list.length; li++){ // Loop the list of arrays
		for(obj = 0; obj < this.list[li].length; obj++){
			this.list[li][obj].physics(this.mouse, this.canvas.width, this.canvas.height);
			this.list[li][obj].render(this.ctx);
		}
	}
}