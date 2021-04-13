// Interface elements
let canvas;
let textDiv;
let label;
let confidence;
let buttonDiv;
let ps3Button;
let ps4Button;
let trainButton;

let featureExtractor;
let classifier;
let video;

function preload() {
  video = createCapture(VIDEO);
  featureExtractor = ml5.featureExtractor("MobileNet");
  classifier = featureExtractor.classification(video);
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
  buttonDiv = createDiv();
  ps3Button = createButton("PS3 Controller");
  ps3Button.parent(buttonDiv);
  ps3Button.mousePressed(function () {
    classifier.addImage("ps3 controller");
  });
  ps4Button = createButton("PS4 Controller");
  ps4Button.parent(buttonDiv);
  ps4Button.mousePressed(function () {
    classifier.addImage("ps4 controller");
  });
  train = createButton("Train Model");
  train.parent(buttonDiv);
  train.mousePressed(function () {
    classifier.train(whileTraining);
  });
  textSize(32);
  text("Model loading, please wait...", width / 6, height / 2);
  //mobilenet.classify(gotResult);
}

function draw() {
  image(video, 0, 0);
}

function whileTraining(loss) {
  console.log(loss);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    label.html("Label: " + results[0].label);
    confidence.html("Confidence: " + round(results[0].confidence, 2));
    mobilenet.classify(gotResult);
  }
}
