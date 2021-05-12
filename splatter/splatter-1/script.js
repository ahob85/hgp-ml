// Author:

/*******************************************************************************
                          Global UI Variables

  canvasDiv, textDiv, buttonDiv, sliderDiv
  In the project's HTML, the divs that will contain various elements that may
  be created in setup(). Useful for styling (e.g., keeping them all centered).

  canvas
  The p5.js canvas. This is where all the magic happens!

  textP, spans
  This is where you will print any kind of text (e.g., the label of an image).

  buttons, sliders
  If included, these are for user interaction (e.g., training a model, inputting
  data).
*******************************************************************************/

// let canvasDiv;
let canvasDiv;
let canvas;
let buttonDiv;
let clearButton;
let sliderDiv;
let slider;
let minSpan;
let maxSpan;


/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {
  // create canvas UI
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  background(65, 60, 88);
  canvas.mousePressed(drawEllipse);
  canvas.parent(canvasDiv);
  // create slider UI

  // create button UI
  buttonDiv = createDiv();
  clearButton = createButton("Clear Canvas");
  clearButton.mousePressed(function() {
    background(65, 60, 88);
  });
  clearButton.parent(buttonDiv);
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
                               drawEllipse()

  Draw an ellipse to the canvas wherever the user has clicked. Choose any color
  and size you like.
*******************************************************************************/

function drawEllipse() {
  fill("#f00");
  ellipse(mouseX, mouseY, 100);
}


/******************************************************************************
                              drawSplatter()

  Creates ellipses on the canvas around where the mouse is clicked.

  Details:
   -The function creates between 10 and 14 ellipses (random).
   -Each ellipse will be a random color and have no outline.
   -Each ellipse will have a random width (5 to 14 pixels).
   -Each ellipse's x and y values are calculated like this:
     x = random value between mouseX - spread and mouseX + spread
     y = random value between mouseY - spread and mouseY + spread
   -Note that "spread" is accessed through the value of the slider:
     slider.value()
*******************************************************************************/

function drawSplatter(){

}
