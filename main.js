import Particle from './Particle.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const numParticles = 5000;
const image1 = new Image();
const particles = [];

const maxFrameCount = 1800;


image1.src='test.jpg';
image1.addEventListener("load", (e)=> {
    canvas.width = image1.width;
    canvas.height = image1.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(image1,0,0,canvas.width,canvas.height);
    let imageData = ctx.getImageData(0,0,canvas.width, canvas.height).data;
    
    
    let brightData = [];
    let grayScale = [];
    
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < canvas.height; i++){
        let row = [];
        for(let j = 0; j < canvas.width; j++){
            let bright = getBrightness(imageData[(i * 4 * canvas.width)+(j * 4)], imageData[(i * 4 * canvas.width)+(j * 4)+1], imageData[(i * 4 * canvas.width)+(j * 4)+2]);
            row.push(bright);
        }
        brightData.push(row);
    }
    console.log(brightData.length, brightData[0].length);
    for(let i = 0; i < brightData.length; i++){
        for(let j = 0; j < brightData[i].length; j++){
            try{
                let k = brightData[i][j];
            }
            catch (e){
                console.log(i, j);
                throw e;
            }
        }
    }
    for(let i = 0; i < numParticles; i++){
        particles.push(new Particle(canvas.width, canvas.height, brightData, numParticles));
    }
    animate();
});

function getBrightness(red, green, blue){
    return Math.sqrt(
        (red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114
    )/100;
}
let frameCount = 0;
let waiting = 0;
let particlesAtEnd = 0;
function animate(){
    frameCount++;
    if(frameCount > maxFrameCount){
        frameCount = maxFrameCount;
    }
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';

    for(let i = 0; i < particles.length; i++){
            particles[i].waiting = (frameCount === maxFrameCount);
            particles[i].update();
            particles[i].draw(ctx);
            if(particles[i].y >= canvas.height && particles[i].waiting && !particles[i].counted){
                particlesAtEnd++;
                particles[i].counted = true;
                particles[i].ended = true;
            }
    }
    
    
    if(frameCount === maxFrameCount){
        console.log('frameCount tripped', particlesAtEnd);
        
        //frameCount = 0;

        if(particlesAtEnd >= particles.length){
            frameCount = 0;
            particlesAtEnd = 0;
            for(let i = 0; i < particles.length; i++){
                particles[i].reset();
            }
        }
    }



    requestAnimationFrame(animate);
}


document.body.appendChild(canvas);