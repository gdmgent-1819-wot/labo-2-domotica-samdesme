var penColour = '';
var pixels = document.querySelectorAll('.pixel');
var btnSave = document.querySelector('#btnSave');
var ArrPixel = [];

var doorBack = document.querySelector('.doorBack');

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: 'AIzaSyBSxBgge3M4xj0XUqDXeqIJIB1411S41hU',
  authDomain: 'wot-labo2-samdesme.firebaseapp.com',
  databaseURL: 'https://wot-labo2-samdesme.firebaseio.com',
  storageBucket: 'wot-labo2-samdesme.appspot.com'
};
firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

function defaultState() {
  document.querySelectorAll(".state").forEach(el => el.textContent = "on");
}
defaultState();

function setPenColour(pen) {
  penColour = pen;

  if (penColour == "red") {

    setBackground(".doorBack", "red", "darkred", "#stateBackDoor");

  }
  else if (penColour == "chartreuse") {
    setBackground(".doorFront", "chartreuse", "darkgreen", "#stateFrontDoor")
  }

  else if (penColour == "yellow") {
    setBackground(".lights", "yellow", "darkkhaki", "#stateLights")

  }

  else if (penColour == "lightblue") {
    setBackground(".sockets", "lightblue", "blue", "#stateSockets")

  }

  else {
    pixel.style.backgroundColor = "white"


  }
}

function setBackground(className, onColor, offColor, stateId) {
  if (document.querySelector(className).style.backgroundColor == offColor) {
    document.querySelectorAll(className).forEach(el => el.style.backgroundColor = onColor);
    document.querySelector("#" + onColor).style.backgroundColor = onColor;
    document.querySelector("#" + onColor).style.color = "black";
    document.querySelector(stateId).textContent = "on"


  }
  else {
    document.querySelectorAll(className).forEach(el => el.style.backgroundColor = offColor);
    document.querySelector("#" + onColor).style.backgroundColor = offColor;
    document.querySelector("#" + onColor).style.color = "white";

    document.querySelector(stateId).textContent = "off"


  }
}

function setPixelColour(pixel) {

  if (pixel.style.backgroundColor == "red") {
    pixel.style.backgroundColor = "darkred"
  }
  else if (pixel.style.backgroundColor == "chartreuse") {
    pixel.style.backgroundColor = "darkgreen"
  }

  else if (pixel.style.backgroundColor == "yellow") {
    pixel.style.backgroundColor = "darkkhaki"
  }

  else if (pixel.style.backgroundColor == "lightblue") {
    pixel.style.backgroundColor = "blue"
  }

  else {
    pixel.style.backgroundColor = "white"

  }
  console.log(pixel.style.backgroundColor);

}

function loopPx() {
  for (let i = 0; i < pixels.length; i++) {

    // get background names from each pixel
  
    ArrPixel.push("0");
    var pixel = pixels[i];
    document.querySelectorAll(".pixel").forEach(el => {
      switch (pixel.style.backgroundColor) {
        case "red":
          ArrPixel[i] = "rd";
          break;
        case "chartreuse":
          ArrPixel[i] = "gr";
          break;
        case "lightblue":
          ArrPixel[i] = "bl";
          break;
        case "yellow":
          ArrPixel[i] = "y";
          break;
        case "darkred":
          ArrPixel[i] = "darkrd";
          break;
        case "darkgreen":
          ArrPixel[i] = "darkgr";
          break;
        case "blue":
          ArrPixel[i] = "darkbl";
          break;
        case "darkkhaki":
          ArrPixel[i] = "darky";
          break;
        default:
          ArrPixel[i] = "0";
      }
    });
  }

}


btnSave.addEventListener('click', e => {
  e.preventDefault();
  loopPx();
  firebase.database().ref('domotica').push({ 'rgb': ArrPixel });
  console.log(ArrPixel);
})