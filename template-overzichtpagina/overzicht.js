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
const headerInner = document.querySelector(".header-inner");

const accessibilityToggle = document.querySelector("#accessibilityToggle");
const accessibilityPanel = document.querySelector("#accessibilityPanel");
const accessibilityClose = document.querySelector("#closeAccessibility");
const overlay = document.querySelector("#overlay");
const fontNormal = document.querySelector("#fontNormal");
const fontLarge = document.querySelector("#fontLarge");
const fontXLarge = document.querySelector("#fontXLarge");
const contrastToggle = document.querySelector("#contrastToggle");
const motionToggle = document.querySelector("#motionToggle");
const desktopPanelParent = accessibilityPanel?.parentElement;
const mobileMenuQuery = window.matchMedia("(max-width: 700px)");

applySettings(accessibilitySettings);
syncPanelLocation();

if (menuToggle && headerInner) {
  menuToggle.addEventListener("click", () => {
    const nextState = !headerInner.classList.contains("menu-open");
    headerInner.classList.toggle("menu-open", nextState);
    menuToggle.setAttribute("aria-expanded", String(nextState));
    menuToggle.setAttribute("aria-label", nextState ? "Sluit menu" : "Open menu");

    if (!nextState) {
      setAccessibilityPanel(false);
    }
  });
}

mobileMenuQuery.addEventListener("change", () => {
  syncPanelLocation();
  setAccessibilityPanel(false);

  if (headerInner && menuToggle) {
    headerInner.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});

if (accessibilityToggle && accessibilityPanel && overlay) {
  accessibilityToggle.addEventListener("click", () => {
    setAccessibilityPanel(
      !(isMobileMenu() && accessibilityPanel.classList.contains("active")),
    );
  });

  accessibilityClose?.addEventListener("click", () => {
    setAccessibilityPanel(false);
    accessibilityToggle.focus();
  });

  overlay.addEventListener("click", () => {
    setAccessibilityPanel(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && accessibilityPanel.classList.contains("active")) {
      setAccessibilityPanel(false);
      accessibilityToggle.focus();
    }
  });
}

fontNormal?.addEventListener("click", () => {
  updateSettings({ fontSize: "standard" });
});

fontLarge?.addEventListener("click", () => {
  updateSettings({ fontSize: "large" });
});

fontXLarge?.addEventListener("click", () => {
  updateSettings({ fontSize: "xlarge" });
});

contrastToggle?.addEventListener("click", () => {
  updateSettings({
    contrast: root.dataset.contrast === "high" ? "standard" : "high",
  });
});

motionToggle?.addEventListener("click", () => {
  updateSettings({
    animation: root.dataset.animation === "none" ? "all" : "none",
  });
});

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
  accessibilityPanel.classList.toggle("active", isOpen);
  overlay?.classList.toggle("active", isOpen && !isMobileMenu());
  document.body.style.overflow = isOpen && !isMobileMenu() ? "hidden" : "";

  if (isOpen) {
    accessibilityClose?.focus();
  }
}

function isMobileMenu() {
  return mobileMenuQuery.matches;
}

function syncPanelLocation() {
  if (!accessibilityPanel || !headerInner || !desktopPanelParent) {
    return;
  }

  if (isMobileMenu()) {
    headerInner.appendChild(accessibilityPanel);
    return;
  }

  desktopPanelParent.appendChild(accessibilityPanel);
}

function updateSettings(nextSettings) {
  accessibilitySettings = {
    ...accessibilitySettings,
    ...nextSettings,
  };

  applySettings(accessibilitySettings);
  saveSettings(accessibilitySettings);
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
