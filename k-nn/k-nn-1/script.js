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

//let canvasDiv;

/*******************************************************************************
                            Global ML Variables

  featureExtractor
  An object that can extract the features from the MobileNet model.

  imgFeatures
  The features of the image on the canvas.

  knnClassifier
  The new model we have created from MobileNet's features.

  video
  A video loaded into the program for object detection.

  isModelReady
  Initialized to false in setup(). Set to true when the model has been loaded
  successfully.

  ups, downs, lefts, rights
  The number of examples that have been added to the training data.
*******************************************************************************/

//let featureExtractor;

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

  Builds all of the app's buttons: up, down, left, and right. When any of them
  are clicked, add the features of the current image to the k-NN classifier.
*******************************************************************************/

function buildButtons() {

}

/******************************************************************************
                               videoReady()

  A callback function. Called after the video has been loaded. First, we'll
  hide the video (remember, there will be two videos if we don't do this) using:

  video.display("display", "none");

  Then, now that we have video, we will immediately begin extracting  we
  extract the features from the MobileNet model with:

  features = ml5.featureExtractor("MobileNet", featureExtractorLoaded);
*******************************************************************************/

function videoReady() {

}

/******************************************************************************
                               featureExtractorLoaded()

  A callback function. Called after the MobileNet model has been loaded and its
  feature extractor has been created. Here we load the new k-NN classification
  model. We'll simply call the model "knnClassifier". Because there is nothing
  else to load here, we can skip our usual modelReady() function and write
  instructional text and display the button div here.
*******************************************************************************/

function featureExtractorLoaded() {

}

/******************************************************************************
                          gotResults(error, results)

  This function is a callback for classify(). In other words, after our new
  classifier model has classified the image, it should call this function next.

  parameters
  - error: If there was an error while running classify(), it should be brought
  up here and the function shouldn't do anything else.
  - results: The results of classify(). This will be an object we can use to
  get some useful information, such as the predicted label of the image, as
  well as how confident the model is about that assigned label.
*******************************************************************************/

function gotResults(error, results) {

}
