//iara camilletti, comision 1.
//https://youtu.be/4s-icVBvUYY

let figura;
let cant;

let coloresInvertidos = false;
let anguloRotacion = 0;

function preload(){
  figura = loadImage('data/figura.jpg');
}

function setup (){
  createCanvas(800,400);
  background(0);
  
  cant = 6;
}

function draw(){
  image(figura, 0, 0, 400, 400);
  grillaCoquette();
}

function mousePressed() {
  coloresInvertidos = !coloresInvertidos;
}

function keyPressed(){
  if (key == 'r' || key == 'R') {
    resetearEstadoOriginal();
  } else {
    rotarTriangulos();
  }
}

function rotarTriangulos() {
  anguloRotacion += radians(random(0, 360));
  cant = random(3, 10);
}

function resetearEstadoOriginal() {
  coloresInvertidos = false;
  anguloRotacion = 0;
  cant=6;
}

function calcularLadoCuadrado(anchoZona, cantidad) {
  return anchoZona / cantidad;
}

function grillaCoquette(){
  stroke(255);
  strokeWeight(1);
  noFill();
  
  let ladoCuadrado = calcularLadoCuadrado(width / 2, cant); 
  
  for (let col = 0; col < cant; col++){
    let x = width/2 + col * ladoCuadrado;
    let anchoCol = ladoCuadrado;
    if (col == cant - 1) {
      anchoCol = (width / 2) - (col * ladoCuadrado);
    }
    
    for(let ver = 0; ver < cant; ver++){
      let y = ver * ladoCuadrado; 
      let altoFila = ladoCuadrado;
      if (ver == cant - 1) { 
        altoFila = height - (ver * ladoCuadrado);
      }
      
      rect(x, y, anchoCol, altoFila);
      trianguloCoquette(x, y, anchoCol, altoFila, coloresInvertidos);
       push();
      translate(x + anchoCol / 2, y + altoFila / 2);
      rotate(anguloRotacion);
      miniTrianguloCoquette(anchoCol, altoFila, coloresInvertidos); 
      pop();
    }
  }
}

function trianguloCoquette(x, y, ladoW, ladoH, invertir){
  noStroke();
  
  if (invertir) {
    fill(255);
    triangle(x, y, x + ladoW, y, x, y + ladoH);   

    fill(0);
    triangle(x + ladoW, y, x + ladoW, y + ladoH, x, y + ladoH);
  } else {
    fill(0);
    triangle(x, y, x + ladoW, y, x, y + ladoH);   

    fill(255);
    triangle(x + ladoW, y, x + ladoW, y + ladoH, x, y + ladoH);
  }
}
  
function miniTrianguloCoquette(anchoMini, altoMini, invertir) {
  noStroke();
  
  let miniLado = min(anchoMini, altoMini) / 3.0; 
  let miniAncho = miniLado;
  let miniAlto = miniLado;
  let xMini = -miniAncho / 2;
  let yMini = -miniAlto / 2;

  if (invertir) {
    fill(0);              
    triangle(xMini, yMini, xMini+ miniAncho, yMini, xMini, yMini+ miniAlto);              
    
    fill(255);
    triangle(xMini+ miniAncho, yMini, xMini+ miniAncho, yMini+ miniAlto, xMini, yMini+ miniAlto);              
  } else {
    fill(255);
    triangle(xMini, yMini, xMini+ miniAncho, yMini, xMini, yMini+ miniAlto);              
    
    fill(0);
    triangle(xMini+ miniAncho, yMini, xMini+ miniAncho, yMini+ miniAlto, xMini, yMini+ miniAlto);              
  }
}
