// =========================
// ELEMENTEN OPHALEN
// =========================

const panel = document.getElementById("accessibilityPanel");
const overlay = document.getElementById("overlay");

const openButton = document.getElementById("accessibilityToggle");
const closeButton = document.getElementById("closeAccessibility");

const fontNormal = document.getElementById("fontNormal");
const fontLarge = document.getElementById("fontLarge");
const fontXLarge = document.getElementById("fontXLarge");

const contrastToggle = document.getElementById("contrastToggle");
const motionToggle = document.getElementById("motionToggle");

// =========================
// PANEL OPENEN
// =========================

function openPanel() {

    panel.classList.add("active");
    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

    openButton.setAttribute("aria-expanded", "true");
}

// =========================
// PANEL SLUITEN
// =========================

function closePanel() {

    panel.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.overflow = "";

    openButton.setAttribute("aria-expanded", "false");
}

openButton.addEventListener("click", openPanel);

closeButton.addEventListener("click", closePanel);

overlay.addEventListener("click", closePanel);

// =========================
// ESC SLUIT PANEL
// =========================

document.addEventListener("keydown", (event) => {

    if(event.key === "Escape") {
        closePanel();
    }

});

// =========================
// LETTERGROOTTE
// =========================

fontNormal.addEventListener("click", () => {

    document.documentElement.classList.remove(
        "font-large",
        "font-xlarge"
    );

    localStorage.setItem("fontSize", "normal");
});

fontLarge.addEventListener("click", () => {

    document.documentElement.classList.remove("font-xlarge");
    document.documentElement.classList.add("font-large");

    localStorage.setItem("fontSize", "large");
});

fontXLarge.addEventListener("click", () => {

    document.documentElement.classList.remove("font-large");
    document.documentElement.classList.add("font-xlarge");

    localStorage.setItem("fontSize", "xlarge");
});

// =========================
// CONTRAST
// =========================

contrastToggle.addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

    localStorage.setItem(
        "highContrast",
        document.body.classList.contains("high-contrast")
    );
});

// =========================
// ANIMATIES
// =========================

motionToggle.addEventListener("click", () => {

    document.body.classList.toggle("reduce-motion");

    localStorage.setItem(
        "reduceMotion",
        document.body.classList.contains("reduce-motion")
    );
});

// =========================
// INSTELLINGEN LADEN
// =========================

function loadSettings() {

    const fontSize = localStorage.getItem("fontSize");

    if(fontSize === "large") {
        document.documentElement.classList.add("font-large");
    }

    if(fontSize === "xlarge") {
        document.documentElement.classList.add("font-xlarge");
    }

    const highContrast =
        localStorage.getItem("highContrast") === "true";

    if(highContrast) {
        document.body.classList.add("high-contrast");
    }

    const reduceMotion =
        localStorage.getItem("reduceMotion") === "true";

    if(reduceMotion) {
        document.body.classList.add("reduce-motion");
    }
}

loadSettings();

// =========================
// P5 HERO BANNER
// =========================

function initHeroSketchBanner() {

    const hero = document.querySelector(".hero[data-hero-sketch-src]");

    if(!hero) {
        return;
    }

    const sketchSrc = hero.dataset.heroSketchSrc;

    if(!sketchSrc) {
        return;
    }

    updateHeroSketchDownloadLink(hero, sketchSrc);

    const existingCanvases = new Set(document.querySelectorAll("canvas"));

    loadHeroSketch(sketchSrc)
        .then(() => {
            wrapHeroSketchSetup(hero, existingCanvases);
        })
        .catch(() => {
            console.warn(`Hero sketch could not be loaded: ${sketchSrc}`);
        });
}

function updateHeroSketchDownloadLink(hero, sketchSrc) {

    const downloadLink = hero.querySelector(".hero-sketch-download");

    if(!downloadLink) {
        return;
    }

    downloadLink.href = sketchSrc;
}

function loadHeroSketch(sketchSrc) {

    return new Promise((resolve, reject) => {

        const script = document.createElement("script");

        script.src = sketchSrc;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });
}

function wrapHeroSketchSetup(hero, existingCanvases) {

    const originalSetup = window.setup;

    if(typeof originalSetup !== "function") {
        return;
    }

    /*
        Existing sketches use p5 global mode, so p5 expects window.setup.
        Keep the sketch untouched and only wrap setup to move its generated
        canvas into this page's full-width hero banner.
    */
    window.setup = function heroSketchSetupWrapper() {

        originalSetup.apply(this, arguments);
        moveHeroSketchCanvas(hero, existingCanvases);
    };
}

function moveHeroSketchCanvas(hero, existingCanvases) {

    const sketch = hero.querySelector(".hero-sketch");

    if(!sketch) {
        return;
    }

    const sketchCanvas = sketch.querySelector("canvas");
    const generatedCanvas = sketchCanvas || findHeroGeneratedCanvas(existingCanvases);

    if(!generatedCanvas) {
        return;
    }

    sketch.appendChild(generatedCanvas);
    generatedCanvas.setAttribute("aria-hidden", "true");
    generatedCanvas.setAttribute("tabindex", "-1");
}

function findHeroGeneratedCanvas(existingCanvases) {

    const canvases = Array.from(document.querySelectorAll("canvas"));

    return canvases.find((canvas) => !existingCanvases.has(canvas)) || canvases.at(-1);
}

initHeroSketchBanner();
// =========================
// SMOOTH SCROLL BUTTONS
// =========================

const projectButtons = document.querySelectorAll(
    '[data-scroll="projects"]'
);

const processButtons = document.querySelectorAll(
    '[data-scroll="process"]'
);

projectButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        document
            .getElementById("projects")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});

processButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        document
            .getElementById("process")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});

// =========================
// EXTRA PROJECTEN
// =========================

const toggleProjectsBtn =
    document.getElementById("toggleProjects");

const hiddenProjects =
    document.querySelector(".extra-projects");

if(toggleProjectsBtn && hiddenProjects){

    toggleProjectsBtn.addEventListener("click", () => {

        const isOpen =
        hiddenProjects.classList.toggle("active");
    
    toggleProjectsBtn.textContent =
        isOpen
            ? "Verberg projecten ▲"
            : "Bekijk projecten ▼";

    });

}

// =========================
// ACCORDION
// =========================

const accordionItems =
    document.querySelectorAll(".accordion-item");

const timelineItems =
    document.querySelectorAll(".timeline-item");

accordionItems.forEach((item, index) => {

    const header =
        item.querySelector(".accordion-header");

    const content =
        item.querySelector(".accordion-content");

    header.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("active");

        accordionItems.forEach(acc => {

            acc.classList.remove("active");

            acc.querySelector(
                ".accordion-content"
            ).style.maxHeight = null;

        });

        if(!isOpen){

            item.classList.add("active");

            content.style.maxHeight =
                content.scrollHeight + "px";

            updateTimeline(index);

        }

    });

});

// =========================
// TIMELINE
// =========================

function updateTimeline(activeIndex){

    timelineItems.forEach((item, index) => {

        if(index <= activeIndex){

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}

// =========================
// KLIK OP LINKS MENU
// =========================

timelineItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        accordionItems.forEach(acc => {

            acc.classList.remove("active");

            acc.querySelector(
                ".accordion-content"
            ).style.maxHeight = null;

        });

        const selected =
            accordionItems[index];

        selected.classList.add("active");

        const content =
            selected.querySelector(
                ".accordion-content"
            );

        content.style.maxHeight =
            content.scrollHeight + "px";

        updateTimeline(index);

        selected.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

    });

});

// =========================
// OPEN INTRO STANDAARD
// =========================

window.addEventListener("load", () => {

    if(accordionItems.length){

        accordionItems[0]
            .classList.add("active");

        const firstContent =
            accordionItems[0]
            .querySelector(".accordion-content");

        firstContent.style.maxHeight =
            firstContent.scrollHeight + "px";

        updateTimeline(0);

    }

});