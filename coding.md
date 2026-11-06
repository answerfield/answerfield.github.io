---
pageClass: af-wide
aside: false
---

# Kodierung im Detail

Die Kodierung ordnet jeder Antwort einen Code zu. Ein Code sagt nicht nur „richtig“ oder „falsch“, sondern auch,
*welcher* Fehler gemacht wurde, und ein Score zählt die Punkte. Diese Seite zeigt die üblichen Fälle. Alle Vorschauen
sind bedienbar, die Codes stehen darunter.

## Diagnostische Codes und Teilpunkte

<<< @/examples/coding.af#diagnostic

<AfPreview file="coding" item="rounding" />

- `codes(…)` prüft die Codes der Reihe nach, der erste zutreffende gilt. Trifft keiner zu, gilt Code 0 „falsch“.
- `score` vergibt Punkte, hier 2 für die richtige Schreibweise und 1, wenn nur der Wert stimmt.
- Codes ohne `score` zählen 0, beschreiben aber typische Fehler: abgeschnitten statt gerundet, auf Ganze gerundet.
  So zeigt die Auswertung, woran es liegt.
- `normalize(…)` vergleicht den Text genau (hier ohne Leerzeichen), `number(…)` liest den Wert.

## Offene Auswahl: die Anzahl zählt, nicht welche

<<< @/examples/coding.af#open

<AfPreview file="coding" item="beads" />

- Die Antwort ist die Menge der gefärbten Perlen. `size(colored) == 4` prüft nur, *wie viele* es sind.
- Code 2 erkennt, wer die ungefärbten gezählt hat.
- Ähnlich: `count_in(liste, {…})` zählt, wie viele Einträge in einer Menge liegen, etwa „mindestens zwei der drei
  richtigen Optionen“.

## Mehrere Eingaben, ein Code

<<< @/examples/coding.af#several

<AfPreview file="coding" item="grid" />

- `point` ist keine Antwort, sondern eine Teilaufgabe aus zwei Antworten: richtig nur, wenn `x` *und* `y` stimmen.
  Die Kodierung erkennt selbst, welche Antworten dazugehören. Ist keine davon bearbeitet, bekommt die Teilaufgabe
  einen Missing-Code.
- `accepted([a, b], […]) == 2` zählt, wie viele der Muster von *verschiedenen* Antworten getroffen werden. So ist „Nenne
  zwei“ in beliebiger Reihenfolge richtig, aber zweimal dieselbe Zahl nicht.
- `sum_score(…)` zählt die Scores mehrerer Teilaufgaben zusammen.

## Texte, Zahlen und Einheiten

<<< @/examples/coding.af#text

<AfPreview file="coding" item="rope" />

- `quantity(length, "cm")` liest eine Zahl mit Einheit und rechnet um: „120 cm“, „1,2 m“ und „1200 mm“ ergeben 120. Ohne
  oder mit falscher Einheit ist das Ergebnis leer, die Antwort also falsch.
- `accept(name, "(der) Zähler", typos: 1)` prüft gegen ein Antwortmuster wie in einer Auswertungsanleitung: `( )` ist
  optional, `/` trennt Alternativen. Groß- und Kleinschreibung zählen nicht, ein Tippfehler je Wort ist erlaubt.
- Weitere Helfer: `number` (Zahl aus Text, auch mit Komma oder als Wort), `proportion` (Bruch, Dezimalzahl oder
  Prozent als Anteil), `rounds_to` (richtig gerundet), `is_reduced` (gekürzter Bruch).

## Manuell kodieren

<<< @/examples/coding.af#manual

<AfPreview file="coding" item="explain" />

- `manual("…")` stellt den Kodierenden eine Frage. Bis jemand urteilt, ist die Antwort offen.
- `yes` und `no` sind Ankerbeispiele: Antworten, die das Kriterium erfüllen bzw. nicht.
- `manual` lässt sich verknüpfen: `correct(number(a) == 95 or manual("…"))` kodiert eindeutige Antworten automatisch
  und legt nur die übrigen den Kodierenden vor.

## Fehlende Antworten

Codes gelten nur für bearbeitete Antworten. Was nicht bearbeitet wurde, bekommt einen Missing-Code: `omitted`, wenn die
Person die Antwort gesehen hat, `not_reached`, wenn sie nie angezeigt wurde, etwa weil die Zeit vorher ablief. In
Bedingungen fragen `changed(a)` und `displayed(a)` danach.
