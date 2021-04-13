// Interface elements
let canvas;
let textDiv;
let label;
let confidence;

let featureExtractor;
let classifier;
let video;

function preload() {
  video = createCapture(VIDEO);
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  classifier = featureExtractor.classification(video);
}

function modelReady() {
  console.log("Model Ready!");
  classifier.load("./model.json", customModelReady);
}

function customModelReady() {
  console.log("Custom Model Ready!");
  classifier.classify(canvas, gotResults);
}

function setup() {
  canvas = createCanvas(640, 480);
  video.hide();

  // interface building
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  confidence = createP();
  confidence.parent(textDiv);
}

function draw() {
  image(video, 0, 0);
}

function whileTraining(loss) {
  if(loss === null) {
    console.log("Training complete!");
    classifier.classify(canvas, gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
    classifier.classify(canvas, gotResults);
  }
}
