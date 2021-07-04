function getLeadings(skull, skulls){
	//detects leadingL and leadingR for this skull
	let leadingL=35;
	let leadingR=1500;
	
	if(skull.team==1){
		//this skull is in Team 1
		for(j=0;j<skulls.length;j++){
			skull_=skulls[j];
			//for each skull_ in array, included theirselves
			if(skull_.team==1){
				//same team
				if(skull_.x>=leadingL){
					//if the skull_ is more r.h.s than leadingL x coordinate
					//set it to the skull_'s x prop.
					leadingL=skull_.x;
				}
			}else{
				eps = skull.attack_radius*skull.skipNeighborEnemies;
				//different team
				if(skull_.x<=leadingR && skull.x+eps<skull_.x){
					//if the skull_ is attackable(i.e., skull_ did NOT surpassed skull) and skull_ is near enough
					leadingR=skull_.x;
				}
			}
		}
	}else{
		//similar(see above)
		for(j=0;j<skulls.length;j++){
			skull_=skulls[j];
			if(skull_.team==1){
				eps = skull.attack_radius*skull.skipNeighborEnemies;
				if(skull_.x>=leadingL && skull.x-eps>skull_.x){
					leadingL=skull_.x;
				}
			}else{
				if(skull_.x<=leadingR){
					leadingR=skull_.x;
				}
			}
		}
	}

	return [leadingL, leadingR];
}