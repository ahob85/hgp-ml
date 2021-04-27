// Interface elements
let canvasDiv;
let canvas;
let textDiv;
let textp;
let confidence;

let model;
let img;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  img = loadImage("../../images/guinea-pig.jpg", imageLoaded);
  model = ml5.imageClassifier("MobileNet");
  model.classify(canvas, gotResults);
}

function draw() {

}

function imageLoaded() {
  image(img, 0, 0, width, height);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence " + confidence);
  }
}
