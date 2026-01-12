/* ==============================================================
   ui.js - Render Engine (Visual Components)
   ============================================================== */

const UI = {
  /**
   * Generates the decorative banner HTML for each liturgical season.
   * Uses gradients and shadows to create a premium visual effect.
   * @param {object} info - Configuration object containing titles and descriptions (from config.js).
   * @param {string} lang - Language code ('es' or 'la').
   * @param {string} key - Unique season identifier (e.g., 'ADVENT').
   * @returns {string} HTML string for the banner component.
   */
  createBanner(info, lang, key) {
    const title = lang === "la" && info.latTitle ? info.latTitle : info.title;
    const desc = lang === "la" && info.latDesc ? info.latDesc : info.desc;

    return `
      <div id="banner-${key}" class="group relative overflow-hidden rounded-3xl p-8 mb-8 text-center shadow-xl shadow-primary-900/10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        <div class="absolute inset-0 bg-white/40 backdrop-blur-3xl z-0"></div>
        <div class="absolute inset-0 bg-linear-to-br from-primary-500/10 to-indigo-500/10 z-0"></div>
        <div class="relative z-10">
          <h2 class="text-3xl font-black bg-linear-to-br from-primary-700 to-indigo-700 bg-clip-text text-transparent uppercase tracking-tight mb-3">
            ${title}
          </h2>
          <p class="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            ${desc}
          </p>
        </div>
      </div>`;
  },

  /**
   * Generates the card HTML for a specific calendar day.
   * Handles highlighting for "Today" and liturgical color application.
   * @param {object} principal - The primary liturgical event object for the day.
   * @param {string} fkey - Date key string YYYY-MM-DD.
   * @param {string} todayStr - Today's date string YYYY-MM-DD.
   * @param {string} lang - Language code ('es' or 'la').
   * @param {object} dExtra - Formatted date info (dayName, monthName, numeric day, week text, badges).
   * @param {object} colors - Color palette object (bg, text, border, icon classes).
   * @returns {string} HTML string for the day card.
   */
  createCard(principal, fkey, todayStr, lang, dExtra, colors) {
    const isToday = fkey === todayStr;
    const idToday = isToday ? 'id="today"' : "";

    // Base card styling
    const baseCard =
      "group relative rounded-2xl transition-all duration-300 overflow-hidden";

    // Highlighting logic for the current day
    // "Today" gets a primary ring and elevation; others get a border matching their liturgical color
    const todayClass = isToday
      ? `ring-4 ring-offset-2 ring-primary-500/30 shadow-2xl scale-[1.02] z-20`
      : `border hover:shadow-lg hover:-translate-y-0.5 ${colors.border}`;

    return `
      <div class="${baseCard} ${todayClass} ${colors.bg}" ${idToday}>
        <div class="flex flex-row items-stretch min-h-[100px]">
          
          <!-- Date Column (Left side) -->
          <!-- Uses a semi-transparent white background with blur for readability -->
          <div class="w-24 md:w-28 shrink-0 flex flex-col items-center justify-center p-3 border-r ${
            colors.border
          } bg-white/50 backdrop-blur-sm">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${
              dExtra.dayName
            }</div>
            <div class="text-4xl font-black ${
              colors.text
            } tracking-tighter leading-none mb-1">${dExtra.num}</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">${
              dExtra.monthName
            }</div>
          </div>

          <!-- Event Content (Right side) -->
          <!-- Decorative ambient background icon -->
          <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
             <div class="w-16 h-16 rounded-full blur-2xl ${colors.icon}"></div>
          </div>

          <div class="grow p-5 flex flex-col justify-center relative z-10">
            ${
              dExtra.week
                ? `<div class="text-xs font-semibold ${colors.text} opacity-80 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full ${colors.icon}"></span>
                    ${dExtra.week}
                   </div>`
                : ""
            }
            
            <h6 class="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-black transition-colors">
              ${principal.name}
            </h6>

            <div class="flex flex-wrap gap-2">
              ${dExtra.badges}
            </div>
          </div>
        </div>
      </div>`;
  },
};
