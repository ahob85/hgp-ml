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

  video
  A video loaded into the program for object detection.

  detections
  An array that contains all of the objects the model has detected in the
  current video frame on the canvas.

  isModelReady
  Initialized to false in setup(). Set to true when the model has been loaded
  successfully.
*******************************************************************************/

let detector;
let video;
let detections;
let isModelReady;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {

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
                               videoReady()

  A callback function. Called after the video has been loaded. First, we'll
  hide the video (remember, there will be two videos if we don't do this) using:

  video.display("display", "none");

  Then, now that we have video, we load the COCO-SSD model with:

  detector = ml5.objectDetector("cocossd", modelReady);
*******************************************************************************/

function videoReady() {

}

/******************************************************************************
                               modelReady()

  A callback function. Called after the COCO-SSD model has been loaded. All we
  need to do here is set isModelReady to true, which we'll see the effect of in
  draw().
*******************************************************************************/

function modelReady() {

}

/******************************************************************************
                              drawLabel(object)

  Draw a colored rectangle around an object. Then, draw text somewhere near the
  object indicating the label of the object, along with its associated
  confidence value.
*******************************************************************************/

function drawLabel(object) {
  // Draw a rectangular outline around the object

  // Draw the label and its confidence value near the object

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

}
