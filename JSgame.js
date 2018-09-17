// @ts-check


//false if game is ongoing
//true if game is ended/not started
var uLost = new Boolean;
var slowDownPowerUp = new Boolean;
var shootPowerUp = new Boolean;



class Ball {
    constructor(x, y, vy, h, w) {
        this.x = x;
        this.y = y;

        this.vy = vy;
        this.w = w;
        this.h = h;

        this.div = document.createElement("div");
        this.div.className = "ball";

        this.div.style.width = w + "px";
        this.div.style.height= h + "px";
    }

    render() {
        //render ball to new position
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    }

    //gives ball new position using ball.vy
    flytt() {

        //stops the balls if player lost
        if (uLost === true) return;

        this.y += this.vy;
    }
}

class Player {
    constructor(x, y, vx, w = 45, h = 80) {
        this.x = x;
        this.y = y
        this.vx = vx;
        this.w = w;
        this.h = h;
        
        
        this.div = document.createElement("div");
        this.div.className = "player";
    }                                           


    flyttPlayer() {

        this.x += this.vx;
    }

    renderPlayer() {
        //if true, player won't be given a new pos (stop)
        if (uLost === true) return;

        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px"; 
    }
}

class Coin {
    constructor(x, y, vy, h, w){
        
        this.x = x;
        this.y = y;
    
        this.vy = vy;
        this.w = w;
        this.h = h;
    
        this.div = document.createElement("div");
        this.div.className = "coin";

        this.div.style.width = w + "px";
        this.div.style.height= h + "px";
    }

    moveCoin(){

        if(uLost === true) return;
        
        this.y  += this.vy;
    }

    renderCoin(){

        if (uLost === true) return;

        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
       
        
    }
}

class Bullet{
    constructor(x, y, vy, h, w){
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.h = h;
        this.w = w;
        

        this.div = document.createElement("div");
        this.div.className = "bullet";

        this.div.style.width = w + "px";
        this.div.style.height= h + "px";
    }

    moveBullet(){
        
        this.y += this.vy;
    }

    renderBullet(){
        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
    }
}
class Heart{
    constructor(x, y, vy, h, w){
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.h = h;
        this.w = w;
        

        this.div = document.createElement("div");
        this.div.className = "heart";

        this.div.style.width = w + "px";
        this.div.style.height= h + "px";
    }

    moveHeart(){
       
        this.y += this.vy;
    }

    renderHeart(){

        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
    }
}



//runs when site is loaded
function setup() {
    let powerUpText = document.createElement("div");
    powerUpText.className = "powerUpText";


    //connecting html.elemnts to JS
    
    let divScore = document.getElementById("score");
    let divFinalScore = document.getElementById("finalScore");
    let divMain = document.getElementById("main");
    let divHighScore = document.getElementById("highScore");

    if (localStorage.getItem('player name') === null && localStorage.getItem('top score') === null){
        divHighScore.innerHTML = "";
    } else {
        divHighScore.innerHTML = localStorage.getItem('player name') + ": " +localStorage.getItem('top score');
    }
    
    let screenHeight = window.innerHeight;
    console.log(screenHeight);

    let divMainY = 0;
    let lifeInt = 1;
    var finalScoreInt =0;

    let playerInput = document.createElement("input");
    playerInput.className = "playerInput"     
    divMain.appendChild(playerInput);
    playerInput.hidden = true;

    let SaveHS = document.createElement("div");
    SaveHS.className = "SaveHS";
    divMain.appendChild(SaveHS);
    SaveHS.addEventListener("click", setHighScore);
    SaveHS.hidden = true;

    document.getElementById("main").style.marginTop = (-screenHeight/2) + "px";


    let divLife  = document.createElement("div")
    divMain.appendChild(divLife);
    divLife.className = "lifeScore";
    divLife.innerHTML = "lives: " + lifeInt;

    //creates returnbutton
    
    
        uLost = false;


        //creating arrays for balls and player
        let baller = [];
        let players = [];
        let coins = [];
        let hearts =[];
        let bullets= [];

        //sets score to 0 when btnStart is pressed
        let scoreInt = 0;


        //adds player when btnStart is pressed
        addPlayer();

        //adds new balls every 0.7s (changes after score == 10 in function score())
        var addBallInterval = setInterval(addNewBalls, 700)
        var difficulty = 0;

        setInterval(animations, 5);

        //updates score and difficulty every 0.2s
        setInterval(score, 200)

        setInterval(addCoins, 15000);
        
        setInterval(checkDifficulty, 170);

        setTimeout(addCoins, 2500);

        setInterval(addHearts, 9000);



        //updates score and difficulty
        function score() {

            if (uLost === true) return;

            //updating score only if uLost = false
            scoreInt += 1;
            divScore.innerHTML = "Score: " + scoreInt;
        }

        function checkDifficulty(){

            if (difficulty == 9 && slowDownPowerUp === false){
                clearInterval(addBallInterval);
                addNewBalls();
                return;
            }
            //updating difficulty
            if(slowDownPowerUp === true){
                return;
            } else if (scoreInt === 10) {
                difficulty = 0;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 450);
            } else if (scoreInt === 20) {
                difficulty = 1;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 425);
            } else if (scoreInt === 40) {
                difficulty = 2;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 400);
            } else if (scoreInt === 60) {
                difficulty = 3;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 325);
            } else if (scoreInt === 80) {
                difficulty = 4;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 300);
            }  else if (scoreInt === 100) {
                difficulty = 5;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 275);
            }   else if (scoreInt === 120) {
                difficulty = 6;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 250);
            }   else if (scoreInt === 140) {
                difficulty = 7;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 225);
            }   else if (scoreInt === 160) {
                difficulty = 8;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 200);
            }   else if (scoreInt > 180) {
                difficulty = 9;
            }

        }
        //adds new balls
        function addNewBalls() {

            if (uLost === true) return;

            //randomizing x-position of balls
            let x = Math.random() * 550;

            //spawn height
            let y = -64;

            //ball speed
            function powerUP (){
                if (slowDownPowerUp === true){
                    return 1.5;
                } else return 2.5;

            }

            let vy = powerUP();
           

            let h = Math.random() * (70-40) + 40;
            let w = h;

            //creates new ball using the values above
            let ball = new Ball(x, y, vy, h, w);

            //adds ball to divBoard
            divMain.appendChild(ball.div);

            //adds ball to array
            baller.push(ball);
            
            //renders the ball immediately
            ball.render();

        }

        function addCoins(){

            if (uLost === true) return;

            let x = Math.random() * 550;
            let y = -64;
            let vy = 2.5;
            let w = 40;
            let h = 40;
            let coin = new Coin(x, y, vy, w, h);
            divMain.appendChild(coin.div);
            coins.push(coin);
            coin.renderCoin();
        }

        function addHearts(){
            if (uLost === true) return;

            let x = Math.random() * 550;
            let y = -64;
            let vy = 2.5;
            let w = 40;
            let h = 40;
            let heart = new Heart(x, y, vy, w, h);
            divMain.appendChild(heart.div);
            hearts.push(heart);
            heart.renderHeart();
        }

        function animateHearts(){

            if (uLost === true) return;
            for (let j=0; j<players.length; j++){
                let player = players[j];
                for (let i=0; i<hearts.length; i++){
                    let heart = hearts[i];

                    if (heart.y > screenHeight){
                        hearts.splice(i, 1);
                        heart.div.remove();
                    }

                    if (slowDownPowerUp === true){
                        heart.vy = 1.5;
                    } else heart.vy = 2.5;
                    heart.renderHeart();
                    heart.moveHeart();
                    if (kollisjon(player, heart)){
                        console.log("HEART!");
                        hearts.splice(i, 1);
                        heart.div.remove();
                        if (lifeInt  !== 3){
                            lifeInt += 1;
                        }

                    
                        divLife.innerHTML = "lives: " + lifeInt;
                        
                    }
                }
            }
            

            
        }

        function spawnBullet(){
            let player = players[0];
            
            let x = player.x + (10);
            let y = player.y -30;
            let h= 40;
            let w=20;
            let vy = -2;

            let bullet = new Bullet(x, y, vy, h, w);
            divMain.appendChild(bullet.div);
            bullets.push(bullet);
            bullet.renderBullet();
        }

        function animations(){
            animering();
            animerPlayer();
            animateCoin();
            animateBullet();
            animateHearts();
        }
        
        //animates the balls and checks for collision (runs every 0.05s)
        function animering() {

            //selects every ball in the array baller[]
            for (let i = 0; i < baller.length; i++) {
                let ball = baller[i];


                //animating balls
                ball.flytt();
                ball.render();

                if (slowDownPowerUp === true){
                    ball.vy = 1.5;
                } else ball.vy = 2.5;

                if(ball.y > screenHeight + 50){
                    ball.div.remove();
                    baller.splice(i, 1);
                }
                
                

                //gets the values of the player
                let player = players[0];

                //runs if a collision is detected
                if (kollisjon(player, ball)) {
                    if (uLost === true)return;

                    if(uLost === false && lifeInt >=1){
                        lifeInt -=1;
                        baller.splice(i, 1);
                        divLife.innerHTML = "lives: " + lifeInt;
                        console.log("WHAT");
                    }


                    //changes uLost to true which turns off animations
                    if (uLost === false && lifeInt<1){
                        uLost = true;
                        player.div.style.backgroundImage = "url(pics/explosion.png)";
                        player.div.style.width = "100px";
                        player.div.style.height = "100px";

                        //displays final score
                        divFinalScore.innerHTML = "Final Score: " + scoreInt;  
                        divFinalScore.style.fontSize = "3em";
                        divScore.innerHTML = "";

                        //Set HS
                        
                        if (scoreInt> +localStorage.getItem('top score')){

                            playerInput.hidden = false;
                            playerInput.placeholder = "Name:"
                            SaveHS.hidden = false;
                            SaveHS.innerHTML = "Save High Score";
                            
                            


                        }
                        
                        
                        

                        //creates a restart button
                        let btnRestart = document.createElement("div");
                        btnRestart.className = "btnRestart";
                        btnRestart.innerHTML = "Restart";
                        divMain.appendChild(btnRestart);
                        btnRestart.addEventListener("click", reloadFunction);

                        baller.splice(i, 1);

                        console.log(screenHeight);

                        
                        
                        function reloadFunction(){
                            location.reload();
                        }

                        divLife.innerHTML = "";

                        return;
                    }

                    if(uLost === false && lifeInt >=1){
                        ball.div.remove();
                    }

                    
                    //stops collision
                    console.log("collision!")
                }
            }

            if (uLost === false && slowDownPowerUp === true){
                divMainY += .5;
                divMain.style.backgroundPositionY = divMainY + "px";
                return;
            } else if (uLost === false){
                divMainY += 1;
                divMain.style.backgroundPositionY = divMainY + "px";
            }
            
            
        }

        function setHighScore(){
            console.log(playerInput.value);
            localStorage.setItem('player name', playerInput.value);
            SaveHS.hidden = true;
            playerInput.hidden = true;

            localStorage.setItem('top score', scoreInt.toString());
            divHighScore.innerHTML = localStorage.getItem('player name') + ": " +localStorage.getItem('top score');
            
        }

        //adds new player (runs when btnStart is pressed)
        function addPlayer() {
            //gives the player a start position and speed
            let x = 284;
            let y = screenHeight -125;
            let vx = 0;

            //creats the player using the values above
            let player = new Player(x, y, vx);

            //adds the player to divMain
            divMain.appendChild(player.div);

            //adds player to the array players[]
            players.push(player);
            player.renderPlayer();
        }

        //runs flyttPlayer() and renderPlayer() and moves player if off screen
        function animerPlayer() {

            //gets the values of the player
            let player = players[0];

            //moves player on the other side if off screen
            if (player.x > 632) {
                player.x = -32;
            } else if (player.x < -32) {
                player.x = 632;
            }

            //runs flyttPlayer() and renderPlayer()
            player.flyttPlayer();
            player.renderPlayer();
        }

        function animateCoin(){

            if (uLost === true){
                powerUpText.innerHTML= "";
            }
            for (let i=0; i<coins.length; i++){
                let coin = coins[i];

                if (slowDownPowerUp === true){
                    coin.vy = 1.5
                }   else {
                    coin.vy = 2.5
                }

                if (coin.y>screenHeight){
                    coin.div.remove();
                    coins.splice(i, 1);
                }

                coin.renderCoin();
                coin.moveCoin();
                for (let j=0; j<baller.length; j++){
                    let ball = baller[j];
                    
                    let player = players[0];

                    if (slowDownPowerUp === false){
                        ball.vy = 2.5;
                    }
                
                    if (kollisjon(player, coin) === true && uLost === false){
                        coin.div.remove();   
                        coins.splice(i, 1);
                        coin.x = -100
                        coin.vy = 0;

                        powerUpText.className = "powerUpText";
                        divMain.appendChild(powerUpText);



                        let x = Math.random() * 100;

                        function powerUpFunc(){
                            slowDownPowerUp = false;
                            shootPowerUp = false;
                            powerUpText.innerHTML ="";
                        }
                        if (x<25){
                            slowDownPowerUp = true;
                            powerUpText.innerHTML= "POWER-UP: SLOW!";
                            clearInterval(addBallInterval);
                            addBallInterval = setInterval(addNewBalls, 600);
                            setTimeout(powerUpFunc, 6000);
                            console.log("slow down!");
                        } else if(x>25){
                            shootPowerUp = true;
                            powerUpText.innerHTML= "POWER-UP: SHOOT!";
                            setTimeout(powerUpFunc, 6000);
                            console.log("shoot!");
                        }
                        
                    } 

                }
            
            }

        }

        function animateBullet(){
            for (let i=0; i<bullets.length; i++){
                let bullet = bullets[i];

                if(uLost === true){
                    bullets.splice(i, 1);
                }

                if (bullet.y <0){
                    bullets.splice(i, 1);
                    bullet.div.remove();
                    return;
                } 
                for (let j=0; j<baller.length; j++){
                    let ball =baller[j];

                    if (kollisjon(bullet, ball) === true){
                        bullets.splice(i, 1);
                        bullet.div.remove();
                        baller.splice(j, 1);
                        ball.div.remove();
                        
                    
                    }
        

                }
                    bullet.renderBullet();
                    bullet.moveBullet();
                
            }
        }

        //runs checkKey if a key i pressed.
        document.onkeydown = checkKey;

        function checkKey(e) {

            e = e || window.event;


            //runs if the player pressed left arrow
            if (e.keyCode == '37') {
                
                //gets the value of the player
                let player = players[0];

                //changes the speed of the player
                player.vx = -2.5;
                if (slowDownPowerUp === true){
                    player.vx = -1.5;
                }
            }
            //runs if the player pressed right arrow
            else if (e.keyCode == '39') {

                //gets the value of the player
                let player = players[0];

                //changes the speed of the player
                player.vx = 2.5;
                if (slowDownPowerUp === true){
                    player.vx = 1.5;
                }
            }
            else if ((e.keyCode == "70" || e.keyCode == "32") && shootPowerUp === true && uLost ===false){
                
                spawnBullet();
            }
        }

        //return true if collison is found
        function kollisjon(a, b) {
            if (
               b.y + b.h > a.y + 10 && 
               b.x + b.w > a.x +20 && 
               b.x < a.x + a.w -15 && 
               b.y < a.y + a.h -25
            ) {
                

                return true;
                
            } else {
                return false;
            }
        }

        function movement(){

            
        }









    





}