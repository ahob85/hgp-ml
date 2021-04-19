// Interface variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

let soundClassifier;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  textDiv = createDiv();
  textP = createP();
  textP.parent(textDiv);
  textP.html("Model loading, please wait...");
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier("SpeechCommands18w", options, function() {
    console.log("model ready!");
    textP.html("Model ready!");
    soundClassifier.classify(gotResults);
  });
}

function draw() {
  background(220);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    textP.html(`${results[0].label}: ${results[0].confidence}`);
  }
}
