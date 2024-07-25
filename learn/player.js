import {
  SITTING,
  RUNNING,
  JUMPING,
  FALLING,
  STANDING,
} from "./playerStates.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.image = document.getElementById("one");
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 2;
    this.weight = 1;
    this.states = [
      new SITTING(this),
      new RUNNING(this),
      new JUMPING(this),
      new FALLING(this),
      new STANDING(this),
    ];
    this.currentState = this.states[4];
    this.currentState.enter();
    this.maxFrame = 5;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(input, deltaTime) {
    if (input === null) this.currentState = this.states[4];
    console.log(input);
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0; // for reference
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context, deltaTime) {
    // context.fillStyle = "red";
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
