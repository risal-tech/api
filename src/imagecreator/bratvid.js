const axios = require("axios");

module.exports = function app(app) {
  app.get("/imagecreator/bratvid", async (req, res) => {
    try {
      const { apikey, text } = req.query;
      
      // Validasi apikey
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: "Apikey invalid" });
      }

      // Validasi teks
      if (!text) {
        return res.json({ status: false, error: "Masukkan parameter text" });
      }

      const words = text.split(" ");
      const frames = [];

      for (let i = 0; i < words.length; i++) {
        const currentText = words.slice(0, i + 1).join(" ");
        const img = await axios.get(
          `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`,
          { responseType: "arraybuffer" }
        );
        frames.push(`data:image/png;base64,${Buffer.from(img.data).toString("base64")}`);
      }

      res.json({
        status: true,
        total: frames.length,
        frames
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
