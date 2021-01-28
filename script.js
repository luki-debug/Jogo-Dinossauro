const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var textScore = document.querySelector('.score');  

let isJumping = false;
let position = 0;
let score = 0;
textScore.innerHTML = '<h2>Score: '+score+'</h2>';

function handleKeyUp(event){
    if(event.keyCode == 32){
        if(!isJumping){
            jump();
            score += 100;
            textScore.innerHTML = '<h2>Score: '+score+'</h2>';
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval( () =>{
        if(position >= 150){
            clearInterval(upInterval);

            //descendo
            let dowInterval = setInterval( () =>{
                if(position > 0){
                position -= 20;

                dino.style.bottom = position + 'px';
                }else{
                    clearInterval(dowInterval);
                    isJumping = false;
                }
            },20);
        }else{            
        //subindo
        position += 20;

        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval =  setInterval( () =>{
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus)
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class = "game-over">Fim de Jogo</h1>';
            var textScore = document.createElement('div');
            textScore.innerHTML = '<h2 class="finalScore">Final Score: '+score+'</h2>';
            document.body.appendChild(textScore); 
        }else{
        cactusPosition -=10;
        cactus.style.left = cactusPosition +'px';
        }  
    },20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);