import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const library = resolve(root, 'projects/plotly');

await Promise.all(
  ['README.md', 'LICENSE', 'CHANGELOG.md'].map(file =>
    copyFile(resolve(root, file), resolve(library, file)),
  ),
);
