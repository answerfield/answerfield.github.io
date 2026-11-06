# In VS Code

Die Erweiterung für VS Code ist der Editor für eigene Aufgaben: Dateien in einem Ordner, mit Git, Vorschau und
Design-Modus. Sie nutzt dieselbe Sprache und dieselbe Runtime wie der [Playground](/playground/){target="_blank"}.

## Einrichten

1. Die Datei `af-vscode-<version>.vsix` aus den [Releases von af-studio](https://github.com/answerfield/af-studio/releases)
   laden.
2. In VS Code **Erweiterungen → … → Aus VSIX installieren** wählen und die Datei angeben.
3. Einen Ordner öffnen. Jede `.af`-Datei darin gehört zum selben Arbeitsbereich: Ein Testheft findet die Aufgaben der
   anderen Dateien über ihren Namen.

## Schreiben

- **Neue Aufgabe:** Rechtsklick im Explorer → **Neue Aufgabe** legt eine Datei mit Aufgabe und Kodierung an.
- **Beim Tippen:** Fehler und Warnungen sind unterstrichen, auch zur Barrierefreiheit (etwa ein Bild ohne `alt`).
  Vervollständigung schlägt Bausteine und Namen vor, Hover zeigt Signatur und Beschreibung.
- **Gehe zu Definition** springt auch in die eingebauten Bibliotheken. **answerfield: Bibliothek öffnen** zeigt
  Prelude und `std`, also alles, woraus die Aufgabentypen gebaut sind.
- **Formatieren** bringt jede Datei in dieselbe Form, wie `af format` auf der Kommandozeile.

## Vorschau und Design

**answerfield: Vorschau und Design öffnen** (⌘K V bzw. Strg+K V oder das Symbol in der Titelleiste) öffnet die Aufgabe
in einem eigenen Tab, gerendert mit derselben Runtime wie in der Testung.

- **Vorschau:** Die Aufgabe ist bedienbar. Daneben stehen Antworten, Codes, Missing-Codes und Scores, live. Das
  Bedarfsprofil lässt sich umschalten, etwa auf Einfache Sprache oder Vergrößerung.
- **Design:** Elemente auswählen (Klick, Tab, Pfeiltasten), Texte direkt tippen, Eigenschaften im Formular ändern,
  Bausteine aus der Palette einfügen. Jede Änderung ist eine Textänderung in der Datei, mit Rückgängig, Speichern und
  Git wie beim Tippen.
- Auswahl und Cursor folgen einander: Wo der Cursor im Text steht, ist das Element in der Vorschau markiert.
  Alt+Klick in der Vorschau springt in den Text.
- Die Ansicht **answerfield-Struktur** im Explorer zeigt den Aufbau der Datei.

Beim Bearbeiten bleiben die Antworten in der Vorschau erhalten. Bei einem Syntaxfehler bleibt der letzte gültige Stand
stehen, bis der Fehler behoben ist.
