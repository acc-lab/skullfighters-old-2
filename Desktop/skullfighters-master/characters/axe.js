function skeleton_walking_func(
	walking_cycle_time = 3,
	walking_cycle_count = 3,
	full_walking_cycle_delay = 4,
	after_attack_delay = 8,
	detect_radius = 35,
	damage = 30
){
	func = function skeleton_walking(L,R,init=""){
		if(init=="INIT"){
			this.attack_radius = 27;
			this.skipNeighborEnemies = false;

			return;
		}

		this.tick+=1;
		
		//direction (1 or -1)
		dir=this.dir;
  
		//axe-skull's costume movement
		if(this.tick<=4*walking_cycle_time*walking_cycle_count){
			if(this.tick%(4*walking_cycle_time)==1){
				if(this.tick==1){
					this.cst="idle";
				}else{
					this.cst="idle";
					this.x+=2*dir;
				}
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time){
				this.cst="walk1";
				this.x+=2*dir;
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time*2){
				this.cst="walk2";
				this.x+=4*dir;
			}
			if(this.tick%(4*walking_cycle_time)==(1+walking_cycle_time*3)%(4*walking_cycle_time)){
				this.cst="walk3";
				this.x+=6*dir;
			}
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1){
			this.cst="idle";
			this.x+=2*dir;
		}
  
		//back to initial animation frame
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay){
			this.tick=1;
		}

		//at any animation frame, if the enemy is reachable, do the axe attack
		if(this.team==1 && this.x+detect_radius>=R && this.tick<4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay){
			this.tick=4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+1;
		}else if(this.team==2 && this.x-detect_radius<=L && this.tick<4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay){
			this.tick=4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+1;
		}

		//animation: lift axe
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+2){
			this.cst="idle";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+3){
			this.cst="lift1";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+4){
			this.cst="lift2";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+5){
			this.cst="lift3";
		}
		
		//animation: attack
		if(4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+7<=this.tick && this.tick<4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+11){
			if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+7){
				this.cst="chop1";
				if(dir==1)
					new_chop(this.x+this.attack_radius,this.y-45,this.team, damage/3);
				else
					new_chop(this.x-this.attack_radius,this.y-45,this.team, damage/3);
			}
			if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+8){
				this.cst="chop2";
				if(dir==1)
					new_chop(this.x+this.attack_radius+10,this.y-31,this.team, damage/3);
				else
					new_chop(this.x-this.attack_radius-10,this.y-31,this.team, damage/3);
			}
			if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+9){
				this.cst="chop3";
				if(dir==1)
					new_chop(this.x+this.attack_radius+8,this.y-23,this.team, damage/3);
				else
					new_chop(this.x-this.attack_radius-8,this.y-23,this.team, damage/3);
			}
			if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+10){
				this.cst="chop4";
			}
			if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+11){
				this.cst="chop5";
			}
			this.x-=3*dir;
		}
		if(4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+12==this.tick || this.tick==4*walking_cycle_time*walking_cycle_count+walking_cycle_time+full_walking_cycle_delay+13){
			this.x-=3*dir;
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+14){
			this.cst="lift1";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+15){
			this.cst="idle";
		}
  
		//back to the first frame
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+15+after_attack_delay){
			this.tick=1;
		}
	}
	return func;
}

// Classic AI

skeleton_walking = skeleton_walking_func();