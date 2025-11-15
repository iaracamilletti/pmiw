class Tiempo {
  constructor(x = 10, y = 10) {
    this.posX = x;
    this.posY = y;
    this.w = 160;
    this.h = 40;
    this.Color = color(255, 0, 255);
    this.remainingMillis = 0;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  setRemainingMillis(ms) {
    this.remainingMillis = ms;
  }

  dibujar() {
    stroke(5);
    fill(this.Color);
    rect(this.posX, this.posY, this.w, this.h, 6);

    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    let secs = ceil(this.remainingMillis / 1000);
    text(`Tiempo: ${secs}s`, this.posX + 8, this.posY + this.h / 2);
  }
}
