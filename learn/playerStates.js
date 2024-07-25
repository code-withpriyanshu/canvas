const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  STANDING: 4,
};

class State {
  constructor(state) {
    this.state = state;
  }
}
export class SITTING extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 5;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight"))
      this.player.setState(states.RUNNING);
    else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING);
    else if (input === null) this.player.setState(states.STANDING);
  }
}
export class RUNNING extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 3;
  }
  handleInput(input) {
    if (input === null) this.player.setState(states.STANDING);
    if (input.includes("ArrowDown")) this.player.setState(states.SITTING);
    else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING);
  }
}
export class JUMPING extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy -= 25;
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight)
      this.player.setState(states.FALLING);
    else if (input === null) this.player.setState(states.STANDING);
  }
}
export class FALLING extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 2;
  }
  handleInput(input) {
    if (this.player.onGround()) this.player.setState(states.RUNNING);
    else if (input === null) this.player.setState(states.STANDING);
  }
}
export class STANDING extends State {
  constructor(player) {
    super("STANDING");
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input === null) this.player.setState(states.STANDING);
    if (input.includes("ArrowDown")) this.player.setState(states.SITTING);
    else if (input.includes("ArrowUp")) this.player.setState(states.JUMPING);
    else if (input.includes("ArrowRight")) this.player.setState(states.RUNNING);
  }
}
