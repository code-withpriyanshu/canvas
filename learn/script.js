import { Player } from "./player.js";
import { InputHandler } from "./input.js";
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime) {
      this.player.update(this.input.key, deltaTime);
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  // my dog will run at 10 fps but my overall game will run at 144 fps
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
