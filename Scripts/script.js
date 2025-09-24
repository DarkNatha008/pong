
let canvas = document.getElementById('jeu')
let ctx = canvas.getContext('2d')

let frame_requester;

let score = 0;

let état = "stop";

/*coordonnées et variables de la balle*/
let orientation_
let ball_x = 200
let ball_y = 535
let vitesse = 1

const timer = setInterval(() =>{
    if(état=="en cours"){
        score = score+0.1;
        let texte = score.toFixed(0);
        document.getElementById("score").textContent="Score : "+texte;
    }
    
    
        
},100);

document.getElementById("nouvelle_partie").onclick = function lancer(){
    score=0;

    état="en cours"

    ball_x=200
    ball_y=535

    orientation_ = Math.random()*360;

    boucle()
    
}

/*création de la raquette*/ 

ctx.fillStyle = '#ffffffff';
ctx.fillRect(150, 550, 100, 10);
ctx.fillStyle = 'rgba(73, 209, 250, 1)';
ctx.arc(ball_x,ball_y,15,0,2*Math.PI)
ctx.fill();




function boucle(){
    cancelAnimationFrame(frame_requester)
    updateGame()
    updateFrame()
    frame_requester=requestAnimationFrame(boucle)
}

function updateFrame(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(150, 550, 100, 10);
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.beginPath()
    ctx.arc(ball_x,ball_y,15,0,2*Math.PI)
    ctx.fill();
    console.log(canvas.width)
}

function updateGame(){
    ball_x=ball_x+Math.sin(orientation_)*vitesse
    ball_y=ball_y+Math.cos(orientation_)*vitesse
}