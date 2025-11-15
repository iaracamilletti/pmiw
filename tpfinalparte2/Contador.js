class Contador {
  constructor(x = 10, y = 10) {
    this.posX = x;
    this.posY = y;
    this.w = 140;
    this.h = 30;
    this.Color = color(0, 255, 255);
    this.collected = 0;
    this.target = 0;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  setValues(collected, target) {
    this.collected = collected;
    this.target = target;
  }

  dibujar() {
    stroke(5);
    fill(this.Color);
    rect(this.posX, this.posY, this.w, this.h, 6);

    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text(`Rec: ${this.collected}/${this.target}`, this.posX + 8, this.posY + this.h / 2);
  }
}
