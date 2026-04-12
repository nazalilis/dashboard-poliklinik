// src/build-css.js
const fs = require('fs');
const path = require('path');

const inputCss = './Public/css/output.css';
const outputHtml = './App/Style/app.css.html';

console.log('Building Tailwind CSS + wrapping to HTML...');

try {
  // Read the tailwindcss build results
  let cssContent = fs.readFileSync(inputCss, 'utf8');

  // Wrap it in a <style> tag for Google Apps Script
  const htmlContent = `<style>\n/* Tailwind + DaisyUI - Auto generated */\n${cssContent}\n</style>`;

  // Write to the HTML file
  fs.writeFileSync(outputHtml, htmlContent);

  console.log('Success! CSS automatically wrapped into App/Style/app.css.html');
  console.log(`   File size: ${(cssContent.length / 1024).toFixed(1)} KB`);
} catch (err) {
  console.error('❌ Error:', err.message);
}