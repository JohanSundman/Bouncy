/*
* 	Contains some math function that are used
*/

function getOpposing(angle){
	if(angle <= Math.PI){
		return angle + Math.PI;
	}
	else{
		return angle - Math.PI;
	}
}