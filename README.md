# answerfield.github.io

Die Doku-Seite von answerfield: Aufgaben schreiben, mit Aufgaben arbeiten, Hintergrund und der Playground unter
`/playground/`. Gebaut mit [VitePress](https://vitepress.dev).

```sh
npm ci
npm run dev        # Entwicklung mit Neuladen, http://localhost:5173
npm run build      # statische Seite nach .vitepress/dist
npm run preview    # gebaute Seite, http://localhost:4173
npm run check      # Beispielaufgaben in examples/ prüfen und auf Formatierung prüfen
```

`npm run dev` und `npm run build` übernehmen zuerst den gebauten Playground aus dem Paket `@answerfield/playground`
nach `public/playground/` und übersetzen die Beispiele unter `examples/` mit `@answerfield/cli` nach `public/bundles/`.
Die Komponente `<AfPreview>` zeigt sie neben dem Quelltext mit der Runtime (`@answerfield/runtime-core`,
`@answerfield/runtime-wc`). Im Dev-Server werden geänderte Beispiele sofort neu übersetzt. Alle Pakete kommen als
Dateien aus den Releases der Repositories; die Seite zeigt damit den veröffentlichten Stand.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.md` | Startseite |
| `writing-items.md`, `coding.md`, `components.md`, `plane.md`, `variants.md`, `vscode.md` | Aufgaben schreiben |
| `booklets.md`, `cli.md`, `embedding.md` | Mit Aufgaben arbeiten |
| `concepts.md` | Hintergrund: Architektur und Konzepte |
| `examples/*.af` | Beispielaufgaben, eingebunden mit `<<< @/examples/…` und `<AfPreview>` |
| `.vitepress/` | Konfiguration, Theme mit `AfPreview` und Syntaxfarben für `af` |

Änderungen gehen bei jedem Push auf `main` über GitHub Actions auf GitHub Pages.

**Lizenzen:** Texte CC BY 4.0, Beispielaufgaben CC0, Code (Konfiguration, Theme, Skripte) Apache-2.0.
