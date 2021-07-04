/*version*/
var version="1.4.3";


/*level design*/
var generation_speed=0.28;

function maxTiming(w){
	switch(w){
		case 1: return 3000;
		case 2: return 2000;
		case 3: return 1000;
		case 4: return 2500;
		case 5: return 3000;
		default: return -1;
	}
}

var p;

function levelFunction(w,t){
	_army=-1;
	
	if(w==1){
		if(t==1){
			generation_speed=0.28;
			_army=0;

		}if(t==400){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 60);
		}if(t==700){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1300){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1350){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
		}if(t==1400){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
		}if(t==1550){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
			generation_speed=0.43;

		}if(t==1600){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
			generation_speed=0.48;

		}if(t==1650){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
		}if(t==1700){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
		}if(t==1800){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 120);
		}if(t==2001){
			generation_speed=0.53;

		}if(t==2150){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 70);
		}if(t==2650){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==2750){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 70);
		}if(t==2830){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 300);
		}if(t==2900){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0,
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 50);
				}
			), 2, 20);
		}
	}
	else if(w==2){
		if(t==1){
			_army=200;

			generation_speed=0.48;
		}
		if(t==50){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(43), 2, 220);
		}if(t==250){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(33), 2, 220);
		}if(t==450){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(33), 2, 220);
			generation_speed=0.53;

		}if(t==610){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==710){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==800){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 130);
		}if(t==810){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(25), 2, 130);
		}if(t==900){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 130);
		}if(t==910){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(25), 2, 130);
			generation_speed=0.63;

		}if(t==1110){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1210){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1310){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1410){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}if(t==1690){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 130);
		}if(t==1700){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(25), 2, 130);
		}if(t==1790){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 130);
		}if(t==1800){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(25), 2, 130);
		}if(t==1980){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 100);
		}
	}
	else if(w==3){
		if(t==1){
			_army=300;
		}

		if(t==180){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(15, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 2);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 2);
				}
			), 2, 150);
			
			generation_speed=0.73;

		}if(t==300){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==400){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(10, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 2);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 2);
				}
			), 2, 250);
		}if(t==500){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==550){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==600){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==650){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==670){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 3);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 3);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 3);
				}
			), 2, 400);
		}if(t==700){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -5, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 4);
				}
			), 2, 600);
		}if(t==800){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==850){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -5, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 4);
				}
			), 2, 600);
		}if(t==900){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
			
			generation_speed=0.83;

		}if(t==940){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==980){
			new_skull(x=900, y=400, func_=skeleton_walking, 2, 150);
		}if(t==1000){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -5, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 9*this.dir, -1, 0.2*this.dir, 0.2, 4);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 8*this.dir, 0, 0.2*this.dir, 0.2, 4);
				}
			), 2, 1000);
		}
	}
	else if(w==4){
		if (t==1){
			p=200;
			
			_army=400;

			for(var x=70; x<830; x+=5){
				new_bullet(x,0,2,0,5,0,1,1000);
			}
		}
		
		generation_speed=1.2;
		
		
		if ((t+50)%Math.floor(p/2.7)==0 && t<2500){
			new_skull(x=900,y=400,func_=skeleton_walking,2,150);
			p/=1.01;
		}
		if ((t+50)%Math.floor(p*2.5)==0 && t<2500 && t>500){
			if(t<2300){
				new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
					function(lead_l, lead_r){
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -5, 0.2*this.dir, 0.2, 3);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -4, 0.2*this.dir, 0.2, 3);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -3, 0.2*this.dir, 0.2, 3);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, 3);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 9*this.dir, -1, 0.2*this.dir, 0.2, 3);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 8*this.dir, 0, 0.2*this.dir, 0.2, 3);
					}
				),2,250);
			}else{
				new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
					function(lead_l, lead_r){
						let damage=7;
						
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 18*this.dir, -3.6, 0.36*this.dir, 0.36, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -2.2, 0.22*this.dir, 0.22, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -2.4, 0.24*this.dir, 0.24, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -2.6, 0.26*this.dir, 0.26, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 14*this.dir, -2.8, 0.28*this.dir, 0.28, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 15*this.dir, -3, 0.3*this.dir, 0.3, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 16*this.dir, -3.2, 0.32*this.dir, 0.32, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 17*this.dir, -3.4, 0.34*this.dir, 0.34, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 20*this.dir, -4, 0.4*this.dir, 0.4, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 19*this.dir, -3.8, 0.38*this.dir, 0.38, damage);
						new_arrow(this.x+16*this.dir, this.y-22, this.team, 21*this.dir, -4.2, 0.42*this.dir, 0.42, damage);
					}
				),2,800);
			}
			
			p/=1.035;
		}
		if (t==500){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,100);
		}if (t==1000){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,300);
		}if (t==1500){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,300);
		}if (t==1900){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,300);
		}if (t==2200){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,400);
		}if (t==2450){
			new_skull(x=900, y=400,func_=skeleton_shield_walking,2,500);
		}
	}
	else if(w==5){
		if (t==1){
			_army=400;

			for(var x=70; x<830; x+=5){
				new_bullet(x,0,2,0,5,0,1,1000);
			}
		}
		
		generation_speed=1.3;
		
		if (t>=100 && t<=1000 && t%50==0){
			new_skull(x=900,y=400,func_=skeleton_walking_func(walking_cycle_time = 2),2,250);
		}
		if (t>=850 && t<=1900 && t%80==0){
			new_skull(x=900,y=400,func_=skeleton_police_walking_func(reload=36-3*parseInt((t-400)/80)),2,350);
		}

		if (t>=1200 && t<=2500 && t%250==0){
			new_skull(x=900,y=400,func_=skeleton_shield_walking,2,350);
		}

		if(t==2000){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					let damage=5;
					
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 18*this.dir, -3.6, 0.36*this.dir, 0.36, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -2.2, 0.22*this.dir, 0.22, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -2.4, 0.24*this.dir, 0.24, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -2.6, 0.26*this.dir, 0.26, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 14*this.dir, -2.8, 0.28*this.dir, 0.28, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 15*this.dir, -3, 0.3*this.dir, 0.3, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 16*this.dir, -3.2, 0.32*this.dir, 0.32, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 17*this.dir, -3.4, 0.34*this.dir, 0.34, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 20*this.dir, -4, 0.4*this.dir, 0.4, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 19*this.dir, -3.8, 0.38*this.dir, 0.38, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 21*this.dir, -4.2, 0.42*this.dir, 0.42, damage);
				}
			),2,800);
		}
		if(t==2300){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					let damage=5;
					
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 18*this.dir, -3.6, 0.36*this.dir, 0.36, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -2.2, 0.22*this.dir, 0.22, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -2.4, 0.24*this.dir, 0.24, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -2.6, 0.26*this.dir, 0.26, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 14*this.dir, -2.8, 0.28*this.dir, 0.28, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 15*this.dir, -3, 0.3*this.dir, 0.3, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 16*this.dir, -3.2, 0.32*this.dir, 0.32, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 17*this.dir, -3.4, 0.34*this.dir, 0.34, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 20*this.dir, -4, 0.4*this.dir, 0.4, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 19*this.dir, -3.8, 0.38*this.dir, 0.38, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 21*this.dir, -4.2, 0.42*this.dir, 0.42, damage);
				}
			),2,800);
		}
		if(t==2750){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					let damage=12;
					
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 18*this.dir, -3.6, 0.36*this.dir, 0.36, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -2.2, 0.22*this.dir, 0.22, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -2.4, 0.24*this.dir, 0.24, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -2.6, 0.26*this.dir, 0.26, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 14*this.dir, -2.8, 0.28*this.dir, 0.28, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 15*this.dir, -3, 0.3*this.dir, 0.3, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 16*this.dir, -3.2, 0.32*this.dir, 0.32, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 17*this.dir, -3.4, 0.34*this.dir, 0.34, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 20*this.dir, -4, 0.4*this.dir, 0.4, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 19*this.dir, -3.8, 0.38*this.dir, 0.38, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 21*this.dir, -4.2, 0.42*this.dir, 0.42, damage);
				}
			),2,1200);
		}
		if(t==3000){
			new_skull(x=900, y=400, func_=skeleton_bow_walking_func(0, 
				function(lead_l, lead_r){
					let damage=24;
					
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 18*this.dir, -3.6, 0.36*this.dir, 0.36, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 10*this.dir, -2, 0.2*this.dir, 0.2, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 11*this.dir, -2.2, 0.22*this.dir, 0.22, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 12*this.dir, -2.4, 0.24*this.dir, 0.24, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 13*this.dir, -2.6, 0.26*this.dir, 0.26, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 14*this.dir, -2.8, 0.28*this.dir, 0.28, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 15*this.dir, -3, 0.3*this.dir, 0.3, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 16*this.dir, -3.2, 0.32*this.dir, 0.32, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 17*this.dir, -3.4, 0.34*this.dir, 0.34, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 20*this.dir, -4, 0.4*this.dir, 0.4, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 19*this.dir, -3.8, 0.38*this.dir, 0.38, damage);
					new_arrow(this.x+16*this.dir, this.y-22, this.team, 21*this.dir, -4.2, 0.42*this.dir, 0.42, damage);
				}
			),2,5000);
		}
	}

	return _army;
}