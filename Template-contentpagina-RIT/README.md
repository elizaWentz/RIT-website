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

