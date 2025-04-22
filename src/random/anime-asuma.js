const axios = require('axios');

// Fungsi untuk mengambil buffer gambar dari URL
async function getBuffer(url) {
    try {
        console.log(`Fetching image from: ${url}`); // Debug log
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        console.log('Image fetched successfully'); // Debug log
        return Buffer.from(response.data);
    } catch (error) {
        console.error('Error fetching image buffer:', error.message); // Debug log
        throw new Error('Error fetching image buffer');
    }
}

module.exports = function(app) {
    app.get('/random/asuma', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, error: 'Apikey invalid' });
            }

            const imageUrl = 'https://example.com/path/to/your/image.jpg';  // Ganti dengan URL yang valid

            // Ambil gambar sebagai buffer
            const imageBuffer = await getBuffer(imageUrl);

            res.writeHead(200, {
                'Content-Type': 'image/jpeg',  // Ganti jika format gambar berbeda
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);

        } catch (error) {
            console.error('API Error:', error.message);  // Debug log
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
