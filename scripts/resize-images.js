const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const MAX_WIDTH = 2400;
const INPUT_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images-original');

// Recursively get all image files
function getAllImageFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Resize a single image
async function resizeImage(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Only resize if width is greater than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      console.log(`Resizing: ${path.basename(imagePath)} (${metadata.width}x${metadata.height} -> ${MAX_WIDTH}px width)`);

      await image
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(imagePath + '.tmp');

      // Replace original with resized
      fs.renameSync(imagePath + '.tmp', imagePath);

      return true;
    } else {
      console.log(`Skipping: ${path.basename(imagePath)} (already ${metadata.width}px)`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🖼️  Image Resize Script');
  console.log('======================\n');

  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp is not installed!');
    console.error('Run: npm install --save-dev sharp');
    process.exit(1);
  }

  // Create backup directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log(`📁 Creating backup directory: ${BACKUP_DIR}\n`);
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // Get all image files
  console.log(`📂 Scanning for images in: ${INPUT_DIR}\n`);
  const imageFiles = getAllImageFiles(INPUT_DIR);
  console.log(`Found ${imageFiles.length} images\n`);

  if (imageFiles.length === 0) {
    console.log('No images found!');
    return;
  }

  // Ask for confirmation
  console.log('⚠️  WARNING: This will resize images in place!');
  console.log(`   Max width: ${MAX_WIDTH}px`);
  console.log(`   Quality: Original (100%, no compression)`);
  console.log(`   Backup: Create copies in ${BACKUP_DIR}\n`);

  // Process images
  let resizedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = imageFiles[i];
    const relativePath = path.relative(INPUT_DIR, imagePath);

    // Create backup
    const backupPath = path.join(BACKUP_DIR, relativePath);
    const backupDir = path.dirname(backupPath);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Copy to backup if not already backed up
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(imagePath, backupPath);
    }

    // Resize
    const resized = await resizeImage(imagePath);

    if (resized) {
      resizedCount++;
    } else {
      skippedCount++;
    }

    // Progress
    const progress = Math.round(((i + 1) / imageFiles.length) * 100);
    process.stdout.write(`\rProgress: ${progress}% (${i + 1}/${imageFiles.length})`);
  }

  console.log('\n\n✅ Done!');
  console.log(`   Resized: ${resizedCount} images`);
  console.log(`   Skipped: ${skippedCount} images`);
  console.log(`   Backup: ${BACKUP_DIR}\n`);
}

main().catch(console.error);
