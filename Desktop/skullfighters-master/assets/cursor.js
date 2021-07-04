//cursor's coordinate
var cursor_x;
var cursor_y;

//cursor's click
var cursor_click=false;

//if the mouse is moved, update new cursor coordinate
document.onmousemove=function(e) {
	cursor_x = e.clientX - cv.offsetLeft + 450;
	cursor_y = e.clientY - cv.offsetTop;
}

//if mouse down, set cursor_click to true, so in the next game tick the mainloop function can detect
cv.addEventListener('mousedown',function(){
	cursor_click=true;
})