/*initialize*/

//get canvas
var cv = document.getElementById("game-canvas");

var SCALE = 3;

/*debug*/
var debugging=false;

cv.width = SCALE*900;
cv.height = SCALE*400;

//get drawing context
var ctx = cv.getContext("2d");

ctx.imageSmoothingEnabled = false;


/*body of the game*/

//a.k.a "tick", how many screen refreshes passed
var timing=0;

//the "castle alive" boolean
var DEATH=false;

var army=0;

var wave=1;
var max_timing=maxTiming(wave);

class GameObjectsCls{
	constructor(){
		this.skulls=[] //skulls: your skull team and the enemies' skull team
		this.arrows=[] //bow-skull's arrow
		this.bullets=[] //police-skull's shotgun bullet
		this.chops=[] //axe-skull's chop
	}
}

GameObjects = new GameObjectsCls();

class ObjectInstance{
	constructor(source, index){
		this.source = source;
		this.index = index;
	}
	removeSelf(){
		GameObjects[this.source].splice(this.index, 1);
		delete this;
	}
	get instance(){
		return GameObjects[this.source][this.index];
	}
}

/*MAINLOOP*/
function loop(){
	//if the images are all loaded, and the game hasn't stop(DEATH) yet
	if(loaded && !DEATH){
		//generates enemy
		timing+=1;

		if (levelFunction(wave, timing) != -1)
			army += re;

		//clear all screen
		clearScreen();

		for(i=0;i<GameObjects.skulls.length;i++){
			skull = new ObjectInstance("skulls", i);

			i += Skull.frameAction(skull, skulls); // 0 or -1
		}

		drawSkulls(GameObjects.skulls, team=1);

		castle.drawSelf();

		drawSkulls(GameObjects.skulls, team=2);
		
		//process of arrows from bow-skulls
		for(i=0;i<GameObjects.arrows.length;i++){
			arrow = new ObjectInstance("arrows", i);
			
			i += Arrow.frameAction(arrow, skulls); // 0 or -1
		}

		for(i=0;i<GameObjects.bullets.length;i++){
			bullet = new ObjectInstance("bullets", i);

			i += Bullet.frameAction(bullet, skulls); // 0 or -1
		}
		
		for(i=0;i<GameObjects.chops.length;i++){
			chop = new ObjectInstance("chops", i);

			Chop.frameAction(chop, skulls);
		}
		//set all chops to 0. Every chop only survive for 1 frame
		//for continuous attack, the attacker will spawn a chop attack every frame
		GameObjects.chops=[];

		//increase the property of player
		if(timing<=maxTiming(wave))
			army += generation_speed

		//print the property on the screen
		printNumber('$'+parseInt(army), 10, 5, 0.8, 50*(timing>maxTiming(wave)));

		//draw icons(right-top corner)
		coDrawImage('icon_of_chop', -1, 688, 5, 1, 0, (army<price["chop"] || buff.chop>0)*70, 3);
		coDrawImage('icon_of_bow', -1, 748, 5, 1, 0, (army<price["bow"] || buff.bow>0)*70, 3);
		coDrawImage('icon_of_shield', -1, 808, 5, 1, 0, (army<price["shield"] || buff.shield>0)*70, 3);
		coDrawImage('icon_of_police', -1, 868, 5, 1, 0, (army<price["police"] || buff.police>0)*70, 3);

		//print their price
		printNumber(`$${price["chop"]}`, 688, 62, 0.7, (army<price["chop"] || buff.chop>0)*70, 10, "center");
		printNumber(`$${price["bow"]}`, 748, 62, 0.7, (army<price["bow"] || buff.bow>0)*70, 10, "center");
		printNumber(`$${price["shield"]}`, 808, 62, 0.7, (army<price["shield"] || buff.shield>0)*70, 10, "center");
		printNumber(`$${price["police"]}`, 868, 62, 0.7, (army<price["police"] || buff.police>0)*70, 10, "center");

		for(var key in buff)
			buff[key] -= (buff[key]>0);

		//detects if any icon clicked
		if(cursor_click){
			if(663<=cursor_x && cursor_x<=713 && 5<=cursor_y && cursor_y<=55){
				//icon_of_chop clicked
				if(parseInt(army)>=price["chop"] && buff.chop==0){
					buff.chop = max_buff.chop;

					//summon new skull
					new_skull(x=0, y=400, func_=skeleton_walking, 1, 80, price["chop"]);
					army-=price["chop"];

				}

			}else if(723<=cursor_x && cursor_x<=773 && 5<=cursor_y && cursor_y<=55){
				//icon_of_bow clicked
				if(parseInt(army)>=price["bow"] && buff.bow==0){
					buff.bow = max_buff.bow;

					//normal character
					new_skull(x=0, y=400, func_=skeleton_bow_walking_func(20,
						function(lead_l, lead_r){
							let dist=Math.abs(this.x-(this.team==1?lead_r:lead_l)); //get distance
					
							if(dist>270){
								//long shoot
								new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 40);
							}else{
								//short shoot
								new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -1.8, 0.2*this.dir, 0.2, 25);
							}
						}
					), 1, 80, price["bow"]);

					army-=price["bow"];

				}
			}else if(783<=cursor_x && cursor_x<=833 && 5<=cursor_y && cursor_y<=55){
				//icon_of_shield clicked
				if(parseInt(army)>=price["shield"]  && buff.shield==0){
					buff.shield = max_buff.shield;

					//summon new skull
					new_skull(x=0, y=400, func_=skeleton_shield_walking, 1, 1200, price["shield"]);
					army-=price["shield"];

				}
			}else if(843<=cursor_x && cursor_x<=893 && 5<=cursor_y && cursor_y<=55){
				//icon_of_police clicked
				if(parseInt(army)>=price["police"] && buff.police==0){
					buff.police = max_buff.police;

					//summon new skull
					new_skull(x=0, y=400, func_=skeleton_police_walking_func(200,
						function(lead_l, lead_r){ //a shooting function parameter so you can make costumize shoots
							new_bullet(this.x+25*this.dir, this.y-23, this.team, this.dir*25, 0, this.dir*0.2, 0.05, 250);
							new_bullet(this.x+25*this.dir, this.y-22, this.team, this.dir*25, 0.3, this.dir*0.2, 0.05, 250);
							new_bullet(this.x+25*this.dir, this.y-24, this.team, this.dir*25, -0.3, this.dir*0.2, 0.05, 250);
						}
					), 1, 200, price["police"]);
					army-=price["police"];

				}
			}

			//set cursor_click to false, wait until next cursor_click event
			cursor_click=false;
		}

		//wave text
		coDrawImage('wave_text', -1, 268, 7, 1, 0, 0, 2.2);
		printNumber(wave, 306, 8, 0.8, 0);


		drawProgressBar(timing, max_timing);

		//if the castle's health gone too low, the game ends
		if(castle.health<=0){
			clearScreen();
			DEATH=true;
		}

		if(timing>=max_timing){
			let _is_enemy_flag=false;

			for(i=0;i<GameObjects.skulls.length;i++){
				if(GameObjects.skulls[i].team==2) _is_enemy_flag=true;
			}

			if(!_is_enemy_flag){
				wave+=1;

				max_timing=maxTiming(wave);
				timing=0;

				if(max_timing==-1) max_timing=999999999;
			}
		}
	}
}

var buff={
	chop: 0,
	bow: 0,
	shield: 0,
	police: 0
};

var max_buff={
	chop: 40,
	bow: 30,
	shield: 200,
	police: 380
};

var price={
	chop: 40,
	bow: 120,
	shield: 200,
	police: 350
};

//set mainloop
setInterval(loop, 30);

/*
(Debug use)

setTimeout(function(){
	function printNumberA(number_txt, x, y, size, effect=0, width=10, align="left"){
		if(!isNaN(number_txt))
			number_txt=''+number_txt;
		
		if(align=="left"){
			for(i=0;i<number_txt.length;i++){
				num = number_txt[i];
				if(num=="$"){
					coDrawImage("icon_of_money", -1, x+width*size*1.5*i, y-2, 1, 0, effect, (size*1.2), [x+width*size*1.5*i-5,y-44,10,30]);
				}else{
					coDrawImage(num, 1, x+width*size*1.5*i, y, 1, 0, effect, size, [x+width*size*1.5*i-5,y-44,10,30]);
				}
			}
		}else if(align=="center"){
			x_dir = (number_txt.length-1)*width*size*1.5/2;
	
			for(i=0;i<number_txt.length;i++){
				num = number_txt[i];
				if(num=="$"){
					coDrawImage("icon_of_money", -1, x+width*size*1.5*i-x_dir, y-2, 1, 0, effect, (size*1.2), [x+width*size*1.5*i-x_dir-5,y-44,10,30]);
				}else{
					coDrawImage(num, 1, x+width*size*1.5*i-x_dir, y, 1, 0, effect, size, [x+width*size*1.5*i-x_dir-5,y-44,10,30]);
				}
			}
		}
	}
	printNumberA(Object.keys(store), 400, 200, 2, 0, 8, "center");
}, 100);
*/