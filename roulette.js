

function roulette() {

    //class for box
    class Box {
        constructor(x, y, color, dx, number) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.color = color;
            this.number = number
        }

        draw() {

            //draws box
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, 50, 50);

            //draw text inside box
            c.font = "15px Helvetica";
            c.fillStyle = "white"
            c.textAlign = "center";
            c.fillText(String(this.number), this.x + 25, this.y + 28)
        }

        update() {

            if (this.dx <= 0) {
                this.dx = 0;

                //checks winner one time after the spin stop
                if (spin) {
                    checkColor();
                }
                spin = false;
                return;
            } else {
                this.dx -= 0.1;
            }
            this.x += this.dx
            this.draw();

        }
    }

    //Connecting elements from html to JS 
    let divSide = document.getElementById("divSide");
    let canRoulette = document.getElementById("canRoulette")
    let inpAmount = document.getElementById("inpAmount");
    let preResults = document.getElementById("preResults")

    let c = canRoulette.getContext("2d");

    //arrrays
    let boxArray = []
    let winnersArray = [];

    //mouse position
    let mouseX = 0;
    let mouseY = 0;

    //
    let bank = Number(localStorage.getItem("bank"));
    let betColor = ""
    let betAmount = 0;


    //boolean
    let spin = false;

    //fix size if resized
    resize();
    addEventListener("resize", resize);
    function resize() {
        canRoulette.height = innerHeight;
        canRoulette.width = innerWidth * 0.7;
        divSide.style.height = innerHeight + "px";
        inpAmount.style.left = innerWidth - canRoulette.width / 2 - 100 + "px";
        preResults.style.left = (innerWidth - canRoulette.width) + canRoulette.width / 8 + "px";

    }

    //draws the boxes at the start
    makeBox();
    function makeBox() {

        //min speed lands at 7 and max speed lands at green to ensure  the wheel is randomized
        let dx = (Math.random() * 24 + 25);

        let a = 1;
        for (let i = 0; i < 300; i++) {

            let color = "";
            let x = -13810 + i * 50;
            let y = 150;

            let number = 0;

            if ((i % 15) % 2 == 0 && (i % 15 !== 0)) {
                color = "red";
                number = a;
                a++;
                if (a == 8) {
                    a = 1;
                }
            }

            if ((i % 15) % 2 !== 0 && (i % 15 !== 0)) {
                color = "black";
                number = 15 - a;
            }


            if (i % 15 == 0) {
                color = "green";
                number = 0;
            }

            let box = new Box(x, y, color, dx, number)
            boxArray.push(box);
            box.update();
        }
    }

    //animation function
    animate();
    function animate() {


        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight)

        if (spin) {
            boxArray.forEach(e => {
                e.update();
                if (e.x > 1000) {
                    boxArray.pop();
                }
            });
        }

        localStorage.setItem("bank", bank);

        if (winnersArray.length > 10) {
            winnersArray.shift();
        }

        drawPreResults();

        boxArray.forEach(e => {
            e.draw()
        });

        c.fillStyle = "#f1f1f1";
        c.fillRect(0, 150, canRoulette.width / 8, 50)
        c.fillRect(canRoulette.width - canRoulette.width / 8, 150, canRoulette.width / 8, 50)


        // (x, y, top, bottom, color, text)
        btnRed = new Button((canRoulette.width / 2) - 100, (canRoulette.width / 2) - 50, 300, 350, "red", "2x");
        btnBlack = new Button((canRoulette.width / 2) + 50, (canRoulette.width / 2) + 100, 300, 350, "black", "2x");
        btnGreen = new Button((canRoulette.width / 2) - 25, (canRoulette.width / 2) + 25, 300, 350, "green", "14x")




        c.beginPath();
        c.fillStyle = "#f1f1f1";
        c.moveTo(500 - 10, 145);
        c.lineTo(500, 160);
        c.lineTo(500 + 10, 145);
        c.fill();
        c.closePath();

        c.fillStyle = "black";
        c.textAlign = "center";
        c.font = "15px Helvetica";
        c.fillText("Bank Account: " + bank + "kr", 100, 30);


    }

    //checks winner after a spin
    function checkColor() {

        boxArray.forEach(e => {
            if (e.x < 500 && e.x > 500 - 50) {

                if (e.color == betColor) {
                    if (betColor == "green") {
                        bank += (betAmount * 14);
                    }
                    else bank += betAmount * 2;
                }
                winnersArray.push(e);
            }
        });


    }

    //draws previous results
    function drawPreResults() {
        for (let i = 0; i < winnersArray.length; i++) {

            let box = winnersArray[i];

            //color and position of circle
            c.fillStyle = box.color;
            let x = canRoulette.width / 8 + 110 + (winnersArray.length - i) * 35
            let y = 220;

            //draw circle
            c.beginPath()
            c.arc(x, y, 15, 0, 2 * Math.PI)
            c.fill()
            c.closePath();

            //draw text inside circle
            c.font = "10px Helvetica";
            c.fillStyle = "white"
            c.textAlign = "center";
            c.fillText(String(box.number), x, y + 3)

        }

    }

    //mouseclick function
    addEventListener("click", mouseClick);
    function mouseClick(e) {
        mouseX = e.pageX - (innerWidth - canRoulette.width);
        mouseY = e.pageY - 175;
        spinAndSetBet();
 

    }

    //function on mouseclick
    function spinAndSetBet(){
        if(0 >=Math.floor(inpAmount.value) || inpAmount.value> bank){
            console.log("return");
            return;
        }
        if (btnRed.checkClick() && !spin) {
            setBet("red");
        }
        if (btnBlack.checkClick() && !spin) {
            setBet("black");
        }
        if (btnGreen.checkClick() && !spin) {
            setBet("green");
        }


        //The wheel will start spinning again if a button is pressed and the wheel is not spinnig
        if ((btnRed.checkClick() || btnBlack.checkClick() || btnGreen.checkClick()) && !spin) {
            reset();
        }
    }

    //new spin
    function reset() {
        boxArray = [];
        spin = true;
        makeBox();
    }

    function setBet(color) {
        

        betAmount = Math.floor(inpAmount.value);
        bank -= betAmount;
        betColor = color;
    }


    //shortcut to make a rectangular button with color and text in canvas
    function Button(xL, xR, yT, yB, color, text) {
        this.xLeft = xL;
        this.xRight = xR;
        this.yTop = yT;
        this.yBottom = yB;
        this.color = color;
        this.w = this.xRight - this.xLeft;
        this.h = this.yBottom - this.yTop;
        this.text = text;

        c.fillStyle = color;
        c.fillRect(this.xLeft, this.yTop, this.w, this.h)

        c.font = "15px Helvetica";
        c.fillStyle = "white"
        c.textAlign = "center";
        c.fillText(this.text, this.xLeft + this.w / 2, this.yTop + this.h / 2 + 4)

        this.checkClick = function () {

            if (
                this.xLeft <= mouseX &&
                mouseX <= this.xRight &&
                this.yTop <= mouseY &&
                mouseY <= this.yBottom
            ) return true;
        }
    }

}

