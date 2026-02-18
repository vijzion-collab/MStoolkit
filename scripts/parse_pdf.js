const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

async function run() {
    const pdfPath = process.argv[2];

    if (!pdfPath) {
        console.log('Usage: node scripts/parse_pdf.js <path-to-pdf>');
        process.exit(1);
    }

    // Convert path to file URL for consistency with user example
    const fileUrl = pathToFileURL(path.resolve(pdfPath)).href;
    console.log(`Processing: ${fileUrl}`);

    try {
        console.log('Attempting to use PDFParse with URL...');
        const parser = new PDFParse({ url: fileUrl });
        const result = await parser.getText();

        console.log('--------------------------------------------------');
        console.log('Text Content Preview (First 500 chars):');
        console.log(result.text ? result.text.substring(0, 500) : 'No text property found');
        console.log('--------------------------------------------------');
        console.log('Total Text Length:', result.text.length);
        if (result.text.length > 1000) {
            const middle = Math.floor(result.text.length / 2);
            console.log('Middle Content Preview (500 chars):');
            console.log(result.text.substring(middle, middle + 500));
        }
        console.log('--------------------------------------------------');
        console.log('Full Result Keys:', Object.keys(result));
        if (result.numpages) console.log('Number of pages:', result.numpages);
        if (result.info) console.log('Info:', result.info);
    } catch (e) {
        console.error('Error with URL method:', e.message);

        // Fallback: try buffer if URL fails (if library supports it)
        try {
            console.log('Attempting to use PDFParse with Buffer...');
            const buffer = fs.readFileSync(pdfPath);
            // Guessing constructor signature for buffer, or static method
            // If the user said "v1 compatible: pdf(buffer)", maybe PDFParse(buffer) works?
            // But PDFParse is a class.
            // Let's try passing buffer in options
            const parser2 = new PDFParse({ buffer: buffer }); // Guess
            const result2 = await parser2.getText();
            console.log('Success with Buffer!');
            console.log(result2.text.substring(0, 500));
        } catch (e2) {
            console.error('Error with Buffer method:', e2.message);
        }
    }
}

run();
