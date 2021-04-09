let mobilenet;
let img;

function setup() {
  createCanvas(640, 480);
  img = createImg("images/rabbit.png", imageReady);
  img.hide();
  background(0);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {

}

function imageReady() {
  image(img, 0, 0, width, height);
}

function modelReady() {
  console.log("Model is ready!");
  mobilenet.classify(img, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let conf = round(results[0].confidence, 2);
    createP("Label: " + label);
    createP("Confidence: " + conf);
  }
}
