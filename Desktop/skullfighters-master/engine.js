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

//three types of thing in game
var skulls=[] //skulls: your skull team and the enemies' skull team
var arrows=[] //bow-skull's arrow
var bullets=[] //police-skull's shotgun bullet
var chops=[] //axe-skull's chop

//a.k.a "tick", how many screen refreshes passed
var timing=0;

//the "castle alive" boolean
var DEATH=false;

var army=0;

var wave=1;
var max_timing=maxTiming(wave);

/*MAINLOOP*/
function loop(){
	//if the images are all loaded, and the game hasn't stop(DEATH) yet
	if(loaded && !DEATH){
		//generates enemy
		timing+=1;

		army=(re=levelFunction(wave, timing))!=-1?army+re:army;

		//clear all screen
		clearScreen();

		for(i=0;i<skulls.length;i++){
			skull=skulls[i];
			//for each skull in skulls array

			//if it's not dying, but the health dropped to 0
			if(!skull.dying && skull.health<=0){
				skull.dying=true;

				i-=1;
				continue;
			}

			//if it's not dying yet
			if(!skull.dying){
				//if skull.effect(the damage fade-out effect) is non-zero, minus one
				//if it's 0, keep it 0. Zero=>no effect; Nonzero=>fade-out effect
				skull.effect-=(skull.effect>0);

				leadings = getLeadings(skull);

				//run the skull's AI by this leadingL and leadingR
				skull.cstFunc(leadings[0], leadings[1]);

			}else{
				//set normal effect to 0, and make the dying fade-out effect increase
				skull.effect=0;
				skull.dying_effect+=9;

			}

			//if the skull is dying and the dying effect of the skull already makes the skull completely disappeared
			if(skull.dying && skull.dying_effect>=100){
				//delete the skull
				skulls.splice(i,1);
				i-=1;
				continue;
			}
			
			//if the skull's from Team 1, and it surpassed the r.h.s screen edge
			if(skull.x>=915 && skull.team==1 && !skull.dying){
				//increase the property by the skull's value
				army+=skull.value;

				skull.dying=true;
				i-=1;
				continue;
			}
		}

		drawSkulls(skulls, team=1);

		castle.drawSelf();

		drawSkulls(skulls, team=2);
		
		//process of arrows from bow-skulls
		for(i=0;i<arrows.length;i++){
			arrow=arrows[i];
			//for each arrow

			//if the arrows overflowed
			if(Math.abs(arrow.x-450)>=465 || Math.abs(arrow.y-200)>=215){
				arrows.splice(i,1);
				i-=1;
				continue;
			}

			if(arrow.checkIfTouched(skulls)){

				//delete this arrow
				arrows.splice(i,1);
				i-=1;
				continue;
			}

			if(touched(castle.hitbox,arrow.rect)){
				//if the arrow touched the castle we're defending
				if(arrow.team!=1){
					//if the arrow is from the enemies' team

					//damage the castle
					castle.damage(arrow.damage);

					arrows.splice(i,1);
					i-=1;
					continue;
				}
			}

			//basic physic
			arrow.update();

			arrow.drawSelf(debug=debugging);
		}

		for(i=0;i<bullets.length;i++){
			bullet=bullets[i];

			if(Math.abs(bullet.x-450)>=500 || Math.abs(bullet.y-200)>=215){
				bullets.splice(i,1);
				i-=1;
				continue;
			}

			if(bullet.checkIfTouched(skulls)){
				bullets.splice(i,1);
				i-=1;
				continue;
			}

			if(touched(castle.hitbox,bullet.rect)){
				if(bullet.team!=1){
					//damage the castle
					castle.damage(bullet.damage);

					bullets.splice(i,1);
					i-=1;
					continue;
				}
			}

			//basic physic
			bullet.update();

			bullet.drawSelf(debug=debugging);
		}
		
		for(i=0;i<chops.length;i++){
			chop=chops[i];
			//for each axe chop

			//debug only: draw hitbox
			if(debugging){
				drawRect(chop.rect, chop.team);
			}
			
			if(chop.checkIfTouched(skulls)){
				continue;
			}
			
			//check if the attack hitbox collides the castle hitbox
			if(touched(castle.hitbox,chop.rect)){
				if(chop.team!=1){
					//axe attacks from the enemies' team that collides

					//damage the castle
					castle.damage(chop.damage);
				}
			}
		}
		//set all chops to 0. Every chop only survive for 1 frame
		//for continuous attack, the attacker will spawn a chop attack every frame
		chops=[];

		//increase the property of player
		army += timing<=maxTiming(wave)?generation_speed:0;

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

		for(var key in buff) buff[key]-=(buff[key]>0);

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

			for(i=0;i<skulls.length;i++){
				if(skulls[i].team==2) _is_enemy_flag=true;
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