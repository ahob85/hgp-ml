// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv
  In the project's HTML, the divs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP, textP2
  This is where you will print any kind of text (e.g., the label of an image).

  buttons
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

let canvasDiv;
let canvas;
let textDiv;
let textP;
let textP2;

/*******************************************************************************
                            Global ML Variables

  soundClassifier
  The machine learning model we will use in this program.
*******************************************************************************/

let soundClassifier;

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
  textP2 = createP();
  textP2.parent(textDiv);
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier("SpeechCommands18w", options,
  modelReady);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  let label = textP.html();
  if(label.includes("up")) {
    background(255, 0, 0);
  } else if(label.includes("down")) {
    background(0, 0, 255);
  } else if(label.includes("left")) {
    background(0, 255, 0);
  } else if(label.includes("right")) {
    background(0, 255, 255);
  } else {
    background(255);
  }
}

/******************************************************************************
                               modelReady()

  A callback function. Called after the sound classifier model has been loaded.
  It should simply classify the image (or if using webcam video, the current
  frame) on the canvas.
*******************************************************************************/

function modelReady() {
  textP.html("Model loaded. Say any of the commands below!");
  textP2.html("<b>Commands</b>: digits zero through nine, up, down, left, right, go, stop, yes, no");
  soundClassifier.classify(gotResults);
}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for classify(). In other words, after MobileNet
  has classified the image, it should call this function next.

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
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2) * 100;
    textP.html(label +  ": " + confidence + "%");
  }
}
