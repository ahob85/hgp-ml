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

  mobilenet
  The machine learning model we will use in this program.

  video
  An video loaded into the program for classification.

  isModelReady
  Initialized to false in setup(). Set to true when the model has been loaded
  successfully.
*******************************************************************************/

let mobilenet;
let video;
let isModelReady;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, datal, and models.
*******************************************************************************/

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  video = createCapture(VIDEO);
  video.style("display", "none");
  isModelReady = false;
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  image(video, 0, 0);
  if(isModelReady) {
    mobilenet.classify(canvas, gotResults);
  }
}

/******************************************************************************
                               modelReady()

  A callback function. Called after the mobilenet model has been loaded. When
  the model is ready, we simply call classify() (no need to pass in the canvas
  since we are capturing webcam video), and only pass in gotResults() as a
  callback function.
*******************************************************************************/

function modelReady() {
  isModelReady = true;
}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for classify(). In other words, after MobileNet
  has classified the image, it should call this function next.

  Be sure to hide the submit button after the results have been shown! Users
  should only be able to click the reset button at this point.

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
    //console.log(results);
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence " + confidence);
  }
}
