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

/*******************************************************************************
                            Global ML Variables

  detector
  The machine learning model we will use in this program.

  img
  An image loaded into the program for classification.
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
  img = loadImage('../../images/cats-dogs.jpg', function() {
    image(img, 0, 0, width, height);
  });
  detector = ml5.objectDetector("cocossd");
  detector.detect(canvas, gotResults);
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
    //console.log(results);
    for(let i = 0; i < results.length; i++) {
      let object = results[i];
      stroke("green");
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill("red");
      textSize(20);
      text(results[i].label + ": " + (round(results[i].confidence, 2) * 100) + "%", results[i].x + 10, results[i].y + 20);
    }
  }
}
