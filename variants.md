---
pageClass: af-wide
aside: false
---

# Varianten für Bedarfe

Ein Bedarfsprofil beschreibt, was eine Person braucht: größere Schrift, Einfache oder Leichte Sprache, Vorlesen, mehr
Zeit. Eine Aufgabe enthält dafür Varianten. Die Runtime wählt sie, die Kodierung bleibt dieselbe.

## Varianten im Text

<<< @/examples/variants.af#pool

- `variant(simple_language) "…"` ersetzt den Text davor, wenn das Profil Einfache Sprache verlangt: kürzere Sätze,
  geläufige Wörter, gleicher Inhalt.
- `variant(easy_language)` ist die Fassung in Leichter Sprache. Fehlt sie, gilt die Einfache Sprache.
- Für Fragen und Optionen von Bausteinen gibt es `wording(…, simple: …, easy: …)`.
- Antworten und Optionen bleiben in allen Fassungen gleich, damit die Kodierung dieselbe ist.

<div class="af-grid">

<AfPreview file="variants" item="pool" label="Ohne Anpassung" :codes="false" />

<AfPreview file="variants" item="pool" accommodations="simple_language" label="Einfache Sprache" :codes="false" />

<AfPreview file="variants" item="pool" accommodations="easy_language" label="Leichte Sprache" :codes="false" />

</div>

## Anpassungen

Manche Anpassungen brauchen keine eigene Fassung, die Runtime setzt sie für jede Aufgabe um:

<AfPreview file="variants" item="pool" accommodations="magnification" label="Vergrößerung" :codes="false" />

| Anpassung | Wirkung |
|---|---|
| `magnification` | Schrift und Bedienflächen größer, Reihen brechen um |
| `contrast` | hoher Kontrast, kräftige Rahmen |
| `reflow` | alles einspaltig, ohne waagerechtes Scrollen |
| `focus_emphasis` | kräftiger Fokusrahmen, Uhren nur auf Knopfdruck |
| `extended_time` | Zeitlimits mal dem Faktor aus dem Profil |
| `read_aloud` | ein Knopf an jedem Absatz und jeder Frage liest vor |
| `large_targets` | größere Schalter und Felder |
| `reduced_motion` | keine Animationen |
| `switch_access` | Bedienung mit einem oder zwei Tastern |
| `simple_language`, `easy_language` | Einfache bzw. Leichte Sprache, aus den Varianten der Aufgabe |
| `extended_descriptions` | ausführliche Bildbeschreibungen, aus `variant(extended_descriptions)` |

## Was eine Aufgabe ausschließt

Nicht jede Anpassung passt zu jeder Aufgabe. Eine Aufgabe zum Leseverstehen misst nichts mehr, wenn der Text
vorgelesen oder vereinfacht wird. Sie schließt diese Anpassungen deshalb aus:

<<< @/examples/variants.af#poster

<AfPreview file="variants" item="poster" accommodations="read_aloud,simple_language" label="Mit Vorlesen und Einfacher Sprache angefragt" />

`deny` nennt die ausgeschlossenen Anpassungen und den Grund. Auch wenn das Profil sie verlangt, bleiben sie aus.

## Im Testheft und im Player

Welche Anpassungen eine Person bekommt, steht in ihrem Bedarfsprofil, das die Plattform an den Player gibt
([In eine Webanwendung einbinden](/embedding#_3-aufgabe-zeigen)). Ein Testheft kann außerdem festlegen, welche
Anpassungen eine Studie überhaupt zulässt ([Testhefte zusammenstellen](/booklets#anpassungen-zulassen)). Wirksam ist,
was das Profil anfragt, das Testheft zulässt und die Aufgabe nicht ausschließt.
