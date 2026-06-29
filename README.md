# RIT website

Deze map bevat de tijdelijke website voor Responsible IT. De site bestaat nu uit een aantal pagina's die direct worden gebruikt en twee template-mappen die nog niet zijn samengevoegd met de rest van de website.

De HTML is opgedeeld met duidelijke HTML-commentaren. Daardoor kun je onderdelen zoals header, hero, intro, projectkaarten, documentatie en footer snel terugvinden in de code.

## Wat wordt nu gebruikt?

Deze bestanden staan in de hoofdmap en horen bij de huidige website:

- `index.html` - homepage
- `over-p5.html` - pagina over p5/studentenprojecten
- `over-RIT.html` - pagina over Responsible IT
- `css/style.css` - hoofdstylesheet voor de gebruikte pagina's
- `script.js` - hoofdscript voor menu, toegankelijkheid, p5 hero en interacties
- `images/` - afbeeldingen voor de gebruikte pagina's
- `sketches/` - p5 sketches voor de gebruikte pagina's
- `vendor/p5.min.js` - lokale p5.js library

Deze bestanden vormen op dit moment de leidende stijl van de website. Als er later stijlen botsen, gebruik dan de stijl uit `index.html`, `css/style.css` en `script.js` als basis.

Let op bij de navigatie: de knop **Studenten projecten** verwijst nu nog naar `over-p5.html`. Dat is tijdelijk. Uiteindelijk moet deze knop verwijzen naar de overzichtpagina met alle studentenprojecten, bijvoorbeeld `overzichtpagina.html`. De huidige p5-pagina kan dan als een van de studentenprojecten worden opgenomen in dat overzicht.

Let ook op de p5 visuals: de afbeeldingen in projectkaarten zijn gewone `.png` of `.jpeg` bestanden. Dat is bewust gedaan, omdat de pagina te zwaar wordt als elke projectkaart een echte p5.js sketch laadt. De grote p5 banners zijn wel echte p5.js sketches. Die staan in de map `sketches/`. Als je een andere sketch als afbeelding in een projectkaart wilt gebruiken, maak dan eerst een screenshot/export naar `.png` of `.jpeg` en gebruik die afbeelding in de kaart.

## Wat wordt nog niet gebruikt?

Deze mappen zijn templates. Ze staan klaar, maar zijn nog niet volledig samengevoegd met de hoofdsite:

- `template-detailpagina/` - template voor projectdetailpagina's
- `template-overzichtpagina/` - template voor een overzichtpagina met projectkaarten en filters

Deze templates hebben hun eigen HTML, CSS, JavaScript, afbeeldingen en soms eigen sketches. Ze werken daardoor meer als losse pagina's. Ze moeten nog worden gemerged met de hoofdsite voordat ze echt als onderdeel van de website gebruikt worden.

## Templates mergen met de hoofdsite

Het belangrijkste voor volgende stagiares: haal de templatepagina's niet alleen uit hun map en klaar. De CSS, JavaScript en paden moeten worden aangepast zodat ze bij de rest van de site passen.

De overzichtpagina-template is bedoeld als toekomstige bestemming voor de navigatieknop **Studenten projecten**. Maak hier uiteindelijk een echte overzichtpagina van, bijvoorbeeld `overzichtpagina.html`, en laat de navigatie daarna naar die pagina verwijzen in plaats van naar `over-p5.html`.

Aanpak:

1. Kies welke template je wilt gebruiken.
   - Detailpagina: gebruik `template-detailpagina/student-eliza.html` of `template-detailpagina/research-eliza.html`.
   - Overzichtpagina: gebruik `template-overzichtpagina/overzicht-peter.html`.

2. Verplaats of kopieer de HTML naar de hoofdmap.
   - Geef de pagina een echte naam, bijvoorbeeld `student-project.html`, `research-project.html` of `studenten-projecten.html`.
   - Pas links aan die door de verhuizing veranderen. Een link als `afbeeldingen/...` moet dan misschien `images/...` worden.

3. Combineer de CSS met `css/style.css`.
   - `template-detailpagina/contentpagina.css` moet uiteindelijk worden samengevoegd met `css/style.css`.
   - `template-overzichtpagina/overzicht.css` moet uiteindelijk worden samengevoegd met `css/style.css`.
   - Controleer dubbele classes zoals `.container`, `.site-header`, `.project-card`, `.hero`, `.btn` en algemene `body` styling.
   - De stijl van de huidige homepage is leidend. Pas de templates dus aan op de bestaande stijl, niet andersom.

4. Combineer de JavaScript met `script.js`.
   - `template-detailpagina/contentpagina.js` bevat gedrag voor de detailpagina en de p5 sketch.
   - `template-overzichtpagina/overzicht.js` bevat filters, sortering, toegankelijkheidsinstellingen en menu-gedrag.
   - Zet alleen de onderdelen over die nog niet in `script.js` zitten.
   - Let op dubbele code voor het menu, toegankelijkheidspaneel, contrast, lettergrootte en animaties.

5. Zet assets op een logische plek.
   - Algemene afbeeldingen horen in `images/`.
   - Algemene sketches horen in `sketches/`.
   - Algemene fonts horen in `css/font/`.
   - Verwijder daarna dubbele asset-mappen pas als je zeker weet dat de pagina's nog werken.

6. Test lokaal.
   - Start een lokale server:

```bash
python3 -m http.server 8000
```

   - Open:

```text
http://127.0.0.1:8000/
```

Controleer daarna minimaal:

- navigatie werkt vanaf elke pagina
- afbeeldingen laden
- p5 sketches laden
- mobiel menu werkt
- toegankelijkheidspaneel werkt
- layout klopt op desktop en mobiel
- filters of accordions werken als de pagina die gebruikt

## Performance

De performance van de website moet nog getest en verbeterd worden. Door de p5.js banners is de website nu waarschijnlijk zwaarder dan ideaal. Er was geen tijd meer om dit goed te optimaliseren.

Aanbevolen vervolgstappen:

- Test de website met Lighthouse of een vergelijkbare performance-test.
- Controleer vooral laadtijd, JavaScript-kosten en mobiele performance.
- Gebruik echte p5.js sketches alleen waar ze echt nodig zijn, zoals in banners.
- Gebruik voor projectkaarten liever `.png` of `.jpeg` previews.
- Optimaliseer afbeeldingen voordat ze in `images/` worden gezet.
- Kijk of sketches lazy loaded kunnen worden of pas starten wanneer ze zichtbaar zijn.

## Homepage

Bestand: `index.html`

Hoofdpunten:

- Gebruikt `css/style.css` en `script.js`.
- Bevat de algemene header, hero, intro, uitgelichte projecten en footer.
- De hero sketch wordt ingesteld met `data-hero-sketch-src`.
- Projectkaarten en teksten kun je direct in de HTML aanpassen.
- Deze pagina is de beste referentie voor de visuele stijl van de site.

## Over p5 / studentenprojecten

Bestand: `over-p5.html`

Hoofdpunten:

- Gebruikt dezelfde hoofd-CSS en hoofd-JavaScript als de homepage.
- Bevat projectkaarten, uitleg over p5 en documentatie met accordion-onderdelen.
- De hero sketch wordt ingesteld met `data-hero-sketch-src`.
- De projectkaarten gebruiken afbeeldingen, geen live p5 sketches, om de pagina minder zwaar te maken.
- Extra projecten en documentatie staan duidelijk gegroepeerd met HTML-commentaren.
- Deze pagina is nu tijdelijk gekoppeld aan de navigatieknop **Studenten projecten**.
- Uiteindelijk hoort deze p5-pagina niet de overzichtpagina te zijn, maar een los studentenproject binnen de toekomstige overzichtpagina.

## Over Responsible IT

Bestand: `over-RIT.html`

Hoofdpunten:

- Gebruikt dezelfde hoofd-CSS en hoofd-JavaScript als de homepage.
- Bevat uitleg over het lectoraat, een video en een sectie over de lectorale rede.
- De hero sketch wordt ingesteld met `data-hero-sketch-src`.
- Tekst, video en afbeeldingen kunnen direct in de HTML worden aangepast.
- Let bij aanpassen van de YouTube-video op dat de `src` een embed-link blijft.

## Projectdetail template

Map: `template-detailpagina/`

Belangrijkste bestanden:

- `student-eliza.html` - voorbeeld van een studentenprojectdetailpagina
- `research-eliza.html` - voorbeeld van een onderzoeksprojectdetailpagina
- `contentpagina.css` - losse styling voor deze template
- `contentpagina.js` - losse JavaScript voor de p5 sketch en downloadlink
- `assets/` - afbeeldingen voor deze template
- `sketches/` - sketches voor deze template

Hoofdpunten:

- Deze pagina's worden nu nog niet gebruikt in de hoofdsite.
- De CSS is gescoped rond `.project-detail`, maar moet nog worden afgestemd op `css/style.css`.
- De p5 sketch wordt ingesteld met `data-sketch-src` op de `<main>` tag.
- Gebruik deze template als basis voor losse projectpagina's.
- Bij mergen moeten `contentpagina.css` en `contentpagina.js` worden verwerkt in de hoofd-CSS en hoofd-JavaScript.

## Overzichtpagina template

Map: `template-overzichtpagina/`

Belangrijkste bestanden:

- `overzicht-peter.html` - voorbeeld van een overzichtpagina
- `overzicht.css` - losse styling voor deze template
- `overzicht.js` - losse JavaScript voor filters, sortering, menu en toegankelijkheid
- `afbeeldingen/` - afbeeldingen voor deze template
- `fonts/` - fonts voor deze template

Hoofdpunten:

- Deze pagina wordt nu nog niet gebruikt in de hoofdsite.
- De pagina bevat filters, sortering, projectkaarten en een project count.
- De stijl lijkt op de hoofdsite, maar is nog niet helemaal consistent.
- Bij mergen moeten `overzicht.css` en `overzicht.js` worden verwerkt in `css/style.css` en `script.js`.
- Let extra op relatieve paden als je deze pagina uit de map haalt.

## HTML-commentaren gebruiken

In de HTML-bestanden staan commentaren boven de belangrijkste onderdelen. Gebruik die als inhoudsopgave in de code.

Voorbeelden van onderdelen die zo terug te vinden zijn:

- header
- toegankelijkheidspaneel
- main
- hero
- intro
- projecten
- documentatie
- footer

Zoek dus eerst op de commentaren voordat je door de hele pagina scrolt.

## Algemene afspraken

- De hoofdsite gebruikt `css/style.css` en `script.js`.
- De templates gebruiken nog losse CSS en JavaScript en zijn nog niet definitief.
- De stijl van de homepage is leidend.
- Voeg nieuwe algemene styling liever toe aan `css/style.css`.
- Voeg nieuwe algemene interactie liever toe aan `script.js`.
- De `page-margin` van de pagina's staat als CSS-variable in `:root` en kan daar makkelijk centraal worden aangepast.
- Houd paden logisch vanaf de plek waar het HTML-bestand staat.
- Gebruik duidelijke `alt` teksten bij afbeeldingen.
- Verwijder focus-states en toegankelijkheidsinstellingen niet.
