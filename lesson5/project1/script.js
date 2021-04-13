// Interface elements
let canvas;
let textDiv;
let label;
let confidence;

let mobilenet;
let img;

function preload() {
  img = loadImage("../../images/guinea-pig.jpg");
  mobilenet = ml5.imageClassifier("MobileNet");
}

function setup() {
  canvas = createCanvas(640, 480);
  image(img, 0, 0, width, height);
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
  mobilenet.classify(canvas, gotResult);
}

function draw() {

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
