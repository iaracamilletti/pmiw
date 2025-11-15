class BaseObjeto {
  constructor(rangeXMin, rangeXMax, imagen) {
    this.rangeXMin = rangeXMin;
    this.rangeXMax = rangeXMax;
    this.imagen = imagen;
    this.tamX = 52;
    this.tamY = 43;
    this.hitbox = new HitboxObjetos();
    this.respawn();
  }

  respawn() {
    this.posX = random(this.rangeXMin, this.rangeXMax);
    this.posY = random(-200, -20);
    this.velocidad = random(2, 5);
  }

  caida() {
    this.posY += this.velocidad;
    if (this.posY > height) {
      this.respawn();
    }
  }

  update() {
    this.caida();
  }

  dibujar() {
    image(this.imagen, this.posX, this.posY, this.tamX, this.tamY);
    this.hitbox.dibujar(this.posX, this.posY, this.tamX, this.tamY);
  }

  getHitboxRect() {
    let posX = this.posX + this.tamX / 2 - this.hitbox.tamX / 2;
    let posY = this.posY + this.tamY / 2 - this.hitbox.tamY / 2;
    return { x: posX, y: posY, w: this.hitbox.tamX, h: this.hitbox.tamY };
  }

  onCollected() {
    this.respawn();
  }
}

class Objeto1 extends BaseObjeto {
  constructor() {
    super(150, 250, objeto1);
  }
}
class Objeto2 extends BaseObjeto {
  constructor() {
    super(260, 360, objeto2);
  }
}
class Objeto3 extends BaseObjeto {
  constructor() {
    super(370, 470, objeto3);
  }
}
