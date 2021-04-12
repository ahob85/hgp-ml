// Interface elements
let canvas;
let buttonDiv;
let submitButton;
let resetButton;
let textDiv;
let label;
let confidence;

let doodlenet;
let img;

function setup() {
  canvas = createCanvas(640, 480);
  buttonDiv = createDiv();
  submitButton = createButton("SUBMIT");
  submitButton.parent(buttonDiv);
  submitButton.mousePressed(predictImage);
  resetButton = createButton("RESET");
  resetButton.parent(buttonDiv);
  resetButton.mousePressed(resetCanvas);
  buttonDiv.hide();
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
  strokeWeight(25);
  textSize(16);
  text("Model loading, please wait...", 0, height / 2);
  doodlenet = ml5.imageClassifier("DoodleNet", modelReady);
}

function draw() {
  if(mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function resetCanvas() {
  background(255);
  label.html("");
  confidence.html("");
}

function modelReady() {
  console.log("Model is ready!");
  background(255);
  buttonDiv.show();
}

function predictImage() {
  doodlenet.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
  }
}
