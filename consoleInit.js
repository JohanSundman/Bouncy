/*
* 	Set up the console and it's commands
*/


// Command related variables
var consoleBox = document.getElementById("container");
var mouseToggle = true;
var glitch = false; // Glitch toggle
var glitchInterval = null;
var pathInterval = null;

// Create the console
var command = new Console(function(text){
	var command = text.split(' ')[0]; // Will get the first word
	var instruction = text.replace(command, '').trim().split(' '); // Remove the command, trim the text, split into array by space
	
	// Hide/show the cursor
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
	else if(command == "stop" || command == "pause"){
		client.stop();
	}
	else if(command == "start" || command == "continue" || command == "play"){
		client.start();
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
			clearInterval(pathInterval);
			
			// Check which path
			if(path == "standard" || path == "mouse" || path == "reset" || path == "clear" || path == "none" || path == "off"){
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
				var radius = Math.floor(Math.min(windowH, windowW) / 3);
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
			else if(path == "circle"){
				// Clear the current gravity
				client.clearGravity();

				// Execution
				var duration = 5000; // (ms) one revolution duration
				var updates = 10; // Amount of updated position executions
				var fullAngle = 2*Math.PI;

				// Timing
				var intervalDelay = duration / updates; // (ms) delay between executions
				var incAngle = fullAngle / updates;

				// The circle calculations
				var windowW = client.canvas.width;
				var windowH = client.canvas.height;
				var x = windowW / 2;
				var y = windowH / 2;
				var radius = Math.floor(Math.min(windowH, windowW) / 3);
				var angle = 0;
				
				// Updating interval
				pathInterval = setInterval(function(){
					// Init the point
					var point = {x: null, y: null, weight: 1};

					// Calculations
					var deltaX = radius * Math.sin(angle);
					var deltaY = radius * Math.cos(angle);
					point.x = x + deltaX;
					point.y = y + deltaY;

					// Set the point
					client.clearGravity(); // Remove all current points
					client.addGravity(point); // Set a new point
					
					// Update the information
					angle += incAngle; // Increment the angle
				}, intervalDelay);
			}
		}
	}
	else if(command == "glitch"){
		var activate = false;
		if(instruction[0].length >= 1){
			var ins = instruction[0];
			if(ins == "on" || ins == "true"){
				activate = true;
			}
			else if(ins == "off" || ins == "false"){
				activate = false;
			}
		}
		else if(!glitch){ // Just a toggle
			activate = true; // Set the glitch to true
		}

		// Do the glitch
		if(activate){
			// turn on the glitch
			glitchInterval = setInterval(function(){
				if(Math.random() <= 0.3){ // Have a percent chance to make the glitch appear
					var gravity = client.getGravity(); // Save the previous gravity
					client.clearGravity(); // Remove all gravity

					// Reset everything after a small duration
					setTimeout(function(){
						client.addGravity(gravity); // Reset to default gravity
					}, 800);
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
command.focus(); // Focus the command box