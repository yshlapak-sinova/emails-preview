const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// Start livereload server
const liveReloadServer = livereload.createServer();

// Trigger browser refresh on connection
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// Watch all relevant files using chokidar
chokidar
  .watch([
    path.join(__dirname, 'templates'),
    path.join(__dirname, 'templates/**/*.hbs'),
    path.join(__dirname, 'data.json'),
    path.join(__dirname, 'resources/**/*'),
  ])
  .on('change', (filePath) => {
    console.log(`🔁 File changed: ${filePath}`);
    liveReloadServer.refresh('/');
  });

// Notify browser on reload
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
const PORT = 3002;

// Inject livereload script into HTML
app.use(connectLivereload());

// Static files
app.use('/static', express.static(path.join(__dirname, 'resources')));

// View engine
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

// Helpers
function getTemplatesList() {
  return fs
    .readdirSync(path.join(__dirname, 'templates'))
    .filter((file) => path.extname(file) === '.hbs')
    .map((file) => path.basename(file, '.hbs'));
}

// Routes
app.get('/', (req, res) => {
  const templates = getTemplatesList();
  const links = templates
    .map((name) => `<li><a href="/${name}">${name}</a></li>`)
    .join('\n');
  res.send(`<h1>Email Templates</h1><ul>${links}</ul>`);
});

app.get('/:template', (req, res) => {
  const templateName = req.params.template;
  const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);

  if (!fs.existsSync(templatePath)) {
    return res.status(404).send('Template not found.');
  }

  let context = {};
  try {
    context = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'resources/data.json'), 'utf8')
    );
  } catch {
    return res.status(500).send('Error reading data.json');
  }

  res.render(templateName, context);
});

app.listen(PORT, () => {
  console.log(`Preview server running at http://localhost:${PORT}`);
});
