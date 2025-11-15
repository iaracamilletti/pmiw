// tpfinalparte1 IPMIW Comision 1 
//Nicolas Esquivel - 122687/2 
//Iara Camilletti - 122628/0
//Link Video: https://youtu.be/dEV00o3Z4yM?si=LufaYWkLEXMFsIOg

let ElCohete = [];
let texto = [];              
let estado = 'Portada';
let puedeReiniciar = false;
let Fondo;
let Click;
let Nave;

function preload() {
  for (let i = 0; i <= 18; i++) {
    ElCohete[i] = loadImage('data/elcohete' + i + '.jpg');
  }
  Fondo = loadSound('data/fondo.mp3');
  Click = loadSound('data/Click.mp3');
  Nave = loadSound('data/Nave.mp3');
}

function setup() {
  createCanvas(640, 480);
  texto[0] = 'Observas los cohetes en el cielo y soñas con viajar al espacio.';
  texto[1] = 'tu vecino te advierte: los viajes son solo para ricos, los pobres deben resignarse.';
  texto[2] = 'Tienes ahorrado $3000, pero solo uno puede ir a Marte, siendo vos o uno de su familia.';
  texto[3] = 'tu egoísmo te lleva a decidir de irse solo a Marte.';
  texto[4] = 'tu familia se enoja teniendo un gran desprecio hacia vos.';
  texto[5] = 'Pareces aceptar la realidad; mejor invertir en el taller y olvidarte del sueño.';
  texto[6] = 'Un hombre llega a tu depósito y te propone comprar un cohete.';
  texto[7] = 'Con el dinero compraste maquinaria para mejorar tu taller.';
  texto[8] = 'Seguis con tu sueño de viajar a Marte y te quedas viendo los cohetes despegar desde su casa.';
  texto[9] = 'Compras un modelo de cohete viejo e inservible, lo colocas en tu patio.';
  texto[10] = 'Decidis usarlo para simular un viaje y regalar a tus hijos la ilusión de viajar a marte.';
  texto[11] = 'Desde tu inexperiencia instalas motores, luces y efectos para recrear despegues y paisajes espaciales.';
  texto[12] = 'Los niños suben al cohete para emprender la simulación.';
  texto[13] = 'Los niños se dan cuenta que es una simulación.';
  texto[14] = 'Terminan decepcionados de vos, y María te consuela por al menos haberlo intentado.';
  texto[15] = 'Durante días, viven el viaje: la luna, meteoros, Marte. Todo gracias a ilusiones.';
  texto[16] = 'El cohete aterriza. Los niños bajan emocionados, convencidos de haber viajado de verdad.';
  texto[17] = 'María comprende el sacrificio: Entregaste los ahorros para regalarles el universo.';
  Fondo.play();
  Fondo.loop();
}

function draw() {
  background(0);
  textAlign(LEFT, TOP);
  textSize(18);
  fill(255);
  textLeading(28);
  
  if (estado === 'Portada') {
    image(ElCohete[18], 0, 0);
    boton(270, 400, 100, 50, 'Comenzar');
  }
  if (estado === 'PantallaInicio') {
    image(ElCohete[0], 0, 0);
    mostrarTexto(texto[0], 50, 20, 540, height - 80);   
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Final01') {
    image(ElCohete[1], 0, 0);
    mostrarTexto(texto[1], 50, 50, 540, height - 80);
    boton(60, 400, 180, 50, 'Siguiente');
  }
  if (estado === 'Eleccion1') {
    image(ElCohete[2], 0, 0);
    mostrarTexto(texto[2], 50, 50, 540, height - 80);
    boton(60, 400, 180, 50, 'Aceptar la Realidad');
    boton(400, 400, 180, 50, 'Viajar Solo a Marte');
  }
  if (estado === 'Final03') {
    image(ElCohete[3], 0, 0);
    mostrarTexto(texto[5], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Eleccion2') {
    image(ElCohete[4], 0, 0);
    mostrarTexto(texto[6], 50, 50, 540, height - 80);
    boton(60, 400, 180, 50, 'No Comprar');
    boton(400, 400, 180, 50, 'Comprar');
  }
  if (estado === 'Fin0') {
    image(ElCohete[12], 0, 0);
    mostrarTexto(texto[7], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Fin1') {
    image(ElCohete[13], 0, 0);
    mostrarTexto(texto[8], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Fin');
  }
  if (estado === 'FinFin0') {
    image(ElCohete[14], 0, 0);
    mostrarTexto(texto[3], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'FinFin1') {
    image(ElCohete[15], 0, 0);
    mostrarTexto(texto[4], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Fin');
  }
  if (estado === 'Final05') {
    image(ElCohete[5], 0, 0);
    mostrarTexto(texto[9], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Final06') {
    image(ElCohete[6], 0, 0);
    mostrarTexto(texto[10], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Final07') {
    image(ElCohete[7], 0, 0);
    mostrarTexto(texto[11], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Eleccion3') {
    image(ElCohete[8], 0, 0);
    mostrarTexto(texto[12], 50, 50, 540, height - 80);
    boton(60, 400, 180, 50, 'Simulacion Sale Mal');
    boton(400, 400, 180, 50, 'Simulacion Sale Bien');
  }
  if (estado === 'Final09') {
    image(ElCohete[9], 0, 0);
    mostrarTexto(texto[15], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'FinalFinal0') {
    image(ElCohete[16], 0, 0);
    mostrarTexto(texto[13], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'FinalFinal1') {
    image(ElCohete[17], 0, 0);
    mostrarTexto(texto[14], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Fin');
  }
  if (estado === 'Final10') {
    image(ElCohete[10], 0, 0);
    mostrarTexto(texto[16], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Siguiente');
  }
  if (estado === 'Final11') {
    image(ElCohete[11], 0, 0);
    mostrarTexto(texto[17], 50, 50, 540, height - 80);
    boton(270, 400, 100, 50, 'Fin');
  }
  if (estado === 'Creditos') {
    background(0);
    fill(255);
    push();
    textAlign(CENTER, CENTER);
    text('Nicolas Esquivel - 122687/2', width/2, height/3);
    text('Iara Camiletti - 122628/0', width/2, height/2);
    text('-------Creditos-------', width/2, height/4);
    text('TPFINAL PARTE 1 IMPIW', width/2, height/2 + 100);
    text('Comisión 1', width/2, height/4 - 50);
    boton(270, 400, 100, 50, 'Reiniciar');
    puedeReiniciar = true;
  }
}

function mousePressed() {
  if (estado === 'FinalFinal0' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'FinalFinal1';
    return;
  }
  if (estado === 'FinalFinal1' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Creditos';
    return;
  }
  if (estado === 'Final11' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Creditos';
    return;
  }
  if (estado === 'Portada' && overMouse(270, 400, 100, 50)) {
    Click.play();
    Fondo.play();
    estado = 'PantallaInicio';
    return;
  }
  if (estado === 'PantallaInicio' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Final01';
    return;
  }
  if (estado === 'Final01' && overMouse(60, 400, 180, 50)) {
    Click.play();
    estado = 'Eleccion1';
    return;
  }
  if (estado === 'Eleccion1') {
    if (overMouse(60, 400, 180, 50)) {
      Click.play();
      estado = 'Final03';
      return;
    }
    if (overMouse(400, 400, 180, 50)) {
      Click.play();
      estado = 'FinFin0';
      return;
    }
  }
  if (estado === 'Final03' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Eleccion2';
    return;
  }
  if (estado === 'Eleccion2') {
    if (overMouse(60, 400, 180, 50)) {
      Click.play();
      estado = 'Fin0';
      return;
    }
    if (overMouse(400, 400, 180, 50)) {
      Click.play();
      estado = 'Final05';
      return;
    }
  }
  if (estado === 'Fin0' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Fin1';
    return;
  }
  if (estado === 'Fin1' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Creditos';
    return;
  }
  if (estado === 'FinFin0' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'FinFin1';
    return;
  }
  if (estado === 'FinFin1' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Creditos';
    return;
  }
  if (estado === 'Final05' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Final06';
    return;
  }
  if (estado === 'Final06' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Final07';
    return;
  }
  if (estado === 'Final07' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Eleccion3';
    return;
  }
  if (estado === 'Eleccion3') {
    if (overMouse(60, 400, 180, 50)) {
      Click.play();
      estado = 'FinalFinal0';
      return;
    }
    if (overMouse(400, 400, 180, 50)) {
      Click.play();
      Fondo.stop();
      Nave.play();
      estado = 'Final09';
      return;
    }
  }
  if (estado === 'Final09' && overMouse(270, 400, 100, 50)) {
    Fondo.play();
    Click.play();
    Nave.stop();
    estado = 'Final10';
    return;
  }
  if (estado === 'Final10' && overMouse(270, 400, 100, 50)) {
    Click.play();
    estado = 'Final11';
    return;
  }
  if (estado === 'Creditos' && puedeReiniciar && overMouse(270, 400, 100, 50)) {
    Click.play();
    Fondo.stop();
    estado = 'Portada';
    puedeReiniciar = false;
    return;
  }
}

function boton(x, y, w, h, txt) {
  push();
  if (overMouse(x, y, w, h)) fill(200, 100, 50);
  else fill(211, 180, 64, 150);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text(txt, x + w/2, y + h/2);
  pop();
}

function overMouse(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mostrarTexto(txt, x, y, ancho) {
  let palabras = txt.split(' ');
  let linea = '';
  let numLineas = 1;
  for (let p of palabras) {
    let prueba = linea + p + ' ';
    if (textWidth(prueba) > ancho) {
      numLineas++;
      linea = p + ' ';
    } else {
      linea = prueba;
    }
  }
  let alto = numLineas * textLeading();
  push();
  noStroke();
  fill(0, 150);
  rect(x - 10, y - 10, ancho + 20, alto + 20, 10);
  pop();
  text(txt, x, y, ancho);
}
