const axios = require('axios') // Bawaan Node.js
const FormData = require('form-data') // Ini juga
const WebSocket = require('ws') // Ini juga
const cheerio = require('cheerio')
const crypto = require('crypto') // Ini juga

async function Ytdl(url, type, quality) {
  try {
    const api = { base: { video: 'https://amp4.cc', audio: 'https://amp3.cc' } }
    const headers = { Accept: 'application/json', 'User-Agent': 'Postify/1.0.0' }
    const cookies = {}

    const parse_cookies = (set_cookie_headers) => {
      if (set_cookie_headers) {
        set_cookie_headers.forEach((cookie) => {
          const [key_value] = cookie.split(';')
          const [key, value] = key_value.split('=')
          cookies[key] = value
        })
      }
    }

    const get_cookie_string = () => Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')

    const client_get = async (url) => {
      const res = await axios.get(url, { headers: { ...headers, Cookie: get_cookie_string() } })
      parse_cookies(res.headers['set-cookie'])
      return res
    }

    const client_post = async (url, data, custom_headers = {}) => {
      const res = await axios.post(url, data, {
        headers: { ...headers, Cookie: get_cookie_string(), ...custom_headers }
      })
      parse_cookies(res.headers['set-cookie'])
      return res
    }

    const yt_regex = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([a-zA-Z0-9_-]{11})/
    const formats = { video: ['144p', '240p', '360p', '480p', '720p', '1080p'], audio: ['64k', '128k', '192k', '256k', '320k'] }

    const hash_challenge = async (salt, number, algorithm) => {
      return crypto.createHash(algorithm.toLowerCase()).update(salt + number).digest('hex')
    }

    const verify_challenge = async (challenge_data, salt, algorithm, max_number) => {
      for (let i = 0; i <= max_number; i++) {
        if (await hash_challenge(salt, i, algorithm) === challenge_data) {
          return { number: i, took: Date.now() }
        }
      }
      throw new Error('Captcha verification failed')
    }

    const solve_captcha = async (challenge) => {
      const { algorithm, challenge: challenge_data, salt, maxnumber, signature } = challenge
      const solution = await verify_challenge(challenge_data, salt, algorithm, maxnumber)
      return Buffer.from(
        JSON.stringify({
          algorithm,
          challenge: challenge_data,
          number: solution.number,
          salt,
          signature,
          took: solution.took
        })
      ).toString('base64')
    }

    const connect_ws = async (id, is_audio) => {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket(`wss://${is_audio ? 'amp3' : 'amp4'}.cc/ws`, ['json'], {
          headers: { ...headers, Origin: `https://${is_audio ? 'amp3' : 'amp4'}.cc` },
          rejectUnauthorized: false
        })

        let file_info = {}
        let timeout_id = setTimeout(() => {
          ws.close()
        }, 30000)

        ws.on('open', () => ws.send(id))
        ws.on('message', (data) => {
          const res = JSON.parse(data)
          if (res.event === 'query' || res.event === 'queue') {
            file_info = { thumbnail: res.thumbnail, title: res.title, duration: res.duration, uploader: res.uploader }
          } else if (res.event === 'file' && res.done) {
            clearTimeout(timeout_id)
            ws.close()
            resolve({ ...file_info, ...res })
          }
        })
        ws.on('error', (err) => {
          clearTimeout(timeout_id)
        })
      })
    }

    const is_audio = type === 'audio'
    const base_url = is_audio ? api.base.audio : api.base.video
    const link_match = url.match(yt_regex)
    if (!link_match) throw new Error('Invalid URL')

    const fixed_url = `https://youtu.be/${link_match[3]}`
    const page_data = await client_get(`${base_url}/`)
    const $ = cheerio.load(page_data.data)
    const csrf_token = $('meta[name="csrf-token"]').attr('content')

    if (!isNaN(quality)) {
      quality = `${quality}${is_audio ? 'k' : 'p'}`
    }

    const form_data = new FormData()
    form_data.append('url', fixed_url)
    form_data.append('format', is_audio ? 'mp3' : 'mp4')
    form_data.append('quality', quality)
    form_data.append('service', 'youtube')
    if (is_audio) form_data.append('playlist', 'false')
    form_data.append('_token', csrf_token)

    const captcha_data = await client_get(`${base_url}/captcha`)
    if (captcha_data.data) {
      const solved_captcha = await solve_captcha(captcha_data.data)
      form_data.append('altcha', solved_captcha)
    }

    const endpoint = is_audio ? '/convertAudio' : '/convertVideo'
    const res = await client_post(`${base_url}${endpoint}`, form_data, form_data.getHeaders())

    const ws_data = await connect_ws(res.data.message, is_audio)
    const download_link = `${base_url}/dl/${ws_data.worker}/${res.data.message}/${encodeURIComponent(ws_data.file)}`

    return {
      title: ws_data.title || '-',
      type: is_audio ? 'audio' : 'video',
      format: is_audio ? 'mp3' : 'mp4',
      thumbnail: ws_data.thumbnail || `https://i.ytimg.com/vi/${link_match[3]}/maxresdefault.jpg`,
      download: download_link,
      duration: ws_data.duration,
      quality: quality,
      uploader: ws_data.uploader
    }
  } catch (err) {
    throw Error(err.message)
  }
}

const GetIdYoutube = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    if (hostname === "youtu.be") {
      return urlObj.pathname.substring(1);
    }

    if (
      hostname.includes("youtube.com") &&
      (urlObj.pathname.startsWith("/watch") || urlObj.searchParams.has("v"))
    ) {
      return urlObj.searchParams.get("v");
    }

    const match = urlObj.pathname.match(/\/(embed|shorts)\/([^/?]+)/);
    if (match) return match[2];

    throw new Error("ID video tidak ditemukan dalam URL");
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    return null;
  }
};

const ytmp3 = {
  getInfo: async (url) => {
    try {
      const idYt = GetIdYoutube(url);
      if (!idYt) throw new Error("Gagal mendapatkan ID video");

      const { data } = await axios.get(
        `https://c01-h01.cdnframe.com/api/v4/info/${idYt}`
      );

      return data;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil info:", error.message);
      return null;
    }
  },

  convert: async (token) => {
    try {
      const { data } = await axios.post(
        "https://c01-h01.cdnframe.com/api/v4/convert",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        }
      );

      return data;
    } catch (error) {
      console.error("Terjadi kesalahan saat konversi:", error.message);
      return null;
    }
  },

  process: async (url) => {
    try {
      const info = await ytmp3.getInfo(url);
      if (!info) throw new Error("Gagal mendapatkan informasi video");

      const { title, thumbnail, formats } = info;
      if (!formats?.audio?.mp3?.length)
        throw new Error("Format audio tidak tersedia");

      const token = formats.audio.mp3[0].token;
      const convertData = await ytmp3.convert(token);
      if (!convertData?.id) throw new Error("Gagal melakukan konversi");

      let statusData;
      do {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 2 detik sebelum request berikutnya

        const { data } = await axios.get(
          `https://c01-h01.cdnframe.com/api/v4/status/${convertData.id}`
        );

        statusData = data;
        console.log(`Proses: ${statusData.progress}% - Status: ${statusData.state}`);
      } while (!statusData.download);

      return statusData;
    } catch (error) {
      console.error("Terjadi kesalahan saat memproses:", error.message);
      return null;
    }
  },
}

module.exports = function (app) {
app.get('/download/ytmp4', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
            const { url } = req.query;
            if (!url) {
            return res.json({ status: false, error: 'Url is required' });
            }
            const results = await Ytdl(url, "video", 480)
            res.status(200).json({
                status: true,
                result: results 
            });
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
});

app.get('/download/ytmp3', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
            const { url } = req.query;
            if (!url) {
            return res.json({ status: false, error: 'Url is required' });
            }
            const results = await ytmp3.process(url);
            res.status(200).json({
                status: true,
                result: {
                title: results.title, 
                audio: results.download
                }
            });
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
});
}