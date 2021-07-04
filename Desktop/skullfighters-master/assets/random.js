//returns random number between min and max(both included)

function randomize(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
