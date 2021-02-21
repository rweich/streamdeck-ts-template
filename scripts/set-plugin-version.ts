import { existsSync } from 'fs';
import { readFileSync, writeFileSync } from 'jsonfile';
import * as path from 'path';
import manifest from '../assets/manifest.json';

const manifestPath: string = path.join(
  __dirname,
  '../dist/' + manifest['streamdeck-plugin'].namespace + '.sdPlugin/manifest.json',
);

const version = process.argv[2];
if (version === undefined) {
  console.error('❌ Usage: ' + __filename + ' VERSION');
  process.exit(1);
}
if (!existsSync(manifestPath)) {
  console.error('❌ file not found: ' + manifestPath);
  process.exit(1);
}

console.info('📦 setting version to ' + version + ' ...');
let json = readFileSync(manifestPath);
json.Version = version;
writeFileSync(manifestPath, json, { spaces: 2 });

json = readFileSync(manifestPath);
if (json.Version !== version) {
  console.error('❌ unknown error on writing version to file ' + manifestPath);
  process.exit(1);
}
console.info('✅ version set');
