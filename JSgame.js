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
        if (this.y > 800){
            this.div.remove();
            return;
        };
        this.y += this.vy;
    }

    renderHeart(){
        if(this.y >800)return;
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
    let divMainY = 0;
    let lifeInt = 1;
    let movementInt=0;


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

            if (difficulty == 5 && slowDownPowerUp === false){
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
                addBallInterval = setInterval(addNewBalls, 400);
            } else if (scoreInt === 40) {
                difficulty = 2;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 320);
            } else if (scoreInt === 60) {
                difficulty = 3;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 250);
            } else if (scoreInt === 80) {
                difficulty = 4;
                clearInterval(addBallInterval);
                addBallInterval = setInterval(addNewBalls, 200);
            } else if (scoreInt > 100) {
                difficulty = 5;
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

                if(ball.y > 800){
                    ball.div.remove();
                    baller.splice(i, 1);
                }
                
                

                //gets the values of the player
                let player = players[0];

                //runs if a collision is detected
                if (kollisjon(player, ball)) {
                    if (uLost === true)return;

                    lifeInt -=1;
                    baller.splice(i, 1);
                    ball.div.remove();
                    divLife.innerHTML = "lives: " + lifeInt;
                    //changes uLost to true which turns off animations
                    if (uLost === false && lifeInt<1){
                        uLost = true;
                        player.div.style.backgroundImage = "url(pics/explosion2.png)";
                        player.div.style.width = "100px";
                        player.div.style.height = "100px";

                        //displays final score
                        divFinalScore.innerHTML = "Final Score: " + scoreInt;  
                        divFinalScore.style.fontSize = "3em";
                        divScore.innerHTML = "";

                        //creates a restart button
                        let btnRestart = document.createElement("div");
                        btnRestart.className = "btnRestart";
                        btnRestart.innerHTML = "Restart";
                        divMain.appendChild(btnRestart);
                        btnRestart.addEventListener("click", reloadFunction);
                        function reloadFunction(){
                            location.reload();
                        }

                        divLife.innerHTML = "";

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

        //adds new player (runs when btnStart is pressed)
        function addPlayer() {
            //gives the player a start position and speed
            let x = 284;
            let y = 675;
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

                if (coin.y>800){
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
                        if (x<50){
                            slowDownPowerUp = true;
                            powerUpText.innerHTML= "POWER-UP: SLOW!";
                            clearInterval(addBallInterval);
                            addBallInterval = setInterval(addNewBalls, 600);
                            setTimeout(powerUpFunc, 6000);
                            console.log("slow down!");
                        } else if(x>50){
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

                if (bullet.y <0){
                    bullets.splice(i, 1);
                    bullet.div.remove();
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
                player.vx = -3;
                if (slowDownPowerUp === true){
                    player.vx = -2;
                }
            }
            //runs if the player pressed right arrow
            else if (e.keyCode == '39') {

                //gets the value of the player
                let player = players[0];

                //changes the speed of the player
                player.vx = 3;
                if (slowDownPowerUp === true){
                    player.vx = 2;
                }
            }
            else if (e.keyCode == "70" && shootPowerUp === true && uLost ===false){
                
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