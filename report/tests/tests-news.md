# Testberichte | Gruppe: IP2 DIY-Naturkosmetik

<!--
## Vorlage

**Story:** 

**Testfall-ID:**

**Vorbedingungen:** 

**Testbeschreibung:**

**Erwartetes Ergebnis:**

**Testergebnis:**

<br>

---

<br>

## Tabelle

-->


| Story | Testfall ID | Vorbedingung | Testbeschreibung | Erwartetes Ergebnis | Testergebnis |
| --- | --- | --- | --- | --- | --- |
| Als Nutzer möchte ich News und Beiträge zu Naturschutz-Themen erhalten und lesen, um micht über bestimmte Themen zu informieren und weiterzubilden. | NT01 | Der Service wird mittels Constructor aufgerufen | Der Nutzer besucht den News-Bereich, ohne eine Aktivität vorzunehmen | Die 'News-Collection' sollte aufgerufen werden | ok |
|  | NT02 |  |  | Die News-Variable im Service sollte einen Beispiel-Artikel emitten | ok |
|  | NT03 |  |  | Die NewsDelayed-Variable im Service sollte einen Wert nach mindestens 1500ms emitten | ok |
|  | NT04 |  |  | Die getArticleById-Methode sollte einen Beispiel-Artikel zurückgeben | ok
|  | NT05 | Der Benutzer besucht die News-Seite | Der Nutzer sieht eine kurze Vorschau des Artikels | Der Preview-Text ist 143 Zeichen lang | ok |
| | NT06 | - | Der Benutzer gibt tippt etwas in das Suchfeld ein | Die isSearchbarOpen-Variable sollte true sein | ok |
| | NT07 | - | Die Suchfunktion wird mit dem Paramter 'Weniger ist' aufgerufen | Der Artikel 'Weniger ist mehr' sollte gefunden werden | ok |
|  | NT08 |  | Der Benutzer klickt auf einen gesuchten Artikel | Die router.navigate-Funktion sollte aufgerufen werden, und isSearchbarOpen sollte nach 500ms false ergeben | ok |
|  | NT09 | - | Der Benutzer öffnet einen Artikel | Die ID sollte als URL-Parameter ausgelesen und der entsprechende Artikel sollte vom NewsService abgerufen werden | ok |
|  |  NT10 | - | Der Benutzer öffnet einen Artikel | Der abgerufene Artikel sollte im Template angezeigt werden | ok |
