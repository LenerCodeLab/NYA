import * as THREE from "https://unpkg.com/three@0.160.1/build/three.module.js";

const canvas = document.querySelector("#universe");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

const universe = new THREE.Group();
const clock = new THREE.Clock();

let cameraDistance = getDefaultCameraDistance();
let isDragging = false;
let spinEnabled = true;
let lastX = 0;
let lastY = 0;
let rotationVelocity = 0.00115;

const loveWords = [
  "Te amo",
  "Mi amor",
  "Yenni",
  "Mi cielo",
  "Siempre contigo",
  "Tus ojos",
  "Mi sonrisa favorita",
  "Nuestro infinito",
  "Mi paz",
  "Mi vida",
  "Contigo todo",
  "Mi casualidad bonita"
];

const romanticSymbols = [
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F",
  "\u2665",
  "\u273F"
];

setupRenderer();
buildLights();
buildStars();
buildGalaxy();
buildPlanets();
buildOrbitGuides();
buildLoveElements();
bindControls();
animate();

function setupRenderer() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(0, 12, cameraDistance);
}

function buildLights() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.82));

  const roseLight = new THREE.PointLight(0xff6aa8, 70, 130);
  roseLight.position.set(-22, 16, 18);
  scene.add(roseLight);

  const blueLight = new THREE.PointLight(0x69c6ff, 44, 120);
  blueLight.position.set(24, -8, -28);
  scene.add(blueLight);
}

function buildStars() {
  const count = 850;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 120 + Math.random() * 720;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const index = i * 3;

    positions[index] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index + 2] = radius * Math.cos(phi);

    const tint = new THREE.Color().setHSL(0.9 + Math.random() * 0.1, 0.48, 0.76 + Math.random() * 0.18);
    colors[index] = tint.r;
    colors[index + 1] = tint.g;
    colors[index + 2] = tint.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.95,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });

  universe.add(new THREE.Points(geometry, material));
  scene.add(universe);
}

function buildGalaxy() {
  const count = 1050;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const index = i * 3;
    const branch = (i % 5) / 5 * Math.PI * 2;
    const radius = 8 + Math.random() * 66;
    const spin = radius * 0.22;
    const noise = (Math.random() - 0.5) * (7 + radius * 0.12);

    positions[index] = Math.cos(branch + spin) * radius + noise;
    positions[index + 1] = (Math.random() - 0.5) * 5.6;
    positions[index + 2] = Math.sin(branch + spin) * radius + noise;

    const inside = new THREE.Color("#ffe2ef");
    const outside = new THREE.Color("#ffd0e2");
    const mixed = inside.lerp(outside, radius / 74);
    colors[index] = mixed.r;
    colors[index + 1] = mixed.g;
    colors[index + 2] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.42,
    vertexColors: true,
    transparent: true,
    opacity: 0.58,
    blending: THREE.AdditiveBlending
  });

  universe.add(new THREE.Points(geometry, material));
}

function buildPlanets() {
  const heartCore = createPlanet({
    size: 4.6,
    colors: ["#8f4eff", "#f45f9f", "#ffd7ef"],
    highlight: "#ffe0ed",
    texture: "clouds"
  });
  heartCore.position.set(0, 0, 0);
  universe.add(heartCore);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(8.1, 0.06, 16, 160),
    new THREE.MeshBasicMaterial({ color: "#ffd4e4", transparent: true, opacity: 0.55 })
  );
  ring.rotation.x = Math.PI / 2.7;
  universe.add(ring);

  const planetData = [
    { size: 2.05, colors: ["#c57b46", "#e2ad72", "#7d4932"], texture: "bands", x: 15, y: 0, z: -5, ring: true },
    { size: 1.35, colors: ["#1b6fb8", "#67c7ff", "#e9fbff"], texture: "clouds", x: -20, y: 0, z: 8 },
    { size: 1.55, colors: ["#c9443f", "#9f6b48", "#f0b273"], texture: "rock", x: 26, y: 0, z: -10 },
    { size: 1.25, colors: ["#d8c28b", "#f0e0a8", "#9b7f54"], texture: "bands", x: -32, y: 0, z: -14 }
  ];

  planetData.forEach((planetInfo) => {
    const planet = createPlanet({
      size: planetInfo.size,
      colors: planetInfo.colors,
      highlight: "#ffffff",
      texture: planetInfo.texture
    });
    planet.position.set(planetInfo.x, planetInfo.y, planetInfo.z);

    if (planetInfo.ring) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(planetInfo.size * 1.85, 0.045, 14, 120),
        new THREE.MeshBasicMaterial({ color: "#f2d1a0", transparent: true, opacity: 0.68 })
      );
      ring.rotation.x = Math.PI / 2.45;
      planet.add(ring);
    }

    universe.add(planet);
  });
}

function buildOrbitGuides() {
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(51, 0.035, 8, 220),
    new THREE.MeshBasicMaterial({
      color: "#ffd6e7",
      transparent: true,
      opacity: 0.2
    })
  );

  orbit.rotation.x = Math.PI / 2;
  universe.add(orbit);
}

function createPlanet({ size, colors, highlight, texture }) {
  const geometry = new THREE.SphereGeometry(size, 48, 48);
  const baseColor = colors[0];
  const material = new THREE.MeshStandardMaterial({
    color: baseColor,
    map: createPlanetTexture(colors, texture),
    emissive: baseColor,
    emissiveIntensity: 0.08,
    roughness: 0.72,
    metalness: 0.05
  });
  const planet = new THREE.Mesh(geometry, material);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(size * 1.16, 48, 48),
    new THREE.MeshBasicMaterial({
      color: highlight,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    })
  );

  planet.add(glow);
  return planet;
}

function createPlanetTexture(colors, mode) {
  const size = 256;
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");

  const gradient = context.createLinearGradient(0, 0, 0, size);
  colors.forEach((color, index) => gradient.addColorStop(index / Math.max(colors.length - 1, 1), color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  if (mode === "bands") {
    for (let y = 0; y < size; y += 12) {
      context.fillStyle = y % 24 === 0 ? "rgba(255, 255, 255, 0.18)" : "rgba(55, 25, 20, 0.16)";
      context.fillRect(0, y + Math.sin(y) * 2, size, 5 + Math.random() * 7);
    }
  }

  if (mode === "rock" || mode === "clouds") {
    for (let i = 0; i < 240; i += 1) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = mode === "clouds" ? 8 + Math.random() * 20 : 2 + Math.random() * 9;
      context.fillStyle = mode === "clouds" ? "rgba(255, 255, 255, 0.16)" : "rgba(45, 20, 16, 0.16)";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildLoveElements() {
  const orbitItems = createDistributedLoveItems();

  orbitItems.forEach((item, index) => {
    const sprite = item.src ? createPhotoSprite(item.src) : createTextSprite(item.text, item.kind);
    const position = getStaticOrbitPosition(index, orbitItems.length, item.radius);
    position.y = item.y ?? 0;
    sprite.position.copy(position);
    universe.add(sprite);
  });
}

function createDistributedLoveItems() {
  const photoItems = [
    "../../img/Amor1.jpeg",
    "../../img/Amor2.jpeg",
    "../../img/Amor3.jpeg",
    "../../img/Amor4.jpeg",
    "../../img/Picnic1.jpeg",
    "../../img/Picnic2.jpeg",
    "../../img/Picnic3.jpeg",
    "../../img/Ropa1.jpeg",
    "../../img/Ropa2.jpeg",
    "../../img/Ropa3.jpeg",
    "../../img/flowers.png",
    "../../img/background.jpg"
  ];
  const items = [];
  const accents = romanticSymbols.map((symbol) => ({
    text: symbol,
    kind: symbol === "\u2665" ? "heart" : "rose",
    radius: 14,
    y: 0
  }));

  photoItems.forEach((src, index) => {
    accents.splice(index * 3 + 1, 0, {
      src,
      kind: "photo",
      radius: 18 + (index % 4) * 4,
      y: (index % 3 - 1) * 2
    });
  });

  loveWords.forEach((word, index) => {
    items.push({ text: word, kind: "word", radius: 24 + (index % 3) * 4 });

    if (accents[index]) {
      items.push(accents[index]);
    }
  });

  accents.slice(loveWords.length).forEach((accent, index) => {
    items.push({
      ...accent,
      radius: 12 + (index % 5) * 5,
      y: (index % 5 - 2) * 2.8
    });
  });

  return items;
}

function getStaticOrbitPosition(index, total, radius) {
  const angle = (index / total) * Math.PI * 2;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius
  );
}

function createTextSprite(text, kind) {
  const textureCanvas = document.createElement("canvas");
  const context = textureCanvas.getContext("2d");
  const isSymbol = kind === "heart" || kind === "rose";
  const fontSize = isSymbol ? 72 : 34;
  const horizontalPadding = isSymbol ? 26 : 34;
  const verticalPadding = isSymbol ? 20 : 22;

  context.font = `900 ${fontSize}px Segoe UI, Arial, sans-serif`;
  textureCanvas.width = isSymbol ? 132 : Math.max(220, Math.ceil(context.measureText(text).width + horizontalPadding * 2));
  textureCanvas.height = isSymbol ? 132 : fontSize + verticalPadding * 2;
  context.font = `900 ${fontSize}px Segoe UI, Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (isSymbol) {
    context.fillStyle = kind === "heart" ? "rgba(255, 73, 139, 0.24)" : "rgba(255, 204, 220, 0.2)";
    drawRoundRect(context, 8, 8, textureCanvas.width - 16, textureCanvas.height - 16, 48);
    context.fill();
    context.fillStyle = kind === "heart" ? "#ff78aa" : "#ffd1df";
    context.fillText(text, textureCanvas.width / 2, textureCanvas.height / 2 + 2);
  } else {
    context.fillStyle = "rgba(22, 8, 24, 0.82)";
    drawRoundRect(context, 4, 4, textureCanvas.width - 8, textureCanvas.height - 8, 32);
    context.fill();
    context.strokeStyle = "rgba(255, 255, 255, 0.44)";
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = "#ffffff";
    context.fillText(text, textureCanvas.width / 2, textureCanvas.height / 2 + 1);
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: true
  });
  const sprite = new THREE.Sprite(material);
  const aspect = textureCanvas.width / textureCanvas.height;
  const height = isSymbol ? 2.35 : 1.55;
  sprite.scale.set(height * aspect, height, 1);
  return sprite;
}

function createPhotoSprite(src) {
  const texture = new THREE.TextureLoader().load(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: true
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4, 4, 1);
  return sprite;
}

function drawRoundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function bindControls() {
  document.querySelector("#zoomIn").addEventListener("click", () => setZoom(cameraDistance - 8));
  document.querySelector("#zoomOut").addEventListener("click", () => setZoom(cameraDistance + 8));
  document.querySelector("#resetView").addEventListener("click", resetView);
  document.querySelector("#toggleSpin").addEventListener("click", toggleSpin);

  canvas.addEventListener("pointerdown", (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    universe.rotation.y += deltaX * 0.006;
    universe.rotation.x += deltaY * 0.004;
    universe.rotation.x = THREE.MathUtils.clamp(universe.rotation.x, -0.9, 0.9);
    lastX = event.clientX;
    lastY = event.clientY;
  });

  canvas.addEventListener("pointerup", (event) => {
    isDragging = false;
    canvas.releasePointerCapture(event.pointerId);
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    setZoom(cameraDistance + Math.sign(event.deltaY) * 5);
  }, { passive: false });

  window.addEventListener("resize", onResize);
}

function setZoom(distance) {
  cameraDistance = THREE.MathUtils.clamp(distance, 34, 118);
}

function toggleSpin() {
  spinEnabled = !spinEnabled;
  document.querySelector("#toggleSpin").textContent = spinEnabled ? "Pausar" : "Girar";
}

function resetView() {
  spinEnabled = true;
  cameraDistance = getDefaultCameraDistance();
  universe.rotation.set(0.14, 0, 0);
  document.querySelector("#toggleSpin").textContent = "Pausar";
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  cameraDistance = Math.max(cameraDistance, getDefaultCameraDistance());
}

function animate() {
  const elapsed = clock.getElapsedTime();

  if (spinEnabled && !isDragging) {
    universe.rotation.y += rotationVelocity;
    universe.rotation.x = 0.12 + Math.sin(elapsed * 0.25) * 0.035;
  }

  camera.position.z += (cameraDistance - camera.position.z) * 0.08;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function getDefaultCameraDistance() {
  return window.innerWidth < 680 ? 86 : 66;
}
