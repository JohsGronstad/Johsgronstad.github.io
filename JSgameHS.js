
function firebase(){
    var config = {
        apiKey: "AIzaSyBdmHkyJnidRPrHJ8V0gd6KLZEZW58KmIQ",
        authDomain: "meteordodge-c1dd4.firebaseapp.com",
        databaseURL: "https://meteordodge-c1dd4.firebaseio.com",
        projectId: "meteordodge-c1dd4",
        storageBucket: "meteordodge-c1dd4.appspot.com",
        messagingSenderId: "705491939625"
    };
   


  const preObject = document.getElementById("object");

  const dbRefObject = firebase.database().ref().child("object");

  dbRefObject.on('value', snap=> console.log(snap.val()));

  
}