
/*------- Déclaration de variable -------*/

//canvas
let canvas = document.getElementById('jeu');
let ctx = canvas.getContext('2d');
// raquette
let gauche = document.getElementById('gauche');
let droit = document.getElementById('droit');
let raquetteX = 150;
let tailleX_raquette = (25/100)*canvas.width
let tailleY_raquette = (2/100)*canvas.width

//balle
let orientation_
let ball_x = 200
let ball_y = 535
let vitesse = 1
let taille_ball = 15
//jeu
let frame_requester;
let score = 0;
let état = "stop";



//interval de calcul de score
const timer = setInterval(() =>{
    if(état=="en cours"){
        score = score+0.1;
        let texte = score.toFixed(0);
        document.getElementById("score").textContent="Score : "+texte;
    }     
},100);

/*------- fin de déclaration de variable -------*/


/*------- Déclaration de fonction -------*/

document.getElementById("nouvelle_partie").onclick = function lancer(){
    score=0;

    état="en cours";
    raquetteX = canvas.width/2 - (12.5/100)*canvas.width;
    ball_x=200;
    ball_y=535;

    orientation_ = Math.random()*360;

    boucle();
}


/*création de la raquette*/


ctx.fillStyle = '#ffffffff';
ctx.fillRect(raquetteX, (140/100)*canvas.width, tailleX_raquette, tailleY_raquette);


function raquette(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(raquetteX, (140/100)*canvas.width, tailleX_raquette, tailleY_raquette);
}

/*création de la ball*/

ctx.fillStyle = 'rgba(73, 209, 250, 1)';
ctx.arc(ball_x,ball_y,taille_ball,0,2*Math.PI)
ctx.fill();

function ball(){
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.arc(ball_x,ball_y,15,0,2*Math.PI);
    ctx.fill();
}

function boucle(){
    cancelAnimationFrame(frame_requester);
    updateGame();
    updateFrame();
    frame_requester=requestAnimationFrame(boucle);
}

function updateFrame(){
    raquette();
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.beginPath();
    ctx.arc(ball_x,ball_y,15,0,2*Math.PI);
    ctx.fill();
}

function updateGame(){
    ball_x=ball_x+Math.sin(((Math.PI*2)/360)*orientation_)*vitesse
    ball_y=ball_y+Math.cos(((Math.PI*2)/360)*orientation_)*vitesse
    if(ball_x+taille_ball>canvas.clientWidth){
        orientation_=-orientation_
    }
    if(ball_x-taille_ball<0){
        orientation_=-orientation_
    }
    if(ball_y-taille_ball<0){
        orientation_=180-orientation_
    }
    if(ball_y+taille_ball>(140/100)*canvas.width && ball_y+taille_ball<(140/100)*canvas.width+tailleY_raquette
        && ball_x-taille_ball>raquetteX && ball_x+taille_ball<raquetteX+tailleX_raquette
    ){
        orientation_=180-orientation_
    }
}


/*------- fin de Déclaration de fonction -------*/


/*------- Début du programme -------*/

raquette();

ball();

/*controle clavier de la raquette*/

document.addEventListener("keydown", (e)=>{
    switch (e.key){
        case "ArrowLeft":
            if(raquetteX>0) raquetteX -= 20;
            break;
        case "ArrowRight":
            if(raquetteX +(25/100)*canvas.width < canvas.width) raquetteX += 20;
            break;
        default:
            break;
    }
    raquette();
    ball();
})
/* utilise le bouton gauche pour déplacer la raquette */

gauche.addEventListener("click", ()=>{
    
            if(raquetteX>0) raquetteX -= 20;
    raquette();
    ball(); 
})

/* utilise le bouton droit pour déplacer la raquette */

droit.addEventListener("click", ()=>{
    if(raquetteX +(25/100)*canvas.width < canvas.width) raquetteX += 20;
    raquette();
    ball(); 
})
/*------- fin du programme -------*/
