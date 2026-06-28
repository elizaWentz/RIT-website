# RIT project detail template

Deze map bevat een herbruikbare projectdetailpagina voor de RIT website.

Belangrijkste bestanden:

- `index.html` - inhoud en HTML-structuur van de detailpagina
- `styles/contentpagina.css` - styling, layout, thema en responsive gedrag
- `contentpagina.js` - laadt de p5 sketch in de hero en koppelt de downloadlink
- `sketches/` - p5 sketches die per project kunnen verschillen
- `vendor/p5.min.js` - p5.js library

## Projectinhoud aanpassen

De meeste content staat in `index.html`.

Pas hier per project aan:

- titel in de hero
- schooljaar en aantal studenten
- opleiding / jaar / duur / niveau
- intro tekst
- onderwijseenheid
- partners
- bronnenlink
- gallery placeholders of afbeeldingen
- gerelateerde projecten

Zoek in `index.html` naar de tekst die je wilt aanpassen en vervang die direct.

## Hero sketch aanpassen

De hero sketch wordt ingesteld op de `<main>` tag in `index.html`.

```html
<main
  class="project-detail project-detail--blue"
  data-sketch-src="sketches/03-favoriet-50-variatie3.js"
>
```

Wil je een andere sketch gebruiken? Verander alleen `data-sketch-src`.

Voorbeeld:

```html
data-sketch-src="sketches/13-favoriet-49.js"
```

Zorg dat het bestand in de map `sketches/` staat.

Laat de p5-code in `contentpagina.js` zoveel mogelijk intact. Die code zorgt ervoor dat de sketch wordt geladen en dat de download/exportfunctie blijft werken.

## Thema aanpassen

Het kleurthema wordt ingesteld met een class op `<main>`.

Blauw thema:

```html
<main class="project-detail project-detail--blue">
```

Beige thema:

```html
<main class="project-detail project-detail--beige">
```

De accentkleur staat in `styles/contentpagina.css`:

```css
.project-detail {
  --project-detail-accent: #9fc6c8;
}
```

Voor beige:

```css
.project-detail--beige {
  --project-detail-accent: #E8D7A9;
}
```

Gebruik de variabelen in plaats van losse kleuren hard te coderen. Dan kan het thema later makkelijk worden gewijzigd.

## Layout en spacing aanpassen

De belangrijkste layoutwaarden staan bovenaan in `styles/contentpagina.css` binnen `.project-detail`.

```css
--project-detail-page-margin
--project-detail-container-width
--project-detail-section-spacing
--project-detail-content-gap
--project-detail-component-gap
--project-detail-facts-width
--project-detail-hero-panel-width
--project-detail-hero-height
--project-detail-card-radius
```

Gebruik deze variabelen als je de algemene layout wilt aanpassen.

Voorbeelden:

- Meer ruimte links en rechts: pas `--project-detail-page-margin` aan.
- De maximale contentbreedte aanpassen: pas `--project-detail-container-width` aan.
- Meer ruimte tussen secties: pas `--project-detail-section-spacing` of de sectie-specifieke padding aan.
- De blauwe hero box breder maken: pas `--project-detail-hero-panel-width` aan.
- De facts rij smaller of breder maken: pas `--project-detail-facts-width` aan.

Vermijd losse `margin-left`, `padding-left` of vaste widths op individuele onderdelen, tenzij het echt om een component-specifieke aanpassing gaat.

## Gallery afbeeldingen toevoegen

De gallery gebruikt nu placeholders.

In `index.html` staan deze elementen:

```html
<span class="project-detail__image-placeholder" role="img" aria-label="Plaats voor projectfoto 1."></span>
```

Vervang een placeholder door een echte afbeelding:

```html
<img src="images/projectfoto-1.jpg" alt="Beschrijf kort wat er op de foto te zien is.">
```

Gebruik altijd een betekenisvolle `alt` tekst.

Als een afbeelding puur decoratief is, gebruik dan:

```html
alt=""
```

## Gerelateerde projecten aanpassen

Gerelateerde projecten staan onder:

```html
<section class="project-detail__section--gerelateerd">
```

Per kaart kun je aanpassen:

- afbeelding
- titel
- beschrijving
- link
- `aria-label` van de link

De hover-effecten staan in `styles/contentpagina.css` bij:

```css
.project-detail__related-card
.project-detail__related-card-image
.project-detail__related-card a
```

De kaarten gebruiken dezelfde kolombreedte als de gallery placeholders.

## Bronnenlink hoverkleur

De hoverkleur van de bronnenlink staat in `styles/contentpagina.css`:

```css
.project-detail__details-list a:hover,
.project-detail__details-list a:focus-visible {
  color: #e85a12;
}
```

Wil je deze kleur later centraal maken? Maak er dan een CSS variable van, bijvoorbeeld:

```css
--project-detail-link-hover: #e85a12;
```

## CSS naamgeving

De pagina is gescoped onder:

```css
.project-detail
```

Gebruik voor nieuwe classes dezelfde BEM-stijl:

```css
.project-detail__component-name
.project-detail__component-name--variant
```

Voorbeelden:

- `.project-detail__container`
- `.project-detail__intro-grid`
- `.project-detail__facts-list`
- `.project-detail__related-card`

Voeg geen algemene classes toe zoals `.container`, `.card` of `.section`, omdat deze kunnen botsen wanneer de template in een grotere website wordt geïntegreerd.

## Accessibility checklist

Let bij aanpassingen op:

- Gebruik logische heading volgorde.
- Links en knoppen moeten duidelijke tekst of een duidelijk `aria-label` hebben.
- Afbeeldingen hebben betekenisvolle `alt` tekst.
- Interactieve elementen moeten met toetsenbord bereikbaar blijven.
- Verwijder focus states niet.
- Zorg voor voldoende kleurcontrast als je het thema aanpast.
- Gebruik geen hover-only informatie die niet beschikbaar is voor toetsenbordgebruikers.

## JavaScript

`contentpagina.js` zoekt automatisch naar:

```html
<main class="project-detail" data-sketch-src="...">
```

Daarna:

1. leest het script het sketchpad uit `data-sketch-src`
2. laadt het de sketch
3. plaatst het canvas in de hero
4. koppelt de downloadlink aan het sketchbestand

Als je meerdere projectdetailpagina's maakt, hoef je meestal alleen `data-sketch-src` in de HTML te wijzigen.

## Lokale test

Open de pagina via een lokale server, niet direct als `file://`, omdat p5 en losse bestanden dan betrouwbaarder laden.

Voorbeeld:

```bash
python3 -m http.server 8000
```

Open daarna:

```text
http://127.0.0.1:8000/
```

Controleer na wijzigingen:

- hero sketch laadt
- downloadlink werkt
- layout klopt op desktop en mobiel
- hover states werken
- toetsenbordfocus is zichtbaar
- afbeeldingen hebben goede alt teksten



# RIT homepage template

Deze map bevat de homepage van de Responsible IT website.

Belangrijkste bestanden:

* `index.html` - inhoud en HTML-structuur van de homepage
* `style.css` - styling, layout, responsive gedrag en componenten
* `script.js` - verzorgt de interactieve onderdelen van de website
* `sketches/` - p5 sketches voor de hero banner
* `vendor/p5.min.js` - p5.js library

## Homepage aanpassen

De meeste content staat in `index.html`.

Pas hier aan:

* hero banner
* intro tekst
* knoppen
* uitgelichte studentenprojecten
* uitgelichte onderzoeksprojecten
* footer links

Zoek in `index.html` naar de tekst die je wilt aanpassen en vervang die direct.

## Hero sketch aanpassen

De hero sketch wordt ingesteld op de `<section>` van de hero.

```html
<section
  class="hero"
  data-hero-sketch-src="sketches/03-favoriet-50-variatie3.js">
```

Wil je een andere sketch gebruiken? Verander alleen `data-hero-sketch-src`.

Voorbeeld:

```html
data-hero-sketch-src="sketches/13-favoriet-49.js"
```

Zorg dat het bestand in de map `sketches/` staat.

Laat de p5-code in `script.js` zoveel mogelijk intact. Die code zorgt ervoor dat de sketch wordt geladen en dat de downloadfunctie blijft werken.

## Uitgelichte projecten aanpassen

De studenten- en onderzoeksprojecten bestaan uit projectkaarten.

De kaarten staan in:

```html
<div class="card-grid">
```

Per kaart kun je aanpassen:

* afbeelding
* titel
* beschrijving
* link
* alt-tekst van de afbeelding

Gebruik altijd een betekenisvolle `alt` tekst. Is een afbeelding decoratief, gebruik dan:

```html
alt=""
```

## Buttons aanpassen

De homepage gebruikt verschillende knoppen.

Voorbeelden:

```html
<a class="btn btn-primary">
```

```html
<a class="btn btn-secondary">
```

Gebruik deze bestaande classes zodat alle knoppen dezelfde styling behouden.

## Layout aanpassen

De belangrijkste layoutwaarden staan bovenaan in `style.css`.

```css
--page-margin
--container-width
--transition
```

Gebruik deze variabelen wanneer je de algemene layout wilt aanpassen.

Voorbeelden:

* Meer ruimte links en rechts: pas `--page-margin` aan.
* Maximale breedte aanpassen: pas `--container-width` aan.
* Overgangen sneller of langzamer maken: pas `--transition` aan.

Vermijd losse `margin-left`, `padding-left` of vaste breedtes wanneer een CSS-variabele hetzelfde resultaat kan geven.

## CSS naamgeving

Gebruik de bestaande componentnamen.

Voorbeelden:

```css
.hero
.intro-section
.projects-section
.card-grid
.project-card
.section-header
```

Voeg geen algemene classes toe zoals `.container`, `.card` of `.section`, omdat deze kunnen botsen wanneer de template later wordt uitgebreid.

## Accessibility checklist

Let bij aanpassingen op:

* Gebruik een logische heading volgorde.
* Links en knoppen moeten duidelijke tekst of een duidelijk `aria-label` hebben.
* Afbeeldingen hebben betekenisvolle `alt` teksten.
* Interactieve elementen moeten met het toetsenbord bereikbaar blijven.
* Verwijder focus states niet.
* Zorg voor voldoende kleurcontrast.

## JavaScript

`script.js` verzorgt automatisch:

* toegankelijkheidspaneel
* lettergrootte
* hoog contrast
* animaties verminderen
* mobiel menu
* hero p5 sketch
* downloadlink van de hero sketch

Voor de hero zoekt het script automatisch naar:

```html
<section class="hero" data-hero-sketch-src="...">
```

Daarna:

1. leest het script het sketchpad uit `data-hero-sketch-src`
2. laadt het de sketch
3. plaatst het canvas in de hero banner
4. koppelt het de downloadlink aan het sketchbestand

Meestal hoef je alleen `data-hero-sketch-src` in de HTML aan te passen.

## Lokale test

Open de pagina via een lokale server, niet direct als `file://`, omdat p5 en losse bestanden dan betrouwbaarder laden.

Voorbeeld:

```bash
python3 -m http.server 8000
```

Open daarna:

```text
http://127.0.0.1:8000/
```

Controleer na wijzigingen:

* hero sketch laadt
* downloadlink werkt
* layout klopt op desktop en mobiel
* kaarten worden correct weergegeven
* menu werkt op mobiel
* toegankelijkheidspaneel werkt
* afbeeldingen hebben goede alt teksten



# RIT studentenprojecten template

Deze map bevat de studentenprojectenpagina van de Responsible IT website.

Belangrijkste bestanden:

* `over-p5.html` - inhoud en HTML-structuur van de studentenprojectenpagina
* `css/style.css` - styling, layout, responsive gedrag en componenten
* `script.js` - verzorgt het menu, toegankelijkheid, hero sketch en interactieve onderdelen
* `sketches/` - p5 sketches voor de hero banner
* `vendor/p5.min.js` - p5.js library

## Paginainhoud aanpassen

De meeste content staat in `over-p5.html`.

Pas hier aan:

* hero titel
* introductietekst
* projectkaarten
* documentatie
* accordion inhoud
* afbeeldingen
* links

Zoek in `over-p5.html` naar de tekst die je wilt aanpassen en vervang die direct.

## Hero sketch aanpassen

De hero sketch wordt ingesteld op de `<section>` van de hero.

```html
<section
  class="p5-hero"
  data-hero-sketch-src="sketches/03-favoriet-50-variatie3.js">
```

Wil je een andere sketch gebruiken? Verander alleen `data-hero-sketch-src`.

Voorbeeld:

```html
data-hero-sketch-src="sketches/13-favoriet-49.js"
```

Zorg dat het bestand in de map `sketches/` staat.

Laat de p5-code in `script.js` zoveel mogelijk intact. Die code zorgt ervoor dat de sketch wordt geladen en dat de downloadfunctie blijft werken.

## Projectkaarten aanpassen

De projecten staan in:

```html
<div class="card-grid">
```

Per projectkaart kun je aanpassen:

* afbeelding
* titel
* beschrijving
* link
* alt-tekst

Extra projecten staan onder:

```html
<div class="card-grid extra-projects">
```

Deze worden automatisch verborgen en zichtbaar gemaakt met de knop **Bekijk projecten**.

## Introductie aanpassen

De introductiesectie staat onder:

```html
<section class="intro-p5">
```

Hier kun je aanpassen:

* titel
* tekst
* afbeelding
* onderschrift
* knop "Lees meer"

## Documentatie aanpassen

De handleiding staat onder:

```html
<section class="documentation">
```

Iedere stap bestaat uit een accordion-item.

Per onderdeel kun je aanpassen:

* titel
* tekst
* afbeeldingen
* links
* lijsten

Nieuwe onderdelen kunnen worden toegevoegd door een extra `.accordion-item` toe te voegen.

## Tijdlijn aanpassen

De inhoudsopgave staat in:

```html
<aside class="toc">
```

De volgorde van de lijst moet hetzelfde blijven als de volgorde van de accordion-items.

De JavaScript koppelt beide automatisch aan elkaar.

## Afbeeldingen toevoegen

Afbeeldingen kunnen direct worden vervangen.

Voorbeeld:

```html
<img src="images/projectfoto.jpg" alt="Beschrijf kort wat er op de afbeelding te zien is.">
```

Gebruik altijd een betekenisvolle `alt` tekst.

Is een afbeelding alleen decoratief, gebruik dan:

```html
alt=""
```

## CSS naamgeving

Gebruik bestaande componentnamen.

Voorbeelden:

```css
.p5-hero
.hero-card
.projects-section
.project-card
.documentation
.accordion
.accordion-item
.timeline-item
```

Voeg geen algemene classes toe zoals `.container`, `.card` of `.section`, omdat deze later kunnen botsen met andere pagina's.

## Accessibility checklist

Let bij aanpassingen op:

* Gebruik een logische heading volgorde.
* Links en knoppen moeten duidelijke tekst of een duidelijk `aria-label` hebben.
* Afbeeldingen hebben betekenisvolle `alt` teksten.
* Interactieve elementen moeten met het toetsenbord bereikbaar blijven.
* Verwijder focus states niet.
* Zorg voor voldoende kleurcontrast.

## JavaScript

`script.js` verzorgt automatisch:

* toegankelijkheidspaneel
* lettergrootte
* hoog contrast
* animaties verminderen
* mobiel menu
* hero p5 sketch
* downloadlink van de hero sketch
* smooth scroll
* accordion
* tijdlijn
* knop "Bekijk projecten"

Voor de hero zoekt het script automatisch naar:

```html
<section class="p5-hero" data-hero-sketch-src="...">
```

Daarna:

1. leest het script het sketchpad uit `data-hero-sketch-src`
2. laadt het de sketch
3. plaatst het canvas in de hero banner
4. koppelt het de downloadlink aan het sketchbestand

Meestal hoef je alleen `data-hero-sketch-src` in de HTML aan te passen.

## Lokale test

Open de pagina via een lokale server, niet direct als `file://`, omdat p5 en losse bestanden dan betrouwbaarder laden.

Voorbeeld:

```bash
python3 -m http.server 8000
```

Open daarna:

```text
http://127.0.0.1:8000/
```

Controleer na wijzigingen:

* hero sketch laadt
* downloadlink werkt
* accordion werkt
* tijdlijn synchroniseert
* knop "Bekijk projecten" werkt
* smooth scroll werkt
* layout klopt op desktop en mobiel
* afbeeldingen hebben goede alt teksten


# RIT Over Responsible IT template

Deze map bevat de "Over Responsible IT"-pagina van de Responsible IT website.

Belangrijkste bestanden:

* `over-RIT.html` - inhoud en HTML-structuur van de pagina
* `css/style.css` - styling, layout, responsive gedrag en componenten
* `script.js` - verzorgt het menu, toegankelijkheid, hero sketch en interactieve onderdelen
* `sketches/` - p5 sketches voor de hero banner
* `vendor/p5.min.js` - p5.js library

## Paginainhoud aanpassen

De meeste content staat in `over-RIT.html`.

Pas hier aan:

* hero titel
* introductietekst
* hoofdtekst
* tussenkoppen
* video embed
* lectorale rede sectie
* afbeeldingen
* links in tekst en footer

Zoek in `over-RIT.html` naar de tekst die je wilt aanpassen en vervang die direct.

## Hero sketch aanpassen

De hero sketch wordt ingesteld op de `<section>` van de hero.

```html
<section
  class="p5-hero about-hero"
  data-hero-sketch-src="sketches/03-favoriet-50-variatie3.js">
```

Wil je een andere sketch gebruiken? Verander alleen `data-hero-sketch-src`.

Voorbeeld:

```html
data-hero-sketch-src="sketches/13-favoriet-49.js"
```

Zorg dat het bestand in de map `sketches/` staat.

Laat de p5-code in `script.js` zoveel mogelijk intact. Die code zorgt ervoor dat de sketch wordt geladen en dat de downloadlink van de hero blijft werken.

## Hero component

De hero bestaat uit:

* p5 canvas (wordt automatisch ingeladen)
* downloadlink voor de sketch
* content card met titel en introductietekst

Deze onderdelen worden automatisch gekoppeld door `script.js`.

## Video aanpassen

De video staat als YouTube embed:

```html
<iframe src="https://www.youtube.com/embed/4YlYHvDXhuA"></iframe>
```

Vervang alleen de `src`-URL.

Let op dat de embed altijd een geldig YouTube embed-formaat gebruikt.

## Lectorale rede sectie

Deze sectie bestaat uit:

* afbeelding
* titel
* beschrijving
* knop naar externe pagina

Je kunt hier aanpassen:

* afbeelding (`<img src="...">`)
* tekst in `.rede-text`
* link in de knop (`href`)

Gebruik een duidelijke alt-tekst voor de afbeelding.

## Footer aanpassen

De footer bevat:

* contactlinks
* privacy/cookies links
* social links
* copyright tekst

Deze staan in:

```html
<footer class="site-footer">
```

Pas hier alleen bestaande links aan of vervang URLs.

## CSS naamgeving

Gebruik bestaande componentnamen:

```css
.p5-hero
.about-hero
.hero-card
.about-content
.video-container
.lectorale-rede
.rede-content
```

Voeg geen generieke classes toe zoals `.container` of `.section` als die niet al bestaan in het project.

## Layout en structuur

De pagina gebruikt een vaste structuur:

1. header
2. hero
3. content
4. lectorale rede
5. footer

Houd deze volgorde aan om consistent gedrag te behouden.

## Accessibility checklist

Controleer bij aanpassingen:

* logische heading structuur (h1 → h2 → h3)
* afbeeldingen hebben alt-teksten
* links hebben duidelijke beschrijvingen
* video heeft title-attribute
* toetsenbordnavigatie werkt
* contrast blijft voldoende
* focus states blijven zichtbaar

## JavaScript

`script.js` verzorgt automatisch:

* toegankelijkheidspaneel
* lettergrootte instellingen
* hoog contrast modus
* reduce motion modus
* mobiel menu
* hero p5 sketch loader
* downloadlink koppeling

Voor de hero zoekt het script automatisch naar:

```html
<section class="p5-hero" data-hero-sketch-src="...">
```

Daarna:

1. leest het script het sketchpad uit
2. laadt de p5 sketch
3. plaatst het canvas in de hero
4. koppelt de downloadlink automatisch

Meestal hoef je alleen `data-hero-sketch-src` aan te passen.

## Lokale test

Open de pagina via een lokale server (niet via file://), omdat p5 anders niet goed laadt.

Voorbeeld:

```bash
python3 -m http.server 8000
```

Open daarna:

```
http://127.0.0.1:8000/
```

Controleer:

* hero sketch werkt
* downloadlink werkt
* video laadt correct
* layout is responsive
* menu werkt
* toegankelijkheidspaneel werkt
