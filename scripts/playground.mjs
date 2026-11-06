// Copies the built playground (package @answerfield/playground, a release file of af-studio) to public/playground/,
// where the site serves it as /playground/.
import { cpSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = dirname(createRequire(import.meta.url).resolve('@answerfield/playground/package.json'));
const target = join(site, 'public/playground');

const { version } = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
const { groups } = JSON.parse(readFileSync(join(source, 'examples.json'), 'utf8'));
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true, filter: (path) => !/(?:^|\/)(?:package\.json|README\.md)$/.test(path.slice(source.length)) });
const count = groups.reduce((n, g) => n + g.files.length, 0);
console.log(`Playground ${version} nach public/playground/ übernommen (${count} Beispiele).`);
