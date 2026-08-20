import { access, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist/plotly');
const requiredFiles = [
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'angular-plotly.png',
  'package.json',
];

await Promise.all(requiredFiles.map(file => access(resolve(output, file))));

const rootPackage = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const libraryPackage = JSON.parse(await readFile(resolve(output, 'package.json'), 'utf8'));
const declarationsPath = libraryPackage.typings ?? 'index.d.ts';
const bundlePath = libraryPackage.module;
requiredFiles.push(declarationsPath, bundlePath);
await Promise.all([declarationsPath, bundlePath].map(file => access(resolve(output, file))));
if (rootPackage.version !== libraryPackage.version) {
  throw new Error(`Package versions differ: root=${rootPackage.version}, library=${libraryPackage.version}`);
}

const major = Number(rootPackage.version.split('.')[0]);
for (const dependency of ['@angular/common', '@angular/core']) {
  const expected = `>=${major}.0.0 <${major + 1}.0.0`;
  if (libraryPackage.peerDependencies?.[dependency] !== expected) {
    throw new Error(`${dependency} must use peer range ${expected}`);
  }
}

const declarations = await readFile(resolve(output, declarationsPath), 'utf8');
for (const symbol of [
  'PlotlyComponent',
  'PlotlyModule',
  'PlotlyService',
  'PlotlyViaCDNModule',
  'PlotlyViaWindowModule',
]) {
  if (!declarations.includes(symbol)) {
    throw new Error(`Public declaration is missing ${symbol}`);
  }
}

const packResult = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', output], {
  cwd: root,
  encoding: 'utf8',
  env: {
    ...process.env,
    npm_config_cache: join(tmpdir(), 'angular-plotly-npm-cache'),
  },
}));
const packedFiles = new Set(packResult[0].files.map(file => file.path));
for (const file of requiredFiles) {
  if (!packedFiles.has(file)) {
    throw new Error(`npm package is missing ${file}`);
  }
}

console.log(`Verified angular-plotly.js ${rootPackage.version} (${packedFiles.size} packaged files).`);
