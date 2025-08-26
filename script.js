const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("settingsModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const animation = document.getElementById("animation");
const backgroundController = document.getElementById("background-controller");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function removeAnimation() {
  animation.classList.forEach((cls) => {
    if (cls.startsWith("animation")) {
      animation.classList.remove(cls);
    }
  });
  animation.innerHTML = "";
  animation.style = "";
}

// GET FORM VALUE

const form = document.querySelector(".settings-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeAnimation();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const buttonText = data["button-text"];
  const buttonLink = data["button-link"];
  const heading = data["heading"];
  const paragraph = data["paragraph"];
  const align = data["align"];
  const image = data["image"];

  console.log(data);
  // hero container selectors
  const textContainer = document.querySelector(".text-container");
  textContainer.classList.add(`text-alignment-${align}`);
  if (image === "grid") {
    const imageURL = data["image-url"];
    const img = document.createElement("img");
    img.className = "image-container";
    img.src = imageURL;
    img.alt = "alt Tag";
    const heroContent = document.querySelector(".hero-content");
    heroContent.appendChild(img);
    heroContent.classList.add("hero-grid");
    console.log(imageURL);
  } else if (image === "background") {
    const imageURL = data["image-url"];
    const background = document.getElementById("hero-container");
    background.style.backgroundImage = `url(${imageURL})`;
    const heroGrid = document.querySelector(".hero-grid");
    heroGrid.style.gridTemplateColumns = "1fr";
  } else if (image === "none") {
    const heroContent = document.querySelector(".hero-content");
    heroContent.querySelector(".image-container")?.remove();
  }
  // hero document selectors
  const heroContent = document.querySelector(".text-container");
  heroContent.querySelector("h1").textContent = heading;
  heroContent.querySelector("p").textContent = paragraph;
  heroContent.querySelector(".hero-btn").textContent = buttonText;
  heroContent.querySelector(".hero-btn").href = buttonLink;

  modal.style.display = "none";
  if (data.animation === "none") {
    return removeAnimation();
  } else if (data.animation === "aurora") {
    removeAnimation();
    animation.classList.add("animation-aurora");
    const animationAurora = document.querySelector(".animation-aurora");
    // Get user-selected options
    const color1 = data["auroraColor1"];
    const color2 = data["auroraColor2"];
    const color3 = data["auroraColor3"];
    const color4 = data["auroraColor4"];
    const color5 = data["auroraColor5"];
    const angle = data["auroraAngle"] ?? 100;
    // fallback to 100deg if not provided
    const loopDuration = data["loopDuration"] ?? 15;
    console.log(loopDuration);

    // Apply CSS variables dynamically
    animationAurora.style.setProperty("--aurora-color1", color1);
    animationAurora.style.setProperty("--aurora-color2", color2);
    animationAurora.style.setProperty("--aurora-color3", color3);
    animationAurora.style.setProperty("--aurora-color4", color4);
    animationAurora.style.setProperty("--aurora-color5", color5);
    animationAurora.style.setProperty("--aurora-angle", angle + "deg");
    animationAurora.style.animationDuration = `${loopDuration}s`;
  } else if (data.animation === "beam") {
    removeAnimation();
    console.log(data);
    // get dynamic values (with defaults if empty)
    const count = parseInt(data["beamCount"]) || 15;
    const starColor = data["beamColorStar"];
    const tailColor = data["beamColorTail"];
    const width = parseInt(data["beamWidth"]) || 200;
    const directionOfBeams = data["directionOfBeams"];
    const gap = parseInt(data["beamGap"]) || 200;

    for (let i = 0; i < count; i++) {
      const beam = document.createElement("span");
      beam.classList.add("beam");

      // random delay: 0–10s
      const delay = (Math.random() * 3).toFixed(2) + "s";
      // random duration: 3.5–7s
      const duration = (3.5 + Math.random() * 3.5).toFixed(2) + "s";

      // apply CSS vars
      beam.style.left = `${i * gap}px`;
      beam.style.setProperty("--delay", delay);
      beam.style.setProperty("--duration", duration);
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", `${tailColor}`);
      beam.style.setProperty("--beam-color-star", `${starColor}`);
      console.log(tailColor, starColor);

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-${directionOfBeams} ${duration} linear ${delay} infinite`;
    }
  } else if (data.animation === "borderGrid") {
    removeAnimation();
    const borderColor = String(data.borderColor);
    let gridSize = parseInt(data.borderGridSize);
    const gridMode = data.gridMode;
    gridSize = gridMode === "3d" ? gridSize / 3.5 : gridSize;

    animation.classList.add("animationBorderGrid");
    const gridBox = document.querySelector(".hero-hight");
    const boxSize = gridBox.getBoundingClientRect();
    const containerHight = boxSize.height;
    const containerWidth = boxSize.width;
    const rowNumber = Math.ceil(containerHight / gridSize);
    const columnNumber = Math.ceil(containerWidth / gridSize);
    const numberOfBoxes = rowNumber * columnNumber;
    const AnimationContainer = document.querySelector(".animationBorderGrid"); // animation container

    AnimationContainer.style.gridTemplateColumns = `repeat(${columnNumber}, 1fr)`;
    AnimationContainer.style.gridTemplateRows = `repeat(${rowNumber}, 1fr)`;
    gridMode === "3d"
      ? (AnimationContainer.style.transform =
          "perspective(4000px) translate(-60%, -60%) skewX(30deg) skewY(-30deg) scale(4.2) rotateY(45deg) rotateX(45deg)")
      : (AnimationContainer.style.transform = "translate(-50%, -50%)");

    for (let i = 0; i < numberOfBoxes; i++) {
      const box = document.createElement("div");
      box.classList.add("gridbox");
      animation.appendChild(box);
    }
    const boxes = document.querySelectorAll(".gridbox");

    gridBox.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      let hoveredIndex;

      boxes.forEach((box, i) => {
        const rect = box.getBoundingClientRect();

        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          hoveredIndex = i;
        }
      });

      // reset all
      boxes.forEach((box) => box.classList.remove("active"));

      if (hoveredIndex >= 0) {
        const currentBox = boxes[hoveredIndex];
        currentBox.classList.add("active");
        currentBox.style.borderColor = borderColor;

        // Remove the class after 1 second
        setTimeout(() => {
          currentBox.classList.remove("active");
          currentBox.style.borderColor = "";
        }, 200);
      }
    });
  } else if (data.animation === "beamGrid") {
    removeAnimation();
    const beamGrid = document.createElement("div");
    beamGrid.classList.add("animationGridBeam");
    animation.appendChild(beamGrid);
    const count = parseInt(data["GridbeamCount"]) || 6;
    const gap = parseInt(data["GridbeamGap"]) || 500;
    const starColor = data["GridbeamColorStar"] || "#ff3333ff";
    const tailColor = data["GridbeamColorTail"] || "#fff";
    const width = parseInt(data["GridbeamWidth"]) || 200;

    for (let i = 0; i < count; i++) {
      const beam = document.createElement("span");
      beam.classList.add("beam");

      // random delay: 0–10s
      const delay = (Math.random() * 3).toFixed(2) + "s";
      // random duration: 3.5–7s
      const duration = (3.5 + Math.random() * 3.5).toFixed(2) + "s";

      // apply CSS vars
      beam.style.left = `${i * gap}px`;
      beam.style.setProperty("--delay", delay);
      beam.style.setProperty("--duration", duration);
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", `${tailColor}`);
      beam.style.setProperty("--beam-color-star", `${starColor}`);

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-left ${duration} linear ${delay} infinite`;
    }
  }
});

// beam animaiton customization
// backgouond controller show/hide
const radios = document.querySelectorAll('input[name="animation"]');
const auroraOptions = document.getElementById("auroraOptions");
const beamOptions = document.getElementById("beamOptions");
const beamGridOptions = document.getElementById("beamGridOptions");
const borderGridOptions = document.getElementById("borderGridOptions");

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const value = e.target.value;

    // Hide all options initially
    auroraOptions.style.display = "none";
    beamOptions.style.display = "none";
    beamGridOptions.style.display = "none";
    borderGridOptions.style.display = "none";

    // Show options based on selection
    if (value === "aurora") auroraOptions.style.display = "block";
    if (value === "beam") beamOptions.style.display = "block";
    if (value === "beamGrid") beamGridOptions.style.display = "block";
    if (value === "borderGrid") borderGridOptions.style.display = "block";
  });
});

//aurora color options
const auroraColorOptions = document.getElementById("auroraOptions");

// Select all color inputs inside auroraOptions
const colorInputs = auroraColorOptions.querySelectorAll('input[type="color"]');

colorInputs.forEach((input) => {
  const span = input.nextElementSibling; // the span next to the input
  span.textContent = input.value; // initialize with default value

  // Update span dynamically on input
  input.addEventListener("input", () => {
    span.textContent = input.value;
  });
});

//beam color options
const beamColorOptions = document.getElementById("beamOptions");

// Select all color inputs inside beamOptions
const beamColorInputs = beamColorOptions.querySelectorAll(
  'input[type="color"]'
);

beamColorInputs.forEach((input) => {
  const span = input.nextElementSibling; // the span next to the input
  span.textContent = input.value; // initialize with default value

  // Update span dynamically on input
  input.addEventListener("input", () => {
    span.textContent = input.value;
  });
});

// beam grid color show
const beamGridColorOptions = document.getElementById("beamGridOptions");

// select all color inputs in BeamGrid section
const gridColorInputs = beamGridColorOptions.querySelectorAll(
  'input[type="color"]'
);

gridColorInputs.forEach((input) => {
  const span = input.nextElementSibling; // the span next to input
  span.textContent = input.value; // initialize with default color

  // update span dynamically on input
  input.addEventListener("input", () => {
    span.textContent = input.value;
  });
});

// border grid color show
const borderGridColorOptions = document.getElementById("borderGridOptions");

// select all color inputs in BorderGrid section
const borderColorInputs = borderGridColorOptions.querySelectorAll(
  'input[type="color"]'
);

borderColorInputs.forEach((input) => {
  const span = input.nextElementSibling; // the span next to input
  span.textContent = input.value; // initialize with default color

  // update span dynamically on input
  input.addEventListener("input", () => {
    span.textContent = input.value;
  });
});

// Select all image option radios
const imageRadios = document.querySelectorAll('input[name="image"]');
const headingPositionBox = document.querySelector(".text-alignment-options");

// Watch for changes
imageRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const value = e.target.value;

    if (value === "grid") {
      headingPositionBox.style.display = "none";
    } else {
      headingPositionBox.style.display = "block";
    }
  });
});
