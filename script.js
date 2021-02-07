const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var textScore = document.querySelector('.score');
//const audio = document.querySelector('.audioThema');
var isSound = false;
  
let isJumping = false;
let position = 110;
let score = 0;

//audio.play();
updateScore();

function handleKeyUp(event){
    if(event.keyCode == 32){
        if(!isJumping){
            jump();                      
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval( () =>{
        if(position >= 370){
            clearInterval(upInterval);

            //descendo
            let dowInterval = setInterval( () =>{
                if(position > 110){
                position -= 20;

                dino.style.bottom = position + 'px';
                }else{
                    clearInterval(dowInterval);
                    isJumping = false;    
                }
            },20);
        }else{            
        //subindo
        var divAudioJump = document.createElement('div');
        divAudioJump.innerHTML = '<audio class="audioJump" src="jump.wav"></audio>';
        document.body.appendChild(divAudioJump);
        var audioJump = document.querySelector('.audioJump');
        audioJump.play();
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
        if(cactusPosition < 0){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            score += 100;
        }else if(cactusPosition > 0 && cactusPosition < 159 && position < 210){
            //Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class = "game-over">Fim de Jogo</h1>';
            document.body.className = 'bodyEnd';
            var textScore = document.createElement('div');
            textScore.innerHTML = '<h2 class="finalScore">Pontuação: '+score+'</h2>';
            document.body.appendChild(textScore);
            var divAudioOver = document.createElement('div');
            divAudioOver.innerHTML = '<audio src="GameOver.wav"></audio>';
            document.body.appendChild(divAudioOver);
            var audioOver = document.querySelector('audio');
            if(isSound == false){
                audioOver.play();
                isSound = true;
            }else{
                audioOver.pause();
            }
        }else{
        cactusPosition -=10;
        cactus.style.left = cactusPosition +'px';
        }  
    },20);

    setTimeout(createCactus, randomTime);
}

function updateScore(){
    textScore.innerHTML = '<h2 class="score">Score: '+score+'</h2>';
    setTimeout(updateScore, 100);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);