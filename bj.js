
function bj() {

    class Card {
        constructor(suit, rank, x, y) {
            this.suit = suit;
            this.rank = rank;
            this.x = x;
            this.y = y;

            switch (rank) {
                case "A":
                    this.value = "11";
                    break;
                case "K":
                    this.value = "10"
                    break;
                case "Q":
                    this.value = "10"
                    break;
                case "J":
                    this.value = "10";
                    break;
                default:
                    this.value = this.rank;
                    break;
            }
        }
        draw() {
            let img = document.createElement("img")
            img.src = "img/card" + this.suit + this.rank + ".png";
            c.drawImage(img, this.x, this.y, 140 / 2, 190 / 2);
        }
    }

    //links to html
    let canBj = document.getElementById("canBj");
    divSide = document.getElementById("divSide");
    c = canBj.getContext("2d");

    //fix size if resized
    resize();
    addEventListener("resize", resize);
    function resize() {
        canBj.height = innerHeight;
        canBj.width = innerWidth * 0.7;
        divSide.style.height = innerHeight + "px";
        divSide.style.width = innerWidth * 0.3;
    }

    //arrays
    let deck = [];
    playerHand = [];
    dealerHand = [];

    //booleans
    let first = true;
    inGame = false;
    playerTurn = true;

    let resultText = "";

    //create deck
    createDeck();
    function createDeck() {
        let suit = ["Spades", "Hearts", "Diamonds", "Clubs"]
        let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

        for (let i = 0; i < suit.length; i++) {
            let s = suit[i];
            for (let j = 0; j < rank.length; j++) {
                let r = rank[j];
                let card = new Card(s, r);
                deck.push(card);
            }
        }
    }

    //animation function
    animate();
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight)

        drawCards();

        drawText();

        drawButtons();

        checkIfFinished();
    }

    //draws card on canvas in animate func
    function drawCards() {

        for (let i = 0; i < playerHand.length; i++) {
            let card = playerHand[i];
            card.x = canBj.width / 2 - 100 + i * 40;
            card.y = 300;
            card.draw();
        }
        for (let i = 0; i < dealerHand.length; i++) {
            let card = dealerHand[i];
            card.x = canBj.width / 2 - 100 + i * 40;
            card.y = 150;
            card.draw();
        }
    }

    //draws text in animate func
    function drawText() {
        c.font = "10px Helvetica";
        c.fillStyle = "black";
        c.textAlign = "center";
        c.font = "15px Helvetica";
        c.fillText("Dealer: " + calcValue(dealerHand), canBj.width / 6, 200)
        c.fillText("Player: " + calcValue(playerHand), canBj.width / 6, 350)


        if (!inGame && !first) {
            c.font = "10px Helvetica";
            c.fillStyle = "black";
            c.textAlign = "center";
            c.font = "15px Helvetica";
            c.fillText(resultText, canBj.width / 2, 140);
            console.log(resultText)
        }
    }


    //draws buttons in animate func
    function drawButtons() {
        if (!inGame) {
            btnStart = new Button(canBj.width / 2 - 25, canBj.width / 2 + 25, 50, 100, "black", "start")
        }

        if (inGame) {
            btnHit = new Button(canBj.width / 2 - 100, canBj.width / 2 - 50, 430, 480, "black", "Hit")
            btnStand = new Button(canBj.width / 2 - 25, canBj.width / 2 + 25, 430, 480, "black", "Stand")
        }
    }


    //check if game is finsished in animate func
    function checkIfFinished() {
        if (Number(calcValue(playerHand)) > 21) {
            checkWinner();
            inGame = false;
        }

        if (!playerTurn && (Number(calcValue(dealerHand)) < 18 || calcValue(dealerHand).includes("/") )) {
            let card = pickRandomCard();
            dealerHand.push(card);
            if (calcValue(dealerHand) >= 17) {
                inGame = false;
                checkWinner();
            }
        }
    }

    /**
     * 
     * @param {array} hand Array containing all cards on one hand
     * @returns {String} returns value of String
     */
    function calcValue(hand) {
        let value = 0;
        let string = "";
        let hValue;

        hand.forEach(e => {
            string += e.value;
        });


        hand.forEach(e => {
            value += Number(e.value);
        });

        if (string.includes("11") && value < 21) {
            hValue = (value - 10) + "/" + value;
        } else if (string.includes("11") && value > 21) {
            hValue = value - 10;
        } else {
            hValue = value;
        }

        if (hValue == "11/21") {
            hValue = "21"
        }


        hValue = String(hValue)
        return hValue;
    }

    let mouseX = 0;
    let mouseY = 0;
    //mouseclick function
    addEventListener("click", mouseClick);
    function mouseClick(e) {
        mouseX = e.pageX - (innerWidth - canBj.width);
        mouseY = e.pageY - 175;

        if (btnStart.checkClick() && !inGame) {
            play()
        }
        if (btnHit.checkClick() && playerTurn) {
            let card = pickRandomCard();
            playerHand.push(card);

            if (Number(calcValue(playerHand)) > 21) {
                inGame = false;
                checkWinner();
            }
        }
        if (btnStand.checkClick()) {
            playerTurn = false;

        }
    }

    //runs when player hits Start
    function play() {
        inGame = true;
        playerTurn = true;
        first = false;

        //create a new, full deck
        deck = []
        createDeck();

        //empty hands
        playerHand = [];
        dealerHand = [];

        //give player 2 cards and dealer 1
        playerHand.push(pickRandomCard());
        dealerHand.push(pickRandomCard());
        playerHand.push(pickRandomCard());

        //check if BlackJack
        if (Number(calcValue(playerHand)) == 21 && Number((calcValue(dealerHand)) !== 10) && !calcValue(dealerHand).includes("/")) {
            inGame = false;
            resultText = "BlackJack"
            console.log("jau");
        }
    }


    //checks winner when game has ended
    function checkWinner() {
        let playerValue = calcValue(playerHand);
        let dealerValue = calcValue(dealerHand);

        if (playerValue.includes("/")) {
            playerValue = 0;
            playerHand.forEach(e => {
                playerValue += Number(e.value)
            });
        }
        if (dealerValue.includes("/")) {
            dealerValue = 0;
            dealerHand.forEach(e => {
                dealerValue += Number(e.value)
            });
        }

        if (Number(dealerValue) == 21 || (Number(dealerValue) > Number(playerValue) && Number(dealerValue) < 21) || Number(playerValue) > 21) {
            resultText = "Dealer Wins!"
        } else if (dealerValue == playerValue) {
            resultText = "Push!"
        } else {
            resultText = "You Win!"
        }
    }

    //returns a random card
    function pickRandomCard() {

        //selecting a random card in the deck
        let number = Math.floor(Math.random() * deck.length);
        let card = deck[number];

        //removes the chosen card from deck
        deck.splice(number, 1);

        //returns card
        return card;
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

