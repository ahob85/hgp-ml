// https://teachablemachine.withgoogle.com/models/mOUcIMCbN/

// UI Variables
let canvasDiv;
let canvas;
let textDiv;
let gameText;
let buttonDiv;
let corvetteButton;
let destroyerButton;
let dreadnoughtButton;
let playAgainButton;

// Game Variables
let gameRunning;
let shipShooting;
let alienShooting;
let score;

// Ship Variables
let shipDiameter;
let shipX;
let shipY;
let shipSpeed;
let shipColor;

// Bullet Variables
let bulletDiameter;
let bulletX;
let bulletY;

// Alien Variables
let alienDiameter;
let alienX;
let alienY;
let alienVelocity;

// Alien Bullet Variables
let alienBulletDiameter;
let alienBulletX;
let alienBulletY;

// ML Variables
let soundClassifier;
let labelString = "";

/*
 * setup()
 * This function is called once. Sets up the canvas, access HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * variables.
 */
function setup() {
  // ML setup
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/mOUcIMCbN/model.json", options, modelReady);
  // Build UI
  textDiv = createDiv();
  gameText = createP("Model loading, please wait...");
  gameText.parent(textDiv);
  buttonDiv = createDiv();
  corvetteButton = createButton("Corvette");
  corvetteButton.parent(buttonDiv);
  corvetteButton.style("display", "none");
  destroyerButton = createButton("Destroyer");
  destroyerButton.parent(buttonDiv);
  destroyerButton.style("display", "none");
  dreadnoughtButton = createButton("Dreadnaught");
  dreadnoughtButton.parent(buttonDiv);
  dreadnoughtButton.style("display", "none");
  playAgainButton = createButton("Play Again");
  playAgainButton.parent(buttonDiv);
  playAgainButton.style("display", "none");
  // Add events to buttons
  corvetteButton.mousePressed(function() {
    createShip("#ff0000", 60, 10, 20);
    gameRunning = true;
    toggleShipButtons();
    gameText.html("Score: " + score);
    canvas.style("display", "block");
  });
  destroyerButton.mousePressed(function() {
    createShip("#00ff00", 80, 6, 30);
    gameRunning = true;
    toggleShipButtons();
    gameText.html("Score: " + score);
    canvas.style("display", "block");
  });
  dreadnoughtButton.mousePressed(function() {
    createShip("#0000ff", 100, 2, 40);
    gameRunning = true;
    toggleShipButtons();
    gameText.html("Score: " + score);
    canvas.style("display", "block");
  });
  playAgainButton.mousePressed(resetGame);
  // Initialize other variables
  gameRunning = false;
  resetVariables();
    // Canvas appears under the UI
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  background(20, 30, 40);
  canvas.style("display", "none");
}

function modelReady() {
  console.log("Model Ready!");
  soundClassifier.classify(gotResults);
  toggleShipButtons();
  gameText.html("Select Ship");
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    console.log(results[0].label);
    labelString = results[0].label;
  }
}

function createShip(sColor, sDiameter, sSpeed, bDiameter) {
  shipColor = sColor;
  shipDiameter = sDiameter;
  shipX = width / 2;
  shipY = height - shipDiameter  / 2;
  shipSpeed = sSpeed;
  bulletDiameter = bDiameter;
}

/*
 * gameOver()
 * This function stops the game from running, hides the game screen, and shows
 * the game over screen.
 */
function gameOver() {
  gameRunning = false;
  gameText.html("Game Over! Your Score: " + score);
  canvas.style("display", "none");
  playAgainButton.style("display", "inline");
}

/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables, hiding gameOverScreen, and showing the gameScreen.
 */
function resetGame() {
  playAgainButton.style("display", "none");
  resetVariables();
  toggleShipButtons();
  gameText.html("Select Ship");
}

/*
 * resetVariables()
 * This function sets most non-ship variables to their original values.
 * These include all alien variables, the score, and the two "shooting"
 * variables.
 */
function resetVariables() {
  alienDiameter = 40;
  alienX = alienDiameter / 2;
  alienY = alienDiameter / 2;
  alienVelocity = 1;
  alienBulletDiameter = 15;
  shipShooting = false;
  alienShooting = false;
  score = 0;
}

function toggleShipButtons() {
  if(gameRunning) {
    corvetteButton.style("display", "none");
    destroyerButton.style("display", "none");
    dreadnoughtButton.style("display", "none");
  } else {
    corvetteButton.style("display", "inline");
    destroyerButton.style("display", "inline");
    dreadnoughtButton.style("display", "inline");
  }
}

/*
 * draw()
 * This function animates the ship, alien, and bullets.
 */
function draw() {
  if(gameRunning) {
    background(20, 30, 40);
    drawShip();
    drawAlien();
    if(shipShooting) {
      drawBullet();
    }
    if(alienShooting) {
      drawAlienBullet();
    }
  }
}

/*
 * drawShip()
 * This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */
function drawShip() {
  if(labelString.toLowerCase().includes("left") && shipX > shipDiameter / 2) {
    shipX -= shipSpeed;
  } else if(labelString.toLowerCase().includes("right") && shipX < width - shipDiameter / 2) {
    shipX += shipSpeed;
  } else if(labelString.toLowerCase().includes("fire") && !shipShooting && gameRunning) {
    bulletY = shipY - shipDiameter / 2;
    bulletX = shipX;
    shipShooting = true;
  }
  fill(shipColor);
  ellipse(shipX, shipY, shipDiameter, shipDiameter);
}

/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */
function keyPressed() {
  if(keyCode === 32 && !shipShooting && gameRunning) {
    bulletY = shipY - shipDiameter / 2;
    bulletX = shipX;
    shipShooting = true;
  }
}

/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien also becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */
function drawBullet() {
  let hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);
  if(bulletY > 0 && !hitAlien) {
    fill("#ffff00");
    noStroke();
    ellipse(bulletX, bulletY, bulletDiameter, bulletDiameter);
    bulletY -= 10;
  }
  else if(hitAlien) {
    resetAlien();
    alienVelocity++;
    score++;
    gameText.html("Score: " + score);
    shipShooting = false;
  }
  else {
    shipShooting = false;
  }
}

/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */
function drawAlien() {
  let hitShip = checkCollision(shipX, shipY, shipDiameter, alienX, alienY, alienDiameter);
  if((alienX - alienDiameter / 2 < width && alienY - alienDiameter / 2 < height) && !hitShip) {
    alienX += alienVelocity;
    if(alienX >= width - alienDiameter / 2 || alienX <= alienDiameter / 2) {
      alienVelocity *= -1;
      alienY += alienDiameter / 2;
    }
    fill("#ff00ff");
    ellipse(alienX, alienY, alienDiameter, alienDiameter);
    // if(random(4) < 1 && !alienShooting) {
    //   alienBulletY = alienY + alienDiameter / 2;
    //   alienBulletX = alienX;
    //   alienShooting = true;
    // }
  }
  else if(hitShip) {
    gameOver();
  }
  else { //this should never happen since you can't dodge the alien!
    resetAlien();
  }
}

/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */
function resetAlien() {
  alienX = alienDiameter / 2;
  alienY = alienDiameter / 2;
  alienVelocity = abs(alienVelocity);
}

/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */
function drawAlienBullet() {
  let hitShip = checkCollision(shipX, shipY, shipDiameter, alienBulletX, alienBulletY, alienBulletDiameter);
  if(alienBulletY < height && !hitShip) {
    fill("#00ffff");
    noStroke();
    ellipse(alienBulletX, alienBulletY, alienBulletDiameter, alienBulletDiameter);
    alienBulletY += 10;
  }
  else if(hitShip) {
    gameOver();
  }
  else {
    alienShooting = false;
  }
}

/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles (a and b)
 * based on their X and Y values. Based on the distance value, the function
 * returns "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle a diameter + circle b diameter) / 2)
 */
function checkCollision(aX, aY, aD, bX, bY, bD) {
  distance = dist(aX, aY, bX, bY);
  if(distance <= (aD + bD) / 2) {
    return true;
  }
  else {
    return false;
  }
}

// Don't touch this, it "fixes" a bug in ml5.js
function getLabel(result) {
  const entries = Object.entries(result.confidencesByLabel);
  let greatestConfidence = entries[0];
  for(let i = 0; i < entries.length; i++) {
    if(entries[i][1] > greatestConfidence[1]) {
      greatestConfidence = entries[i];
    }
  }
  return greatestConfidence[0];
}
