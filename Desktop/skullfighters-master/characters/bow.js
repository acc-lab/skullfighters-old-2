function skeleton_bow_walking_func(reload=33, //the runtime delay between two shoots. Min: -4
	shoot_func=function(lead_l, lead_r){ //a shooting function parameter so you can make costumize shoots
		let dist=Math.abs(this.x-(this.team==1?lead_r:lead_l)); //get distance

		if(dist>270){
			//long shoot
			new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 25);
		}else{
			//short shoot
			new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -1.8, 0.2*this.dir, 0.2, 25);
		}
	},
	walking_cycle_time = 3,
	walking_cycle_count = 3,
	full_walking_cycle_delay = 2,
	before_attack_delay = 2,
	detect_radius = 450,
	rapid_attack_radius = 250,
	rapid_attack_random_radius = 100,
	attack_radius = 20
){
	//the function to generate
	function skeleton_bow_walking(L,R,init=""){
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
					this.cst="bow1";
				}else{
					this.cst="bow1";
					this.x+=2*dir;
				}
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time){
				this.cst="bow2_walk";
				this.x+=2*dir;
			}
			if(this.tick%(4*walking_cycle_time)==1+walking_cycle_time*2){
				this.cst="bow3_walk";
				this.x+=4*dir;
			}
			if(this.tick%(4*walking_cycle_time)==(1+walking_cycle_time*3)%(4*walking_cycle_time)){
				this.cst="bow4_walk";
				this.x+=6*dir;
			}
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1){
			this.cst="bow1";
			this.x+=2*dir;
		}

		//if the enemy is still too far away, then skip the attack
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay && ((this.team==1 && this.x+detect_radius<=R) || (this.team==2 && this.x-detect_radius>=L))){
			this.tick=1;
		}

		//attack
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay){
			this.cst="bow1";
		}if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+2){
			this.cst="bow2";
		}if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+6){
			this.cst="bow3";
		}if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+10){
			this.cst="bow4";
		}
		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+11){
			this.cst="bow1";
			
			//use custom shoot
			this.shoot_func=shoot_func;
			this.shoot_func(L,R);
		}

		if(this.tick==4*walking_cycle_time*walking_cycle_count+1+full_walking_cycle_delay+before_attack_delay+11+reload+4){
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
	return skeleton_bow_walking;
}