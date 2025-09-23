
let canvas = document.getElementById('jeu')
let ctx = canvas.getContext('2d')

let score = 0;



function lancer(){
    score=0;
    
    let orientation = Math.random()*360;
    let état="en cours";
    const timer = setInterval(() =>{
        score++;
        document.getElementById("score").textContent=score;
        console.log(score);
        if(état!="en cours"){
            clearInterval(timer);
        }
    },1000);
    

}

/*création de la raquette*/ 

ctx.fillStyle = '#ffffffff';
ctx.fillRect(150, 550, 100, 10);
ctx.fillStyle('#2fb951ff')


lancer();
document.getElementById("nouvelle_partie").onclick = lancer();



