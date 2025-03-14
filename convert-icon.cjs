const fs = require('fs');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

// Resize and convert PNG to ICO
async function convertPngToIco() {
  try {
    // Resize the image to 256x256 if necessary
    await sharp('public/timer.png')
      .resize(256, 256, { fit: 'inside' })
      .toFile('public/timer-resized.png');

    // Convert the resized PNG to ICO
    const buffer = await pngToIco(['public/timer-resized.png']);
    fs.writeFileSync('public/app-icon.ico', buffer);
    console.log('Successfully converted PNG to ICO!');
  } catch (err) {
    console.error('Error converting PNG to ICO:', err);
  }
}

convertPngToIco();