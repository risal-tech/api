const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

require("./function.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.enable("trust proxy");
app.set("json spaces", 2);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// === Load settings.json ===
const settingsPath = path.join(__dirname, './settings.json');
let settings = {};
try {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
} catch (err) {
  console.error(chalk.red(`Error loading settings.json: ${err.message}`));
  process.exit(1);
}

global.apikey = settings.apiSettings.apikey || null;
global.totalreq = 0;

// === Middleware log + format JSON ===
app.use((req, res, next) => {
  console.log(chalk.bgHex('#FFFF99').hex('#333').bold(` Request Route: ${req.path} `));
  global.totalreq += 1;

  const originalJson = res.json;
  res.json = function (data) {
    if (data && typeof data === 'object') {
      const responseData = {
        status: data.status,
        creator: settings.apiSettings.creator || "Created Using Skyzo",
        ...data
      };
      return originalJson.call(this, responseData);
    }
    return originalJson.call(this, data);
  };

  next();
});

// === Serve static files ===
app.use('/', express.static(path.join(__dirname, '/')));
app.use('/', express.static(path.join(__dirname, 'api-page')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// === Auto serve all HTML folders (dashboard, admin, etc) ===
const foldersToServe = fs.readdirSync(__dirname).filter(f => {
  const fullPath = path.join(__dirname, f);
  return fs.statSync(fullPath).isDirectory()
    && !['node_modules', 'api-page', 'src'].includes(f)
    && fs.existsSync(path.join(fullPath, 'index.html'));
});

foldersToServe.forEach(folder => {
  app.use(`/${folder}`, express.static(path.join(__dirname, folder), { index: 'index.html' }));
  console.log(chalk.green(`Static HTML folder mounted: /${folder}`));
});

// === Auto handle /folder/page → api-page/folder/page.html ===
app.get('/:folder/:page', (req, res, next) => {
  const { folder, page } = req.params;
  const filePath = path.join(__dirname, 'api-page', folder, `${page}.html`);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  next();
});

// === Home ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'api-page', 'index.html'));
});

// === Load dynamic API routes ===
let totalRoutes = 0;
const apiFolder = path.join(__dirname, './src');
fs.readdirSync(apiFolder).forEach((subfolder) => {
  const subfolderPath = path.join(apiFolder, subfolder);
  if (fs.statSync(subfolderPath).isDirectory()) {
    fs.readdirSync(subfolderPath).forEach((file) => {
      const filePath = path.join(subfolderPath, file);
      if (path.extname(file) === '.js') {
        require(filePath)(app);
        totalRoutes++;
        console.log(chalk.bgHex('#FFFF99').hex('#333').bold(` Loaded Route: ${path.basename(file)} `));
      }
    });
  }
});

console.log(chalk.bgHex('#90EE90').hex('#333').bold(' Load Complete! ✓ '));
console.log(chalk.bgHex('#90EE90').hex('#333').bold(` Total Routes Loaded: ${totalRoutes} `));

// === 404 / 500 handler ===
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'api-page', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'api-page', '500.html'));
});

app.listen(PORT, () => {
  console.log(chalk.bgHex('#90EE90').hex('#333').bold(` Server is running on port ${PORT} `));
});

module.exports = app;
