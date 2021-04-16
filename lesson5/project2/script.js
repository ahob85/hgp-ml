// Interface elements
let canvasDiv;
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
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
  buttonDiv = createDiv();
  uploadButton = createFileInput(handleFile);
  uploadButton.parent(buttonDiv);
  uploadButton.style("display", "none");
  submitButton = createButton("SUBMIT");
  submitButton.parent(buttonDiv);
  submitButton.mousePressed(predictImage);
  submitButton.style("display", "none");
  resetButton = createButton("RESET");
  resetButton.parent(buttonDiv);
  resetButton.mousePressed(resetCanvas);
  resetButton.style("display", "none");
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
  uploadButton.style("display", "inline");
}

function resetCanvas() {
  background(255);
  label.html("");
  confidence.html("");
  submitButton.style("display", "none");
  resetButton.style("display", "none");
  uploadButton.style("display", "inline");
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
  submitButton.style("display", "inline");
  resetButton.style("display", "inline");
  uploadButton.style("display", "none");
}

function predictImage() {
  mobilenet.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    submitButton.style("display", "none");
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
  }
}
