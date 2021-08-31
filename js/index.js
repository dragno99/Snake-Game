// Game constants and variable
let inputDir = {x: 0 , y: 0};

const foodSound = new Audio("https://github.com/dragno99/Snake-Game/tree/main/music/food.mp3");
const gameOverSound = new Audio("https://github.com/dragno99/Snake-Game/tree/main/music/gameover.mp3");
const moveSound = new Audio("https://github.com/dragno99/Snake-Game/tree/main/music/move.mp3");
const musicSound = new Audio("https://github.com/dragno99/Snake-Game/tree/main/music/music.mp3");
const speed = 5;
let isMusicPlaying = 0;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [
    {x : 13 , y : 15}
]
food = {x: 4 , y : 8}

/// Game Function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if you bump into yourself
    if(!(snake[0].x >0 && snake[0].x<=18 && snake[0].y>0 && snake[0].y<=18)){
        return true;
    }
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    return false;
}

function getRandomNumber(a , b){
    return a + Math.round(a + (b-a) * Math.random());
}
function updateScore(){
    gameScore.innerHTML = "Score: " + String(score);
    return;
}

function gameEngine(){
    // 1) update the snake
    if(isCollide(snakeArr)){
        isMusicPlaying = 0;
        musicSound.pause();
        gameOverSound.play();
        inputDir.x = 0;
        inputDir.y = 0;
        alert("Game over");
        snakeArr = [{x : 13 , y: 15}];
        score = 0;
        updateScore();
    }

    // if you have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x == food.x){
        foodSound.play();
        score++;
        updateScore();
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
        food = {x: getRandomNumber(2,16) , y: getRandomNumber(2,16)};
    }

    // moving the snake
    for(let i = snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // 2) Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //3 ) Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x : 0 , y : 0} // start the game
    if(!isMusicPlaying){
        isMusicPlaying = 1;
        musicSound.play();
    }
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = +1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;            
    }
})

