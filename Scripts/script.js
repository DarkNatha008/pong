
/*------- Déclaration de variable -------*/


//canvas
let canvas = document.getElementById('jeu');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -400;
canvas.height = window.innerHeight -300 ;


// raquette
let gauche = document.getElementById('gauche');
let droit = document.getElementById('droit');
let raquetteX = canvas.width/2 -10/100*canvas.width  ;
//balle
let orientation_
let ball_x = canvas.width/2 -10/100*canvas.width
let ball_y = canvas.height*85/100
let vitesse = 1
let taille = canvas.height *5/100
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
    raquetteX = canvas.width/2 - (10/100)*canvas.width;
    ball_x= canvas.width/2;
    ball_y=canvas.height*85/100;

    orientation_ = Math.random()*360;

    boucle();
}





/*création de la raquette*/

function raquette(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(raquetteX, (90/100)*canvas.height, (20/100)*canvas.width, (2/100)*canvas.height);
}

/*création de la ball*/

ctx.fillStyle = 'rgba(73, 209, 250, 1)';
ctx.arc(ball_x,ball_y,taille,0,2*Math.PI)
ctx.fill();

function ball(){
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.arc(ball_x,ball_y,canvas.height *5/100,0,2*Math.PI);
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
    ctx.arc(ball_x,ball_y,canvas.height *5/100,0,2*Math.PI);
    ctx.fill();
}

function updateGame(){
    ball_x=ball_x+Math.sin(((Math.PI*2)/360)*orientation_)*vitesse
    ball_y=ball_y+Math.cos(((Math.PI*2)/360)*orientation_)*vitesse
    if(ball_x+taille>canvas.clientWidth){
        orientation_=-orientation_
    }
    if(ball_x-taille<0){
        orientation_=-orientation_
    }
    if(ball_y-taille<0){
        orientation_=180-orientation_
    }
    if(ball_y+taille>canvas.clientHeight){
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
            if(raquetteX +(20/100)*canvas.width < canvas.width) raquetteX += 20;
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
    if(raquetteX +(20/100)*canvas.width < canvas.width) raquetteX += 20;
    raquette();
    ball(); 
})

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth -400;
    canvas.height = window.innerHeight -300 ;
    raquette();
    ball();
})
/*------- fin du programme -------*/
