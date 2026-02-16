const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log('Starting PDF generation...');

    const htmlFilePath = process.argv[2];
    let htmlContent;
    let outputPdf = 'database-report.pdf';

    if (htmlFilePath && fs.existsSync(htmlFilePath)) {
      htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      console.log('Using HTML from:', htmlFilePath);
    } else {
      outputPdf = 'hello-world.pdf';
      htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding-top: 100px; margin: 0; }
          h1 { font-size: 48px; margin-bottom: 20px; }
          p { font-size: 20px; max-width: 600px; margin: 20px auto; }
          .footer { margin-top: 40px; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>This PDF was generated using Puppeteer for Mednet Labs Training Assignment.</p>
        <div class="footer">Generated on: ${new Date().toLocaleString()}</div>
      </body>
      </html>
    `;
    }

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: outputPdf,
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });

    console.log('PDF generated successfully:', outputPdf);
    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();