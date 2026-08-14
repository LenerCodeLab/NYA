const btnNo = document.getElementById("btnNo");
const btnSi = document.getElementById("btnSi");
const pregunta = document.getElementById("pregunta");
const respuesta = document.getElementById("respuesta");
const btnSorpresa = document.getElementById("btnSorpresa");
const btnEnviar = document.getElementById("btnEnviarWhatsapp");
const reproductor = document.getElementById("musica");
const assetPrefix = window.location.pathname.includes("/Vistas/") ? "../" : "";
let intentosNo = 0;

btnNo.addEventListener("click", () => {
  intentosNo += 1;
  const escalaSi = 1 + intentosNo * 0.35;
  const escalaNo = Math.max(0.45, 1 - intentosNo * 0.08);

  btnSi.style.transform = `scale(${escalaSi})`;
  btnSi.style.zIndex = "20";
  btnNo.style.transform = `scale(${escalaNo})`;
  btnNo.textContent = intentosNo >= 5 ? "Ya casi dices Si" : "No";
});

btnSi.addEventListener("click", () => {
  pregunta.style.display = "none";
  respuesta.style.display = "flex";
});

btnSorpresa.addEventListener("click", () => {
  sessionStorage.setItem("iniciarSorpresa", "true");
  window.location.href = `${assetPrefix}Vistas/FLORES.html`;
});

btnEnviar.addEventListener("click", () => {
  const mensaje = encodeURIComponent("Acepte ser tu enamorada.");
  const numero = "51956392994";
  window.location.href = `https://wa.me/${numero}?text=${mensaje}`;
});

const canciones = [
  `${assetPrefix}audios/cancion1.mp3`,
  `${assetPrefix}audios/cancion2.mp3`
];

let indiceActual = 0;

reproductor.volume = 0.04;
reproductor.src = canciones[indiceActual];
reproductor.play().catch(() => {
  console.warn("El navegador bloqueo el autoplay. Requiere interaccion del usuario.");
});

reproductor.addEventListener("ended", () => {
  indiceActual = (indiceActual + 1) % canciones.length;
  reproductor.src = canciones[indiceActual];
  reproductor.play();
});

function iniciarMusica() {
  reproductor.muted = false;
  reproductor.volume = 0.05;
  reproductor.play();
}
