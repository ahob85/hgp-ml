// Interface elements
let canvas;
let textDiv;
let label;
let confidence;

let mobilenet;
let img;

function setup() {
  canvas = createCanvas(640, 480);
  img = createImg("images/guinea-pig.jpg", imageReady);
  img.hide();
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {

}

function imageReady() {
  image(img, 0, 0, width, height);
}

function modelReady() {
  console.log("Model is ready!");
  mobilenet.classify(img, gotResult);
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
