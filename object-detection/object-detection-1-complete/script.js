// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv
  In the project's HTML, the DIVs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP
  This is where you will print any kind of text (e.g., the label of an image).

  buttons
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

let canvasDiv;
let canvas;
let textDiv;
let textP;

/*******************************************************************************
                            Global ML Variables

  detector
  The machine learning model we will use in this program.

  img
  An image loaded into the program for object detection.
*******************************************************************************/

let detector;
let img;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  img = loadImage("../../images/cats-dogs.jpg", imageLoaded);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {

}

/******************************************************************************
                                imageLoaded()

  A callback that is called after an image has been loaded by loadImage().
  Draws the image onto the canvas like this:

  image(img, 0, 0, width, height);

  Also loads the model (passing in modelReady() as a callback):

  detector = ml5.objectDetector("cocossd", modelReady);
*******************************************************************************/

function imageLoaded() {
  image(img, 0, 0, width, height);
  detector = ml5.objectDetector("cocossd", modelReady);
}

/******************************************************************************
                               modelReady()

  A callback function. Called after the COCO-SSD model has been loaded. It
  should simply detect objects in the image (or if using webcam video, the
  current frame) on the canvas.
*******************************************************************************/

function modelReady() {
  detector.detect(canvas, gotResults);
}

/******************************************************************************
                              drawLabel(object)

  Draw a colored rectangle around an object. Then, draw text somewhere near the
  object indicating the label of the object, along with its associated
  confidence value.
*******************************************************************************/

function drawLabel(object) {
  // Draw a rectangular outline around the object
  stroke(0, 255, 0);
  noFill();
  rect(object.x, object.y, object.width, object.height);
  // Draw the label and its confidence value near the object
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  let label = object.label;
  let confidence = round(object.confidence, 2) * 100;
  text(label + ": " + confidence + "%", object.x + 10, object.y + 20);
}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for detect(). In other words, after cocossd
  has detected and classified the image, it should call this function next.

  parameters
  - error: If there was an error while running classify(), it should be brought
  up here and the function shouldn't do anything else.
  - results: The results of classify(). This will be an object we can use to
  get some useful information, such as the predicted label of the image, as
  well as how confident the model is about that assigned label.
*******************************************************************************/

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results);
    textP.html("I detect these objects!");
    for(let i = 0; i < results.length; i++) {
      drawLabel(results[i]);
    }
  }
}
