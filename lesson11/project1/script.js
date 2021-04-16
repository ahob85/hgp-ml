// Interface variables
let canvasDiv;
let canvas;
let textDiv;
let text;

let soundClassifier;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  textDiv = createDiv();
  text = createP();
  text.parent(textDiv);
  text.html("Model loading, please wait...");
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier("SpeechCommands18w", options, function() {
    console.log("model ready!");
    text.html("Model ready!");
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
    text.html(`${results[0].label}: ${results[0].confidence}`);
  }
}
