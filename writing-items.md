---
pageClass: af-wide
aside: false
---

# Meine erste Aufgabe

Eine Aufgabe in answerfield ist eine Textdatei mit der Endung `.af`. Darin stehen Inhalt, Antworten und Kodierung.
Am schnellsten geht es im [Playground](/playground/){target="_blank"}: im Browser, ohne Installation, links der Text,
rechts die Aufgabe und darunter Antworten und Codes. Für eigene Aufgaben als Dateien, mit Git, gibt es die
[Erweiterung für VS Code](/vscode).

Alle Beispiele auf dieser Seite sind bedienbar: Gib in der Vorschau eine Antwort ein, darunter steht sofort ihr Code.

## Aufbau einer Aufgabe

<div class="af-side">

<<< @/examples/garden.af

<AfPreview file="garden" item="garden" />

</div>

- `item garden "Das Gemüsebeet"` ist die Aufgabe: `garden` ist ihr Name, dahinter steht der Titel.
- `p { … }` ist ein Absatz. Darin steht die Lücke `NumberGap` mitten im Satz.
- `area = NumberGap(…)` nennt die Antwort `area`. Unter diesem Namen kodiert sie `coding garden`.
- `label` beschreibt die Lücke für Screenreader. Zu sehen ist der Satz drumherum.
- `correct(area == 12)` vergibt Code 1 „richtig“ (Score 1), wenn die Bedingung stimmt, sonst Code 0 „falsch“. Wer
  nichts einträgt, bekommt einen Missing-Code.

## Aufgabeninhalt

Eine Aufgabe besteht aus Absätzen und Bausteinen für Antworten. Jeder Baustein liefert eine Antwort eigener Art: eine
Menge gewählter Optionen, eine Zahl, eine Nummer oder einen Text.

<<< @/examples/train.af#item

<AfPreview file="train" item="train" :codes="false" />

| Baustein | Zeigt | Antwort |
|---|---|---|
| `Choice` | Optionen zum Anklicken (mit `max: 2` mehrere) | Menge der gewählten Nummern, z. B. `{1}` |
| `NumberGap` | Lücke für eine Zahl | die Zahl, auch aus „95 min“ oder „0,5“ |
| `Gap` | Lücke für Text | der Text |
| `Select` | Auswahlliste, auch mitten im Satz | Nummer der gewählten Option |
| `FreeText` | mehrzeiliges Textfeld | der Text |

Weitere Bausteine stehen unten unter [Was es noch gibt](#was-es-noch-gibt).

## Kodierung

Zu jeder Aufgabe gehört eine Kodierung mit demselben Namen. Sie ordnet jeder Antwort einen Code zu.

<<< @/examples/train.af#coding

<AfPreview file="train" item="train" label="Vorschau mit Kodierung" />

- `correct(…)` kennt zwei Codes: 1 „richtig“ mit Score 1 und 0 „falsch“.
- `codes(…)` unterscheidet mehrere Codes für eine Antwort. Der erste zutreffende gilt, trifft keiner zu, gilt Code 0.
  Ein Code ohne `score` zählt 0, zeigt aber, *welcher* Fehler gemacht wurde: Code 2 steht hier für „1 h 35 min als 135
  gelesen“.
- `manual("…")` überlässt die Antwort einer Person, die kodiert. Bis dahin ist sie offen.
- `sum_score(…)` zählt die Scores mehrerer Antworten zusammen. Ausgelassene Antworten zählen 0.

Mehr dazu, etwa Teilpunkte, offene Auswahl, mehrere Eingaben mit einem Code und Einheiten:
[Kodierung im Detail](/coding).

## Was es noch gibt

| | |
|---|---|
| Aufgabentypen | `Gap` `NumberGap` `FreeText` `Choice` `Check` `Select` `Match` `Matrix` `MarkWords` |
| Aufbau | `page` `section` `row` `p` `box` `list` `table` `stimulus` `image` `math` |
| Folgefragen | `show(when: …) { … }` blendet Inhalt abhängig von Antworten ein |
| Fassungen | Parameter wie `item chocolate(price: Int = 3)` und `versions(when: …)` machen aus einer Aufgabe viele |
| Rückmeldung zum Üben | `wrong`, `hints` und `solution` in der Kodierung, für Lern-Apps; Codes bleiben gleich |
| Zeichnen, Messen | `plane` mit Punkten und Formen, `Ruler`, `SetSquare`, `Geoboard`: [Zeichnen und Messen](/plane) |
| Medien, Zeit | `Listen` (Hörtext mit festem Ablauf), `Play`, `ReadAloud`, Zeitlimits je Teil |
| Eigenes | `fn` und `component`: [Eigene Funktionen und Komponenten](/components) |
| Typen | `Int` `Rational` `Text` `Bool` `List<T>` `Set<T>` …, exakte Brüche: `6/8 == 3/4` |

## Weiter

- [Kodierung im Detail](/coding): diagnostische Codes, Teilpunkte, offene Auswahl, Einheiten, manuelle Kodierung.
- [Eigene Funktionen und Komponenten](/components): wiederkehrende Rechnungen und eigene Bausteine.
- [Zeichnen und Messen](/plane): Koordinatenebene, Punkte setzen, Lineal und Geodreieck.
- [Varianten für Bedarfe](/variants): Einfache und Leichte Sprache, Vorlesen, Vergrößerung.
- [Testhefte zusammenstellen](/booklets): mehrere Aufgaben in Teilen, mit Zeitlimit.
