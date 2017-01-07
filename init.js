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
