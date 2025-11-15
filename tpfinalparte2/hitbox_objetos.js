class HitboxObjetos {
  constructor() {
    this.tamX = 52;
    this.tamY = 43;
    this.Color = color(255, 0, 0, 50);
  }

  dibujar(posXObjeto, posYObjeto, tamXObjeto, tamYObjeto) {
    let posX = posXObjeto + tamXObjeto / 2 - this.tamX / 2;
    let posY = posYObjeto + tamYObjeto / 2 - this.tamY / 2;
    noStroke();
    fill(this.Color);
    rect(posX, posY, this.tamX, this.tamY);
  }
}
