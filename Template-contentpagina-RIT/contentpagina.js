function initProjectDetailPage() {
  const projectDetail = document.querySelector(".project-detail");

  if (!projectDetail) {
    return;
  }

  const sketchSrc = projectDetail.dataset.sketchSrc;

  if (!sketchSrc) {
    return;
  }

  updateSketchDownloadLink(projectDetail, sketchSrc);
  const existingCanvases = new Set(document.querySelectorAll("canvas"));

  loadProjectSketch(sketchSrc)
    .then(() => {
      wrapP5Setup(projectDetail, existingCanvases);
    })
    .catch(() => {
      console.warn(`Project detail sketch could not be loaded: ${sketchSrc}`);
    });
}

function updateSketchDownloadLink(projectDetail, sketchSrc) {
  const downloadLink = projectDetail.querySelector(".project-detail__sketch-download");

  if (!downloadLink) {
    return;
  }

  downloadLink.href = sketchSrc;
}

function loadProjectSketch(sketchSrc) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = sketchSrc;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

function wrapP5Setup(projectDetail, existingCanvases) {
  const originalSetup = window.setup;

  if (typeof originalSetup !== "function") {
    return;
  }

  /*
    Existing sketches use p5 global mode, so p5 expects window.setup.
    Keep the sketch untouched and only wrap setup to move its generated
    canvas into this page's scoped sketch container after setup runs.
  */
  window.setup = function projectDetailSetupWrapper() {
    originalSetup.apply(this, arguments);
    moveSketchCanvas(projectDetail, existingCanvases);
  };
}

function moveSketchCanvas(projectDetail, existingCanvases) {
  const sketch = projectDetail.querySelector(".project-detail__sketch");

  if (!sketch) {
    return;
  }

  const sketchCanvas = sketch.querySelector("canvas");
  const generatedCanvas = sketchCanvas || findGeneratedCanvas(existingCanvases);

  if (!generatedCanvas) {
    return;
  }

  sketch.appendChild(generatedCanvas);
  generatedCanvas.setAttribute("aria-hidden", "true");
  generatedCanvas.setAttribute("tabindex", "-1");
}

function findGeneratedCanvas(existingCanvases) {
  const canvases = Array.from(document.querySelectorAll("canvas"));

  return canvases.find((canvas) => !existingCanvases.has(canvas)) || canvases.at(-1);
}

initProjectDetailPage();
