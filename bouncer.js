/*
* 	The bouncy ball blueprint/template
*/

function Bouncer(x = 0, y = 0, radius = 5, friction = 3){
	this.velocity = {
		x: 0,
		y: 0
	}
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.weight = this.radius * (1 + (Math.random() * 0,1)); // 100% + random(0-0.1) = 0-10% of the radius!
	this.drag = friction;
	this.color = rgbaRandomRed();
}

// Calculate the pysics
Bouncer.prototype.physics = function(gravityPoint, width, height){
	// The effect range
	var range = Math.max(width, height) * 0.8; // % of the biggest of width or width

	// Accelerate towards gravity points
	for(var i = 0; i < gravityPoint.length; i++){
		var diffX = this.x - gravityPoint[i].x;
		var diffY = this.y - gravityPoint[i].y;
		var dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)); // SquareRoot( diffX^2 + diffY^2 )
		if(dist <= range){ // Within the range
			var force = range - dist; // Higher the closer the distance
			force /= range * 2;
			force = force * gravityPoint[i].weight;

			var angle = Math.atan2(diffY, diffX); // atan(diffX / diffY), but with all 4 quadrants
			angle = getOpposing(angle); // Get the opposite angle

			// Calculate the velocty relative to the angle
			this.velocity.x += force * Math.cos(angle);
			this.velocity.y += force * Math.sin(angle);
		}
	}
	// Make friction do it's work
	this.friction(this.drag); // Speed in 0/00(permille) to lose to the surface

	// Add the velocity
	this.move();
}

Bouncer.prototype.friction = function(surface){
	this.velocity.x *= (1000 - surface) / 1000; // Remove some velocity
	this.velocity.y *= (1000 - surface) / 1000; // Remove some velocity
}

Bouncer.prototype.move = function(){
	//console.log(this.velocity.x);
	this.x += this.velocity.x;
	this.y += this.velocity.y;
}

// Render the obj
Bouncer.prototype.render = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();
}

