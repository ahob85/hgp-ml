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
  text("Model loading, please wait...", 0, height / 2);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {

}

function resetCanvas() {
  background(255);
  label.html("");
  confidence.html("");
  submitButton.hide();
  resetButton.hide();
  uploadButton.show();
}

function modelReady() {
  console.log("Model is ready!");
  background(255);
  uploadButton.show();
}

function handleFile(file) {
  if(file.type === "image") {
    img = createImg(file.data, imageReady);
    img.hide();
  } else {
    img = null;
  }
}

function imageReady() {
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
    console.log(results);
    submitButton.hide();
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
  }
}
