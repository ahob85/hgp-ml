// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv, sliderDiv
  In the project's HTML, the divs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP
  This is where you will print any kind of text (e.g., the label of an image).

  slider, sadSpan, happySpan
  A slider that goes from sad (left) to happy (right).

  buttons
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

let canvasDiv;
let canvas;
let textDiv;
let textP;
let sliderDiv;
let slider;
let sadSpan;
let happySpan;
let buttonDiv;
let addExampleButton;
let trainButton;

/*******************************************************************************
                            Global ML Variables

  featureExtractor
  An object that can extract the features from the MobileNet model.

  predictor
  The new model we have created from MobileNet's features.

  video
  A video loaded into the program for object detection.

  isModelReady, isTrainingComplete
  Initialized to false in setup(). Set to true when the model has been loaded
  successfully, or when training is complete.

  addedExamples
  The number of examples that have been added to the training data.
*******************************************************************************/

let featureExtractor;
let predictor;
let video;
let isModelReady;
let isTrainingComplete;
let addedExamples;

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
  textP = createP();
  textP.html("Model loading, please wait...");
  textP.parent(textDiv);
  buildInput();
  addedExamples = 0;
  isModelReady = false;
  isTrainingComplete = false;
  video = createCapture(VIDEO, videoReady);
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  if(isModelReady) {
    image(video, 0, 0);
  }
  if(isTrainingComplete) {
    predictor.predict(canvas, gotResults);
  }
}

/******************************************************************************
                               buildInput()

  Builds all of the app's buttons and and the slider. When the addExampleButton
  is clicked, the current image on the canvas is added to the training data,
  along the current value of the slider between "Happy" and "Sad".

  When the training button is clicked, the model begins training on its current
  training data, and a function called whileTraining() is passed as a callback
  to run while this is happening.
*******************************************************************************/

function buildInput() {
  sliderDiv = createDiv();
  sadSpan = createSpan("Sad");
  sadSpan.parent(sliderDiv);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent(sliderDiv);
  happySpan = createSpan("Happy");
  happySpan.parent(sliderDiv);
  buttonDiv = createDiv();
  addExampleButton = createButton("Add Example");
  addExampleButton.parent(buttonDiv);
  addExampleButton.mousePressed(function () {
    addedExamples++;
    textP.html("Added Examples: " + addedExamples);
    predictor.addImage(canvas, slider.value());
  });
  trainButton = createButton("Train Model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(function () {
    buttonDiv.style("display", "none");
    sliderDiv.style("display", "none");
    predictor.train(whileTraining);
  });
  buttonDiv.style("display", "none");
  sliderDiv.style("display", "none");
}

/******************************************************************************
                               videoReady()

  A callback function. Called after the video has been loaded. First, we'll
  hide the video (remember, there will be two videos if we don't do this) using:

  video.display("display", "none");

  Then, now that we have video, we extract the features from the MobileNet
  model with:

  featureExtractor = ml5.featureExtractor("MobileNet", featuresExtracted);
*******************************************************************************/

function videoReady() {
  video.style("display", "none");
  featureExtractor = ml5.featureExtractor("MobileNet", featuresExtracted);
}

/******************************************************************************
                               featuresExtracted()

  A callback function. Called after the MobileNet model has been loaded and its
  features have been extracted. Here we load the new regression model based
  on the features of MobileNet. We'll simply call the model "predictor", and
  pass modelReady() as a callback for when the model has loaded.
*******************************************************************************/

function featuresExtracted() {
  predictor = featureExtractor.regression(canvas, modelReady);
}

/******************************************************************************
                                  modelReady()

  A callback function. Called after the regression model has been loaded. Here
  we set isModelReady to true, print some instructional text ("Add training
  data, then click train!"), then reveal the button and slider divs so users can
  interact with the app.
*******************************************************************************/

function modelReady() {
  isModelReady = true;
  textP.html("Add training data, then click train!");
  sliderDiv.style("display", "block");
  buttonDiv.style("display", "block");
}

/******************************************************************************
                                  whileTraining()

  A callback function. Called continuously as the new regression model is being
  trained. If there is a loss (error) value reported by the model's training
  process, log it to the console. Otherwise, the model is done training, so set
  isTrainingComplete to true. You should notice the loss value going down as
  the model becomes better at its regression task over time.
*******************************************************************************/

function whileTraining(loss) {
  if(loss) {
    console.log(loss);
  } else {
    isTrainingComplete = true;
  }
}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for predict(). In other words, after our new
  regression model has calculated a value for the image, it should call this
  function next.

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
    let value = floor(results.value * 100);
    textP.html("Happiness: " + value + "%");
  }
}
