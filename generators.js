/*
* 	Different generators
*/

// Get a random hex color
function hexRandom() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/* Get random transparent color */
function rgbaRandom(){
	var r = Math.floor(Math.random() * 255);
  	var g = Math.floor(Math.random() * 255);
  	var b = Math.floor(Math.random() * 255);
  	var a = roundDecimal(Math.random(), 2); // Get a num between 0-1 and use 2 decimals
	return "rgba("+ r +","+ g +","+ b +","+ a +")";
}

function rgbaRandomRed(){
	var r = Math.floor(Math.random() * 50) + 150;
  	var g = Math.floor(Math.random() * 50) + 25;
 	var b = Math.floor(Math.random() * 85) + 40;
  	var a = roundDecimal(Math.random(), 2); // Get a num between 0-1 and use 2 decimals
	return "rgba("+ r +","+ g +","+ b +","+ a +")";
}


/* Round decimal numbers */
function roundDecimal(value, n){
	var ex = Math.pow(10, n); // Extension number
	return Math.floor(value * ex) / ex;
}