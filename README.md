badeseen
========

Qualität der Badeseen im Landkreis Gießen

## Development
### Vorbereitungen
Um mit dem Entwickeln zu beginnen müssen über den Node Package Manager (`npm`) zunächst alle Abhängigkeiten installiert werden. Diese erlauben das automatische Testen des Codes, das Compilen des SASS-Codes und das Testen der Quelltexte gegen die Sprachspezifikationen (JShint, CSSLint).

```
npm install
```
(setzt eine funktionierende [Nodejs](http://nodejs.org)-Installation voraus)

Bevor mit der Entwicklung begonnen wird, sollte `grunt watch` gestartet werden. So wird nach jeder Änderung auf Syntaxfehler etc. geprüft, sowie SASS compiled — damit ist im Browser direkt live der aktuellste Entwicklungs-Stand einsehbar.

### Nach Änderungen
Nachdem Änderungen vorgenommen worden sind, sollte `make test` ausgeführt werden und ggf. notwendige `ignore`-Anweisungen für jshint hinzugefügt werden (aber nur wenn bewusst ist, was das für Auswirkungen hat!). Neuer Code ist mit Tests auszustatten, die Modulweise in `./test` zu finden sind.

Um den JavaScript-Code zu standardtisieren, muss `grunt beautify` ausgeführt werden. So werden z.B. Einrückungen usw. angepasst.

Wenn alle Tests durchlaufen und der JS-Code beautified ist, kann der Code ins Remote-Repository eingepflegt werden.

**Achtung:** `grunt deploy` ruft ebenso den `beautify`-Task auf.

## Deployment
Eine auslieferbare Kopie der App kann über `grunt deploy` generiert werden. So wird ein .zip-Archiv erstellt (in `dist/`), ohne die Nodejs-Abhängigkeiten, den SASS-Code, die Tests usw.
