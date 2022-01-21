//import Particle from './Particle.js';
//const workers = [];
//const numWorkers = 4;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const numParticles = 20000;
const image1 = new Image();
const particles = [];
const detail = 1;
const images = ["forzaleague.png", "test.jpg", "cara.png", "Doublerainbow.png"];
const speedMultiplyer = 5;
const partMult = 2.5;
var imageIndex = 0;

const map = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


image1.src=images[imageIndex];
image1.addEventListener("load", (e)=> {
    canvas.width = image1.width;
    canvas.height = image1.height;
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(image1,0,0,canvas.width,canvas.height);
    let imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    let brightData = [];
    // for(let i = 0; i < numWorkers; i++){
    //     let worker = new Worker('./worker.js');
    //     worker.postMessage({first: true, index: i, testing: "Testing"});
    //     worker.onmessage = (event) => {
    //         if(event.data.first){
    //             console.log(event.data);
    //         } else {
    //             let index = event.data.index;
    //             let partial = event.data.partial;
    //             for(let j = 0; j < partial.length; j++){
    //                 let y = Math.floor(brightData.length/numWorkers);
    //                 let rowStart = index * y + j;
    //                 for(let k = 0; k < partial[j].length; k++){
    //                     brightData[rowStart][k] = partial[j][k];
    //                 }
    //             }
    //         }

    //     }
    //     workers.push(worker);
    // }
    
    
    for(let i = 0; i < canvas.height; i++){
        let row = [];
        for(let j = 0; j < canvas.width; j++){
            let bright = getBrightness(imageData.data[(i * 4 * imageData.width)+(j * 4)], imageData.data[(i * 4 * imageData.width)+(j * 4)+1], imageData.data[(i * 4 * imageData.width)+(j * 4)+2]);
            let color = "rgb(" + imageData.data[(i * 4 * imageData.width)+(j * 4)] + ", " + imageData.data[(i * 4 * imageData.width)+(j * 4)+1] + ", " + imageData.data[(i * 4 * imageData.width)+(j * 4)+2] + ")";
            let pixel = {brightness: bright,color: color};
            row.push(pixel);
        }
        brightData.push(row);
    }
    
    class Particle {
        constructor(){
            
            this.x = Math.random() * canvas.width;
            this.y = 0;//canvas.height;
            this.speed = 0;
            this.velocity = Math.random() * 0.4 * speedMultiplyer;
            this.size = Math.random() * partMult + 0.1;
            this.position1 = Math.floor(this.y/detail);
            this.position2 = Math.floor(this.x/detail);
            this.angle = 0;
        }
        update(){
            this.size = 1/(this.speed);
            if(this.size > 10){
                this.size = 10;
            }
            this.position1 = Math.floor(this.y/detail);
            this.position2 = Math.floor(this.x/detail);
            if(brightData[this.position1]){
                if(brightData[this.position1][this.position2]){
                    this.speed = brightData[this.position1][this.position2].brightness;
    
                }
            }
            this.angle += this.speed/20;
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement + Math.cos(this.angle) * 0.1;
            this.x += Math.cos(this.angle)/5;
            if(this.y >= canvas.height){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = "black";
            if(this.y > canvas.height - this.size * 6) ctx.globalAlpha = 0;
            if(brightData[this.position1]){
                if(brightData[this.position1][this.position2]){
                    let col = brightData[this.position1][this.position2].brightness*100;
                    if(col < 25){
                        col = 25;
                    }
                    //col = map(col,0,2.55,0,255);
                    //console.log(`hsl(${0,0,brightData[this.position1][this.position2].brightness})`);
                    ctx.fillStyle = `hsl(0,0%,${col*0.9}%)`;
                    //ctx.fillStyle = brightData[this.position1][this.position2].color;
                } else {
                    ctx.fillStyle = "white";
                }
            } else {
                ctx.fillStyle = "white";
            }


            ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
            ctx.fill();
    
        }
    }
    for(let i = 0; i < numParticles; i++){
        particles.push(new Particle());
    }
    function getBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }
    var delta = 0;
    var lastStamp = Date.now();
    function animate(timeStamp){
        delta = timeStamp - lastStamp;
        lastStamp = timeStamp;
        if(delta > 30000) image1.src = images[++imageIndex];
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 0.2;
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            ctx.globalAlpha = particles[i].speed * 0.3;
            particles[i].draw();
        }
    
        requestAnimationFrame(animate);
    }
    
    animate(0);
});




document.body.appendChild(canvas);