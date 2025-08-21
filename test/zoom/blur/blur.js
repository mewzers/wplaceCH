// zoom/blur/blur.js

// Blur bg visibility est déjà contrôlé dans zoom.js,
// ici tu peux ajouter animations ou effets spécifiques si tu veux.

// Par exemple, fade-in/out

const blurBg = document.getElementById("blur-bg");

function showBlur() {
  blurBg.style.display = "block";
  blurBg.style.opacity = 0;
  let opacity = 0;
  const fadeIn = setInterval(() => {
    opacity += 0.1;
    blurBg.style.opacity = opacity;
    if (opacity >= 1) clearInterval(fadeIn);
  }, 30);
}

function hideBlur() {
  let opacity = 1;
  const fadeOut = setInterval(() => {
    opacity -= 0.1;
    blurBg.style.opacity = opacity;
    if (opacity <= 0) {
      blurBg.style.display = "none";
      clearInterval(fadeOut);
    }
  }, 30);
}

// Tu peux remplacer les show/hide dans zoom.js par ces fonctions si tu veux des fades.
