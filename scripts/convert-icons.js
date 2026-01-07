const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertSvgToPng() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    const svgPath = path.join(__dirname, '..', 'public', `icon-${size}.svg`);
    const pngPath = path.join(__dirname, '..', 'public', `icon-${size}.png`);
    
    try {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
      
      console.log(`✅ Convertido: icon-${size}.svg → icon-${size}.png`);
    } catch (error) {
      console.error(`❌ Erro ao converter icon-${size}.svg:`, error.message);
    }
  }
  
  console.log('\n🎉 Conversão concluída!');
}

convertSvgToPng();
