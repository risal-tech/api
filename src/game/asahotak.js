const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Kamu bisa ganti port sesuai keinginan

// URL file JSON di GitHub
const jsonUrl = 'https://raw.githubusercontent.com/ditss-dev/database/main/game/asahotak.json';

// Endpoint untuk mendapatkan data game
app.get('/game/asahotak', async (req, res) => {
  try {
    const response = await axios.get(jsonUrl);  // Mengambil data JSON dari GitHub
    res.json(response.data);  // Mengirim data JSON sebagai response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// Server start
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
