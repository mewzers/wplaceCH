const userLang = navigator.language || navigator.userLanguage;

// URLs centralisées
const urls = {
  template: "bluemarble.camilledaguin.fr/",
  report: "reddit.com/r/WplaceLive/comments/1mew9yn/report_users/"
};

const translations = {
  fr: {
    templateNotice: `Ce script permet d'afficher les templates : <a href="${urls.template}" target="_blank" rel="noopener noreferrer">${urls.template}</a>.`,
    grief: "En cas de vandalisme :",
    reportDetails: `Vous pouvez signaler les joueurs qui dessinent en cliquant sur les pixels pour voir qui ils sont, puis en cliquant sur 'report' et en choisissant 'grief'.`,
    thanks: "Merci d'avoir pris le temps de scanner le QR code ! Ce pixel art est un projet communautaire et j'apprécierais énormément toute aide pour le maintenir ou l'améliorer ❤️.",
    hudPause: "espace pour mettre pause",
    tooltipZoomOut: "clique droit pour dézoomer"
  },
  de: {
    templateNotice: `Dieses Skript zeigt die Vorlagen an: <a href="${urls.template}" target="_blank" rel="noopener noreferrer">${urls.template}</a>.`,
    grief: "Bei Vandalismus :",
    reportDetails: "Sie können Spieler melden, die zeichnen, indem Sie auf die Pixel klicken, um zu sehen, wer sie sind, dann auf 'report' klicken und 'grief' auswählen.",
    thanks: "Danke, dass Sie sich die Zeit genommen haben, den QR-Code zu scannen! Dieses Pixel-Art ist ein Gemeinschaftsprojekt und jede Hilfe, es zu erhalten oder zu verbessern, wird sehr geschätzt ❤️.",
    hudPause: "Leertaste zum Pausieren",
    tooltipZoomOut: "rechtsklick zum herauszoomen"
  },
  it: {
    templateNotice: `Questo script consente di visualizzare i template: <a href="${urls.template}" target="_blank" rel="noopener noreferrer">${urls.template}</a>.`,
    grief: "In caso di vandalismo :",
    reportDetails: "Puoi segnalare i giocatori che disegnano cliccando sui pixel per vedere chi sono, quindi cliccare su 'report' e scegliere 'grief'.",
    thanks: "Grazie per aver preso il tempo di scansionare il QR code! Questo pixel art è un progetto comunitario e apprezzerei moltissimo qualsiasi aiuto per mantenerlo o migliorarlo ❤️.",
    hudPause: "spazio per mettere in pausa",
    tooltipZoomOut: "clic destro per zoom indietro"
  },
  en: {
    templateNotice: `This script allows displaying the templates: <a href="${urls.template}" target="_blank" rel="noopener noreferrer">${urls.template}</a>.`,
    grief: "In case of grief :",
    reportDetails: "You can report players who are drawing by clicking on the pixels to see who they are, then clicking 'report' and selecting 'grief'.",
    thanks: "Thank you for taking the time to scan the QR code! This pixel art is a community project, and I would greatly appreciate any help to maintain or improve it ❤️.",
    hudPause: "space to pause",
    tooltipZoomOut: "right click to zoom out"
  }
};

// Détection de la langue
const langFull = (userLang || "").toLowerCase();
const langShort = langFull.substring(0, 2);
const messages = translations[langFull] || translations[langShort] || translations.en;

// Sécurisation de l’injection DOM
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

// Injection des traductions
setText("template-notice", messages.templateNotice);
setText("grief-link", `${messages.grief} <a href="${urls.report}" target="_blank">${urls.report}</a>`);
setText("player-report", messages.reportDetails);
setText("thanks-message", messages.thanks);
setText("hud-text", messages.hudPause);
