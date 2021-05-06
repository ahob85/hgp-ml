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
let resetButton;

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

let snake;
let food;
let resolution;
let scaledWidth;
let scaledHeight;
let score;

/******************************************************************************
                                  setup()

  This is a built-in p5.js function that is automatically called when the
  program starts, just before draw(). This is used for initializing global
  variables, building the UI, and loading images, video, data, and models.
*******************************************************************************/

function setup() {
  // Build the interface
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP();
  textP.parent(textDiv);
  buttonDiv = createDiv();
  resetButton = createButton("Reset Game");
  resetButton.mousePressed(resetGame);
  resetButton.parent(buttonDiv);
  // Set the resolution to 20. Play with this later if you want.
  resolution = 20;
  // Scaled width and height are width / resolution, height / resolution
  scaledWidth = floor(width / resolution);
  scaledHeight = floor(height / resolution);
  // Set the game's framerate to 5 (or whatever you prefer)
  frameRate(5);
  // Call resetGame() to initialize everything else.
  resetGame();
}

/******************************************************************************
                                  draw()

  This is a built-in p5.js function that is automatically called in a repeated
  loop, just after setup(). This is used for handling animations, or running
  anything over and over again throughout a program.
*******************************************************************************/

function draw() {
  // Scale the canvas according to resolution, then refresh the background
  scale(resolution);
  background(220);
  // Check if snake is eating the food
  if(snake.eat(food)) {
    foodLocation();
    score++;
    textP.html("Score: " + score);
  };
  // Draw the snake
  snake.update();
  snake.show();
  // Draw the food
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  // Check for game over
  if(snake.endGame()) {
    textP.html("YOU LOSE. Final Score: " + score);
    background(255, 0, 0);
    noLoop();
    buttonDiv.style("display", "block");
  }
}

/******************************************************************************
                                foodLocation()

  Places the food at a random location on the canvas, based on w
*******************************************************************************/

function foodLocation() {
  let x = floor(random(scaledWidth));
  let y = floor(random(scaledHeight));
  food = createVector(x, y);
}

/******************************************************************************
                                keyPressed()

  A built-in function in p5.js. Checks if keys are pressed. You can create
  interactive controls with this function!
*******************************************************************************/

function keyPressed() {
  if(keyCode === LEFT_ARROW && snake.xDir === 0) {
    snake.setDir(-1, 0);
  } else if(keyCode === RIGHT_ARROW && snake.xDir === 0) {
    snake.setDir(1, 0);
  } else if(keyCode === UP_ARROW && snake.yDir === 0) {
    snake.setDir(0, -1);
  } else if(keyCode === DOWN_ARROW && snake.yDir === 0) {
    snake.setDir(0, 1);
  }
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
  snake = new Snake();
  foodLocation();
  score = 0;
  textP.html("Score: " + score);
  loop();
  buttonDiv.style("display", "none");
}
