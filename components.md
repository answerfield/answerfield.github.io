---
pageClass: af-wide
aside: false
---

# Eigene Funktionen und Komponenten

Was in mehreren Aufgaben vorkommt, schreibst du einmal: Rechnungen als Funktion `fn`, Bausteine als Komponente
`component`. Auch die Aufgabentypen der Standardbibliothek wie `Choice` und `Gap` sind so in answerfield geschrieben.

## Funktionen

<<< @/examples/components.af#fn

<AfPreview file="components" item="bus" />

- `fn minutes(…): Int = …` ist eine Funktion mit Parametern, Ergebnistyp und einem Ausdruck.
- Funktionen gehen überall, wo ein Ausdruck steht: in Texten, Bedingungen und der Kodierung.
- Gerechnet wird exakt: `1/3 + 1/6 == 1/2` stimmt, ohne Rundungsfehler.

## Komponenten zum Anzeigen

<<< @/examples/components.af#display

<AfPreview file="components" item="cake" />

- Eine `component` ohne `response` zeigt nur etwas an. Ihre Parameter sind wie bei einer Funktion.
- Der Kommentar `/** … */` über der Komponente erscheint im Editor als Beschreibung beim Hover.
- `for i in 1 .. parts { … }` wiederholt Inhalt, `if … then … else …` wählt aus.

## Eigene Aufgabentypen

Eine Komponente mit `response` liefert eine Antwort, wie `Choice` oder `NumberGap`:

<<< @/examples/components.af#response

<AfPreview file="components" item="rating" />

- `state stars: Int = 0` ist der Zustand der Komponente. `on check: stars := i` ändert ihn, wenn ein Stern gewählt wird.
- `response stars` macht den Zustand zur Antwort. In der Aufgabe heißt sie dann `difficulty`.
- `group` und `toggle` sind eingebaute Bausteine. Aus ihnen und wenigen weiteren sind alle Aufgabentypen gebaut, die
  Runtime muss für einen neuen Typ nichts Neues können.

Die Standardbibliothek zeigt viele weitere Beispiele: In VS Code öffnet **answerfield: Bibliothek öffnen** sie, im
Playground zeigt Hover die Signatur jedes Bausteins.
