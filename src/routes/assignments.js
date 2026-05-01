const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { marked } = require('marked');

const assignmentsDir = path.join(__dirname, '../assignments');

const router = express.Router();

// renders assignment .md-file in browser based on http://localhost:3000/assignments/:number
router.get('/:number', async (req, res) => {
  const { number } = req.params;

  if (!/^\d+$/.test(number)) {
    return res.status(400).send('Invalid asignment number');
  }

  const filePath = path.join(assignmentsDir, `assignment${number}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const htmlContent = marked(fileContent);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <tiitle>Assignment ${number}</tiitle>
          <style>
            body {
              font-family: sans-serif;
              max-width: 800px;
              margin: 2rem auto;
              line-height: 1.6;
            }
            pre {
              background-color: #f4f4f4;
              padding: 1rem;
              overflow:auto;
            }
            code {
              background-color: #EEE;
              padding: 2px 4px;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
      `);
  } catch (error) {
    res.status(404).send('Assignment not found');
  }
});

module.exports = router;
