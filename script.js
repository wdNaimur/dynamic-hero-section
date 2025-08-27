// ======================
// DOM ELEMENTS
// ======================
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("settingsModal");
const form = document.querySelector(".settings-form");

const animation = document.getElementById("animation");
const backgroundController = document.getElementById("background-controller");
const heroContent = document.querySelector(".hero-content");
const textContainer = document.querySelector(".text-container");
const background = document.getElementById("hero-container");
const gridBox = document.querySelector(".hero-hight");

const radios = document.querySelectorAll('input[name="animation"]');
const auroraOptions = document.getElementById("auroraOptions");
const beamOptions = document.getElementById("beamOptions");
const beamGridOptions = document.getElementById("beamGridOptions");
const borderGridOptions = document.getElementById("borderGridOptions");

const auroraColorInputs = auroraOptions.querySelectorAll('input[type="color"]');
const beamColorInputs = beamOptions.querySelectorAll('input[type="color"]');
const gridColorInputs = beamGridOptions.querySelectorAll('input[type="color"]');
const borderColorInputs = borderGridOptions.querySelectorAll(
  'input[type="color"]'
);

const imageRadios = document.querySelectorAll('input[name="image"]');
const headingPositionBox = document.querySelector(".text-alignment-options");

// ======================
// MODAL HANDLING
// ======================
openModalBtn.addEventListener("click", () => (modal.style.display = "flex"));
closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// ======================
// UTILITY FUNCTIONS
// ======================
function removeAnimation() {
  animation.classList.forEach(
    (cls) => cls.startsWith("animation") && animation.classList.remove(cls)
  );
  animation.innerHTML = "";
  animation.style = "";
}

function resetTextContainer() {
  // Remove inline styles
  heroContent.hasAttribute("style") && heroContent.removeAttribute("style");

  // Remove text alignment classes
  [...textContainer.classList].forEach(
    (cls) =>
      cls.startsWith("text-alignment-") && textContainer.classList.remove(cls)
  );

  // Remove leftover image
  const oldImg = heroContent.querySelector(".image-container");
  oldImg && oldImg.remove();
}

function removeSpotlight() {
  const spotlight = document.querySelector(".spotlight");
  spotlight && spotlight.remove();
}

// ======================
// FORM SUBMISSION
// ======================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  removeAnimation();
  resetTextContainer();
  removeSpotlight();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // ===== Hero Text Content =====
  textContainer.querySelector("h1").textContent =
    data.heading || "Experience Stunning Animated Background";
  textContainer.querySelector("p").textContent =
    data.paragraph ||
    "Discover beautiful, dynamic gradient animations that bring your website to life.";
  textContainer.querySelector(".hero-btn").textContent =
    data["button-text"] || "Learn More";
  textContainer.querySelector(".hero-btn").href = data["button-link"] || "#";

  // ===== Text Alignment =====
  const align = data.align;
  textContainer.classList.add(`text-alignment-${align}`);

  // ===== IMAGE HANDLING =====
  const image = data.image;
  if (image === "grid") {
    background.style.backgroundImage = "none";
    const img = document.createElement("img");
    img.className = "image-container";
    img.src = data["image-url"];
    img.alt = "alt Tag";
    heroContent.appendChild(img);
    heroContent.classList.add("hero-grid");

    // Reset alignment to left
    [...textContainer.classList].forEach(
      (cls) =>
        cls.startsWith("text-alignment") && textContainer.classList.remove(cls)
    );
    textContainer.classList.add("text-alignment-left");
  } else if (image === "background") {
    removeSpotlight();
    heroContent.classList.remove("hero-grid");
    background.style.backgroundImage = `url(${data["image-url"]})`;
    heroContent.style.gridTemplateColumns = "1fr";
  } else if (image === "none") {
    background.style.backgroundImage = "none";
    heroContent.classList.remove("hero-grid");
    heroContent.querySelector(".image-container")?.remove();
  }

  // ===== ANIMATION HANDLING =====
  const animationType = data.animation || "none";

  if (animationType === "none") {
    removeAnimation();
    return;
  }

  if (animationType === "aurora") {
    removeAnimation();
    animation.classList.add("animation-aurora");
    const animationAurora = document.querySelector(".animation-aurora");

    [
      "auroraColor1",
      "auroraColor2",
      "auroraColor3",
      "auroraColor4",
      "auroraColor5",
    ].forEach((color, i) => {
      animationAurora.style.setProperty(`--aurora-color${i + 1}`, data[color]);
    });

    animationAurora.style.setProperty(
      "--aurora-angle",
      (data.auroraAngle || 100) + "deg"
    );
    animationAurora.style.animationDuration = `${data.loopDuration || 15}s`;
  }

  if (animationType === "beam") {
    removeAnimation();
    const count = parseInt(data.beamCount) || 15;
    const starColor = data.beamColorStar;
    const tailColor = data.beamColorTail;
    const width = parseInt(data.beamWidth) || 200;
    const gap = parseInt(data.beamGap) || 200;
    const direction = data.directionOfBeams;

    for (let i = 0; i < count; i++) {
      const beam = document.createElement("span");
      beam.classList.add("beam");
      beam.style.left = `${i * gap}px`;
      beam.style.setProperty("--delay", (Math.random() * 3).toFixed(2) + "s");
      beam.style.setProperty(
        "--duration",
        (3.5 + Math.random() * 3.5).toFixed(2) + "s"
      );
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", tailColor);
      beam.style.setProperty("--beam-color-star", starColor);

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-${direction} ${beam.style.getPropertyValue(
        "--duration"
      )} linear ${beam.style.getPropertyValue("--delay")} infinite`;
    }
  }

  if (animationType === "borderGrid") {
    removeAnimation();

    const borderColor = String(data.borderColor);
    let gridSize = parseInt(data.borderGridSize);
    const gridMode = data.gridMode;
    gridSize = gridMode === "3d" ? gridSize / 3.5 : gridSize;

    animation.classList.add("animationBorderGrid");

    const boxSize = gridBox.getBoundingClientRect();
    const rowNumber = Math.ceil(boxSize.height / gridSize);
    const columnNumber = Math.ceil(boxSize.width / gridSize);
    const numberOfBoxes = rowNumber * columnNumber;

    const AnimationContainer = document.querySelector(".animationBorderGrid");
    AnimationContainer.style.gridTemplateColumns = `repeat(${columnNumber}, 1fr)`;
    AnimationContainer.style.gridTemplateRows = `repeat(${rowNumber}, 1fr)`;
    AnimationContainer.style.transform =
      gridMode === "3d"
        ? "perspective(4000px) translate(-60%, -60%) skewX(30deg) skewY(-30deg) scale(4.2) rotateY(45deg) rotateX(45deg)"
        : "translate(-50%, -50%)";

    for (let i = 0; i < numberOfBoxes; i++) {
      const box = document.createElement("div");
      box.classList.add("gridbox");
      animation.appendChild(box);
    }

    const boxes = document.querySelectorAll(".gridbox");
    const spotlight = document.createElement("div");
    spotlight.classList.add("spotlight");
    // dont add if it is background image
    if (image !== "background") {
      gridBox.appendChild(spotlight);
    } else {
      spotlight.style.display = "none";
    }
    // gridBox.appendChild(spotlight);

    gridBox.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      spotlight.style.setProperty("--x", `${x}px`);
      spotlight.style.setProperty("--y", `${y}px`);

      let hoveredIndex;
      boxes.forEach((box, i) => {
        const rect = box.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        )
          hoveredIndex = i;
      });

      boxes.forEach((box) => box.classList.remove("active"));

      if (hoveredIndex >= 0) {
        const currentBox = boxes[hoveredIndex];
        currentBox.classList.add("active");
        currentBox.style.borderColor = borderColor;
        setTimeout(() => {
          currentBox.classList.remove("active");
          currentBox.style.borderColor = "";
        }, 200);
      }
    });
  }

  if (animationType === "beamGrid") {
    removeAnimation();

    const beamGrid = document.createElement("div");
    beamGrid.classList.add("animationGridBeam");
    animation.appendChild(beamGrid);

    const count = parseInt(data.GridbeamCount) || 6;
    const gap = parseInt(data.GridbeamGap) || 500;
    const starColor = data.GridbeamColorStar || "#ff3333ff";
    const tailColor = data.GridbeamColorTail || "#fff";
    const width = parseInt(data.GridbeamWidth) || 200;

    for (let i = 0; i < count; i++) {
      const beam = document.createElement("span");
      beam.classList.add("beam");
      beam.style.left = `${i * gap}px`;
      beam.style.setProperty("--delay", (Math.random() * 3).toFixed(2) + "s");
      beam.style.setProperty(
        "--duration",
        (3.5 + Math.random() * 3.5).toFixed(2) + "s"
      );
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", tailColor);
      beam.style.setProperty("--beam-color-star", starColor);

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-left ${beam.style.getPropertyValue(
        "--duration"
      )} linear ${beam.style.getPropertyValue("--delay")} infinite`;
    }
  }

  modal.style.display = "none";
});

// ======================
// RADIO CHANGE HANDLING
// ======================
radios.forEach((radio) =>
  radio.addEventListener("change", (e) => {
    const value = e.target.value;
    auroraOptions.style.display = "none";
    beamOptions.style.display = "none";
    beamGridOptions.style.display = "none";
    borderGridOptions.style.display = "none";

    if (value === "aurora") auroraOptions.style.display = "block";
    if (value === "beam") beamOptions.style.display = "block";
    if (value === "beamGrid") beamGridOptions.style.display = "block";
    if (value === "borderGrid") borderGridOptions.style.display = "block";
  })
);

// ======================
// COLOR INPUT DISPLAY
// ======================
function setupColorInputs(inputs) {
  inputs.forEach((input) => {
    const span = input.nextElementSibling;
    span.textContent = input.value;
    input.addEventListener("input", () => (span.textContent = input.value));
  });
}

setupColorInputs(auroraColorInputs);
setupColorInputs(beamColorInputs);
setupColorInputs(gridColorInputs);
setupColorInputs(borderColorInputs);

// ======================
// IMAGE RADIO CHANGE HANDLING
// ======================
imageRadios.forEach((radio) =>
  radio.addEventListener("change", (e) => {
    headingPositionBox.style.display =
      e.target.value === "grid" ? "none" : "block";
  })
);
