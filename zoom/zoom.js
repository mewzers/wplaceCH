(() => {
  const img = document.getElementById("pixel-art");
  const blurBg = document.getElementById("blur-bg");
  const hudText = document.getElementById("hud-text");

  const messages = {
    tooltipZoomOut: "right click to zoom out",
  };

  let zoomLevel = 0;
  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;
  let isPaused = false;

  const zoomScales = [1, 6, 12];

  function applyZoom(level) {
    if (level === 0) {
      img.classList.remove("zoomed");
      img.style.transform = "";
      img.style.transformOrigin = "center center";
      blurBg.style.display = "none";
      hudText.style.display = "none";
      img.style.cursor = "zoom-in";
      img.removeAttribute("title");
      isPaused = false;
    } else {
      targetX = currentX = 50;
      targetY = currentY = 50;
      img.style.transformOrigin = `50% 50%`;
      img.style.transform = `scale(${zoomScales[level]})`;
      img.classList.add("zoomed");
      blurBg.style.display = "block";
      hudText.style.display = "block";
      img.style.cursor = "zoom-out";
      img.setAttribute("title", messages.tooltipZoomOut);
    }
  }

  img.addEventListener("click", (e) => {
    if (e.button === 0) {
      // clic gauche : zoom cyclique 0 -> 1 -> 2 -> 0
      zoomLevel = (zoomLevel + 1) % 3;
      applyZoom(zoomLevel);
    }
  });

  img.addEventListener("contextmenu", (e) => {
    if (zoomLevel > 0) {
      e.preventDefault();
      // clic droit : zoom cyclique 2 -> 1 -> 0
      zoomLevel = (zoomLevel - 1 + 3) % 3;
      applyZoom(zoomLevel);
    }
  });

  img.addEventListener("mousemove", (e) => {
    if (zoomLevel > 0 && !isPaused) {
      const rect = img.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const pctX = (offsetX / rect.width) * 100;
      const pctY = (offsetY / rect.height) * 100;

      targetX = Math.min(Math.max(pctX, 0), 100);
      targetY = Math.min(Math.max(pctY, 0), 100);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (zoomLevel > 0 && e.code === "Space") {
      e.preventDefault();
      isPaused = !isPaused;
      hudText.textContent = isPaused ? "paused (space to resume)" : messages.tooltipZoomOut;
    }
  });

  function animate() {
    if (!isPaused && zoomLevel > 0) {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      img.style.transformOrigin = `${currentX}% ${currentY}%`;
      img.style.transform = `scale(${zoomScales[zoomLevel]})`;
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
