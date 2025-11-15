let bodoni, fondo;
let objeto1, objeto2, objeto3;
let bgMusic, sfxPlop;

function preload(){
  soundFormats('mp3', 'wav', 'ogg');
  bodoni = loadImage('data/Bodoni.png');
  fondo = loadImage('data/fondo.png');
  objeto1 = loadImage('data/objeto1.png');
  objeto2 = loadImage('data/objeto2.png');
  objeto3 = loadImage('data/objeto3.png');

  bgMusic = loadSound('data/music.mp3',
    () => console.log('bgMusic cargado'),
    (err) => console.warn('error cargando bgMusic', err)
  );

  sfxPlop = loadSound('data/plop.mp3',
    () => console.log('sfxPlop cargado'),
    (err) => console.warn('error cargando sfxPlop', err)
  );
}
