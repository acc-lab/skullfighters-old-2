function drawSkulls(skulls, team){
	for(i=skulls.length-1;i>=0;i--){
		skull=skulls[i];

		if(skull.team==team){
			skull.drawSelf();
		}
	}
}