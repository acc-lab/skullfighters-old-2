class Castle{
    constructor(hitbox, maxHealth){
        this.hitbox = hitbox;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.effect = 0;
    }
    //function for castle to take damage
    damage(dmg){
        this.health -= dmg;

        //fade-out effect
        this.effect = 5;
    }
    drawSelf(){
        //castle's effect processing
        this.effect-=(this.effect>0);
    
        //draw castle(so skulls from Team 1 can hide in the castle)
        coDrawImage('castle', -1, 30, 400, 1, this.effect>0, 0, 1);
    
        //draw health bar of castle
        if(this.health>0){
            ctx.beginPath();
            ctx.lineWidth=SCALE*8;
            ctx.strokeStyle="#ffffff";
            ctx.moveTo(SCALE*5, SCALE*320);
            ctx.lineTo(SCALE*(5+this.health/this.maxHealth*50), SCALE*320);
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(SCALE*(5+this.health/this.maxHealth*50), SCALE*320);
            ctx.lineTo(SCALE*55, SCALE*320);
            ctx.strokeStyle="#393939";
            ctx.stroke();
        }else{
            ctx.lineWidth=SCALE*8;
            
            ctx.beginPath();
            ctx.moveTo(SCALE*5, SCALE*320);
            ctx.lineTo(SCALE*55, SCALE*320);
            ctx.strokeStyle="#393939";
            ctx.stroke();
        }
        
        ctx.lineWidth=1;
    
        //debug only: draw castle's hitbox
        if(debugging==1){
            drawRect(this.hitbox, 1);
        }
    }
}

//the castle you're defending's hitbox
var castle = new Castle(hitbox=[10,333,40,66], maxHealth=2000);