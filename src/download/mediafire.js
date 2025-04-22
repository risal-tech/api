const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function mediaFire(url) {
  try {
    const response = await fetch('https://r.jina.ai/' + url, {
      headers: {
        'x-return-format': 'html',
      }
    });

    const text = await response.text();
    const $ = cheerio.load(text);

    const title = $('div.dl-btn-label').text().trim();
    const filename = $('div.dl-btn-label').attr('title');
    const link = $('div.dl-utility-nav a').attr('href');
    const downloadUrl = $('a#downloadButton').attr('href');

    // Cek ukuran file dengan aman
    const sizeText = $('a#downloadButton').text();
    const sizeMatch = sizeText.match(/(.*?)/);
    const size = sizeMatch ? sizeMatch[1] : null;

    // Cek waktu upload dengan aman
    const timeText = $('div.DLExtraInfo-uploadLocation div.DLExtraInfo-sectionDetails').text();
    const Time = timeText.match(/This file was uploaded from (.*?) on (.*?) at (.*?)\n/);

    // Cek region map dengan fallback
    const regionClass = $('div.DLExtraInfo-uploadLocationRegion').attr('data-lazyclass') || 'unknown';

    if (!downloadUrl) {
      return { error: 'Download link not found. Mungkin link sudah tidak tersedia atau salah URL.' };
    }

    return {
      title,
      filename,
      link,
      url: downloadUrl,
      size,
      from: Time ? Time[1] : null,
      date: Time ? Time[2] : null,
      time: Time ? Time[3] : null,
      map: {
        background: "https://static.mediafire.com/images/backgrounds/download/additional_content/world.svg",
        region: `https://static.mediafire.com/images/backgrounds/download/additional_content/${regionClass}.svg`,
      },
      repair: $('a.retry').attr('href'),
    };

  } catch (error) {
    return { error: error.message };
  }
}

module.exports = function (app) {
  app.get('/download/mediafire', async (req, res) => {
    try {
      const { apikey, url } = req.query;
      if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
      if (!url) return res.json({ status: false, error: 'Url is required' });

      const results = await mediaFire(url);

      res.status(200).json({
        status: true,
        creator: 'ditss',
        result: results
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}
