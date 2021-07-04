//check if two rectangle (a,b) collides
function touched(a,b){
	//a,b: rectangle is a array with 4 terms. That is, [x0, y0, width, height]

	return (a[0] < b[0] + b[2] &&
		a[0] + a[2] > b[0] &&
		a[1] < b[1] + b[3] &&
		a[1] + a[3] > b[1]) 
}