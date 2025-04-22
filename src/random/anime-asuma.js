const axios = require('axios');

async function getAnimeData() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/ditss-dev/database/main/anime/asuma.tokii.json');
        return response.data; // Mengembalikan data JSON dari GitHub
    } catch (error) {
        throw new Error('Error fetching anime data');
    }
}

// Fungsi untuk mengambil gambar acak dari data anime
async function getRandomAnimeImage() {
    try {
        const animeData = await getAnimeData();
        const randomIndex = Math.floor(Math.random() * animeData.length); // Ambil index acak
        const selectedAnime = animeData[randomIndex]; // Ambil data anime berdasarkan index acak
        const imageUrl = selectedAnime.image; // Ambil URL gambar anime
        return imageUrl;
    } catch (error) {
        throw new Error('Error fetching random anime image');
    }
}

// Fungsi untuk mengambil buffer gambar
async function getBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error('Error fetching image buffer');
    }
}

module.exports = function(app) {
    // Endpoint API untuk mengambil gambar anime acak
    app.get('/random/asuma', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, error: 'Apikey invalid' });
            }

            // Ambil gambar anime acak
            const imageUrl = await getRandomAnimeImage();
            const imageBuffer = await getBuffer(imageUrl);

            // Kirim gambar ke pengguna
            res.writeHead(200, {
                'Content-Type': 'image/jpeg', // Ganti jika format gambar berbeda
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);

        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
