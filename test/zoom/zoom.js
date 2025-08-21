(() => {
  const blurBg = document.getElementById("blur-bg");
  const hudText = document.getElementById("hud-text");

  // Définir chaque image avec ses niveaux de zoom
  const images = [
    { el: document.querySelector(".pixel-art"), scales: [1, 6, 12] },
    { el: document.querySelector(".pixel-art-2"), scales: [1, 1.2, 1.8] } // zooms plus doux pour la petite image
  ];

  images.forEach(({ el, scales }) => {
    let zoomLevel = 0;
    let targetX = 50, targetY = 50;
    let currentX = 50, currentY = 50;
    let isPaused = false;
    let clone = null;

    function applyZoom(level) {
      if (level === 0) {
        // Supprimer le clone si existant
        if (clone) {
          clone.remove();
          clone = null;
        }
        blurBg.style.display = "none";
        hudText.style.display = "none";
        isPaused = false;
        window.dispatchEvent(new CustomEvent("zoomExit"));
        window.setZoomActive(false);
      } else {
        // Créer le clone s'il n'existe pas
        if (!clone) {
          clone = el.cloneNode(true);
          clone.classList.add("zoomed");
          clone.style.position = "fixed";
          clone.style.top = "40%";
          clone.style.left = "40%";
          clone.style.transformOrigin = "50% 50%";
          document.body.appendChild(clone);

          // Événements sur le clone
          clone.addEventListener("click", (e) => {
            if (e.button === 0) {
              zoomLevel = (zoomLevel + 1) % scales.length;
              applyZoom(zoomLevel);
            }
          });

          clone.addEventListener("contextmenu", (e) => {
            if (zoomLevel > 0) {
              e.preventDefault();
              zoomLevel = (zoomLevel - 1 + scales.length) % scales.length;
              applyZoom(zoomLevel);
            }
          });

          clone.addEventListener("mousemove", (e) => {
            if (zoomLevel > 0 && !isPaused) {
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;
              const deltaX = e.clientX - centerX;
              const deltaY = e.clientY - centerY;

              targetX = 50 + (deltaX / window.innerWidth) * 100;
              targetY = 50 + (deltaY / window.innerHeight) * 100;
              targetX = Math.min(Math.max(targetX, 0), 100);
              targetY = Math.min(Math.max(targetY, 0), 100);
            }
          });
        }

        // Réinitialiser le suivi souris
        targetX = currentX = 50;
        targetY = currentY = 50;
        clone.style.transform = `scale(${scales[level]})`;

        blurBg.style.display = "block";
        hudText.style.display = "block";
        clone.setAttribute("title", messages.tooltipZoomOut);

        window.setZoomActive(true); // HUD sait que zoom actif
      }
    }

    // Événements sur l'image originale
    el.addEventListener("click", (e) => {
      if (e.button === 0) {
        zoomLevel = (zoomLevel + 1) % scales.length;
        applyZoom(zoomLevel);
      }
    });

    el.addEventListener("contextmenu", (e) => {
      if (zoomLevel > 0) {
        e.preventDefault();
        zoomLevel = (zoomLevel - 1 + scales.length) % scales.length;
        applyZoom(zoomLevel);
      }
    });

    // Freeze via barre espace uniquement si zoom actif
    document.addEventListener("keydown", (e) => {
      if (zoomLevel > 0 && e.code === "Space") {
        e.preventDefault();
        isPaused = !isPaused;
        hudText.textContent = isPaused
          ? messages.hudPause + " (PAUSE)"
          : messages.tooltipZoomOut;
      }
    });

    function animate() {
      if (!isPaused && zoomLevel > 0 && clone) {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        clone.style.transformOrigin = `${currentX}% ${currentY}%`;
        clone.style.transform = `scale(${scales[zoomLevel]})`;
      }
      requestAnimationFrame(animate);
    }
    animate();
  });
})();
