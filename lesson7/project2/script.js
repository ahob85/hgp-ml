// Interface elements
let canvas;
let textDiv;
let value;
let sadSpan;
let happySpan;
let addedExamples = 0;
let addedExamplesP;
let buttonDiv;
let addExampleButton;
let trainButton;
let sliderDiv;
let slider;

let featureExtractor;
let predictor;
let video;

function setup() {
  canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = ml5.featureExtractor("MobileNet");
  predictor = featureExtractor.regression(video);

  // interface building
  textDiv = createDiv();
  value = createP();
  value.html("Happiness: " + 0);
  value.parent(textDiv);
  addedExamplesP = createP();
  addedExamplesP.parent(textDiv);
  addedExamplesP.html("Added Examples: " + addedExamples);
  sliderDiv = createDiv();
  sadSpan = createSpan();
  sadSpan.parent(sliderDiv);
  sadSpan.html("Sad");
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent(sliderDiv);
  happySpan = createSpan();
  happySpan.parent(sliderDiv);
  happySpan.html("Happy");
  buttonDiv = createDiv();
  addExampleButton = createButton("Add Example");
  addExampleButton.parent(buttonDiv);
  addExampleButton.mousePressed(function() {
    console.log(slider.value());
    addedExamples++;
    addedExamplesP.html("Added Examples: " + addedExamples);
    predictor.addImage(canvas, slider.value());
  });
  trainButton = createButton("Train Model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(function () {
    predictor.train(whileTraining);
  });
}

function draw() {
  image(video, 0, 0);
}

function whileTraining(loss) {
  if(loss === null) {
    console.log("Training complete!");
    predictor.predict(canvas, gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    value.html("Happiness: " + round(results.value, 2));
    predictor.predict(canvas, gotResults);
  }
}
