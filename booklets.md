---
pageClass: af-wide
aside: false
---

# Testhefte zusammenstellen

Ein Testheft fasst Aufgaben zu Teilen zusammen und legt fest, wie sie durchlaufen werden: Reihenfolge, Zeitlimits,
Navigation. Die Aufgaben stehen in eigenen Dateien und werden über ihren Namen eingebunden.

## Ein Testheft

<<< @/examples/booklet.af

Das Testheft nimmt die beiden Aufgaben aus [Meine erste Aufgabe](/writing-items): `garden` aus `garden.af` und
`train` aus `train.af`. Alle drei Dateien liegen im selben Ordner:

```
.
├── garden.af
├── train.af
└── booklet.af
```

- `part("…")` ist ein Teil. Teile werden nacheinander bearbeitet, zurück in einen früheren Teil geht es nie.
- `time: 10min` ist das Zeitlimit des Teils. Mit der Anpassung `extended_time` verlängert es sich um den Faktor aus
  dem Bedarfsprofil.
- `navigation: free` erlaubt innerhalb des Teils vor und zurück, `navigation: forward` nur vorwärts.
- `instruction("…") { … }` ist eine Seite ohne Antworten, etwa zur Einführung oder zwischen zwei Teilen.

Ein größeres Testheft mit Einführung, drei Aufgaben und Zeitlimit steckt im
[Playground](/playground/?example=booklet.af){target="_blank"}.

## Anpassungen zulassen

Eine Studie legt fest, welche Anpassungen überhaupt erlaubt sind. Das steht im Testheft:

<<< @/examples/variants.af#booklet

Wirksam ist, was das Bedarfsprofil der Person anfragt, das Testheft mit `allow` zulässt und die Aufgabe nicht mit
`deny` ausschließt ([Was eine Aufgabe ausschließt](/variants#was-eine-aufgabe-ausschließt)). Fehlt `allow`, ist jede
Anpassung zugelassen.

## Weiter

- [Auf der Kommandozeile](/cli): Testhefte prüfen, als Bundle übersetzen und als PDF setzen.
- [In eine Webanwendung einbinden](/embedding#_5-testhefte): ein Testheft mit dem Player durchführen.
