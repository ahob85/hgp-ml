// Interface elements
let canvas;
let img;

let detector;

function preload() {
  img = loadImage('/hgp-ml/images/cats-dogs.jpg');
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  canvas = createCanvas(640, 480);
  image(img, 0, 0, width, height);
  detector.detect(canvas, gotResults);
}

function draw() {

}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    for(let i = 0; i < results.length; i++) {
      let object = results[i];
      stroke("green");
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill("red");
      textSize(20);
      text(results[i].label + ": " + (round(results[i].confidence, 2) * 100) + "%", results[i].x + 10, results[i].y + 20);
    }
  }
}
