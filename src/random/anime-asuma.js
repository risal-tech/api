const axios = require('axios');

// Fungsi untuk mengambil buffer gambar dari URL
async function getBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error('Error fetching image buffer');
    }
}

module.exports = function(app) {
    // Endpoint API untuk menampilkan gambar langsung
    app.get('/random/asuma', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, error: 'Apikey invalid' });
            }

            // URL gambar yang ingin ditampilkan
            const imageUrl = 'https://example.com/path/to/your/image.jpg';  // Ganti dengan URL gambar yang sesuai

            // Ambil gambar sebagai buffer
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
