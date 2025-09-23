document.getElementById("nouvelle_partie").onclick = lancer();

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
lancer();



