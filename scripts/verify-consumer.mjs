import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const rootPackage = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const workspace = await mkdtemp(join(tmpdir(), `angular-plotly-consumer-${rootPackage.version}-`));
const npmCache = join(tmpdir(), 'angular-plotly-npm-cache');
const commandOptions = {
  cwd: workspace,
  stdio: 'inherit',
  env: { ...process.env, npm_config_cache: npmCache },
};

try {
  const packOutput = execFileSync('npm', [
    'pack',
    '--json',
    '--pack-destination', workspace,
    resolve(root, 'dist/plotly'),
  ], { ...commandOptions, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
  const tarball = resolve(workspace, JSON.parse(packOutput)[0].filename);

  await writeFile(join(workspace, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
    dependencies: {
      '@angular/common': rootPackage.dependencies['@angular/common'],
      '@angular/core': rootPackage.dependencies['@angular/core'],
      'angular-plotly.js': `file:${tarball}`,
      rxjs: rootPackage.dependencies.rxjs,
      tslib: rootPackage.dependencies.tslib,
    },
    devDependencies: {
      typescript: rootPackage.devDependencies.typescript,
    },
  }, null, 2));

  await writeFile(join(workspace, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      lib: ['ES2022', 'DOM'],
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      noEmit: true,
      strict: true,
      target: 'ES2022',
    },
    files: ['consumer.ts'],
  }, null, 2));

  await writeFile(join(workspace, 'consumer.ts'), `
import {
  PlotlyComponent,
  PlotlyModule,
  PlotlyService,
  PlotlyViaCDNModule,
  PlotlyViaWindowModule,
  type PlotlyBundleName,
  type PlotlyCDNProvider,
  type PlotlyModuleConfig,
  type Plotly,
} from 'angular-plotly.js';

const config: PlotlyModuleConfig = {
  bundleName: 'basic' satisfies PlotlyBundleName,
  cdnProvider: 'plotly' satisfies PlotlyCDNProvider,
  version: '2.35.3',
};
const figure: Plotly.Figure = { data: [], layout: {}, frames: {} };

void [
  PlotlyComponent,
  PlotlyModule,
  PlotlyService,
  PlotlyViaCDNModule,
  PlotlyViaWindowModule,
  config,
  figure,
];
`);

  execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], commandOptions);
  execFileSync(resolve(workspace, 'node_modules/.bin/tsc'), ['--project', 'tsconfig.json'], commandOptions);
  console.log(`Verified packed-package consumer compilation for Angular ${rootPackage.version.split('.')[0]}.`);
} finally {
  await rm(workspace, { recursive: true, force: true });
}
