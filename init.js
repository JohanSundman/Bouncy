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
var glitch = false; // Glitch toggle
var glitchInterval = null;

// Create the console
var command = new Console(function(text){
	var command = text.split(' ')[0]; // Will get the first word
	var instruction = text.replace(command, '').trim().split(' '); // Remove the command, trim the text, split into array by space
	
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
	if(command == "bg" || command == "background" || command == "color"){
		if(typeof instruction[0] !== "undefined"){
			document.body.style.backgroundColor = instruction[0];
		}
	}
	else if(command == "clear" || command == "reset"){
		client.list = []; // Reset the whole array storing balls
	}
	else if(command == "add"){
		var balls = []; // Empty array of bouncying balls

		// Default values
		var radius = Math.floor(Math.random() * 10) + 1;
		var amount = 1;
		var friction = 2;

		// Set the amount
		if(typeof instruction[0] !== "undefined"){
			amount = instruction[0];
		}

		// Set the radius
		if(typeof instruction[1] !== "undefined" && instruction[0] * 1 > 0){
			radius = instruction[1] * 1;
		}

		// Set friction
		if(typeof instruction[2] !== "undefined"){
			friction = instruction[2];
		}

		// Create the bouncers
		for(var i = 0; i < amount; i++){
			var x = Math.floor(Math.random() * client.canvas.width);
			var y = Math.floor(Math.random() * client.canvas.height);
			balls.push(new Bouncer(x, y, radius, friction));
		}
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
	else if(command == "path"){
		if(typeof instruction[0] !== "undefined"){
			var path = instruction[0];
			
			// Check which path
			if(path == "standard" || path == "reset" || path == "clear"){
				// Make the gravity point into a circle
				client.resetGravity();
			}
			else if(path == "triangle"){
				// Clear the current gravity
				client.clearGravity();

				// Calculate the gravity points of a circle
				var windowW = client.canvas.width;
				var windowH = client.canvas.height;
				var x = windowW / 2;
				var y = windowH / 2;
				var radius = Math.floor(Math.min(windowH, windowW) / 2);
				var pointAmount = 3; // The amount of gravity points
				var pointAngle = 2*Math.PI / pointAmount; // The full circle / amount of points

				// Create the points
				for(var i = 0; i < pointAmount; i++){
					var point = {x: null, y: null, weight: null};

					// Calculations
					var pAng = pointAngle * i;
					var deltaX = radius * Math.sin(pAng);
					var deltaY = radius * Math.cos(pAng);

					// Set the point
					point.x = x + deltaX;
					point.y = y + deltaY;
					point.weight = 1 / pointAmount;
					client.addGravity(point);
				}
			}
		}
	}
	else if(command == "glitch"){
		if(!glitch){
			// turn on the glitch
			glitchInterval = setInterval(function(){
				if(Math.random() <= 0.2){ // Have a percent chance to make the glitch appear
					var gravity = client.getGravity(); // Save the previous gravity
					client.clearGravity(); // Remove all gravity

					// Reset everything after a small duration
					setTimeout(function(){
						client.addGravity(gravity); // Reset to default gravity
					}, 1500);
				}
			}, 1000); // Wait 1 second for every interval

			glitch = true; // Toggle
		}
		else{
			// Turn off the glitch
			clearInterval(glitchInterval);
			glitch = false; // Toggle
		}
	}
}, 2500, true, consoleBox, 15, false);
