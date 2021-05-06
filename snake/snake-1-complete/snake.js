class Snake {

  /*****************************************************************************
                                  constructor()

    This function is called when we write "new Snake()", as in:

    let snake = new Snake();

    Every new snake we create (or "construct") will have these default
    properties and values.
  *****************************************************************************/

  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(scaledWidth / 2),  floor(scaledHeight /
      2));
    this.xDir = 0;
    this.yDir = 0;
  }

  /*****************************************************************************
                                    update()

    The draw() function from p5.js runs in a continuous loop. To update the
    snake's body, we can call this function each time through the draw() loop.

    The snake "moves" in a peculiar pattern, where its tail (the first element
    of the array) is removed, its head (last element) is copied, the copied
    head moves, then is placed back on the end of the array as a new head.

    If that makes absolutely no sense to you, see the website for visuals. ^_^
  *****************************************************************************/

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xDir;
    head.y += this.yDir;
    this.body.push(head);
    // How the snake moves with just one segment
    //this.body[0].x += this.xDir;
    //this.body[0].y += this.yDir;
  }

  /*****************************************************************************
                                    endGame()

    The game can end in two ways: the snake touches one of the walls of the
    canvas, or it wraps around and touches itself.

    First, write code that checks if the snake is touching a wall of the
    canvas. Then write code that checks if it is touching any parts of its body.

    If the game should end, return true. Otherwise return false.
  *****************************************************************************/

  endGame() {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > scaledWidth - 1 || x < 0 || y > scaledHeight - 1 || y < 0) {
      return true;
    }
    for(let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if(part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  /*****************************************************************************
                                    grow()

    This function simply makes the snake add a new head to its body, which
    makes it longer. For our purposes, the head is the last element of the
    array, so

    this.body[this.body.length - 1]

    represents the snake's head. Copy this and place it at the end of the array
    to give the snake a new "head", making it longer.
  *****************************************************************************/

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  /*****************************************************************************
                                    eat(pos)

    This function detects if the position of the snake's head is overlapping
    with the position of the food. If the positions overlap, the snake should
    grow and this function should return true. Otherwise, this function should
    return false.
  *****************************************************************************/

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if(x === pos.x && y === pos.y) {
      this.grow();
      return true;
    } else {
      return false;
    }
  }

  /*****************************************************************************
                                    show()

    This function shows every part of the snake on the canvas.

    To do so, create a for-loop and draw a rectangle for each snake part, at
    its (x, y) coordinate, with a width and height of 1 (this will be scaled by
    our resolution multiplier). The code for drawing the rectangle will look
    like this:

    rect(this.body[i].x, this.body[i].y, 1, 1);
  *****************************************************************************/

  show() {
    for(let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }

  /*****************************************************************************
                                    setDir()

    A tiny function that sets the snake's x and y directions to the arguments
    passed into the function.
  *****************************************************************************/

  setDir(x, y) {
    this.xDir = x;
    this.yDir = y;
  }

}
