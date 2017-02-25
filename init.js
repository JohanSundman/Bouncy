/*
* 	Start everything in here
*/

const BALL_COUNT = 300;


// Start the game
var client = new Game("frame", 60);

// Create the balls
var balls = []; // Empty array of bouncying balls
for(var i = 0; i < BALL_COUNT; i++){
	// Get some random coordinates
	var x = Math.floor(Math.random() * client.canvas.width);
	var y = Math.floor(Math.random() * client.canvas.height);
	var radius = Math.floor(Math.random() * 10) + 1;

	// Create the bouncer
	balls.push(new Bouncer(x, y, radius, 2));
}

// Add the balls
client.addEnteties(balls);


// Create the console
var command = new Console(function(text){
	var command = text.split(' ')[0]; // Will get the first word
	var instruction = text.replace(command, '').trim(); // Remove the command
	
	if(command == "color"){
		document.body.style.backgroundColor = instruction;
	}
	else if(command == "clear" || command == "reset"){
		client.list = []; // Reset the whole array storing balls
	}
	else if(command == "add"){
		var balls = []; // Empty array of bouncying balls

		// Get some random coordinates
		var x = Math.floor(Math.random() * client.canvas.width);
		var y = Math.floor(Math.random() * client.canvas.height);
		var radius = Math.floor(Math.random() * 10) + 1;
		if(instruction * 1 > 0){
			radius = instruction * 1;
		}

		// Create the bouncer
		balls.push(new Bouncer(x, y, radius, 2));

		// Add the balls
		client.addEnteties(balls);
	}
}, 2500, true, document.getElementById("container"), 15, false);
