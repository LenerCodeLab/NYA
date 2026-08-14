document.body.classList.remove("container");
const reproductor = document.getElementById("musica");
const loveWords = document.getElementById("loveWords");
const finalLoveMessage = document.getElementById("finalLoveMessage");
reproductor.volume = 0.04;
reproductor.src = "../audios/cancion1.mp3";

const palabras = [
  "Mi Amor",
  "Mi Cariño",
  "Mi Ternura",
  "Mi Dulzura",
  "Mi Pasión",
  "Mi Admiración",
  "Mi Felicidad",
  "Mi Alegría",
  "Mi Calma",
  "Mi Paz",
  "Mi Corazón",
  "Mi Alma",
  "Mi Vida",
  "Mi Destino",
  "Mi Cielo",
  "Mi Luna",
  "Mi Tesoro",
  "Mi Princesa",
  "Mi Amada",
  "Mi Hermosa",
  "Mi Preciosa",
  "Mi Especial",
  "Mi Única",
  "Mi Perfecta",
  "Mi Inolvidable",
  "Mi Encantadora",
  "Mi Adorable",
  "Mi Irremplazable",
  "Mi Compañera",
  "Mi Hogar",
  "Mi Refugio",
  "Mi Fortaleza",
  "Mi Inspiración",
  "Mi Motivo",
  "Mi Promesa",
  "Mi Destino",
  "Mi vida",
  "Mi amor",
  "Mi cielo",
  "Mi corazón",
  "Mi persona favorita",
  "Mi lugar seguro",
  "Mi felicidad",
  "Mi casualidad favorita",
  "Mi mejor historia",
  "Mi bonito destino",
  "Mi hogar",
  "Mi todo"
];

let indicePalabra = 0;
let palabrasActivas = 0;
let palabrasTerminadas = false;

function iniciarMusica() {
  reproductor.volume = 0.04;
  reproductor.play();
}

function brotarPalabra() {
  if (!loveWords) {
    return;
  }

  if (indicePalabra >= palabras.length) {
    palabrasTerminadas = true;
    mostrarMensajeFinal();
    return;
  }

  const palabra = document.createElement("span");
  palabra.className = "love-word";
  palabra.textContent = palabras[indicePalabra];
  palabra.style.left = `${46 + Math.random() * 14}%`;
  palabra.style.bottom = `${22 + Math.random() * 12}vmin`;
  palabra.style.setProperty("--drift", `${Math.random() * 24 - 12}vw`);
  palabra.style.setProperty("--rise", `${28 + Math.random() * 18}vh`);
  palabra.style.setProperty("--size", `${15 + Math.random() * 13}px`);
  palabra.style.setProperty("--duration", `${8 + Math.random() * 2.8}s`);
  palabra.style.setProperty("--delay", "0s");
  loveWords.appendChild(palabra);
  palabrasActivas += 1;

  palabra.addEventListener("animationend", () => {
    palabrasActivas -= 1;
    palabra.remove();
    mostrarMensajeFinal();
  });

  indicePalabra += 1;
}

function mostrarMensajeFinal() {
  if (!palabrasTerminadas || palabrasActivas > 0 || !finalLoveMessage) {
    return;
  }

  finalLoveMessage.classList.add("is-visible");
}

const intervaloPalabras = setInterval(() => {
  if (indicePalabra >= palabras.length) {
    clearInterval(intervaloPalabras);
    palabrasTerminadas = true;
    mostrarMensajeFinal();
    return;
  }

  brotarPalabra();
}, 1800);

brotarPalabra();

if (sessionStorage.getItem("iniciarSorpresa") === "true") {
  sessionStorage.removeItem("iniciarSorpresa");
  iniciarMusica();
}
