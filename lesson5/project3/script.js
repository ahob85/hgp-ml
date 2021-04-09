// Interface elements
let canvas;
let submitButton;
let resetButton;
let label;
let confidence;

let mobilenet;
let img;

function setup() {
  canvas = createCanvas(270, 270);
  canvas.parent("#canvas-div");
  submitButton = select("#submit-button");
  resetButton = select("#reset-button");
  resetButton.mousePressed(resetCanvas);
  label = select("#label-div");
  confidence = select("#confidence-div");
  strokeWeight(15);
  textSize(16);
  text("Model loading, please wait...", 0, height / 2);
  mobilenet = ml5.imageClassifier("DoodleNet", modelReady);
}

function draw() {
  if(mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function resetCanvas() {
  background(255);
}

function imageReady() {
  image(img, 0, 0, width, height);
}

function modelReady() {
  console.log("Model is ready!");
  background(255);
  submitButton.mousePressed(predictImage);
}

function predictImage() {
  mobilenet.classify(canvas, gotResult);
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
