const fs = require('fs');
const path = require('path');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://www.wehanda.com/#home-section</loc>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://www.wehanda.com/#about-section</loc>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>https://www.wehanda.com/#pricing-section</loc>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>https://www.wehanda.com/#contact-section</loc>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>https://admin.wehanda.com/login</loc>
      <priority>0.7</priority>
   </url>
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully.');
