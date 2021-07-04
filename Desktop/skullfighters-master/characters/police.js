function skeleton_police_walking_func(reload=0, //the runtime delay between two shoots. Min: -78
	shoot_func=function(lead_l, lead_r){ //a shooting function parameter so you can make costumize shoots
		new_bullet(this.x+25*this.dir, this.y-23, this.team, this.dir*25, 0, this.dir*0.2, 0.05, 16);
		new_bullet(this.x+25*this.dir, this.y-22, this.team, this.dir*25, 0.3, this.dir*0.2, 0.05, 16);
		new_bullet(this.x+25*this.dir, this.y-24, this.team, this.dir*25, -0.3, this.dir*0.2, 0.05, 16);
	},
	walking_cycle_time = 3,
	walking_cycle_count = 3,
	full_walking_cycle_delay = 8,
	before_attack_delay = 3,
	detect_radius = 450,
	rapid_attack_radius = 350,
	rapid_attack_random_radius = 100,
	attack_radius = 25
){
	//the function to generate
	function skeleton_police_walking(L,R,init=""){
		if(init=="INIT"){
			this.attack_radius = attack_radius;
			this.skipNeighborEnemies = true;

			return;
		}
		
		skull.tick+=1;

		dir=this.dir;

		//walking animation
		if(this.tick<=4*walking_cycle_time*walking_cycle_count){
			if(this.tick%(4*walking_cycle_time)==1){
				if(this.tick==1){
					this.cst="police-idle";
				}else{
					this.cst="police-idle";
					this.x+=3*dir;
				}
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time){
				this.cst="police-walk1";
				this.x+=3*dir;
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time*2){
				this.cst="police-walk2";
				this.x+=3*dir;
			}
			if(this.tick%(4*walking_cycle_time)==(1+walking_cycle_time*3)%(4*walking_cycle_time)){
				this.cst="police-walk3";
				this.x+=7*dir;
			}
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1){
			this.cst="police-idle";
			this.x+=2*dir;
		}

		//if the enemy is still too far away, then skip the attack
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay && ((this.team==1 && this.x+detect_radius<=R) || (this.team==2 && this.x-detect_radius>=L))){
			this.tick=1;
		}

		//attack
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay){
			this.cst="police-idle";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+4){
			this.cst="police-idle";
			
			//use custom shoot
			this.shoot_func=shoot_func;
			this.shoot_func(L,R);
		}

		//reload is a parameter of the generator's function, so it'll be constant after returning this function back
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+4+reload+78){
			if(this.team==1 && this.x+rapid_attack_radius+randomize(-rapid_attack_random_radius,rapid_attack_random_radius)>=R){
				//if the enemy is too nearby, shoot again as soon as possible(for team 1)
				this.tick=4*walking_cycle_time*walking_cycle_count+1;
			}else if(this.team==2 && this.x-rapid_attack_radius-randomize(-rapid_attack_random_radius,rapid_attack_random_radius)<=L){
				//for team 2
				this.tick=4*walking_cycle_time*walking_cycle_count+1;
			}else{
				//otherwise, do the walk cycle animation again
				this.tick=1;
			}
		}
	}

	//return the function back
	return skeleton_police_walking;
}