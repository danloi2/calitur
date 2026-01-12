/**
 * js/date-widget.js
 *
 * Date and Time Widget.
 * Features:
 * - Localization support (Spanish / Latin).
 * - Dynamic Day/Night Theme (Sun/Moon SVG Icons).
 * - Integrated Tailwind CSS styling.
 */

const DateWidget = (() => {
  /**
   * Converts a numeric value to its Roman numeral representation.
   * @param {number} num - The integer to convert.
   * @returns {string} The Roman numeral string.
   */
  function toRoman(num) {
    if (!num || num === 0) return "";
    const map = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];
    let result = "";
    let n = num;
    for (const [letter, value] of map) {
      while (n >= value) {
        result += letter;
        n -= value;
      }
    }
    return result;
  }

  // Icon set using Heroicons Mini (SVG)
  const ICONS = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" /></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd" /></svg>`,
  };

  /**
   * Retrieves current time information including appropriate icon and color theme.
   * @param {string} lang - Language code ('es' or 'la').
   * @returns {object} Object containing icon SVG, color class string, and formatted time text.
   */
  function getTimeInfo(lang) {
    const f = new Date();
    const h = f.getHours();
    const m = f.getMinutes();

    // Determine if it is night time (before 6 AM or after 7 PM)
    const isNight = h < 6 || h >= 19;

    // Apply visual configuration based on time of day
    const icon = isNight ? ICONS.moon : ICONS.sun;
    const colorClass = isNight
      ? "bg-indigo-50 text-indigo-700 ring-indigo-700/10"
      : "bg-amber-50 text-amber-700 ring-amber-600/20";

    let timeText = "";

    if (lang === "la") {
      // Logic for Roman Vigil/Hour system
      const romanHours = {
        0: "media nox",
        1: "prima vigilia",
        2: "secunda vigilia",
        3: "tertia vigilia",
        4: "quarta vigilia",
        5: "quinta vigilia",
        6: "hora prima",
        7: "hora secunda",
        8: "hora tertia",
        9: "hora quarta",
        10: "hora quinta",
        11: "hora sexta",
        12: "hora sexta",
        13: "hora septima",
        14: "hora octava",
        15: "hora nona",
        16: "hora decima",
        17: "hora undecima",
        18: "hora duodecima",
        19: "prima vigilia",
        20: "secunda vigilia",
        21: "tertia vigilia",
        22: "quarta vigilia",
        23: "quinta vigilia",
      };
      timeText = (romanHours[h] || "").toUpperCase();
    } else {
      // Standard Spanish Logic: 12-hour format with AM/PM
      const pad = (n) => n.toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      timeText = `${h12}:${pad(m)} ${ampm}`;
    }

    return { icon, colorClass, timeText };
  }

  /**
   * Generates localized HTML string for the current date.
   * @param {string} lang - Language code ('es' or 'la').
   * @returns {string} HTML string containing the formatted date.
   */
  function getDateText(lang) {
    const f = new Date();
    if (lang === "la") {
      const days = [
        "Die Dominica",
        "Die Lunae",
        "Die Martis",
        "Die Mercurii",
        "Die Iovis",
        "Die Veneris",
        "Die Saturni",
      ];
      const months = [
        "Ianuarii",
        "Februarii",
        "Martii",
        "Aprilis",
        "Maii",
        "Iunii",
        "Iulii",
        "Augusti",
        "Septembris",
        "Octobris",
        "Novembris",
        "Decembris",
      ];
      // Use Roman numerals for day and year
      return `<span class="italic font-medium text-slate-500">
        ${days[f.getDay()]}, die ${toRoman(f.getDate())} mensis ${
        months[f.getMonth()]
      }<br>
        Anno Domini ${toRoman(f.getFullYear())}
      </span>`;
    } else {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateStr = f.toLocaleDateString("es-ES", options);
      // Capitalize first letter for consistency
      return `<span class="italic font-medium text-slate-500 capitalize">
        ${dateStr}
      </span>`;
    }
  }

  /**
   * Renders the widget into the DOM.
   */
  function render() {
    const el = document.getElementById("date-widget");
    if (!el) return;

    const langSel = document.getElementById("lang-selector");
    const lang = langSel ? langSel.value : "es";

    const { icon, colorClass, timeText } = getTimeInfo(lang);
    const dateHTML = getDateText(lang);

    el.innerHTML = `
      <div class="flex flex-col items-center gap-1 text-xs leading-tight">
        ${dateHTML}
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ring-1 ring-inset ${colorClass} transition-colors duration-300">
          ${icon}
          <span>${timeText}</span>
        </div>
      </div>
    `;
  }

  return { render };
})();

// Initialize widget and set up auto-refresh every minute
document.addEventListener("DOMContentLoaded", () => {
  DateWidget.render();
  setInterval(DateWidget.render, 60000);

  // Listen for language changes to update the widget immediately
  const sel = document.getElementById("lang-selector");
  if (sel) {
    sel.addEventListener("change", DateWidget.render);
  }
});
