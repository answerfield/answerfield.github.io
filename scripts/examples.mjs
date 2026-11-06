// Übersetzt die Beispiele unter examples/ in Bundles unter public/bundles/, damit die Seiten sie mit <AfPreview>
// neben dem Quelltext zeigen. Jede Datei wird für sich übersetzt, mit examples/ als Arbeitsbereich (ein Testheft
// findet so die Aufgaben der anderen Dateien). Bricht bei Fehlern ab.
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { main } from '@answerfield/cli';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const examples = join(site, 'examples');
const target = join(site, 'public/bundles');

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

const quiet = { log: () => {}, error: (line) => console.error(line) };
let failed = 0;
const files = readdirSync(examples).filter(f => f.endsWith('.af')).sort();
for (const file of files) {
    const code = await main(['compile', join(examples, file), '--root', examples, '--out', target], quiet);
    if (code !== 0) failed++;
}
if (failed > 0) {
    console.error(`${failed} Beispiel(e) ließen sich nicht übersetzen.`);
    process.exit(1);
}
console.log(`${files.length} Beispiele nach public/bundles/ übersetzt.`);
