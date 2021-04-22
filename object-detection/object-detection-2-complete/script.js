// Interface elements
let canvasDiv;
let canvas;

let detector;
let video;
let detections = [];

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  video = createCapture(VIDEO);
  video.style("display", "none");
  detector = ml5.objectDetector("cocossd");
  detector.detect(video, gotResults);
}

function draw() {
  image(video, 0, 0);
  for(let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke("green");
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill("red");
    textSize(20);
    text(object.label + ": " + (round(object.confidence, 2) * 100) + "%", object.x + 10, object.y + 20);
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    detections = results;
    //console.log(results);
    detector.detect(video, gotResults);
  }
}
