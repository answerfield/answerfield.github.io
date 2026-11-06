---
layout: home
title: Start

hero:
  name: answerfield
  text: Aufgaben als Text
  tagline: Eine Sprache für Test- und Lernaufgaben. Schreiben, prüfen, im Browser ausführen und automatisch kodieren.
  actions:
    - theme: brand
      text: Aufgaben schreiben
      link: /writing-items
    - theme: alt
      text: In eine Webanwendung einbinden
      link: /embedding
    - theme: alt
      text: Im Playground ausprobieren
      link: /playground/
      target: _blank

features:
  - title: Für Autorinnen und Autoren
    details: Eine Aufgabe ist eine lesbare Datei mit Inhalt, Antworten und Kodierung. Der Editor prüft beim Tippen und zeigt die Aufgabe sofort.
    link: /writing-items
    linkText: Erste Aufgabe in 10 Minuten
  - title: Für Entwicklerinnen und Entwickler
    details: Aus der Datei wird ein Bundle (JSON). Ein Player zeigt es in jeder Web-Anwendung und gibt Antworten und Codes zurück.
    link: /embedding
    linkText: Player einbinden
  - title: Wie es gebaut ist
    details: Sprache, Bundle, Runtime. Das Bundle-Format ist der Vertrag dazwischen; jede Seite lässt sich einzeln austauschen.
    link: /concepts
    linkText: Architektur und Konzepte
---

<div class="af-side">

<<< @/examples/fraction.af

<AfPreview file="fraction" item="fraction" />

</div>

Eine Datei mit Aufgabe und Kodierung. Der Compiler prüft sie, auch auf Barrierefreiheit; die Runtime führt sie im
Browser aus und kodiert `6/8` als falsch, `3/4` als richtig. Gerechnet wird mit exakten Brüchen.
