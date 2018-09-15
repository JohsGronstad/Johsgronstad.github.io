//@ts-check

function highScores(){
    let divHighScore = document.getElementById("highScore");

    var score = 10;
    localStorage.setItem('score', score.toString());
}