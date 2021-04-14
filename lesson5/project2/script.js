// Interface elements
let canvas;
let buttonDiv;
let uploadButton;
let submitButton;
let resetButton;
let textDiv;
let label;
let confidence;

let mobilenet;
let img;

function setup() {
  canvas = createCanvas(640, 480);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
  buttonDiv = createDiv();
  uploadButton = createFileInput(handleFile);
  uploadButton.parent(buttonDiv);
  uploadButton.hide();
  submitButton = createButton("SUBMIT");
  submitButton.parent(buttonDiv);
  submitButton.mousePressed(predictImage);
  submitButton.hide();
  resetButton = createButton("RESET");
  resetButton.parent(buttonDiv);
  resetButton.mousePressed(resetCanvas);
  resetButton.hide();
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
  textSize(32);
  text("Model loading, please wait...", width / 6, height / 2);
}

function draw() {

}

function modelReady() {
  background(255);
  uploadButton.show();
}

function resetCanvas() {
  background(255);
  label.html("");
  confidence.html("");
  submitButton.hide();
  resetButton.hide();
  uploadButton.show();
}

function handleFile(file) {
  if(file.type === "image") {
    text("Loading image, please wait", width / 6, height / 2);
    img = loadImage(file.data, imageReady);
  } else {
    img = null;
  }
}

function imageReady() {
  background(255);
  image(img, 0, 0, width, height);
  submitButton.show();
  resetButton.show();
  uploadButton.hide()
}

function predictImage() {
  mobilenet.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    submitButton.hide();
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
  }
}
