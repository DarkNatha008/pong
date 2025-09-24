
let canvas = document.getElementById('jeu')
let ctx = canvas.getContext('2d')

let score = 0;

let état = "stop";

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

    let orientation = Math.random()*360;
    
}

/*création de la raquette*/ 

ctx.fillStyle = '#ffffffff';
ctx.fillRect(150, 550, 100, 10);
ctx.fillStyle = 'rgba(73, 209, 250, 1)';
ctx.arc(200,535,15,0,2*Math.PI)
ctx.fill();



