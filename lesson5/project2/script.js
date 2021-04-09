// Interface elements
let c;
let submitButton;

let mobilenet;
let img;

function setup() {
  c = createCanvas(640, 480);
  c.parent("#canvas");
  submitButton.select("#submit-button");
  noStroke();
  fill(255, 0, 0);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {
  if(mouseIsPressed) {
    circle(mouseX, mouseY, 10);
  }
}

function imageReady() {
  image(img, 0, 0, width, height);
}

function modelReady() {
  console.log("Model is ready!");
  submitButton.mousePressed(predictImage);
}

function predictImage() {
  img = saveCanvas(c);
  mobilenet.classify(img, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let conf = round(results[0].confidence, 2);
    createP(label);
    createP(conf);
  }
}
