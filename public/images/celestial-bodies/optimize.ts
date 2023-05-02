import * as fs from 'node:fs';
import * as path from 'node:path';

import { optimize } from 'svgo';

const regexPattern = new RegExp(
  '<path fill="#ffffff"\\s*d="\\s*M 0\\.00 0\\.00\\s*L 1024\\.00 0\\.00\\s*L 1024\\.00 1024\\.00(?:\\s*L 0\\.00 1024\\.00\\s*L 0\\.00 0\\.00)?\\s*Z\\s*"[^>]*>',
  's',
);

let count = 0;

const processSvgFile = async (filePath: string): Promise<void> => {
  const svgData = fs.readFileSync(filePath, 'utf8');
  const minifiedSvgData = optimize(svgData).data;

  fs.writeFileSync(filePath, minifiedSvgData, 'utf8');
};

const processDirectory = async (dirPath: string): Promise<void> => {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      await processDirectory(filePath);
    } else if (fileStats.isFile() && path.extname(file) === '.svg') {
      await processSvgFile(filePath);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
processDirectory('./').then(() => {
  console.log('finished', count);
});
