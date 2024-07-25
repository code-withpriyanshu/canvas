export class InputHandler {
  constructor() {
    this.key = [];
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && this.key.indexOf(e.key) === -1) {
        this.key.push(e.key);
      }
      if (e.key === "ArrowUp" && this.key.indexOf(e.key) === -1) {
        this.key.push(e.key);
      }
      if (e.key === "ArrowLeft" && this.key.indexOf(e.key) === -1) {
        this.key.push(e.key);
      }
      if (e.key === "ArrowRight" && this.key.indexOf(e.key) === -1) {
        this.key.push(e.key);
      }
      if (e.key === "Enter" && this.key.indexOf(e.key) === -1) {
        this.key.push(e.key);
      }
      console.log(this.key);
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter"
      ) {
        const index = this.key.indexOf(e.key);
        if (index !== -1) {
          this.key.splice(index, 1);
        }
      }
    });
  }
}
