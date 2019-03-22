//@ts-check


function setup(){

    let bankaccount = "0";

    let divSide = document.getElementById("divSide");
    let divScreen = document.getElementById("screen");
    let btnDeposit = document.getElementById("depositBtn")
    let inpDeposit = document.getElementById("depositInp")
      //fix size if resized
      resize();
      addEventListener("resize", resize);
      function resize() {
          divScreen.style.height = innerHeight + "px";
          divScreen.style.width = innerWidth * 0.7 + "px";
          divSide.style.height = innerHeight + "px";
          //divSide.style.width = innerWidth * 0.3 + "px";
      }


      btnDeposit.addEventListener("click", function deposit(){
        bankaccount = inpDeposit.value;
        if(Number(bankaccount) >0){
          localStorage.setItem("bank", String(Math.floor(Number(bankaccount))));

        }
      })
}