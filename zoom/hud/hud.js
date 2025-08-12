// zoom/hud/hud.js
(() => {
  const hudText = document.getElementById("hud-text");
  let isPaused = false;

  // Texte par défaut HUD
  hudText.textContent = messages.hudPause;

  function updateHudText(paused) {
    hudText.textContent = paused ? messages.hudPause + " (PAUSE)" : messages.hudPause;
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      isPaused = !isPaused;
      updateHudText(isPaused);
      // Diffuse un événement custom pour notifier le changement de pause
      window.dispatchEvent(new CustomEvent("pauseToggle", { detail: { isPaused } }));
    }
  });
})();
