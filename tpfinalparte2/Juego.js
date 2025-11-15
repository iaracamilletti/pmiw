class Juego {
  constructor() {
    this.state = 'menu';
    this.targetToCollect = 15;
    this.gameTime = 60 * 1000;
    this.player = new Jugador();
    this.objects = [ new Objeto1(), new Objeto2(), new Objeto3() ];
    this.contador = new Contador();
    this.tiempo = new Tiempo();
    this.bgMusic = (typeof bgMusic !== 'undefined') ? bgMusic : null;
    this.sfxPlop = (typeof sfxPlop !== 'undefined') ? sfxPlop : null;
    this.musicPlaying = false;
    const margin = 10;
    const spacing = 8;
    if (typeof this.tiempo.setPosition === 'function') {
      this.tiempo.setPosition(margin, margin);
    } else {
      this.tiempo.posX = margin;
      this.tiempo.posY = margin;
    }
    if (typeof this.contador.setPosition === 'function') {
      this.contador.setPosition(margin, margin + (this.tiempo.h || 40) + spacing);
    } else {
      this.contador.posX = margin;
      this.contador.posY = margin + (this.tiempo.h || 40) + spacing;
    }
    this.collected = 0;
    this.startMillis = 0;
    this._menuButtons = null;
    this._creditsBack = null;
    this._gameoverBack = null;
    this.buttonColor = color(255, 0, 0, 150);
    if (this.contador) this.contador.Color = this.buttonColor;
    if (this.tiempo) this.tiempo.Color = this.buttonColor;
  }

  startGame() {
    this.collected = 0;
    this.startMillis = millis();
    for (let o of this.objects) {
      if (o && typeof o.respawn === 'function') o.respawn();
    }
    if (this.bgMusic && !this.musicPlaying) {
      try { this.bgMusic.setVolume(0.4); this.bgMusic.loop(); this.musicPlaying = true; } catch (e) {}
    }
    this.state = 'playing';
  }

  goToMenu() {
    if (this.bgMusic && this.bgMusic.isPlaying && this.bgMusic.isPlaying()) {
      try { this.bgMusic.stop(); } catch (e) {}
      this.musicPlaying = false;
    }
    this.state = 'menu';
  }

  goToCredits() {
    this.state = 'credits';
  }

  dibujar() {
    if (this.state === 'menu') {
      this.drawMenu();
      return;
    }
    if (this.state === 'playing') {
      this.updateGame();
      this.drawGame();
      return;
    }
    if (this.state === 'credits') {
      this.drawCredits();
      return;
    }
    if (this.state === 'gameover') {
      this.drawGameOver();
      return;
    }
  }

  updateGame() {
    if (this.player && typeof this.player.update === 'function') {
      this.player.update();
    } else if (this.player) {
      if (keyIsDown(LEFT_ARROW)) {
        this.player.posX = max(0, (this.player.posX || 0) - (this.player.velocidad || 5));
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.player.posX = min(width - (this.player.tamX || 0), (this.player.posX || 0) + (this.player.velocidad || 5));
      }
      if (typeof this.player.updateHitboxPosition === 'function') {
        this.player.updateHitboxPosition();
      } else if (this.player.hitboxJugador) {
        this.player.hitboxJugador.posX = (this.player.posX || 0) + (this.player.tamX || 0) / 2 - this.player.hitboxJugador.tamX / 2;
        this.player.hitboxJugador.posY = (this.player.posY || 0) + (this.player.tamY || 0) / 2 - this.player.hitboxJugador.tamY / 2;
      }
    }

    for (let o of this.objects) {
      if (!o) continue;
      if (typeof o.update === 'function') o.update();
      else if (typeof o.caida === 'function') o.caida();
    }

    let pjRect = null;
    if (this.player && typeof this.player.getHitboxRect === 'function') {
      pjRect = this.player.getHitboxRect();
    } else if (this.player && this.player.hitboxJugador) {
      pjRect = {
        x: this.player.hitboxJugador.posX,
        y: this.player.hitboxJugador.posY,
        w: this.player.hitboxJugador.tamX,
        h: this.player.hitboxJugador.tamY
      };
    }

    if (pjRect) {
      for (let o of this.objects) {
        if (!o) continue;
        let objRect = null;
        if (typeof o.getHitboxRect === 'function') {
          objRect = o.getHitboxRect();
        } else {
          objRect = {
            x: o.posX || 0,
            y: o.posY || 0,
            w: o.tamX || 0,
            h: o.tamY || 0
          };
        }

        if (this.rectsOverlap(pjRect, objRect)) {
          this.collected++;
          if (this.sfxPlop) { try { this.sfxPlop.play(); } catch (e) {} }
          if (typeof o.onCollected === 'function') {
            o.onCollected();
          } else if (typeof o.respawn === 'function') {
            o.respawn();
          } else {
            o.posY = -random(50, 200);
          }
        }
      }
    }

    if (typeof this.contador.setValues === 'function') {
      this.contador.setValues(this.collected, this.targetToCollect);
    } else {
      this.contador.collected = this.collected;
      this.contador.target = this.targetToCollect;
    }

    let elapsed = millis() - this.startMillis;
    let remaining = max(0, (this.gameTime || 0) - elapsed);
    if (typeof this.tiempo.setRemainingMillis === 'function') {
      this.tiempo.setRemainingMillis(remaining);
    } else {
      this.tiempo.remainingMillis = remaining;
    }

    if (this.collected >= this.targetToCollect) {
      this.state = 'gameover';
    }
    if (remaining <= 0 && this.startMillis > 0) {
      this.state = 'gameover';
    }
  }

  drawGame() {
    if (this.player && typeof this.player.dibujar === 'function') this.player.dibujar();
    else if (this.player) {
      push();
      noStroke();
      fill(50, 150, 200);
      rect(this.player.posX || 0, this.player.posY || 0, this.player.tamX || 40, this.player.tamY || 80);
      pop();
    }

    for (let o of this.objects) {
      if (!o) continue;
      if (typeof o.dibujar === 'function') o.dibujar();
      else {
        push();
        noStroke();
        fill(200, 100, 100);
        rect(o.posX || 0, o.posY || 0, o.tamX || 20, o.tamY || 20);
        pop();
      }
    }

    if (typeof this.contador.dibujar === 'function') this.contador.dibujar();
    if (typeof this.tiempo.dibujar === 'function') this.tiempo.dibujar();

    push();
    fill(255);
    noStroke();
    textSize(14);
    textAlign(RIGHT, TOP);
    text(`Recogidos: ${this.collected}/${this.targetToCollect}`, width - 10, 10);
    pop();
  }

  drawMenu() {
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text('El cohete!! - TP', width / 2, height / 3);
    pop();

    const bw = 200, bh = 50;
    const bx = width / 2 - bw / 2, by = height / 2 - bh / 2;
    push();
    fill(this.buttonColor);
    rect(bx, by, bw, bh, 8);
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text('PLAY', width / 2, by + bh / 2);
    pop();

    const by2 = by + bh + 20;
    push();
    fill(this.buttonColor);
    rect(bx, by2, bw, bh, 8);
    fill(255);
    text('CREDITOS', width / 2, by2 + bh / 2);
    pop();

    this._menuButtons = {
      play: { x: bx, y: by, w: bw, h: bh },
      credits: { x: bx, y: by2, w: bw, h: bh }
    };
  }

  drawCredits() {
    push();
    fill(0, 180);
    rect(0, 0, width, height);
    pop();

    push();
    fill(255);
    textAlign(CENTER, TOP);
    textSize(20);
    text('Créditos\n\nAutor:Nicolas Esquivel y Iara Camilletti!!\n\nVolver', width / 2, 50);
    pop();

    const bw = 140, bh = 40;
    const bx = width / 2 - bw / 2, by = height - 80;
    push();
    fill(this.buttonColor);
    rect(bx, by, bw, bh, 8);
    fill(255);
    textSize(16);
    text('Volver', width / 2, by + bh / 2);
    pop();

    this._creditsBack = { x: bx, y: by, w: bw, h: bh };
  }

  drawGameOver() {
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    pop();

    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(28);
    text('Fin del Juego', width / 2, height / 2 - 40);
    textSize(18);
    text(`Recogidos: ${this.collected}/${this.targetToCollect}`, width / 2, height / 2);
    pop();

    const bw = 200, bh = 50;
    const bx = width / 2 - bw / 2, by = height / 2 + 60;
    push();
    fill(this.buttonColor);
    rect(bx, by, bw, bh, 8);
    fill(255);
    text('Volver al menú', width / 2, by + bh / 2);
    pop();

    this._gameoverBack = { x: bx, y: by, w: bw, h: bh };
  }

  rectsOverlap(r1, r2) {
    if (!r1 || !r2) return false;
    return !(r1.x + r1.w < r2.x ||
             r2.x + r2.w < r1.x ||
             r1.y + r1.h < r2.y ||
             r2.y + r2.h < r1.y);
  }

  onMousePressed(mx, my) {
    if (this.state === 'menu') {
      if (this._menuButtons) {
        const p = this._menuButtons.play;
        const c = this._menuButtons.credits;
        if (mx >= p.x && mx <= p.x + p.w && my >= p.y && my <= p.y + p.h) {
          this.startGame();
          return;
        } else if (mx >= c.x && mx <= c.x + c.w && my >= c.y && my <= c.y + c.h) {
          this.goToCredits();
          return;
        }
      }
    } else if (this.state === 'credits') {
      const b = this._creditsBack;
      if (b && mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        this.goToMenu();
        return;
      }
    } else if (this.state === 'gameover') {
      const b = this._gameoverBack;
      if (b && mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        this.goToMenu();
        return;
      }
    }
  }
}