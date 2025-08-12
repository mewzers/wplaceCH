// translations/translations.js

const userLang = navigator.language || navigator.userLanguage;
const translations = {
  fr: {
    grief: "En cas de vandalisme :",
    thanks: "Merci d'avoir pris le temps de scanner le QR code ! Ce pixel art est un projet communautaire et j'apprécierais énormément toute aide pour le maintenir ou l'améliorer ❤️.",
    hudPause: "espace pour mettre pause",
    tooltipZoomOut: "clique droit pour dézoomer"
  },
  de: {
    grief: "Bei Vandalismus :",
    thanks: "Danke, dass Sie sich die Zeit genommen haben, den QR-Code zu scannen! Dieses Pixel-Art ist ein Gemeinschaftsprojekt und jede Hilfe, es zu erhalten oder zu verbessern, wird sehr geschätzt ❤️.",
    hudPause: "Leertaste zum Pausieren",
    tooltipZoomOut: "rechtsklick zum herauszoomen"
  },
  it: {
    grief: "In caso di vandalismo :",
    thanks: "Grazie per aver preso il tempo di scansionare il QR code! Questo pixel art è un progetto comunitario e apprezzerei moltissimo qualsiasi aiuto per mantenerlo o migliorarlo ❤️.",
    hudPause: "spazio per mettere in pausa",
    tooltipZoomOut: "clic destro per zoom indietro"
  },
  en: {
    grief: "In case of grief :",
    thanks: "Thank you for taking the time to scan the QR code! This pixel art is a community project, and I would greatly appreciate any help to maintain or improve it ❤️.",
    hudPause: "space to pause",
    tooltipZoomOut: "right click to zoom out"
  }
};

const langCode = userLang.substring(0, 2).toLowerCase();
const messages = translations[langCode] || translations.en;

document.getElementById("grief-link").innerHTML =
  `${messages.grief} <a href="https://www.reddit.com/r/WplaceLive/comments/1mew9yn/report_users/" target="_blank" rel="noopener noreferrer">https://www.reddit.com/r/WplaceLive/comments/1mew9yn/report_users/</a>`;

document.getElementById("thanks-message").innerHTML = messages.thanks;

const hudText = document.getElementById("hud-text");
hudText.textContent = messages.hudPause;
