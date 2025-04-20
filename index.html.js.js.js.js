<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ditss Ganteng</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { opacity: 0; animation: fadeUp 1s ease forwards; }
    .fade-delay-1 { animation-delay: 0.3s; }
    .fade-delay-2 { animation-delay: 0.6s; }
    .fade-delay-3 { animation-delay: 0.9s; }

    .neon-box {
      background-color: rgba(0, 0, 0, 0.3);
      border: 2px solid #00ffff;
      box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff inset;
      backdrop-filter: blur(10px);
      transition: 0.3s ease;
    }
    .neon-box:hover {
      box-shadow: 0 0 15px #00ffff, 0 0 30px #00ffff inset;
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    @keyframes blink {
      50% { border-color: transparent; }
    }
    .typing-text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid #0ff;
      animation: typing 3s steps(30, end) infinite, blink 0.75s step-end infinite;
    }

    @keyframes moveLeftRight {
      0% { transform: translateX(0); }
      50% { transform: translateX(20px); }
      100% { transform: translateX(0); }
    }
    .moving-text {
      animation: moveLeftRight 5s infinite;
    }

    .social-icon {
      transition: 0.3s;
      position: relative;
    }
    .social-icon:before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: 50%;
      box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .social-icon:hover:before {
      opacity: 1;
    }

    .weather-btn {
      @apply px-2 py-1 rounded text-sm font-bold text-white;
      position: relative;
    }
    .weather-btn img {
      width: 24px;
      height: 24px;
    }
    .weather-btn.active img {
      animation: bounce 1s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -1;
    }
  </style>
</head>
<body class="bg-gray-950 text-white font-sans relative">
  <!-- Canvas untuk efek -->
  <canvas id="weatherCanvas"></canvas>

  <!-- Tombol Pilih Efek -->
  <div class="fixed top-4 right-4 space-x-2 z-50">
    <button class="weather-btn bg-gray-700" onclick="setWeather('snow')">
      <img src="https://img.icons8.com/ios-filled/50/00ffff/snowflake.png" alt="Salju"/>
    </button>
    <button class="weather-btn bg-gray-700" onclick="setWeather('rain')">
      <img src="https://img.icons8.com/ios-filled/50/00ffff/rain.png" alt="Hujan"/>
    </button>
    <button class="weather-btn bg-gray-700" onclick="setWeather('lightning')">
      <img src="https://img.icons8.com/ios-filled/50/00ffff/lightning-bolt.png" alt="Petir"/>
    </button>
  </div>

  <!-- Konten Portofolio -->
  <div class="max-w-6xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold text-center text-cyan-400 mb-2 moving-text">
      <span class="typing-text">Hi, I'm Ditss</span>
    </h1>
    <p class="text-center text-gray-400 text-lg fade-up fade-delay-1">
      Developer & Creator of Asuma Multi Device
    </p>
    <div class="border-t border-cyan-400 my-6 w-24 mx-auto fade-up fade-delay-2"></div>

    <!-- Cards Section -->
    <div class="grid grid-cols-adjusted gap-8 mt-10">
      <!-- Bot WhatsApp Card -->
      <div class="neon-box rounded-lg shadow-lg fade-up fade-delay-1">
        <img src="https://img.icons8.com/ios-filled/100/00ffff/source-code.png" class="w-14 h-14 mb-4 mx-auto" />
        <h2 class="text-xl font-bold text-center mb-2">Bot WhatsApp</h2>
        <p class="text-sm text-gray-400 text-center mb-3">
          Asuma MD dengan fitur AI, game, store, edukasi, dll.
        </p>
        <a href="/download" class="block text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded">
          Download Link
        </a>
      </div>

      <!-- API Card -->
      <div class="neon-box rounded-lg shadow-lg fade-up fade-delay-2">
        <img src="https://img.icons8.com/ios-filled/100/00ffff/api.png" class="w-14 h-14 mb-4 mx-auto"/>
        <h2 class="text-xl font-bold text-center mb-2">API's</h2>
        <p class="text-sm text-gray-400 text-center mb-3">
          Akses API publik Ditss: download, edukasi, AI, info nomor, dan banyak lagi.
        </p>
        <a href="/api-page/index.html" class="block text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded">
          Kunjungi API
        </a>
      </div>

      <!-- Tambahkan kartu lain di sini -->
    </div>

    <p class="text-center text-xs text-gray-600 mt-10">© 2025 Ditss - All Rights Reserved</p>
  </div>

  <!-- Musik Otomatis -->
  <audio autoplay loop hidden>
    <source src="https://qu.ax/MXbkU.mp4" type="audio/mpeg">
  </audio>

  <!-- Scroll Animation -->
  <script>
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-visible');
      });
    });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  </script>

  <!-- Weather Canvas -->
  <script>
    const canvas = document.getElementById("weatherCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [], weather = "snow";

    function setWeather(type) {
      weather = type;
      document.querySelectorAll('.weather-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      createParticles();
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 3 + 1,
          d: Math.random() * 1 + 0.5
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = weather === "snow" ? "#fff" : "rgba(173,216,230,0.5)";
      ctx.beginPath();
      for (let p of particles) {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      updateParticles();
    }

    function updateParticles() {
      for (let p of particles) {
        p.y += weather === "snow" ? p.d : p.d * 5;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      }
    }

    function drawLightning() {
      if (weather !== "lightning") return;
      if (Math.random() < 0.03) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    function animate() {
      if (weather === "lightning") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLightning();
      } else {
        drawParticles();
      }
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();
  </script>
</body>
</html>
