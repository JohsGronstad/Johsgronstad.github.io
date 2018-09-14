//@ts-check

function setup(){

    let divMain = document.getElementById("main");
    var btnStart = document.getElementById("start");

    let ScreenHeight = window.innerHeight;
    divMain.style.height = ScreenHeight + "px";

    let divMenuTitle = document.getElementById("menuTitle");
    divMenuTitle.innerHTML = "Meteor Dodge!";

    let tblControlTable = document.getElementById("controlTable");
    tblControlTable.hidden = true;

    let divControls = document.getElementById("controls");

    divControls.addEventListener("click", onOptionsClick);

    function optionsToMainMenu(){
        tblControlTable.hidden = true;
        btnStart.hidden = false;
        divControls.innerHTML = "CONTROLS";
        divControls.removeEventListener("click", optionsToMainMenu);
        divControls.addEventListener("click", onOptionsClick);
        divControls.style.top = 500 + "px";
        divControls.style.left = 232 + "px";

    }

    function onOptionsClick(){
        btnStart.hidden = true;
        tblControlTable.hidden = false;
        divControls.innerHTML = "BACK";
        divControls.style.left = 265 + "px";
        divControls.removeEventListener("click", onOptionsClick);
        divControls.addEventListener("click", optionsToMainMenu);
        divControls.style.top = 600 + "px";
    }

}