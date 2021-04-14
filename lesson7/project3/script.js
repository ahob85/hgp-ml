// Interface elements
let canvas;
let textDiv;
let label;
let confidence;
let buttonDiv;
let happyButton;
let sadButton;
let trainButton;
let saveButton;

let featureExtractor;
let classifier;
let video;

function setup() {
  canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = ml5.featureExtractor("MobileNet");
  classifier = featureExtractor.classification(video);

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
  trainButton = createButton("Train Model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });
  saveButton = createButton("Save Model");
  saveButton.parent(buttonDiv);
  saveButton.mousePressed(function() {
    classifier.save();
  })
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
