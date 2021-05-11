// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv, radioDiv
  In the project's HTML, the divs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP
  This is where you will print any kind of text (e.g., the label of an image).

  buttons, notesRadio
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

let canvasDiv;
let canvas;
let textDiv;
let textP;
let buttonDiv;
let trainButton;

/*******************************************************************************
                            Global ML Variables

  model
  The machine learning model we will use in this program.

  state
  The current state of the machine learning process.

  env, wave
  Variables used to generate musical notes.

  notes
  An object containing notes and their frequencies.
*******************************************************************************/

//let model;

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
                               buildButtons()

  Builds all of the buttons for the program. Used to make setup() a bit less
  bulky.
*******************************************************************************/

function buildButtons() {

}

/******************************************************************************
                              createMusicSystem()

  Creates the music system to be used throughout this program.
*******************************************************************************/

function createMusicSystem() {
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);
  wave = new p5.Oscillator();
  wave.setType("sine");
  wave.start();
  wave.freq(440);
  wave.amp(env);
}

/******************************************************************************
                              trainModel()

  This function is responsible for handling everything that happens when the
  user clicks the "Train Model" button.

  1. Change the state of the program to "training".
  2. Show "Step 2: Training" to the user.
  3. Normalize the model's data using model.normalizeData().
  4. Customize the model's options. For example, set the number of epochs.
  5. Call model.train(options, whileTraining, finishedTraining).
  6. Hide all button and radio elements.

*******************************************************************************/

function trainModel() {

}

/******************************************************************************
                              whileTraining()

  What happens while the model is training. For our own information, we will
  just print the current epoch to the console.
*******************************************************************************/

function whileTraining(epoch, loss) {

}

/******************************************************************************
                            finishedTraining()

  What happens when the model is finished training. Change the state to
  "prediction", and display "Step 3: Prediction" to the user.
*******************************************************************************/

function finishedTraining() {

}

/******************************************************************************
                    drawNote(note, noteColor, ellipseColor)

  Draw an ellipse to the canvas, filled in with the name of the note (e.g., C,
  D, E, F, G).
*******************************************************************************/

function drawNote(note, noteColor, ellipseColor) {

}

/******************************************************************************
                                canvasClicked()

  A callback function. What happens when the canvas is clicked. More details on
  this in the project guide.
*******************************************************************************/

function canvasClicked() {

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

}
