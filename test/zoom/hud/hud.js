// zoom/hud/hud.js
(() => {
  const hudText = document.getElementById("hud-text");
  let isPaused = false;
  let zoomActive = false; // État global du zoom

  // Texte par défaut HUD
  hudText.textContent = messages.hudPause;

  function updateHudText(paused) {
    hudText.textContent = paused ? messages.hudPause + " (PAUSE)" : messages.hudPause;
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (zoomActive) { // ne gérer le HUD que si zoom actif
        isPaused = !isPaused;
        updateHudText(isPaused);
        window.dispatchEvent(new CustomEvent("pauseToggle", { detail: { isPaused } }));
      }
    }
  });

  // Événement pour reset HUD quand on sort du zoom
  window.addEventListener("zoomExit", () => {
    zoomActive = false;
    isPaused = false;
    updateHudText(false); // remet texte par défaut
  });

  // Exposer l'état zoom pour le zoom.js
  window.setZoomActive = (active) => {
    zoomActive = active;
    if(!active) {
      isPaused = false;
      updateHudText(false);
    }
  }
})();
