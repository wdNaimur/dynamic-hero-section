const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("settingsModal");
const closeModalBtn = document.getElementById("closeModalBtn");

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

// GET FORM VALUE
const form = document.querySelector(".settings-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data.animation);
  modal.style.display = "none";

  // SET ANIMATION
  const animation = document.getElementById("animation");
  animation.classList.forEach((cls) => {
    if (cls.startsWith("animation")) {
      animation.classList.remove(cls);
    }
  });
  animation.classList.add(`animation-${data.animation}`);
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
