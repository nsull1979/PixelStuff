export default class Particle {
    constructor(canvas, detail, grid){
        this.grid = grid;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.detail = detail;
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height;
        this.speed = 0;
        this.velocity = Math.random() * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.position1 = Math.floor(this.y/this.detail);
        this.position2 = Math.floor(this.x/this.detail);
        this.angle = 0;
    }
    update(){
        this.position1 = Math.floor(this.y/this.detail);
        this.position2 = Math.floor(this.x/this.detail);
        if(this.grid[this.position1]){
            if(this.grid[this.position1][this.position2]){
                this.speed = this.grid[this.position1][this.position2];

            }
        }
        this.angle += this.speed/20;
        let movement = (2.5 - this.speed) + this.velocity;
        this.y -= movement + Math.cos(this.angle) * 2;
        this.x += Math.cos(this.angle) * 2;
        if(this.y <= 0){
            this.y = this.canvas.height;
            this.x = Math.random() * this.canvas.width;
        }
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x,this.x,this.size,0,2*Math.PI);
        this.ctx.fill();

    }
}