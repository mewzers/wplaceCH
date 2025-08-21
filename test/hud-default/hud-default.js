document.addEventListener("DOMContentLoaded", () => {
  const hud = document.getElementById("hud-default");
  const toggle = document.getElementById("hud-toggle");

  toggle.addEventListener("click", () => {
    hud.classList.toggle("collapsed");
  });
});
