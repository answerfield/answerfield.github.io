# In eine Webanwendung einbinden

Eine Plattform braucht von answerfield zwei Dinge: ein **Bundle** (JSON, vom Compiler) und den **Player**
`@answerfield/player`, der es im Browser zeigt. Zurück kommen Antworten, Codes und ein Speicherstand, alles als
einfache Daten. Der Player hängt an keinem Framework.

<div class="af-diagram">
<svg viewBox="0 0 800 190" role="img" aria-labelledby="embedding-title" xmlns="http://www.w3.org/2000/svg">
  <title id="embedding-title">Vom .af-Quelltext über das Bundle zum Player in der eigenen Web-App</title>
  <defs><marker id="embedding-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow" d="M0 0 L10 5 L0 10 z"/></marker></defs>
  <rect class="box" x="10" y="30" width="120" height="44" rx="6"/>
  <text x="70.0" y="52.0">garden.af</text>
  <rect class="box" x="200" y="30" width="170" height="44" rx="6"/>
  <text x="285.0" y="52.0">garden.bundle.json</text>
  <rect class="box" x="440" y="22" width="170" height="60" rx="6"/>
  <text x="525.0" y="44.0">@answerfield/player</text>
  <text x="525.0" y="60.0" class="muted">in deiner Web-App</text>
  <rect class="box" x="440" y="132" width="170" height="44" rx="6"/>
  <text x="525.0" y="154.0">Bedarfsprofil</text>
  <rect class="box" x="660" y="22" width="130" height="60" rx="6"/>
  <text x="725.0" y="44.0">Antworten, Codes,</text>
  <text x="725.0" y="60.0" class="muted">Speicherstand</text>
  <line class="edge" x1="130" y1="52" x2="198" y2="52" marker-end="url(#embedding-arrow)"/>
  <text class="label" x="164" y="41">af compile</text>
  <line class="edge" x1="370" y1="52" x2="438" y2="52" marker-end="url(#embedding-arrow)"/>
  <line class="edge" x1="525" y1="132" x2="525" y2="84" marker-end="url(#embedding-arrow)"/>
  <line class="edge" x1="610" y1="52" x2="658" y2="52" marker-end="url(#embedding-arrow)"/>
</svg>
</div>

## 1. Bundle erzeugen

```bash
npx af compile items/garden.af --out public/bundles
```

Das ergibt `public/bundles/garden.bundle.json`, ein Release-Bundle mit SHA-256. Ein Testheft wird genauso übersetzt;
das Bundle enthält dann alle Aufgaben des Hefts. Medien stehen nur als Verzeichnis darin, `--assets <ordner>` legt die
Dateien nach Inhalt benannt fürs CDN ab. Die CLI einrichten: [Auf der Kommandozeile](/cli).

## 2. Player installieren

Bis die Pakete auf npm liegen, kommen sie aus den Releases auf GitHub:

```bash
npm install https://github.com/answerfield/af-runtime/releases/download/v0.1.0/answerfield-player-0.1.0.tgz
```

## 3. Aufgabe zeigen

```ts
import { mountItem } from '@answerfield/player';

const bundle = await (await fetch('/bundles/garden.bundle.json')).json();
const player = mountItem(document.querySelector<HTMLElement>('#item')!, bundle, 'garden', {
    profile: { content: { simple_language: true } }   // Bedarfsprofil der Person, optional
});
player.on('responses', responses => save(responses));   // nach jeder Änderung
```

Das Bedarfsprofil beschreibt die Person (Vergrößerung, Kontrast, Einfache Sprache, Vorlesen, Taster …). Welche
Anpassungen daraus wirken, entscheidet die Runtime mit den Regeln von Testheft und Aufgabe
([Varianten für Bedarfe](/variants), [Anpassungen zulassen](/booklets#anpassungen-zulassen)).

## 4. Antworten und Codes

`player.responses()` liefert die Antworten, `player.coding()` die Codes. Für die [erste Aufgabe](/writing-items#aufbau-einer-aufgabe)
mit der Antwort „14“:

```json
{
  "item": "garden",
  "variables": {
    "area": { "value": 14, "changed": true, "displayed": true }
  },
  "accommodations": []
}
```

```json
{
  "item": "garden",
  "variables": {
    "area": { "code": 0, "label": "falsch", "score": 0 }
  },
  "scores": {}
}
```

Unbearbeitete Antworten bekommen `"missing": "omitted"` (gesehen) oder `"not_reached"`. Fragen an menschliche
Kodierende stehen als `pending` mit Kriterium und Ankerbeispielen da. Ohne Anzeige, etwa auf dem Server, kodiert
`codeResponses(bundle, responses, judgments)` dieselben Daten gleich.

## 5. Testhefte

```ts
import { mountBooklet } from '@answerfield/player';

const booklet = mountBooklet(frame, bundle, 'everyday', { profile, restore: saved });
booklet.on('change', state => updateNavigation(state));  // canNext, remaining, finished …
booklet.on('snapshot', snapshot => save(snapshot));     // zum Fortsetzen nach einem Abbruch
nextButton.onclick = () => booklet.next();
```

Navigation und Rahmen baut die Plattform selbst aus `state`; Zeitlimits, Teile und Reihenfolge regelt der Player
nach dem Testheft. Am Ende: `booklet.responses()`, `booklet.coding()`, `booklet.log()`.

## 6. Angular

`@answerfield/angular` legt eine dünne Schicht über den Player und reicht dessen Funktionen und Typen weiter:

```html
<af-item [bundle]="bundle" item="garden" [profile]="profile" (responsesChange)="save($event)" />

<af-booklet #booklet [bundle]="bundle" booklet="everyday" (snapshotChange)="save($event)" (finished)="done()" />
<button (click)="booklet.next()" [disabled]="!booklet.state()?.canNext">Weiter</button>
```

Ein vollständiges Beispiel ist die Web-App in [af-web-assessment](https://github.com/answerfield/af-web-assessment):
Testhefte durchführen, lokal speichern, Ergebnisse exportieren.

## 7. Bundle-Version prüfen

Jedes Bundle trägt Format und Version:

```json
{ "format": "af-bundle", "version": "0.1", "items": [ … ] }
```

Der Player lehnt ein Bundle ab, das er nicht ausführen kann: `mountItem` und `mountBooklet` werfen dann einen Fehler
mit Begründung. Prüfen lässt es sich vorher, etwa beim Hochladen, mit `@answerfield/bundle` (kommt mit dem Player):

```ts
import { bundleProblem } from '@answerfield/bundle';

const problem = bundleProblem(bundle);   // undefined, wenn diese Runtime das Bundle ausführen kann
if (problem) throw new Error(problem);   // z. B. „Bundle-Version 0.2 wird nicht unterstützt (diese Runtime: 0.1).“
```

Die Regel: Die Hauptversion muss passen. Vor 1.0 muss auch die Nebenversion passen, danach darf das Bundle keine neuere
Nebenversion haben als die Runtime. Hintergrund: [Das Bundle-Format](/concepts#das-bundle-format).

## Medien

Bilder und Audio liegen nicht im Bundle. Der Player fragt die Plattform nach einer URL:

```ts
mountItem(element, bundle, 'garden', { asset: assetResolver('https://cdn.example.org/af/') });
```

Statt `assetResolver` geht jede eigene Funktion `(path, info) => url`, etwa für signierte URLs oder einen Service
Worker.
