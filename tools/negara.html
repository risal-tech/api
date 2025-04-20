<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Tools Kode Negara | Ditss Store</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
    body {
      font-family: 'Orbitron', sans-serif;
      background: linear-gradient(to bottom right, #000428, #004e92);
      color: #00ffff;
      padding: 30px;
      text-align: center;
    }

    .container {
      max-width: 500px;
      margin: auto;
      background: rgba(0, 0, 0, 0.4);
      border: 2px solid #00ffff;
      border-radius: 20px;
      padding: 25px;
      box-shadow: 0 0 25px #00ffffaa;
      position: relative;
    }

    h2 {
      color: #00ffff;
      margin-bottom: 20px;
      text-shadow: 0 0 8px #00ffff;
    }

    input {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      border: 2px solid #00ffff;
      background: #000000;
      color: #00ffff;
      font-size: 16px;
      margin-bottom: 20px;
      box-shadow: 0 0 10px #00ffff66;
      outline: none;
    }

    button {
      padding: 12px 22px;
      background: #000;
      color: #00ffff;
      font-size: 16px;
      border: 2px solid #00ffff;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 0 12px #00ffff88;
      transition: all 0.3s;
    }

    button:hover {
      background: #00ffff;
      color: #000;
      box-shadow: 0 0 20px #00ffff;
    }

    .result {
      margin-top: 25px;
      font-size: 20px;
      font-weight: bold;
      color: #00ffff;
      text-shadow: 0 0 10px #00ffff;
    }

    .info-box {
      margin-top: 35px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      border: 1px solid #00ffff;
      box-shadow: 0 0 10px #00ffff33;
      font-size: 14px;
      color: #00ffff;
      text-align: left;
    }

    #musicBtn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      cursor: pointer;
    }

    #musicBtn img {
      width: 30px;
      filter: drop-shadow(0 0 8px #00ffff);
      transition: transform 0.3s;
    }

    #musicBtn.playing img {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
    }
  </style>
</head>
<body>

<div class="container">
  <button id="musicBtn" onclick="toggleMusic()" title="Putar Musik">
    <img src="https://cdn-icons-png.flaticon.com/512/727/727245.png" alt="Musik">
  </button>
</div> 
<footer style="margin-top: 40px; color: #00ffff; font-size: 14px; text-align: center; text-shadow: 0 0 5px #00ffff;">
  Powered by <strong>Ditss</strong>
</footer>
</body>
</html>
  <h2>Tools - Kode Negara</h2>
  <input type="text" id="kodeInput" placeholder="Masukkan kode: +62 atau 62">
  <button onclick="cariNegara()">Cari</button>
  <div class="result" id="hasil"></div>

  <div class="info-box" id="info">
    <p><strong>IP Address:</strong> Memuat...</p>
    <p><strong>Negara:</strong> -</p>
    <p><strong>Provinsi:</strong> -</p>
    <p><strong>Kota:</strong> -</p>
    <p><strong>Jam Lokal:</strong> <span id="jam"></span></p>
    <p><strong>Device:</strong> <span id="device"></span></p>
  </div>
</div>

<audio id="bgMusic" loop>
  <source src="https://qu.ax/MXbkU.mp4" type="audio/mpeg">
  Browser tidak mendukung audio.
</audio>

<script>
  const dataNegara = {
                "1": "Amerika Serikat / Kanada",
                "7": "Rusia / Kazakhstan",
                "20": "Mesir",
                "27": "Afrika Selatan",
                "30": "Yunani",
                "31": "Belanda",
                "32": "Belgia",
                "33": "Perancis",
                "34": "Spanyol",
                "36": "Hungaria",
                "39": "Italia",
                "40": "Rumania",
                "41": "Swiss",
                "43": "Austria",
                "44": "Inggris",
                "45": "Denmark",
                "46": "Swedia",
                "47": "Norwegia",
                "48": "Polandia",
                "49": "Jerman",
                "51": "Peru",
                "52": "Meksiko",
                "53": "Kuba",
                "54": "Argentina",
                "55": "Brasil",
                "56": "Chili",
                "57": "Kolombia",
                "58": "Venezuela",
                "60": "Malaysia",
                "61": "Australia",
                "62": "Indonesia",
                "63": "Filipina",
                "64": "Selandia Baru",
                "65": "Singapura",
                "66": "Thailand",
                "81": "Jepang",
                "82": "Korea Selatan",
                "84": "Vietnam",
                "86": "Tiongkok",
                "90": "Turki",
                "91": "India",
                "92": "Pakistan",
                "93": "Afghanistan",
                "94": "Sri Lanka",
                "95": "Myanmar",
                "98": "Iran",
                "211": "Sudan Selatan",
                "212": "Maroko / Sahara Barat",
                "213": "Aljazair",
                "216": "Tunisia",
                "218": "Libya",
                "220": "Gambia",
                "221": "Senegal",
                "222": "Mauritania",
                "223": "Mali",
                "224": "Guinea",
                "225": "Pantai Gading",
                "226": "Burkina Faso",
                "227": "Niger",
                "228": "Togo",
                "229": "Benin",
                "230": "Mauritius",
                "231": "Liberia",
                "232": "Sierra Leone",
                "233": "Ghana",
                "234": "Nigeria",
                "235": "Chad",
                "236": "Republik Afrika Tengah",
                "237": "Kamerun",
                "238": "Tanjung Verde",
                "239": "Sao Tome dan Principe",
                "240": "Guinea Khatulistiwa",
                "241": "Gabon",
                "242": "Republik Kongo",
                "243": "Republik Demokratik Kongo",
                "244": "Angola",
                "245": "Guinea-Bissau",
                "246": "Wilayah Samudera Hindia Britania",
                "247": "Ascension Island",
                "248": "Seychelles",
                "249": "Sudan",
                "250": "Rwanda",
                "251": "Ethiopia",
                "252": "Somalia",
                "253": "Djibouti",
                "254": "Kenya",
                "255": "Tanzania",
                "256": "Uganda",
                "257": "Burundi",
                "258": "Mozambik",
                "260": "Zambia",
                "261": "Madagaskar",
                "262": "Reunion / Mayotte",
                "263": "Zimbabwe",
                "264": "Namibia",
                "265": "Malawi",
                "266": "Lesotho",
                "267": "Botswana",
                "268": "Eswatini",
                "269": "Komoro",
                "290": "Saint Helena",
                "291": "Eritrea",
                "297": "Aruba",
                "298": "Faroe Islands",
                "299": "Greenland",
                "350": "Gibraltar",
                "351": "Portugal",
                "352": "Luksemburg",
                "353": "Irlandia",
                "354": "Islandia",
                "355": "Albania",
                "356": "Malta",
                "357": "Siprus",
                "358": "Finlandia",
                "359": "Bulgaria",
                "370": "Lituania",
                "371": "Latvia",
                "372": "Estonia",
                "373": "Moldova",
                "374": "Armenia",
                "375": "Belarus",
                "376": "Andorra",
                "377": "Monako",
                "378": "San Marino",
                "379": "Vatikan",
                "380": "Ukraina",
                "381": "Serbia",
                "382": "Montenegro",
                "383": "Kosovo",
                "385": "Kroasia",
                "386": "Slovenia",
                "387": "Bosnia dan Herzegovina",
                "389": "Makedonia Utara",
                "420": "Ceko",
                "421": "Slovakia",
                "423": "Liechtenstein",
                "500": "Falkland Islands",
                "501": "Belize",
                "502": "Guatemala",
                "503": "El Salvador",
                "504": "Honduras",
                "505": "Nikaragua",
                "506": "Kosta Rika",
                "507": "Panama",
                "508": "Saint Pierre dan Miquelon",
                "509": "Haiti",
                "590": "Guadeloupe / Saint Barthélemy",
                "591": "Bolivia",
                "592": "Guyana",
                "593": "Ekuador",
                "594": "Guyana Prancis",
                "595": "Paraguay",
                "596": "Martinique",
                "597": "Suriname",
                "598": "Uruguay",
                "599": "Antillen Belanda",
                "670": "Timor Leste",
                "672": "Antarktika / Pulau Norfolk",
                "673": "Brunei",
                "674": "Nauru",
                "675": "Papua Nugini",
                "676": "Tonga",
                "677": "Kepulauan Solomon",
                "678": "Vanuatu",
                "679": "Fiji",
                "680": "Palau",
                "681": "Wallis dan Futuna",
                "682": "Cook Islands",
                "683": "Niue",
                "685": "Samoa",
                "686": "Kiribati",
                "687": "Kaledonia Baru",
                "688": "Tuvalu",
                "689": "Polinesia Prancis",
                "690": "Tokelau",
                "691": "Federasi Mikronesia",
                "692": "Marshall Islands",
                "850": "Korea Utara",
                "852": "Hong Kong",
                "853": "Makau",
                "855": "Kamboja",
                "856": "Laos",
                "880": "Bangladesh",
                "886": "Taiwan",
                "960": "Maladewa",
                "961": "Lebanon",
                "962": "Yordania",
                "963": "Suriah",
                "964": "Irak",
                "965": "Kuwait",
                "966": "Arab Saudi",
                "967": "Yaman",
                "968": "Oman",
                "970": "Palestina",
                "971": "Uni Emirat Arab",
                "972": "Israel",
                "973": "Bahrain",
                "974": "Qatar",
                "975": "Bhutan",
                "976": "Mongolia",
                "977": "Nepal",
                "992": "Tajikistan",
                "993": "Turkmenistan",
                "994": "Azerbaijan",
                "995": "Georgia",
                "996": "Kirgizstan",
                "998": "Uzbekistan",
  };

  function cariNegara() {
    let input = document.getElementById("kodeInput").value.trim();
    input = input.replace('+', '');
    let hasil = dataNegara[input];
    document.getElementById("hasil").innerText = hasil ?
      `Kode +${input} adalah ${hasil}` :
      `Kode +${input} tidak ditemukan dalam database.`;
  }

  function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    if (music.paused) {
      music.play();
      musicBtn.classList.add('playing');
    } else {
      music.pause();
      musicBtn.classList.remove('playing');
    }
  }

  function updateJam() {
    const now = new Date();
    document.getElementById('jam').innerText = now.toLocaleTimeString();
  }
  setInterval(updateJam, 1000);
  updateJam();

  const deviceInfo = navigator.userAgent;
  document.getElementById("device").innerText = deviceInfo;

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      document.querySelector("#info").innerHTML = `
        <p><strong>IP Address:</strong> ${data.ip}</p>
        <p><strong>Negara:</strong> ${data.country_name}</p>
        <p><strong>Provinsi:</strong> ${data.region}</p>
        <p><strong>Kota:</strong> ${data.city}</p>
        <p><strong>Jam:</strong> <span id="jam">${new Date().toLocaleTimeString()}</span></p>
        <p><strong>Device:</strong> <span id="device">${deviceInfo}</span></p>
      `;
    })
    .catch(() => {
      document.querySelector("#info").innerHTML += "<p style='color: red;'>Gagal mendeteksi lokasi.</p>";
    });
</script>

</body>
</html>

