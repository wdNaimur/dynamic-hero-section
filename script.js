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
}

// GET FORM VALUE

const form = document.querySelector(".settings-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  modal.style.display = "none";

  if (data.animation === "none") {
    return removeAnimation();
  } else if (data.animation === "aurora") {
    removeAnimation();
    animation.classList.add("animation-aurora");

    // Get user-selected options
    const color1 = data["auroraColor1"];
    const color2 = data["auroraColor2"];
    const color3 = data["auroraColor3"];
    const color4 = data["auroraColor4"];
    const color5 = data["auroraColor5"];
    const angle = data["auroraAngle"] || 100; // fallback to 100deg if not provided

    // Apply CSS variables dynamically
    animation.style.setProperty("--aurora-color1", color1);
    animation.style.setProperty("--aurora-color2", color2);
    animation.style.setProperty("--aurora-color3", color3);
    animation.style.setProperty("--aurora-color4", color4);
    animation.style.setProperty("--aurora-color5", color5);
    animation.style.setProperty("--aurora-angle", angle + "deg");
  } else if (data.animation === "beam") {
    removeAnimation();
    // get dynamic values (with defaults if empty)
    const count = parseInt(data["beamCount"]) || 6;
    const gap = parseInt(data["beamGap"]) || 500;
    const color = data["beamColorStar"] || "#ff3333ff";
    const width = parseInt(data["beamWidth"]) || 200;
    const directionOfBeams = data["directionOfBeams"];

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
      beam.style.background = color;
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", "#fff");

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-${directionOfBeams} ${duration} linear ${delay} infinite`;
    }
  } else if (data.animation === "borderGrid") {
    removeAnimation();
    animation.classList.add("animationBorderGrid");
    const gridBox = document.querySelector(".hero-hight");
    const boxSize = gridBox.getBoundingClientRect();
    const containerHight = boxSize.height;
    const containerWidth = boxSize.width;
    const rowNumber = Math.ceil(containerHight / 100);
    const columnNumber = Math.ceil(containerWidth / 100);
    const numberOfBoxes = rowNumber * columnNumber;
    const AnimationContainer = document.querySelector(".animationBorderGrid"); // animation container

    AnimationContainer.style.gridTemplateColumns = `repeat(${columnNumber}, 1fr)`;
    AnimationContainer.style.gridTemplateRows = `repeat(${rowNumber}, 1fr)`;

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

        // Remove the class after 1 second
        setTimeout(() => {
          currentBox.classList.remove("active");
        }, 200);
      }
    });
  } else if (data.animation === "beamGrid") {
    removeAnimation();
    const beamGrid = document.createElement("div");
    beamGrid.classList.add("animationGridBeam");
    animation.appendChild(beamGrid);
    const count = parseInt(data["beamCount"]) || 6;
    const gap = parseInt(data["beamGap"]) || 500;
    const color = data["beamColorStar"] || "#ff3333ff";
    const width = parseInt(data["beamWidth"]) || 200;
    const directionOfBeams = data["directionOfBeams"];

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
      beam.style.background = color;
      beam.style.setProperty("--beam-width", `${width}px`);
      beam.style.setProperty("--beam-color-tail", "#fff");

      animation.appendChild(beam);
      beam.style.animation = `beam-animation-left ${duration} linear ${delay} infinite`;
    }
  }
});

// const backgoundSvg = (
//   <svg viewBox="0 0 696 316">
//     <defs>
//       <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stop-color="#18CCFC" stop-opacity="0" />
//         <stop offset="50%" stop-color="#6344F5" />
//         <stop offset="100%" stop-color="#AE48FF" stop-opacity="0" />
//       </linearGradient>
//     </defs>

//     <path
//       class="beam"
//       d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
//     />
//     <path
//       class="beam"
//       d="M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867"
//     />
//     <path
//       class="beam"
//       d="M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859"
//     />
//   </svg>
// );

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
    console.log(value);
  });
});

// grid box animation
