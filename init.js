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


// Command related variables
var consoleBox = document.getElementById("container");
var mouseToggle = true;

// Create the console
var command = new Console(function(text){
	var command = text.split(' ')[0]; // Will get the first word
	var instruction = text.replace(command, '').trim(); // Remove the command
	
	function mouseChange(state){
		if(state){ // True
			consoleBox.classList.remove("cursorHide");
			client.canvas.classList.remove("cursorHide");
		}
		else{
			consoleBox.classList.add("cursorHide");
			client.canvas.classList.add("cursorHide");
		}
	}

	// The commands
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
	else if(command == "mouse" || command == "cursor"){
		if(instruction == "show"){
			mouseToggle = true;
		}
		else if(instruction == "hide"){
			mouseToggle = false;
		}
		else{
			// Toggle
			if(mouseToggle){
				mouseToggle = false;
			}
			else{
				mouseToggle = true;
			}
		}
		mouseChange(mouseToggle);
	}
}, 2500, true, consoleBox, 15, false);
