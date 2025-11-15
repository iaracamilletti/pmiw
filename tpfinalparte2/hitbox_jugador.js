class HitboxJugador {
  constructor(){
    this.posX = 320;  
    this.posY = 410;  
    this.tamX = 48;
    this.tamY = 30;
    this.Color = color(255, 0, 0, 50); 
  }
  dibujar(){
    noStroke();
    fill(this.Color);
    rect(this.posX, this.posY, this.tamX, this.tamY);
  }
}
