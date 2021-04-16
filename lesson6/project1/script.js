// Interface elements
let canvasDiv;
let canvas;
let textDiv;
let label;
let confidence;

let mobilenet;
let video;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  video = createCapture(VIDEO);
  video.style("display", "none");
  mobilenet = ml5.imageClassifier("MobileNet", video);
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
  textSize(32);
  text("Model loading, please wait...", width / 6, height / 2);
  mobilenet.classify(gotResults);
}

function draw() {
  image(video, 0, 0);
}

function modelReady() {
  console.log("Model is ready!");
  background(255);
  //mobilenet.classify(gotResults);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
    mobilenet.classify(gotResults);
  }
}
