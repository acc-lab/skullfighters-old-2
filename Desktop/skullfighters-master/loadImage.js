/*image prop.*/
//"store" array stocks images (with "Image" type) from "./pictures" folder
var store = {};
//"shift" is a automatic shift for the function "coDrawImage", based on "ctx.drawImage"
var shift={};

//function to load pictures into "store" array
function img(filename, shift_=[0,0], cofilename=".png"){

	var i = new Image();
	//get image
	i.src = "pictures/"+filename+cofilename;

	//if onload, store and shift array stocks the image and shift property into it respectively
	i.onload=function(){
		store[filename]=this;
		shift[filename]=[shift_[0],shift_[1]];
	};

	return 0;
}



/*image loading*/
//THE SHIFT PROPERTY IS DESIGNED FOR SIZE 1.5, PLEASE DO NOT PUT SHIFT PROPERTY DESIGNED FOR DEFAULT(1x) SIZE

function loadAllImage(){
	//police idle
	img("police-idle", [-12,-65]);

	//police walking cycle
	img("police-walk1", [-12,-65]);
	img("police-walk2", [-12,-65]);
	img("police-walk3", [-12,-65]);
	
	//skull idle
	img("idle", [-17.5,-64]);

	//skull walking cycle
	img("walk1", [-17.5,-66.5]);
	img("walk2", [-17.5,-66.5]);
	img("walk3", [-17.5,-66.5]);
	
	//skull axe-lifting cycle
	img("lift1", [-17.5,-66.5]);
	img("lift2", [-17.5,-72]);
	img("lift3", [-17.5,-75]);

	//skull attacking animation
	img("chop1", [-9.5,-58.5]);
	img("chop2", [-9.5,-58.5]);
	img("chop3", [-9.5,-58.5]);
	img("chop4", [-9.5,-58.5]);
	img("chop5", [-9.5,-58.5]);

	//bow skull idle
	img("bow1", [-17.5,-58.5]);

	//bow skull shooting
	img("bow2", [-9.5,-58.5]);
	img("bow3", [-9.5,-58.5]);
	img("bow4", [-9.5,-58.5]);

	//bow skull walking
	img("bow2_walk", [-17.5,-58.5]);
	img("bow3_walk", [-17.5,-58.5]);
	img("bow4_walk", [-17.5,-58.5]);

	//arrow for bow skull
	img("arrow", [-12,-16]); //#

	//shield-skull(beta)
	img("shield1", [-17.5,-64]);
	img("shield2", [-17.5,-64]);
	img("shield3", [-17.5,-64]);
	img("shield4", [-17.5,-64]);

	//icon(for the right-up corner)
	img("icon_of_chop", [-49.5,1]);
	img("icon_of_bow", [-49.5,1]);
	img("icon_of_shield", [-49.5,1]);
	img("icon_of_police", [-49.5,1]);

	//the tower to defence(left-down corner)
	img("castle", [-20,-45]);

	//number font of property($)
	img("0",[-4.5,0],".svg");
	img("1",[-4.5,-0.5],".svg");
	img("2",[-4.5,0],".svg");
	img("3",[-3.5,0],".svg");
	img("4",[-5,0],".svg");
	img("5",[-4,0.5],".svg");
	img("6",[-3.5,0.5],".svg");
	img("7",[-4,1],".svg");
	img("8",[-3.5,0],".svg");
	img("9",[-3.5,0],".svg");

	//icon of money property($)
	img("icon_of_money", [-3.5,0], ".svg");

	//icon of the "wave" text
	img("wave_text", [-39.5,0], ".svg");
/*
*/
}

loadAllImage();



/*check if images loaded*/

//variable to check if loaded
var loaded=false;

//function to check if all images are loaded
function checkIfLoaded(){
	if(Object.keys(store).length==45){
		loaded=true;
	}
}
//check if loaded(looped)
setInterval(checkIfLoaded, 30);