const player = document.getElementById('hero')
const enemy = document.getElementById('enemy')
const pipeUp = document.getElementById('pipeUp')
const scoreBoard = document.getElementById('score')
let score = 0
let distance = 0
let velocity = 0
let isPlayerStuck = false
let enemyX = 758
let enemySpeed = 2
let gapTop = 0
let pipeTop = 0
let enemy_distance = 309

function changecolour()
{
    player.style.backgroundColor = "blue";
    velocity = -4; // BUG FIX: -6 was too fast for your 20ms interval
    player.style.top = distance + "px";
}

function applyGravity()
{
    velocity = velocity + 0.15
    distance = distance + velocity
    if(distance >= 358){
        // BUG FIX: Removed duplicate gameOver call to prevent double alerts
        isPlayerStuck = true;
        gameOver();
    }
    player.style.top = distance + "px";
    if(distance <= 0){
        gameOver();
    }
}

function enemyMovement()
{
    enemyX = enemyX - enemySpeed
    if(enemyX <= -50){
        enemyX = 758
        score ++;
        scoreBoard.innerText = "Score: " + score;
        enemySpeed = enemySpeed + 0.5; // BUG FIX: +2 made it too fast to play
        gapTop = Math.floor(Math.random() *150) + 1;
        enemy.style.height = gapTop + "px";
        pipeTop = Math.floor(Math.random() *150) + 1;
        pipeUp.style.height = pipeTop + "px";
        enemy_distance = 359 - gapTop
    }
    
    enemy.style.left = enemyX + "px";
    pipeUp.style.left = enemyX + "px";
    
    // BUG FIX: Added "enemyX >= 0" so the collision stays active while pipe passes player
    if((enemyX <= 58 && enemyX >= 0) && (distance >= enemy_distance || distance <= pipeTop)){
        gameOver()
    }
}

function gameOver(){
        document.removeEventListener('click', changecolour)
        clearInterval(enemyMoves)
        clearInterval(gameTime)
        player.style.top = distance + "px";
        alert("Game Over!");
        location.reload(); // BUG FIX: Essential to reset the game state
}

document.addEventListener('click', changecolour)
let gameTime = setInterval(applyGravity, 20)
let enemyMoves = setInterval(enemyMovement, 20)