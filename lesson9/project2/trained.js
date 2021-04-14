// Interface elements
let canvas;
let textDiv;
let label;

let video;
let featureExtractor;
let knn;
let x, y;
let speed = 5;

function setup() {
  canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  textDiv = createDiv();
  label = createP();
  label.parent(textDiv);
  label.html("Loading Model...");
  x = width / 2;
  y = height / 2;
}

function draw() {
  //image(video, 0, 0);
  background(255);
  fill(0);
  ellipse(x, y, 36);
  let labelString = label.html();
  if(labelString.includes("up")) {
    y -= speed;
  } else if(labelString.includes("down")) {
    y += speed;
  } else if(labelString.includes("left")) {
    x -= speed;
  } else if(labelString.includes("right")) {
    x += speed;
  }
}

function myClassify() {
  const features = featureExtractor.infer(video);
  knn.classify(features, function (error, result) {
    if(error) {
      console.error(error);
    } else {
      let labelString = getLabel(result);
      label.html("Label: "+ labelString);
      myClassify();
    }
  });
}

function keyPressed() {
  const features = featureExtractor.infer(video);
  // want to see the features? have a look!
  // console.log(features.dataSync());
  if(key == "ArrowLeft") {
    knn.addExample(features, "left");
    console.log("you pressed left");
  } else if(key == "ArrowRight"){
    knn.addExample(features, "right");
    console.log("you pressed right");
  } else if(key == "ArrowUp") {
    knn.addExample(features, "up");
    console.log("you pressed up");
  } else if(key == "ArrowDown") {
    knn.addExample(features, "down");
    console.log("you pressed down");
  } else if(key == " ") {
    knn.addExample(features, "stay");
    console.log("you pressed space");
  } else if(key == "s") {
    knn.save();
    console.log("model saved!");
  }
}

function modelReady() {
  console.log("MobileNet Ready!");
  knn = ml5.KNNClassifier();
  knn.load("myKNN.json", function() {
    console.log("k-NN model ready!");
    myClassify();
  });
}

// Don't touch this, it "fixes" a bug in ml5.js
function getLabel(result) {
  const entries = Object.entries(result.confidencesByLabel);
  let greatestConfidence = entries[0];
  for(let i = 0; i < entries.length; i++) {
    if(entries[i][1] > greatestConfidence[1]) {
      greatestConfidence = entries[i];
    }
  }
  return greatestConfidence[0];
}
