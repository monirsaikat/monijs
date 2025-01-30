const fs = require('fs');
const {marked} = require('marked');


// Read README.md content
const readmeContent = fs.readFileSync('README.md', 'utf-8');

// Convert markdown to HTML
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Documentation</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="content">
    ${marked(readmeContent)} <!-- Markdown converted to HTML -->
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
</body>
</html>
`;

// Write HTML to docs/index.html
fs.writeFileSync('docs/index.html', htmlContent);
console.log('Documentation generated in docs/index.html');
