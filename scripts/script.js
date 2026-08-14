const PHONE = "51956392994";
const MESSAGE = encodeURIComponent("Hola amor, ya vi tu pagina y me encanto.");

const btnWhatsapp = document.getElementById("btn-whatsapp");
const audio = document.getElementById("bgm");
const btnMusic = document.getElementById("btn-music");

btnWhatsapp.href = `https://api.whatsapp.com/send?phone=${PHONE}&text=${MESSAGE}`;
audio.volume = 0.04;

let isPlaying = false;

btnMusic.addEventListener("click", async () => {
  if (isPlaying) {
    audio.pause();
    btnMusic.textContent = "Reproducir musica";
    isPlaying = false;
    return;
  }

  try {
    await audio.play();
    btnMusic.textContent = "Pausar musica";
    isPlaying = true;
  } catch (error) {
    alert("Toca el boton otra vez para iniciar la musica.");
  }
});
