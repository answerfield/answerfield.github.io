---
pageClass: af-wide
aside: false
---

# Zeichnen und Messen

Für Geometrie, Diagramme und Aufgaben zum Ziehen gibt es `plane`: eine Ebene mit Koordinaten, in der Punkte, Formen und
Werkzeuge liegen. Koordinaten sind exakt, gemessen wird in Einheiten der Zeichnung, nicht in Bildschirmpixeln.

## Eine Figur zeigen

<<< @/examples/plane.af#figure

<AfPreview file="plane" item="rectangle" />

- `plane(x: 0 .. 8, y: 0 .. 5, grid: 1)` legt den Ausschnitt fest, `grid` zeichnet Kästchen.
- `(1 | 1)` ist ein Punkt. `polygon` verbindet Punkte zu einer Form, `dot` setzt einen beschrifteten Punkt.
- Weitere Formen aus der Standardbibliothek: `segment`, `line`, `circle`, `sector`, `right_angle`.

## Einen Punkt setzen lassen

<<< @/examples/plane.af#point

<AfPreview file="plane" item="point" />

- `value(bind: point, …)` ist ein Griff, den man zieht, ins Gitter klickt oder mit den Pfeiltasten bewegt. `step: 1`
  rastet auf ganze Kästchen ein.
- Die Komponente `GridPoint` macht daraus einen Aufgabentyp mit dem Punkt als Antwort, wie unter
  [Eigene Aufgabentypen](/components#eigene-aufgabentypen).
- Die Kodierung rechnet mit dem Punkt. Für Formen gibt es Funktionen wie `area(…)` (Fläche eines Vielecks, exakt als
  Bruch), `is_right_angle(…)` oder `on_line(…)`: So prüft die Kodierung, *was* gezeichnet wurde, nicht wo genau.

## Messen

<<< @/examples/plane.af#measure

<AfPreview file="plane" item="ruler" />

- `Ruler` ist ein Lineal, das man verschiebt und dreht. `SetSquare` ist ein Geodreieck. Beide bleiben zwischen `min` und
  `max`.
- Eine Einheit der Ebene entspricht 1 cm auf dem Lineal. Die Kodierung lässt Messgenauigkeit zu: `length in 59/10 ..
  61/10`.
