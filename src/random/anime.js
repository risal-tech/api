const axios = require('axios');

// Fungsi untuk mengambil gambar acak berdasarkan nama anime
async function getRandomAnimeImage(query) {
  try {
    // Mencari anime berdasarkan nama menggunakan Jikan API
    const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: {
        q: query,        // Mencari berdasarkan nama anime
        limit: 10         // Mengambil beberapa hasil (misalnya 10 anime)
      }
    });

    // Memastikan data ditemukan
    const animeList = response.data.data;
    if (!animeList || animeList.length === 0) {
      throw new Error('Anime tidak ditemukan');
    }

    // Memilih anime secara acak dari hasil pencarian
    const randomAnime = animeList[Math.floor(Math.random() * animeList.length)];
    
    // Mengambil URL gambar dari anime yang dipilih secara acak
    return randomAnime.images.jpg.large_image_url;
  } catch (error) {
    throw new Error('Error fetching random anime image: ' + error.message);
  }
}

// Fungsi untuk mengambil gambar sebagai buffer
async function getImageBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'  // Mendapatkan respons dalam bentuk buffer
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching image: ' + error.message);
  }
}

// API untuk gambar anime berdasarkan nama secara acak
module.exports = function(app) {
  app.get('/anime/randomimage', async (req, res) => {
    try {
      const { apikey, query } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'API Key invalid' });
      }

      if (!query) {
        return res.json({ status: false, error: 'Query anime tidak ditemukan' });
      }

      // Mendapatkan URL gambar anime acak berdasarkan query
      const animeImageUrl = await getRandomAnimeImage(query);

      // Mengambil gambar menggunakan buffer
      const imageBuffer = await getImageBuffer(animeImageUrl);

      // Mengirim gambar dalam bentuk buffer
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',  // Menentukan jenis gambar (JPEG, PNG, dll)
        'Content-Length': imageBuffer.length,
      });
      res.end(imageBuffer);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
