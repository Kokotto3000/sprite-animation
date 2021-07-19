/** @type {HTMLCanvasElement} */

playerState= 'idle';
const CONTROLS= document.getElementById('animations');
CONTROLS.addEventListener('change', e => {
    playerState= e.target.value;
});

const CANVAS= document.getElementById('canvas-1');
const CTX= CANVAS.getContext('2d');
const canvasWidth= CANVAS.width= 600;
const canvasHeight= CANVAS.height= 600;

const playerImage= new Image();
playerImage.src= '../img/shadow_dog.png';

const spriteWidth= 575; //6876 / 12;
const spriteHeight= 5230 /10;
// let frameX= 0;
// let frameY= 0;
let gameFrame= 0;
const staggerFrames= 5;
const spriteAnimations= [];
const animationStates= [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'hit',
        frames: 4
    }
];

//state représente chaque objet de animationStates
animationStates.forEach((state, index)=>{
    let frames= {
        loc: [], 
    }
    for(let i=0; i < state.frames; i++){
        let positionX= i * spriteWidth;
        let positionY= index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name]= frames;
});

//console.log(spriteAnimations);

function animate(){
    CTX.clearRect(0, 0, canvasWidth, canvasHeight);
    // CTX.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    let position= Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;//6; //pour la première ligne
    let frameX= spriteWidth * position;
    let frameY= spriteAnimations[playerState].loc[position].y;
    CTX.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // if(gameFrame % staggerFrames === 0) frameX < 6 ? frameX++ : frameX= 0;

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();