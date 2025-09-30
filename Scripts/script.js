/*--------- OS -----------*/
let isMobile=false;
if(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    isMobile=true
    let conteneur_des_boutons = document.getElementById("conteneur_des_boutons")
    conteneur_des_boutons.style.transform = "scale(3)"

}



/*------- Déclaration de variable -------*/


//canvas
let canvas = document.getElementById('jeu');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -400;
canvas.height = window.innerHeight -300 ;

// raquette
let gauche = document.getElementById('gauche');
let droit = document.getElementById('droit');


let right_down = false
let left_down = false

let frame_dernier_rebond_raquette = 30

//balle
let orientation_

let vitesse_initiale = 1
let vitesse_max = vitesse_initiale * 5
let vitesse = vitesse_initiale


let raquetteX = canvas.width/2 -5/100*canvas.width ;
let raquetteY = canvas.height*90/100
let epaisseurRaquette = (2/100)*canvas.height;
let longueurRaquette = (10/100)*canvas.width;
//balle

let ball_x = canvas.width/2
let ball_y = canvas.height*80/100

let taille_ball = canvas.width *1/100

//jeu
let frame_requester;
let score = 0;
let état = "stop";
let perdu = false;



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

    vitesse=vitesse_initiale
    état="en cours";

    perdu=false;
    raquetteX = canvas.width/2 - (5/100)*canvas.width;
    ball_x= canvas.width/2;
    ball_y=canvas.height*85/100;


    orientation_ = Math.random()*360;

    boucle();
}





/*création de la raquette*/



function raquette(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = '#ffffffff';
    ctx.fillRect(raquetteX, raquetteY, longueurRaquette, epaisseurRaquette);

}

/*création de la ball*/



function ball(){
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.arc(ball_x,ball_y,taille_ball,0,2*Math.PI);
    ctx.fill();
}

function boucle(){
    cancelAnimationFrame(frame_requester);
    if(état=="en cours"){
        updateGame();
        update_raquette();
        updateFrame();
    }
    
    
    /*écrire "Perdu" si c'est perdu */
    if(perdu){
        ctx.fillStyle = 'red';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Perdu', canvas.width / 2, canvas.height / 2);
    }
    
    frame_requester=requestAnimationFrame(boucle);
}

function updateFrame(){
    frame_dernier_rebond_raquette++
    raquette();
    ctx.fillStyle = 'rgba(73, 209, 250, 1)';
    ctx.beginPath();
    ctx.arc(ball_x,ball_y,taille_ball,0,2*Math.PI);
    ctx.fill();
}

function updateGame(){
    ball_x=ball_x+Math.sin(((Math.PI*2)/360)*orientation_)*(vitesse*canvas.width/400)
    ball_y=ball_y+Math.cos(((Math.PI*2)/360)*orientation_)*(vitesse*canvas.height/300)
    if(ball_x+taille_ball>canvas.clientWidth){
        orientation_=-orientation_
        augmenter_vitesse()
    }
  
    else if(ball_x-taille_ball<0){
        orientation_=-orientation_
        augmenter_vitesse()
    }

    else if(ball_y-taille_ball<0){
        orientation_=180-orientation_
        augmenter_vitesse()
    }

    if(ball_y +taille_ball >= raquetteY
        && ball_x +1/2*taille_ball > raquetteX && ball_x -1/2*taille_ball < raquetteX  +longueurRaquette
        && frame_dernier_rebond_raquette>=30
    ){
        augmenter_vitesse()
        frame_dernier_rebond_raquette=0
        orientation_=180-orientation_
    }
    else if(ball_y+taille_ball>canvas.clientHeight){
        orientation_=180-orientation_
        perdu=true;
        état="stop"
        
    }

    
   
}

/* augmentez la vitesse de la balle jusqu'à 5 fois la vitesse initiale */
function augmenter_vitesse(){
    if(vitesse<vitesse_max){
        vitesse+=0.1
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
            left_down=true
            break;
        case "ArrowRight":
            right_down=true
            break;
        default:
            break;
    }
})

document.addEventListener("keyup", (e)=>{
    switch (e.key){
        case "ArrowLeft":
            left_down=false
            ball();
            break;
        case "ArrowRight":
            right_down=false
            ball();
            break;
        default:
            break;
    }
})

function update_raquette(){
    if(left_down==true && raquetteX>0)raquetteX -= 10
    if(right_down==true && raquetteX+longueurRaquette < canvas.width)raquetteX += 10

}

/* utilise le bouton gauche pour déplacer la raquette */
if(isMobile){
    gauche.addEventListener("touchstart", ()=>{
        left_down=true
    })
    
    gauche.addEventListener("touchend", ()=>{
        left_down=false
    })
} else {
    gauche.addEventListener("mousedown", ()=>{
        left_down=true
    })
    gauche.addEventListener("mouseup", ()=>{
        left_down=false
    })
}

/* utilise le bouton droit pour déplacer la raquette */

if(isMobile){
    droit.addEventListener("touchstart", ()=>{
        right_down=true
    })
    
    droit.addEventListener("touchend", ()=>{
        right_down=false
    })
} else {
    droit.addEventListener("mousedown", ()=>{
        right_down=true
    })
    droit.addEventListener("mouseup", ()=>{
        right_down=false
    })
}


window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth -400;
    canvas.height = window.innerHeight -300 ;
    location.reload();
    
})

/*------- fin du programme -------*/
