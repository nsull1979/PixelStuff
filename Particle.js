export default class Particle {
    constructor(maxWidth, maxHeight, imData, numParticles){
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.x = Math.random() * maxWidth;
        this.y = 0;
        this.imData = imData;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 1.5 + 1;
        this.pos1 = Math.floor(this.y);
        this.pos2 = Math.floor(this.x);
        this.waiting = false;
        this.ended = false;
        this.counted = false;
        this.color = {red: Math.floor(Math.random() * 255), green: Math.floor(Math.random() * 255), blue: Math.floor(Math.random() * 255)};
        this.color2 = Math.floor(Math.random() * 360);
    }
    update(){
        if(!this.ended){
            this.pos1 = Math.floor(this.y);
            this.pos2 = Math.floor(this.x);
            try{
                this.speed = this.imData[this.pos1][this.pos2];
            } catch (err){
                
                console.log(this.pos1, this.pos2, this.imData.length, this.imData[this.pos1]);
                
                throw err;
            }
            let movement = (2.5 - this.speed) * this.velocity+0.5;
            this.y += movement;
            if(this.y >= this.maxHeight){
                if(!this.waiting){
                    this.y = 0;
                    this.x = Math.random() * this.maxWidth;
                    this.color = {red: Math.floor(Math.random() * 255), green: Math.floor(Math.random() * 255), blue: Math.floor(Math.random() * 255)};
                    this.color2 = Math.floor(Math.random() * 360);
                }
                
            }
        }
        
    }
    reset(){
        this.y = 0;
        this.x = Math.random() * this.maxWidth;
        this.waiting = false;
        this.ended = false;
        this.counted = false;
        this.color = {red: Math.floor(Math.random() * 255), green: Math.floor(Math.random() * 255), blue: Math.floor(Math.random() * 255)};
        this.color2 = Math.floor(Math.random() * 360);
    }
    draw(ctx){
        if(!this.ended){
            ctx.beginPath();
            ctx.fillStyle = "hsla(" + this.color2 + ",100%,60%," + (this.speed * 0.5) + ")"; 
            //ctx.fillStyle = "rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", " + (this.speed * 0.5)+ ")";
            ctx.arc(this.x,this.y,2,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    }
}