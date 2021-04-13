// Interface elements
let canvas;
let textDiv;
let label;
let confidence;
let buttonDiv;
let happyButton;
let sadButton;
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
  happyButton = createButton("Happy");
  happyButton.parent(buttonDiv);
  happyButton.mousePressed(function () {
    classifier.addImage(canvas, "Happy");
  });
  sadButton = createButton("Sad");
  sadButton.parent(buttonDiv);
  sadButton.mousePressed(function () {
    classifier.addImage(canvas, "Sad");
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
