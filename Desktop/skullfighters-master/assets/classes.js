class Chop{
	constructor(x, y, team, damage){
		this.x=x;
		this.y=y;
		this.team=team;
		this.damage=damage;
	}
	get rect(){
		return [this.x-3.5,this.y-3.5,7,7];
	}
	checkIfTouched(skulls){
		for(j=0;j<skulls.length;j++){
			skull=skulls[j];
			if(touched(skull.rect, this.rect)){
				if(skull.team!=this.team && !skull.dying){
					//if collides, different team and the skull isn't dying yet

					//damage
					skull.effect=10;
					skull.health-=this.damage;
					
					return true;
				}
			}
		}
		return false;
	}
	static frameAction(chop, skulls){
		//debug only: draw hitbox
		if(debugging){
			drawRect(chop.instance.rect, chop.instance.team);
		}
		
		chop.instance.checkIfTouched(skulls)
		
		//check if the attack hitbox collides the castle hitbox
		if(touched(castle.hitbox,chop.instance.rect)){
			if(chop.instance.team!=1){
				//axe attacks from the enemies' team that collides

				//damage the castle
				castle.damage(chop.instance.damage);
			}
		}
	}
}

class Bullet{
	constructor(x, y, team, vx, vy, ax, ay, damage){
		this.x=x;
		this.y=y;
		this.team=team;
		this.vx=vx;
		this.vy=vy;
		this.ax=ax;
		this.ay=ay;
		this.damage=damage;
	}
	update(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.vx+=this.ax;
		this.vy+=this.ay;
	}
	drawSelf(debug){
		ctx.save();
		
		ctx.strokeStyle="#ffffff";
		ctx.lineWidth=SCALE;
	
		ctx.beginPath();
		ctx.moveTo(SCALE*(this.x-(this.vx-this.ax)), SCALE*(this.y-(this.vy-this.ay)));
		ctx.lineTo(SCALE*this.x, SCALE*this.y);
		ctx.stroke();
	
		ctx.restore();

		//debugging only: draw arrow's hitbox
		if(debug){
			drawRect(this.rect, this.team);
		}
	}
	checkIfTouched(skulls){
		for(let j=0;j<skulls.length;j++){
			skull=skulls[j];
			//for each skull

			if(touched(skull.rect,this.rect)){
				//if skull and arrow touched(i.e., their hitbox collides)
				if(skull.team!=this.team && !skull.dying){
					//if they're from different team and the skull isn't already dying

					//set damage and damage effect
					skull.effect=10;
					skull.health-=this.damage;

					return true;
				}
			}
		}
		return false;
	}
	static frameAction(bullet, skulls){
		if(Math.abs(bullet.instance.x-450)>=500 || Math.abs(bullet.instance.y-200)>=215){
			bullet.removeSelf();
			
			return -1;
		}

		if(bullet.instance.checkIfTouched(skulls)){
			bullet.removeSelf();

			return -1;
		}

		if(touched(castle.hitbox,bullet.instance.rect)){
			if(bullet.instance.team!=1){
				//damage the castle
				castle.damage(bullet.instance.damage);

				bullet.removeSelf();

				return -1;
			}
		}

		//basic physic
		bullet.instance.update();

		bullet.instance.drawSelf(debugging);

		return 0;
	}
	get rect(){
		let del_x=this.vx-this.ax;
		let del_y=this.vy-this.ay;
		
		if(del_x>=0 && del_y>=0)
			return [this.x-del_x, this.y-del_y, del_x, del_y];
		if(del_x>=0 && del_y<=0)
			return [this.x-del_x, this.y, del_x, -del_y];
		if(del_x<=0 && del_y>=0)
			return [this.x, this.y-del_y, -del_x, del_y];
		if(del_x<=0 && del_y<=0)
			return [this.x, this.y, -del_x, -del_y];
	}
}

class Arrow{
	constructor(x, y, team, vx, vy, ax, ay, damage){
		this.x=x;
		this.y=y;
		this.team=team;
		this.vx=vx;
		this.vy=vy;
		this.ax=ax;
		this.ay=ay;
		this.damage=damage;
	}
	update(){
		this.x+=this.vx;
		this.y+=this.vy;
		this.vx+=this.ax;
		this.vy+=this.ay;
	}
	drawSelf(debug){
		console.log("I am here")
		
		//get direction to aim
		let direction=Math.atan2(this.vy,this.vx)+2*Math.PI;

		ctx.save();
	
		ctx.translate(SCALE*this.x,SCALE*this.y);
		
		//draw image with the direction by ctx.drawImage()
		//noted that we didn't use coDrawImage() function
		ctx.rotate(direction);
		ctx.drawImage(store["arrow"],SCALE*-store["arrow"].width/4,SCALE*-store["arrow"].height/4, SCALE*store["arrow"].width/2, SCALE*store["arrow"].height/2);

		ctx.restore();

		//debugging only: draw arrow's hitbox
		if(debug){
			drawRect(this.rect, this.team);
			drawRect([this.x-0.5, this.y-0.5, 1, 1], this.team);
		}
	}
	checkIfTouched(skulls){
		for(j=0;j<skulls.length;j++){
			skull=skulls[j];
			//for each skull

			if(touched(skull.rect,this.rect)){
				//if skull and arrow touched(i.e., their hitbox collides)
				if(skull.team!=this.team && !skull.dying){
					//if they're from different team and the skull isn't already dying

					//set damage and damage effect
					skull.effect=10;
					skull.health-=this.damage;

					return true;
				}
			}
		}
		return false;
	}
	static frameAction(arrow, skulls){
		//if the arrows overflowed
		if(Math.abs(arrow.instance.x-450)>=465 || Math.abs(arrow.instance.y-200)>=215){
			arrow.removeSelf();
			
			return -1;
		}

		if(arrow.instance.checkIfTouched(skulls)){
			arrow.removeSelf();

			return -1;
		}

		if(touched(castle.hitbox,arrow.instance.rect)){
			//if the arrow touched the castle we're defending
			if(arrow.instance.team!=1){
				//if the arrow is from the enemies' team

				//damage the castle
				castle.damage(arrow.instance.damage);

				arrow.removeSelf();
				
				return -1;
			}
		}

		//basic physic
		arrow.instance.update();

		arrow.instance.drawSelf(debugging);

		return 0;
	}
	get rect(){
		if(this.team==1){
			//toward r.h.s
			return [this.x+4,this.y-3,4,5];
		}else{
			//toward l.h.s
			return [this.x-8,this.y-3,4,5];
		}
	}
}

class Skull{
	constructor(x, y, func, team, health, value){
		this.x=x+randomize(0,10);
		this.y=y;
		this.cstFunc=func;
		this.team=team;
		this.health=health;
		this.max_health=health;
		this.value=value;
		this.cst="idle";
		this.tick=0;
		this.effect=0;
		this.dying=false;
		this.dying_effect=0;
		this.dir=((t)=>{switch(t){case 1:return 1;case 2:return -1;}})(team);

		this.attack_radius=0;
		this.skipNeighborEnemies=false;

		this.cstFunc(null,null,"INIT"); //init
		
		this.health_bar_show=0;
	}
	drawSelf(){
		coDrawImage(this.cst, this.team, this.x, this.y, this.dir, (this.effect>0), this.dying_effect, 2, this.rect);

		if(this.effect==9){
			this.health_bar_show=30;
		}
		
		if(!this.dying && (this.health_bar_show>0)){
			this.health_bar_show-=1;
			
			ctx.save();
			
			if(this.health_bar_show<=10){
				ctx.globalAlpha=(this.health_bar_show)/10;
			}
			
			ctx.beginPath();
			
			ctx.lineWidth=SCALE*4;
			ctx.strokeStyle="#393939";
			
			ctx.moveTo(SCALE*(this.x-13.5),SCALE*(this.y-60));
			ctx.lineTo(SCALE*(this.x+13.5),SCALE*(this.y-60));
			ctx.stroke();
			
			ctx.beginPath();
			
			ctx.strokeStyle="#ffffff";
			ctx.moveTo(SCALE*(this.x-13.5),SCALE*(this.y-60));
			ctx.lineTo(SCALE*(this.x-13.5+(this.health/this.max_health)*27),SCALE*(this.y-60));
			ctx.stroke();
			
			ctx.restore();
		}
	}
	static frameAction(skull, skulls){
		// skull: objectInstance() of skull object w.r.t skulls source
		// skull is NOT a instance object of skulls

		if(!skull.instance.dying && skull.instance.health<=0){
			skull.instance.dying=true;
		}

		//if it's not dying yet
		if(!skull.instance.dying){
			//if skull.effect(the damage fade-out effect) is non-zero, minus one
			//if it's 0, keep it 0. Zero=>no effect; Nonzero=>fade-out effect
			skull.instance.effect-=(skull.instance.effect>0);

			let leadings = getLeadings(skull.instance, skulls);

			//run the skull's AI by this leadingL and leadingR
			skull.instance.cstFunc(leadings[0], leadings[1]);

		}else{
			//set normal effect to 0, and make the dying fade-out effect increase
			skull.instance.effect=0;
			skull.instance.dying_effect+=9;

		}

		//if the skull is dying and the dying effect of the skull already makes the skull completely disappeared
		if(skull.instance.dying && skull.instance.dying_effect>=100){
			//delete the skull
			skull.removeSelf();
			
			return -1;
		}
		
		//if the skull's from Team 1, and it surpassed the r.h.s screen edge
		if(skull.instance.x>=915 && skull.instance.team==1 && !skull.instance.dying){
			//increase the property by the skull's value
			army+=skull.instance.value;

			skull.instance.dying=true;
		}

		return 0;
	}
	get rect(){
		return [this.x-5,this.y-44,10,30];
	}
}

function new_chop(x_, y_, team_, damage_=10){
	nchop=new Chop(x_, y_, team_, damage_);
	GameObjects.chops.push(nchop);
}

function new_arrow(x_, y_, team_, vx_=11, vy_=-0.5, ax_=0.2, ay_=0.1, damage_=25){
	//vx_,vy_: initial arrow's velocity
	//ax_,ay_: arrow's acceleration (apparently you can have different acceleration for different bows)

	narrow=new Arrow(x_, y_, team_, vx_, vy_, ax_, ay_, damage_);
	GameObjects.arrows.push(narrow);
}

function new_bullet(x_, y_, team_, vx_=11, vy_=-0.5, ax_=0.2, ay_=0.1, damage_=25){
	//vx_,vy_: initial bullet's velocity
	//ax_,ay_: bullet's acceleration (apparently you can have different acceleration for different bullets)

	nbullet=new Bullet(x_, y_, team_, vx_, vy_, ax_, ay_, damage_);
	GameObjects.bullets.push(nbullet);
}

function new_skull(x_=0, y_=400, func_=skeleton_walking, team_=1, health_=100, value_=0){
	//func_: what the skull do every single screen refresh, that decides the skull's AI, movements, animations and attacks
	//value_: only for Team 1. The property you can get as return if the skull's out of the screen and they survived

	nskull=new Skull(x_, y_, func_, team_, health_, value_);
	GameObjects.skulls.push(nskull);
}
