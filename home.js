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