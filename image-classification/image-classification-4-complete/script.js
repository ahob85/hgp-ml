// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv
  In the project's HTML, the divs that will contain various elements that may
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
let buttonDiv;
let submitButton;
let resetButton;

/*******************************************************************************
                            Global ML Variables

  doodlenet
  The machine learning model we will use in this program.

  img
  An image loaded into the program for classification.

  isModelReady
  Initialized to false in setup(). Set to true when the model has been loaded
  successfully.
*******************************************************************************/

let doodlenet;
let img;
let isModelReady;

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
  buttonDiv = createDiv();
  submitButton = createButton("SUBMIT");
  submitButton.parent(buttonDiv);
  submitButton.mousePressed(predictImage);
  resetButton = createButton("RESET");
  resetButton.parent(buttonDiv);
  resetButton.mousePressed(resetCanvas);
  buttonDiv.style("display", "none");
  isModelReady = false;
  doodlenet = ml5.imageClassifier("DoodleNet", modelReady);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  if(mouseIsPressed && isModelReady) {
    strokeWeight(25);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

/******************************************************************************
                               resetCanvas()

  What happens when a user clicks the reset button.

  1) The background should turn white.
  2) The UI text should provide instructions, e.g., "Draw your image, then
     click submit!"
*******************************************************************************/

function resetCanvas() {
  background(255);
  textP.html("Draw your image, then click submit!");
}

/******************************************************************************
                               modelReady()

  A callback function. Called after the DoodleNet model has been loaded. It
  should make button div appear using buttonDiv.style("display, "block"), and
  set the UI text to instructional text, e.g., "Draw your image, then click
  submit!".
*******************************************************************************/

function modelReady() {
  isModelReady = true;
  buttonDiv.style("display", "block");
  textP.html("Draw your image, then click submit!");
}

/******************************************************************************
                               predictImage()

  What happens when a user clicks the submit button. Simply use DoodleNet to
  classify the image on the canvas, and pass gotResults() as a callback.
*******************************************************************************/

function predictImage() {
  doodlenet.classify(canvas, gotResults);
}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for classify(). In other words, after DoodleNet
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
    //console.log(results);
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence " + confidence);
  }
}
