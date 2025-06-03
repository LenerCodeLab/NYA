const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const pregunta = document.getElementById('pregunta');
const respuesta = document.getElementById('respuesta');
const btnPlay = document.getElementById('btnPlay');
const audio = document.getElementById('miAudio');
const btnEnviar = document.getElementById('btnEnviarWhatsapp');

btnNo.addEventListener('click', () => {
  const x = Math.floor(Math.random() * 150) - 75;
  const y = Math.floor(Math.random() * 150) - 75;
  btnNo.style.transform = `translate(${x}px, ${y}px)`;
});

btnSi.addEventListener('click', () => {
  pregunta.style.display = 'none';
  respuesta.style.display = 'flex'; // Mostrar nueva tarjeta
});

btnPlay.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btnPlay.textContent = "⏸️ Pausar música";
  } else {
    audio.pause();
    btnPlay.textContent = "🎵 Reprodúcelo amor";
  }
});

btnEnviar.addEventListener('click', () => {
  const mensaje = encodeURIComponent("¡Acepté ser tu enamorada! 💖");
  const numero = "51956392994";
  window.location.href = `https://wa.me/${numero}?text=${mensaje}`;
});
