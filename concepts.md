# Architektur und Konzepte

## Sprache, Bundle, Runtime

<div class="af-diagram">
<svg viewBox="0 0 760 170" role="img" aria-labelledby="layers-title" xmlns="http://www.w3.org/2000/svg">
  <title id="layers-title">Sprache übersetzt .af-Dateien in ein Bundle, die Runtime führt es aus</title>
  <defs><marker id="layers-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow" d="M0 0 L10 5 L0 10 z"/></marker></defs>
  <rect class="group" x="10" y="14" width="330" height="142" rx="10"/>
  <text class="group-label" x="24" y="34">Sprache</text>
  <rect class="box" x="30" y="70" width="120" height="50" rx="6"/>
  <text x="90.0" y="95.0">.af-Dateien</text>
  <rect class="box" x="180" y="60" width="145" height="70" rx="6"/>
  <text x="252.5" y="79.0">Compiler</text>
  <text x="252.5" y="95.0" class="muted">prüft Typen,</text>
  <text x="252.5" y="111.0" class="muted">Barrierefreiheit</text>
  <line class="edge" x1="150" y1="95" x2="178" y2="95" marker-end="url(#layers-arrow)"/>
  <rect class="group" x="420" y="14" width="330" height="142" rx="10"/>
  <text class="group-label" x="434" y="34">Runtime</text>
  <rect class="box" x="440" y="70" width="100" height="50" rx="6"/>
  <text x="490.0" y="95.0">Player</text>
  <rect class="box" x="575" y="60" width="160" height="70" rx="6"/>
  <text x="655.0" y="87.0">Anzeige als</text>
  <text x="655.0" y="103.0" class="muted">Web Components</text>
  <line class="edge" x1="540" y1="95" x2="573" y2="95" marker-end="url(#layers-arrow)"/>
  <line class="edge" x1="325" y1="95" x2="438" y2="95" marker-end="url(#layers-arrow)"/>
  <text class="label" x="381" y="84">Bundle (JSON)</text>
</svg>
</div>

answerfield besteht aus drei Teilen:

- **Sprache:** Grammatik, Typprüfung und Compiler. Sie arbeitet mit dem Quelltext und meldet Fehler schon beim
  Schreiben.
- **Bundle:** Der Compiler übersetzt Aufgaben und Testhefte in ein JSON-Dokument. Es enthält Aufgaben, Bausteine,
  Kodierung und ein Verzeichnis der Medien. Zum Ausführen wird nur das Bundle gebraucht, nicht der Quelltext.
- **Runtime:** Sie führt das Bundle im Browser aus, zeigt die Aufgaben an und kodiert die Antworten. Die Runtime
  hängt nicht von der Sprache ab. Plattformen binden sie über den **Player** ein, die Pakete darunter können sich
  ändern, ohne dass sich für die Plattform etwas ändert.

Weil beide Seiten nur über das Bundle verbunden sind, lassen sie sich unabhängig voneinander ersetzen. Eine andere
Runtime, etwa für eine native App, braucht keinen Compiler, und ein anderer Editor keine Runtime.

## Das Bundle-Format

Das Format des Bundles ist im Paket `@answerfield/bundle` beschrieben, mit Typen und einem **Katalog**. Der Katalog
listet die eingebauten Typen, Aufzählungen, Funktionen und Elemente in der Form, in der sie im Bundle vorkommen. Was
der Compiler beim Übersetzen auflöst, etwa `show`, `variant` oder die Codes einer Kodierung, steht nicht im Katalog.
Die Runtime bekommt es bereits als fertige Struktur im Bundle.

<div class="af-diagram">
<svg viewBox="0 0 760 110" role="img" aria-labelledby="catalog-title" xmlns="http://www.w3.org/2000/svg">
  <title id="catalog-title">Compiler und Runtime werden gegen den Katalog im Bundle-Format getestet</title>
  <defs><marker id="catalog-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow" d="M0 0 L10 5 L0 10 z"/></marker></defs>
  <rect class="box" x="10" y="48" width="150" height="50" rx="6"/>
  <text x="85.0" y="65.0">Compiler</text>
  <text x="85.0" y="81.0" class="muted">(Sprache)</text>
  <rect class="box" x="305" y="48" width="150" height="50" rx="6"/>
  <text x="380.0" y="65.0">Katalog</text>
  <text x="380.0" y="81.0" class="muted">(Bundle-Format)</text>
  <rect class="box" x="600" y="48" width="150" height="50" rx="6"/>
  <text x="675.0" y="73.0">Runtime</text>
  <line class="edge dashed" x1="160" y1="73" x2="303" y2="73" marker-end="url(#catalog-arrow)"/>
  <line class="edge dashed" x1="600" y1="73" x2="457" y2="73" marker-end="url(#catalog-arrow)"/>
  <text class="label" x="232" y="20">Test: erzeugt nur,</text>
  <text class="label" x="232" y="35">was im Katalog steht</text>
  <text class="label" x="528" y="20">Test: setzt genau</text>
  <text class="label" x="528" y="35">die Einträge um</text>
</svg>
</div>

Compiler und Runtime werden in Tests gegen den Katalog geprüft. Ändert er sich, steigt die Version des Bundle-Formats.
Ein Bundle mit einer Version, die die Runtime nicht kennt, lehnt sie beim Laden ab
([Versionsprüfung](/embedding#_7-bundle-version-prufen)).

Das Verhalten beschreiben **Konformitätsfälle**: je Fall ein fertiges Bundle und Abläufe aus Eingaben mit den
erwarteten Antworten und Codes, jeweils mit Verweis auf die Spezifikation. Sie liegen im Paket
`@answerfield/conformance` in `af-format` und sind unabhängig von der Sprache. Der Compiler wird daran geprüft, ob er
dieselben Bundles erzeugt, die Runtime, ob sie die Abläufe gleich ausführt. Eine andere Runtime kann dieselben Fälle
verwenden.

## Eingebaute Elemente und Standardbibliothek

Fest eingebaut sind einige Dutzend Elemente und Funktionen: Text und Aufbau, drei interaktive Grundbausteine (`toggle`,
`input`, `value`), Zeit, Medien und eine Ebene zum Zeichnen. Die Aufgabentypen wie `Choice`, `Gap` oder `Match` sind
in answerfield selbst geschrieben und liegen in der Standardbibliothek `std.af`. Ein neuer Aufgabentyp lässt sich
deshalb als `component` schreiben, ohne die Runtime zu ändern ([Eigene Aufgabentypen](/components#eigene-aufgabentypen)).

## Reproduzierbarkeit

- Dieselbe Quelle ergibt Byte für Byte dasselbe Bundle. Über seine Prüfsumme lässt sich festhalten, welche Fassung einer
  Aufgabe in einer Testung eingesetzt wurde.
- Ausdrücke enthalten weder Zufall noch Uhrzeit. Dieselben Eingaben ergeben dieselben Antworten und Codes, im Browser
  wie auf dem Server.
- Zahlen sind exakte Brüche, es entstehen keine Rundungsfehler: `2/3 + 1/6 == 5/6`.
- Ein Fehler zur Laufzeit, etwa eine Division durch eine eingegebene Null, beendet die Aufgabe nicht. Der betroffene
  Wert bleibt leer, und eine betroffene Kodierregel liefert `error`.

## Anpassungen

Eine Person kann ein **Bedarfsprofil** haben, etwa mit Vergrößerung, hohem Kontrast, Einfacher oder Leichter Sprache,
Vorlesen oder Bedienung mit Tastern. Ein Testheft legt fest, welche Anpassungen zugelassen sind, und eine Aufgabe kann
einzelne ausschließen. Angewendet werden die Anpassungen, die alle drei erlauben. Fassungen in anderen Sprachstufen,
Bildbeschreibungen und Begründungen für Ausschlüsse stehen in der Aufgabe selbst und werden vom Compiler mitgeprüft
([Varianten für Bedarfe](/variants)).

## Hosts

Ein Host ist eine Anwendung, die Aufgaben anzeigt oder bearbeitet.

| Host | enthält |
|---|---|
| VS-Code-Erweiterung | Sprache (Language Server) und Runtime, mit Vorschau und Design-Modus |
| Playground | dasselbe im Browser: Sprache im Web Worker, Runtime in der Vorschau |
| Web-Assessment | nur die Runtime, über die Angular-Komponenten; lädt fertige Bundles |
| eigene Plattform | nur die Runtime, über `@answerfield/player` |
| Kommandozeile `af` | Sprache und Kodierung: prüfen, formatieren, übersetzen, PDF, Import aus dem IQB-Format |

## Repositories

Der Code liegt in mehreren Repositories der Organisation [answerfield](https://github.com/answerfield). Jedes lässt
sich für sich bauen und hängt nur von den Repositories ab, die vor ihm veröffentlicht werden.

| Repository | Inhalt |
|---|---|
| [af-format](https://github.com/answerfield/af-format) | Bundle-Format mit Katalog (`@answerfield/bundle`), Ausdrücke (`expr`), Konformitätsfälle (`conformance`) |
| [af-language](https://github.com/answerfield/af-language) | Grammatik, `prelude.af`, Language Server, Compiler, Standardbibliothek `std.af` |
| [af-runtime](https://github.com/answerfield/af-runtime) | `runtime-core`, `runtime-wc`, `player`, `practice` (Üben) |
| [af-cli](https://github.com/answerfield/af-cli) | Kommandozeile `af`, Import aus dem IQB-Format, PDF-Export |
| [af-web-assessment](https://github.com/answerfield/af-web-assessment) | Angular-Komponenten und eine Web-App als Beispiel für einen Host |
| [af-studio](https://github.com/answerfield/af-studio) | VS-Code-Erweiterung, Vorschau und Designer, Playground |

<div class="af-diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="repos-title" xmlns="http://www.w3.org/2000/svg">
  <title id="repos-title">Abhängigkeiten zwischen den Repositories</title>
  <defs><marker id="repos-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow" d="M0 0 L10 5 L0 10 z"/></marker></defs>
  <rect class="box" x="20" y="20" width="150" height="40" rx="6"/>
  <text x="95.0" y="40.0">af-studio</text>
  <rect class="box" x="245" y="20" width="150" height="40" rx="6"/>
  <text x="320.0" y="40.0">af-cli</text>
  <rect class="box" x="470" y="20" width="150" height="40" rx="6"/>
  <text x="545.0" y="40.0">af-web-assessment</text>
  <rect class="box" x="130" y="110" width="150" height="40" rx="6"/>
  <text x="205.0" y="130.0">af-language</text>
  <rect class="box" x="360" y="110" width="150" height="40" rx="6"/>
  <text x="435.0" y="130.0">af-runtime</text>
  <rect class="box" x="245" y="200" width="150" height="40" rx="6"/>
  <text x="320.0" y="220.0">af-format</text>
  <line class="edge" x1="80" y1="60" x2="180" y2="108" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="130" y1="60" x2="380" y2="108" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="300" y1="60" x2="240" y2="108" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="340" y1="60" x2="410" y2="108" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="545" y1="60" x2="470" y2="108" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="205" y1="150" x2="295" y2="198" marker-end="url(#repos-arrow)"/>
  <line class="edge" x1="435" y1="150" x2="345" y2="198" marker-end="url(#repos-arrow)"/>
</svg>
</div>

Ein Pfeil bedeutet „hängt ab von“. `af-cli`, `af-web-assessment` und `af-studio` nutzen `af-format` auch direkt, diese
Pfeile sind der Übersicht halber weggelassen. Die Runtime hängt nicht von der Sprache ab. Die Standardbibliothek gehört
zur Sprache, weil der Compiler ihre Bausteine beim Übersetzen in jedes Bundle übernimmt.

**Lizenzen:** Code Apache-2.0, Standardbibliothek und `prelude.af` 0BSD, Doku und Spezifikation CC BY 4.0,
Beispielaufgaben und Konformitätsfälle CC0.
