const fs = require('fs');

function getPNGDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
}

const path = 'd:\\my-website\\public\\backgrounds\\TALES.png';
try {
    const dims = getPNGDimensions(path);
    console.log(`Dimensions: ${dims.width}x${dims.height}`);
} catch (e) {
    console.log(e.message);
}
