// Interface elements
let canvasDiv;
let canvas;
let buttonDiv;
let uploadButton;
let submitButton;
let resetButton;
let textDiv;
let textP;

let mobilenet;
let img;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
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
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {

}

function modelReady() {
  textP.html("Upload an image to classify!");
  uploadButton.style("display", "inline");
}

function resetCanvas() {
  background(255);
  submitButton.style("display", "none");
  resetButton.style("display", "none");
  modelReady();
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
  image(img, 0, 0, width, height);
  submitButton.style("display", "inline");
  resetButton.style("display", "inline");
  uploadButton.style("display", "none");
  textP.html("Click \"submit\" to classify!");
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
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence " + confidence);
  }
}
