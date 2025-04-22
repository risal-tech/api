const axios = require('axios');

// Fungsi untuk mengambil gambar sebagai buffer
async function getImageBuffer(url) {
  try {
    // Mengambil data gambar menggunakan axios
    const response = await axios.get(url, {
      responseType: 'arraybuffer'  // Mendapatkan respons dalam bentuk buffer
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching image: ' + error.message);
  }
}

// API untuk anime, misalnya "Naruto"
module.exports = function(app) {
  async function getAnimeImage(query) {
    try {
      const data = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: {
          q: query,        // Pencarian berdasarkan nama anime
          limit: 1          // Hanya mengambil 1 anime pertama yang ditemukan
        }
      });

      const anime = data.data.data[0];
      if (!anime) {
        throw new Error('Anime tidak ditemukan');
      }

      // Mendapatkan URL gambar anime
      const imageUrl = anime.images.jpg.large_image_url;
      return imageUrl;
    } catch (error) {
      throw new Error('Error fetching anime info: ' + error.message);
    }
  }

  // Endpoint untuk mendapatkan gambar anime berdasarkan query
  app.get('/anime/image', async (req, res) => {
    try {
      const { apikey, query } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'API Key invalid' });
      }

      if (!query) {
        return res.json({ status: false, error: 'Query anime tidak ditemukan' });
      }

      // Mendapatkan URL gambar anime
      const imageUrl = await getAnimeImage(query);
      
      // Mengambil gambar menggunakan buffer
      const imageBuffer = await getImageBuffer(imageUrl);

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
