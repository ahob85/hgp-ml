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
                          Global Game Variables

  snake
  A snake object, represented as an array of vectors. The player character!

  food
  A food object, represented as a single vector. The thing the snake eats!

  resolution
  The resolution of the canvas. Used for graphics scaling.

  scaledWidth, scaledHeight
  Values representing the scaled width and height of the canvas, after
  resolution is taken into account.

  score
  The player's score. Eating food increases the score by 1.
*******************************************************************************/

//let snake;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {
  // Build the interface

  // Set the resolution to 20. Play with this later if you want.

  // Scaled width and height are width / resolution, height / resolution

  // Set the game's framerate to 5 (or whatever you prefer)

  // Call resetGame() to initialize everything else.

}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  // Scale the canvas according to resolution, then refresh the background

  // Check if snake is eating the food

  // Draw the snake

  // Draw the food

  // Check for game over

}

/******************************************************************************
                                createFood()

  Creates food and places it at a random location on the (scaled) canvas.
*******************************************************************************/

function createFood() {

}

/******************************************************************************
                                keyPressed()

  A built-in function in p5.js. Checks if keys are pressed. You can create
  interactive controls with this function!
*******************************************************************************/

function keyPressed() {

}

/******************************************************************************
                                resetGame()

  A callback function. When resetButton is clicked, it calls this function. We
  can also call this function in setup() to initialize many things in the game.

  Create a new snake, reset score to 0, and place the food in a random
  location. Call loop() to make the game continue on. Finally, hide the button
  div again.
*******************************************************************************/

function resetGame() {

}
