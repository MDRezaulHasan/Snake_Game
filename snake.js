const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unity
const box = 30;
//load image from images folder
const ground = new Image();
ground.src = "images/ground.jpg";

const foodImg = new Image();
foodImg.src = "images/trsApple.png";

//Create Snake
let snake = [];
//for(let j=0;j<)
snake[0] = {
    x : 9*box,
    y : 10*box
}


// create food
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box,
    y : Math.floor(Math.random() * 15 + 3) * box,
}
// create score 
let score = 0;

//Control Snake
let d;
document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }
}
//check collision function
function collision(head,array){
    for(let i=0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;

}
// draw every thing to the canvas
function draw(){
    ctx.drawImage(ground,0,0);
    for( let i= 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;   

    //if the snake eat food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box,
        }
        // we do not remove the tail

    }else{
        //remove the tail
        snake.pop();
    }
   
    

    //which direction
    if( d == "LEFT" ) snakeX-=box;
    if( d == "UP" ) snakeY-=box;
    if( d == "RIGHT" ) snakeX+=box;
    if( d == "DOWN" ) snakeY+=box;

     //add newHead
     let newHead = {
        x : snakeX,
         y : snakeY
    }

     //game over
    if(snakeX < box|| snakeX > 19 * box || snakeY < box||snakeY > 19 * box|| collision(newHead,snake)){
        clearInterval(game);
    }
   
    snake.unshift(newHead);

    

    //For showing Score
    ctx.fillStyle = "white";
    ctx.font = "45px Change one";
    ctx.fillText(score, 2*box, 1.6*box);

}
//call draw function every 100 ms
let game = setInterval(draw,100);
