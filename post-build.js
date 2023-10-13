const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Output Configuration
 */
const cfg = (() => {
  {
    const [outputDir, outputFileName, shortcutFileName, zipName] = [
      path.join(__dirname, 'dist'),
      'read-aloud.html',
      'shortcut.bat',
      'read-aloud.zip'
    ];

    const shortcut = {
      path: path.join(outputDir, shortcutFileName),
      data: [
        `@echo off`,
        `start msedge.exe "file://%cd%\\${outputFileName}" --inprivate`
      ].join('\n')
    };

    const readme = {
      src: path.join(__dirname, 'README.md'),
      dest: path.join(outputDir, 'README.md')
    };

    const zip = {
      src: outputDir,
      dest: path.join(outputDir, zipName)
    };

    return {
      outputDir,
      outputFileName,
      shortcutFileName,
      zipName,
      shortcut,
      readme,
      zip
    };
  }
})();

/**
 * Attach additional documentation and utilities
 */
function writePostBuildData(cfg) {
  const { shortcut, readme } = cfg;

  if (!fs.existsSync(shortcut.path)) {
    fs.writeFileSync(shortcut.path, shortcut.data);
  }
  if (!fs.existsSync(readme.path)) {
    fs.copyFileSync(readme.src, readme.dest);
  }
}

/**
 * Archive the output directory for ez-distribution
 */
function zipIt(cfg) {
  const { zipName, zip } = cfg;

  const archive = archiver('zip', { zlib: { level: 9 } });
  const zipStream = fs.createWriteStream(zip.dest);

  archive.pipe(zipStream);

  // Add each file to the archive, prevent matryoshka nesting
  const files = fs.readdirSync(zip.src);
  files.forEach((file) => {
    const filePath = path.join(zip.src, file);
    file !== zipName && archive.file(filePath, { name: file });
  });

  archive.finalize();

  archive.on('error', (err) => {
    console.error('Error creating zip file:', err);
  });
  archive.on('end', () => {
    console.log('Zip file created successfully:', zip.dest);
  });
}

writePostBuildData(cfg);
process.argv.includes('--zip') && zipIt(cfg);
