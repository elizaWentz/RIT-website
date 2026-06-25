const root = document.documentElement;
root.classList.add("js");

const storageKey = "responsible-it-accessibility";
const defaultSettings = {
  fontSize: "standard",
  animation: "all",
  contrast: "standard",
  theme: "light",
  readingLevel: "standard",
};

const readingCopy = {
  hero: {
    simple:
      "Hier zie je projecten van HvA-studenten over AI. Ze kijken hoe technologie eerlijker en toegankelijker kan worden.",
    standard:
      "Bekijk hier hoe studenten van de HvA, in het bijzonder rond AI, rekening houden met de ethische en maatschappelijke gevolgen van die technologie.",
    advanced:
      "Bekijk hoe HvA-studenten de maatschappelijke impact van AI onderzoeken, met aandacht voor ethiek, inclusie, publieke waarden en verantwoord ontwerp.",
  },
  card: {
    simple:
      "Studenten onderzoeken hoe AI publieke diensten makkelijker kan maken voor mensen met een beperking.",
    standard:
      "Onderzoek naar hoe AI-systemen ingezet kunnen worden om publieke diensten toegankelijker te maken voor mensen met een beperking.",
    advanced:
      "Onderzoek naar verantwoorde inzet van AI-systemen binnen publieke dienstverlening, met focus op toegankelijkheid, inclusief ontwerp en mogelijke uitsluitingsrisico's.",
  },
};

let accessibilitySettings = loadSettings();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#hoofdnavigatie");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const nextState = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(nextState));
    mainNav.classList.toggle("is-open", nextState);
  });
}

const accessibilityToggle = document.querySelector(".accessibility-toggle");
const accessibilityPanel = document.querySelector("#toegankelijkheid-instellingen");
const accessibilityClose = document.querySelector(".accessibility-close");

if (accessibilityToggle && accessibilityPanel) {
  syncSettingsForm(accessibilitySettings);
  applySettings(accessibilitySettings);

  accessibilityToggle.addEventListener("click", () => {
    const nextState = accessibilityToggle.getAttribute("aria-expanded") !== "true";
    setAccessibilityPanel(nextState);
  });

  accessibilityPanel.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  accessibilityPanel.addEventListener("change", (event) => {
    const control = event.target;

    if (!(control instanceof HTMLInputElement) || control.type !== "radio") {
      return;
    }

    accessibilitySettings = {
      ...accessibilitySettings,
      [control.name]: control.value,
    };

    applySettings(accessibilitySettings);
    saveSettings(accessibilitySettings);
  });

  accessibilityClose?.addEventListener("click", () => {
    setAccessibilityPanel(false);
    accessibilityToggle.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !accessibilityPanel.hidden) {
      setAccessibilityPanel(false);
      accessibilityToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedPanel = accessibilityPanel.contains(event.target);
    const clickedToggle = accessibilityToggle.contains(event.target);

    if (!accessibilityPanel.hidden && !clickedPanel && !clickedToggle) {
      setAccessibilityPanel(false);
    }
  });
} else {
  applySettings(accessibilitySettings);
}

const filters = document.querySelector(".filters");
const projectGrid = document.querySelector(".project-grid");
const projectCount = document.querySelector(".project-count");
const noResults = document.querySelector(".no-results");

if (filters && projectGrid && projectCount && noResults) {
  const cards = Array.from(projectGrid.children);

  filters.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  filters.addEventListener("change", () => {
    const opleiding = filters.elements.opleiding.value;
    const jaar = filters.elements.jaar.value;
    const sortering = filters.elements.sorteren.value;

    const sortedCards = [...cards].sort((a, b) => {
      if (sortering === "titel") {
        return a.dataset.title.localeCompare(b.dataset.title, "nl");
      }

      if (sortering === "oudste") {
        return Number(a.dataset.jaar) - Number(b.dataset.jaar);
      }

      if (sortering === "nieuwste") {
        return Number(b.dataset.jaar) - Number(a.dataset.jaar);
      }

      return cards.indexOf(a) - cards.indexOf(b);
    });

    sortedCards.forEach((card) => projectGrid.append(card));

    let visibleProjects = 0;

    sortedCards.forEach((card) => {
      const matchesOpleiding = !opleiding || card.dataset.opleiding === opleiding;
      const matchesJaar = !jaar || card.dataset.jaar === jaar;
      const isVisible = matchesOpleiding && matchesJaar;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleProjects += 1;
      }
    });

    projectCount.textContent =
      visibleProjects === 1 ? "1 project" : `${visibleProjects} projecten`;
    noResults.hidden = visibleProjects !== 0;
  });
}

function setAccessibilityPanel(isOpen) {
  accessibilityToggle.setAttribute("aria-expanded", String(isOpen));
  accessibilityPanel.hidden = !isOpen;

  if (isOpen) {
    accessibilityPanel.querySelector("input:checked")?.focus();
  }
}

function applySettings(settings) {
  root.dataset.fontSize = settings.fontSize;
  root.dataset.animation = settings.animation;
  root.dataset.contrast = settings.contrast;
  root.dataset.theme = settings.theme;
  root.dataset.readingLevel = settings.readingLevel;
  updateReadingLevel(settings.readingLevel);
}

function syncSettingsForm(settings) {
  Object.entries(settings).forEach(([name, value]) => {
    const input = accessibilityPanel.querySelector(
      `input[name="${name}"][value="${value}"]`,
    );

    if (input) {
      input.checked = true;
    }
  });
}

function updateReadingLevel(level) {
  const heroText = document.querySelector(".hero p");
  const projectTexts = document.querySelectorAll(".project-card p");

  if (heroText) {
    heroText.textContent = readingCopy.hero[level] ?? readingCopy.hero.standard;
  }

  projectTexts.forEach((projectText) => {
    projectText.textContent = readingCopy.card[level] ?? readingCopy.card.standard;
  });
}

function loadSettings() {
  try {
    return {
      ...defaultSettings,
      ...JSON.parse(localStorage.getItem(storageKey)),
    };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  } catch {
    return;
  }
}
