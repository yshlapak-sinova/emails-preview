const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

// === Register Handlebars partials ===
function registerPartials(baseDir, currentDir = '') {
  const fullDir = path.join(baseDir, currentDir);
  const files = fs.readdirSync(fullDir);

  files.forEach((file) => {
    const fullPath = path.join(fullDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      registerPartials(baseDir, path.join(currentDir, file)); // Recurse
    } else if (file.endsWith('.hbs')) {
      const partialName = path
        .join(currentDir, file.replace('.hbs', ''))
        .replace(/\\/g, '/');
      const content = fs.readFileSync(fullPath, 'utf8');
      handlebars.registerPartial(partialName, content);
    }
  });
}

// === Compile template ===
function loadTemplate(templateName, data = {}) {
  const filePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, 'utf8');
  return handlebars.compile(source)(data);
}

// === Send email using Mailtrap ===
async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io', // From Mailtrap SMTP Settings
    port: 587,
    auth: {
      user: 'your-mailtrap-username',
      pass: 'your-mailtrap-password',
    },
  });

  await transporter.sendMail({
    from: '"Test Sender" <test@example.com>',
    to,
    subject,
    html,
  });

  console.log('✅ Email sent to Mailtrap inbox');
}

// === Run the test ===
(async () => {
  registerPartials(path.join(__dirname, 'templates', 'partials'));

  const templateName = 'welcome-email'; // or any other
  const dataPath = path.join(
    __dirname,
    'resources',
    'data',
    `${templateName}.data.json`
  );
  const data = fs.existsSync(dataPath) ? require(dataPath) : {};

  const html = loadTemplate(templateName, data);

  await sendEmail({
    to: 'test@example.com', // Can be anything in Mailtrap
    subject: 'Welcome Email Test',
    html,
  });
})();
