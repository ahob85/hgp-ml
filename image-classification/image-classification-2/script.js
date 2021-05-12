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

  mobilenet
  The machine learning model we will use in this program.

  img
  An image loaded into the program for classification.
*******************************************************************************/

//let mobilenet;

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
                               modelReady()

  A callback function. Called after the MobileNet model has been loaded. It
  should make the UI text read "Upload an image to classify!" and display the
  upload button for users.
*******************************************************************************/

function modelReady() {

}

/******************************************************************************
                               resetCanvas()

  What happens when a user clicks the reset button.

  1) The background should turn white.
  2) The submit and reset buttons should be hidden.
  3) The UI text should read "Upload an image to classify!"
  4) The upload button should be shown.

  Steps 3 and 4 can be accomplished by simply calling modelReady().
*******************************************************************************/

function resetCanvas() {

}

/******************************************************************************
                               handleFile(file)

  Handles files uploaded by the user. If the file is an image, load it and call
  imageReady() when done. Otherwise, set img to null.
*******************************************************************************/

function handleFile(file) {
  if(file.type === "image") {
    img = loadImage(file.data, imageReady);
  } else {
    img = null;
  }
}

/******************************************************************************
                               imageReady()

  A callback function, called after handleFile() has loaded an image.

  1) Draw the image to the canvas: image(img, 0, 0, width, height);
  2) Display the submit and reset buttons.
  3) Hide the upload button.
  4) Make the UI text read "Image ready for classification!"
*******************************************************************************/

function imageReady() {

}

/******************************************************************************
                               predictImage()

  What happens when a user clicks the submit button. Simply use MobileNet to
  classify the image on the canvas, and pass gotResults() as a callback.
*******************************************************************************/

function predictImage() {

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

}
