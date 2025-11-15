class Jugador {
  constructor(){
    this.posX = 290;
    this.posY = 300;
    this.tamX = 110;
    this.tamY = 190;
    this.velocidad = 5;

    this.hitboxJugador = new HitboxJugador();
    this.updateHitboxPosition();
  }

 
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.posX -= this.velocidad;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.posX += this.velocidad;
    }

    this.posX = constrain(this.posX, 0, width - this.tamX);

    this.updateHitboxPosition();
  }

  dibujar(){
    if (typeof bodoni !== 'undefined' && bodoni) {
      image(bodoni, this.posX, this.posY, this.tamX, this.tamY);
    } else {
      noStroke();
      fill(50,150,200);
      rect(this.posX, this.posY, this.tamX, this.tamY);
      fill(255);
      textSize(12);
      text('player', this.posX + 10, this.posY + 20);
    }
    this.hitboxJugador.dibujar();
  }

  updateHitboxPosition() {
    this.hitboxJugador.posX = this.posX + this.tamX / 2 - this.hitboxJugador.tamX / 2;
    this.hitboxJugador.posY = this.posY + this.tamY / 2 - this.hitboxJugador.tamY / 2;
  }

  getHitboxRect() {
    return { x: this.hitboxJugador.posX, y: this.hitboxJugador.posY, w: this.hitboxJugador.tamX, h: this.hitboxJugador.tamY };
  }
}
