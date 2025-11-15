//iara camilletti.
//nicolas esquivel.
//link del video: https://youtu.be/Sr7a8QGXXX0.
let pntlJuego;

function setup() {
  createCanvas(640, 480);
  pntlJuego = new Juego();
}

function draw() {
  image(fondo, 0, 0);
  if (pntlJuego && typeof pntlJuego.dibujar === 'function') pntlJuego.dibujar();
}

function mousePressed() {
  if (typeof getAudioContext === 'function' && getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  if (pntlJuego && typeof pntlJuego.onMousePressed === 'function') {
    pntlJuego.onMousePressed(mouseX, mouseY);
  }
}
