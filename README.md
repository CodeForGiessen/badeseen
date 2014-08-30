badeseen
========

Qualität der Badeseen im Landkreis Gießen

[![Build Status](https://travis-ci.org/CodeForGiessen/badeseen.svg?branch=master)](https://travis-ci.org/CodeForGiessen/badeseen)
[![devDependency Status](https://david-dm.org/CodeForGiessen/badeseen/dev-status.svg?branch=master)](https://david-dm.org/CodeForGiessen/badeseen#info=devDependencies)
[![Stories in Ready](https://badge.waffle.io/CodeForGiessen/badeseen.png?label=ready&title=Ready)](https://waffle.io/CodeForGiessen/badeseen)

## Development
Bevor es an die Arbeit geht, bitte vorher [hier](https://waffle.io/CodeForGiessen/badeseen) schauen ob tasks als `Ready` deklariert wurden und dann daran arbeiten. Die Tags `ready` und `help wanted` zeigen an, dass hier gerne geholfen werden darf. Tasks die unter `In Progress` stehen bitte nicht in angriff nehmen.

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

#### Font-Awesome
Wenn an den SASS-Dateien von Font-Awesome etwas angepasst wurde, müssen diese erneut in CSS umgewandelt werden, was durch `grunt sass:fontawesome` erledigt werden kann. Dieser Task muss explizit aufgerufen werden und wird **nicht** automatisch ausgeführt.

## Deployment
Eine auslieferbare Kopie der App kann über `grunt deploy` generiert werden. So wird ein .zip-Archiv erstellt (in `dist/`), ohne die Nodejs-Abhängigkeiten, den SASS-Code, die Tests usw.

### Deployment als GitHub-Page
Im Verzeichnis des Quelltextes: `git checkout gh-pages && git merge --no-ff master && git checkout master && git push` um zu deployen. Nicht zur staging area hinzugefügte Änderungen müssen vorher gestasht werden!
**Achtung:** vorher `make test` ausführen und Funktion sicherstellen.

## Redeployment
Um das Projekt an andere OK Labs anzupassen müssen lediglich die Variablen in `public/js/values.js` angepasst werden. Der Footer passt sich automatisch den gegebenen Informationen bzgl. der Grid-Größe an.