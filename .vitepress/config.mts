import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';

// Syntaxfarben für ```af aus der Grammatik der Sprache (dieselbe wie in der Erweiterung für VS Code)
const af = JSON.parse(readFileSync(createRequire(import.meta.url).resolve('@answerfield/language/syntaxes/af.tmLanguage.json'), 'utf8'));

/** Organisation auf GitHub; die Seiten verlinken die Repositories ausgeschrieben (https://github.com/answerfield/af-…). */
const GITHUB = 'https://github.com/answerfield';

export default defineConfig({
    lang: 'de-DE',
    title: 'answerfield',
    titleTemplate: ':title · answerfield',
    description: 'answerfield: eine Sprache für Test- und Lernaufgaben, mit Compiler, Runtime und Editor',
    cleanUrls: true,
    // Dateien des Repositorys, keine Seiten
    srcExclude: ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md', '.github/**'],
    lastUpdated: false,
    // Der Playground ist eine eigene statische App unter /playground/ (public/), kein VitePress-Inhalt
    ignoreDeadLinks: [/^\/playground\//],
    head: [['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]],
    vite: {
        plugins: [{
            // Im Dev-Server liefert Vite für /playground/ nicht die index.html aus public/, sondern die VitePress-Seite
            // (404). Gebaut und auf GitHub Pages gilt die index.html des Ordners ohnehin.
            name: 'playground-index',
            configureServer(server) {
                server.middlewares.use((req, _res, next) => {
                    const match = /^\/playground\/?(\?.*)?$/.exec(req.url ?? '');
                    if (match) req.url = `/playground/index.html${match[1] ?? ''}`;
                    next();
                });
            }
        }, {
            // Geänderte Beispiele unter examples/ neu übersetzen, damit <AfPreview> den neuen Stand zeigt
            name: 'example-bundles',
            configureServer(server) {
                const examples = fileURLToPath(new URL('../examples/', import.meta.url));
                server.watcher.add(examples);
                server.watcher.on('change', file => {
                    if (!file.startsWith(examples) || !file.endsWith('.af')) return;
                    execFile('node', [fileURLToPath(new URL('../scripts/examples.mjs', import.meta.url))], (error, _out, err) => {
                        if (error) server.config.logger.error(err || error.message);
                        else server.ws.send({ type: 'full-reload' });
                    });
                });
            }
        }]
    },
    markdown: {
        languages: [af],
    },
    themeConfig: {
        logo: { src: '/favicon.svg', alt: '' },
        nav: [
            { text: 'Aufgaben schreiben', link: '/writing-items', activeMatch: '^/(writing-items|coding|components|plane|variants|vscode)' },
            { text: 'Mit Aufgaben arbeiten', link: '/booklets', activeMatch: '^/(booklets|cli|embedding)' },
            { text: 'Hintergrund', link: '/concepts', activeMatch: '^/concepts' },
            // Eigene statische App unter public/, im neuen Tab
            { text: 'Playground', link: '/playground/', target: '_blank', rel: 'noopener' }
        ],
        sidebar: [
            {
                text: 'Aufgaben schreiben',
                items: [
                    { text: 'Meine erste Aufgabe', link: '/writing-items' },
                    { text: 'Kodierung im Detail', link: '/coding' },
                    { text: 'Eigene Funktionen und Komponenten', link: '/components' },
                    { text: 'Zeichnen und Messen', link: '/plane' },
                    { text: 'Varianten für Bedarfe', link: '/variants' },
                    { text: 'In VS Code', link: '/vscode' }
                ]
            },
            {
                text: 'Mit Aufgaben arbeiten',
                items: [
                    { text: 'Testhefte zusammenstellen', link: '/booklets' },
                    { text: 'Auf der Kommandozeile', link: '/cli' },
                    { text: 'In eine Webanwendung einbinden', link: '/embedding' }
                ]
            },
            {
                text: 'Hintergrund',
                items: [
                    { text: 'Architektur und Konzepte', link: '/concepts' }
                ]
            }
        ],
        socialLinks: [{ icon: 'github', link: GITHUB }],
        footer: {
            message: 'Texte CC BY 4.0, Beispielaufgaben CC0.',
            copyright: '© 2026 indibit GmbH'
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: { buttonText: 'Suchen', buttonAriaLabel: 'Suchen' },
                    modal: {
                        displayDetails: 'Details anzeigen',
                        resetButtonTitle: 'Suche zurücksetzen',
                        backButtonTitle: 'Suche schließen',
                        noResultsText: 'Keine Treffer für',
                        footer: { selectText: 'öffnen', navigateText: 'wechseln', closeText: 'schließen' }
                    }
                }
            }
        },
        outline: { label: 'Auf dieser Seite', level: [2, 3] },
        docFooter: { prev: 'Zurück', next: 'Weiter' },
        darkModeSwitchLabel: 'Darstellung',
        lightModeSwitchTitle: 'Helle Darstellung',
        darkModeSwitchTitle: 'Dunkle Darstellung',
        sidebarMenuLabel: 'Menü',
        returnToTopLabel: 'Nach oben',
        langMenuLabel: 'Sprache',
        notFound: { title: 'Seite nicht gefunden', quote: '', linkText: 'Zur Startseite' }
    }
});
