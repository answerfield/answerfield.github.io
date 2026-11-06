---
pageClass: af-wide
aside: false
---

# Auf der Kommandozeile

Die Kommandozeile `af` arbeitet auf einem Ordner mit `.af`-Dateien: Sie prüft und formatiert, übersetzt Aufgaben und
Testhefte in Bundles, setzt sie als PDF und importiert Aufgaben aus anderen Formaten. So lässt sich ein ganzer
Aufgabenpool etwa in einer CI prüfen.

## Einrichten

Bis die Pakete auf npm liegen, kommt `af` aus dem Release:

```bash
npm install --save-dev https://github.com/answerfield/af-cli/releases/download/v0.1.0/answerfield-cli-0.1.0.tgz
```

`af` arbeitet auf dem Ordner, in dem es läuft. Jede `.af`-Datei darin gehört zum selben Arbeitsbereich, so findet ein
Testheft die Aufgaben der anderen Dateien. Für die Beispiele unten liegen die Dateien aus
[Testhefte zusammenstellen](/booklets) im Ordner:

```
.
├── garden.af
├── train.af
└── booklet.af
```

## Prüfen und formatieren

```bash
npx af check .              # alle .af-Dateien prüfen; Exit-Code 1 bei Fehlern
npx af check . --versions   # je Aufgabe: was sie ausschließt, wo eine Sprachstufe noch fehlt
npx af format .             # einheitlich formatieren
npx af format . --check     # nur prüfen, etwa in einer CI
```

`af check` meldet dieselben Fehler und Warnungen wie der Editor, auch zur Barrierefreiheit.

## Bundles erzeugen

```bash
npx af compile booklet.af --out dist      # Bundle des Testhefts mit beiden Aufgaben
npx af compile garden.af --out dist       # Bundle einer einzelnen Aufgabe
```

`af compile` schreibt `dist/booklet.bundle.json` und nennt dessen SHA-256. Dieselbe Quelle ergibt immer dieselben
Bytes. Bei einem Fehler entsteht kein Bundle.

- `--no-feedback` lässt die Rückmeldungen zum Üben weg, etwa für eine Testung, in der keine Lösungen ausgeliefert
  werden sollen.
- `--assets <ordner>` legt Bilder und Audio nach Inhalt benannt ab, etwa für ein CDN.

Wie eine Plattform das Bundle zeigt: [In eine Webanwendung einbinden](/embedding).

## Als PDF setzen

```bash
npx af pdf garden.af                                          # eine Aufgabe
npx af pdf booklet.af --accommodations easy_language,magnification
```

`af pdf` setzt eine Aufgabe oder ein Testheft als PDF für den Druck, mit derselben Grundlage wie digital: Sprachstufen,
Beschreibungen und Vergrößerung (Großdruck) wirken über `--accommodations`. Aus Bausteinen wird ihre Papierform, aus
einer Option ein Kästchen, aus einer Lücke eine Schreiblinie, aus einer Ebene Gitter und Formen. Dieselbe Quelle
ergibt Byte für Byte dasselbe PDF.

- `--typst` schreibt den Quelltext für [Typst](https://typst.app) daneben.
- `--brand <ordner>` setzt Kopf, Fuß und Deckblatt aus einem Ordner mit `brand.json` und Logo. Mehrere Ordner,
  durch Komma getrennt, ergeben je Marke ein PDF.

## Aufgaben importieren

```bash
npx af import iqb units/ --out imported
```

`af import iqb` übersetzt Units im Format des IQB (Unit-Definition und Kodierschema) in `.af`-Dateien, eine je Unit,
geprüft und formatiert. Medien landen im Unterordner `media/`, Testhefte in `booklets.af`. `import-report.json`
nennt je Unit, was übernommen, angenähert oder nicht übernommen ist.
