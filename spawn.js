/*
* 	Spawn all the enteties and set the settings here
*/

// Add a reference to the command function
var set = command.callback;

// Set the environment
set("background #111");
Math.random()<.5? set("path triangle"):false;
Math.random()<.33? set("path circle"):false;

// Spawning and behaviour
set("add " + 
	(400+Math.random()*600)
	+ " " +
	Math.round((2+Math.random()*4))
	+ " " +
	(Math.random()*10));
Math.random()<.3? set("glitch true"):false;
