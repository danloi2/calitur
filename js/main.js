/* ==============================================================
   main.js - Main Orchestrator and Application Logic
   ============================================================== */

/**
 * Main function to refresh the calendar view.
 * Handles:
 * 1. Loading the correct localization bundle.
 * 2. Updating the dynamic Season selector.
 * 3. Fetching and processing liturgical data.
 * 4. Rendering banners and day cards.
 * 5. Updating global UI elements (Header titles, badges).
 */
async function updateCalendar() {
  const container = document.getElementById("calendar-content");
  const yearSel = document.getElementById("year-selector");
  const langSel = document.getElementById("lang-selector");
  const seasonSel = document.getElementById("season-selector");

  if (!container || !yearSel || !langSel || !seasonSel) return;

  const lang = langSel.value;
  const endYear = parseInt(yearSel.value);
  const bundleName = lang === "la" ? "Spain_La" : "Spain_Es";

  // 1. Ensure the Romcal localization bundle is loaded
  if (typeof window[bundleName] === "undefined") {
    // Retry after a short delay if bundle is not yet ready
    await new Promise((r) => setTimeout(r, 100));
    return updateCalendar();
  }

  // 2. Populate the Season Selector dynamically based on language
  const prevValue = seasonSel.value;
  seasonSel.innerHTML = `<option value="">${
    lang === "es" ? "-- Tiempo --" : "-- Tempus --"
  }</option>`;

  Object.keys(SEASON_INFO).forEach((key) => {
    if (key === "TRIDUUM") return; // Triduum is usually handled within Holy Week or separately
    const info = SEASON_INFO[key];
    const name = lang === "la" ? info.latTitle : info.title;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = name;
    seasonSel.appendChild(option);
  });
  // Restore previous selection if valid
  seasonSel.value = prevValue;

  // Show Loading Spinner while data is processed
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p class="mt-4 text-sm font-semibold text-slate-500 animate-pulse">Cargando...</p>
    </div>`;

  // 3. Retrieve and Organize Liturgical Data (via calendar.js)
  const map = await CalendarEngine.getData(endYear, window[bundleName]);
  const dates = Object.keys(map).sort();
  const todayStr = new Date().toISOString().split("T")[0];

  let html = "",
    currentSeason = null,
    ordinaryBlock = 1;

  // 4. Construct HTML for Calendar Events
  dates.forEach((fkey) => {
    const events = map[fkey];
    const principal = CalendarEngine.getPrincipalEvent(events);
    const date = new Date(fkey + "T12:00:00");

    // Season and Banner Logic: Determine which season section we are in
    let seasonRaw = principal.seasons?.[0] || "ORDINARY_TIME";
    // Normalize naming differences
    let season =
      seasonRaw === "CHRISTMASTIDE" || seasonRaw === "CHRISTMAS_TIME"
        ? "CHRISTMAS"
        : seasonRaw;

    // Specific overrides for Holy Week and Octaves
    if (principal.periods?.includes("HOLY_WEEK")) season = "HOLY_WEEK";
    if (principal.periods?.includes("EASTER_OCTAVE")) season = "EASTER";

    // Handle split Ordinary Time (I and II)
    if (season === "ORDINARY_TIME" && currentSeason === "EASTER")
      ordinaryBlock = 2;

    // Render decorative Banner when season changes
    if (season !== currentSeason) {
      let infoKey =
        season === "ORDINARY_TIME"
          ? ordinaryBlock === 1
            ? "ORDINARY_TIME_1"
            : "ORDINARY_TIME_2"
          : season;
      const info = SEASON_INFO[infoKey] || SEASON_INFO[season];
      if (info && infoKey !== "TRIDUUM") {
        html += UI.createBanner(info, lang, infoKey);
        currentSeason = season;
      }
    }

    // Determine Liturgical Color for styling
    let colorKey = (principal.colors?.[0] || "WHITE").toUpperCase();
    if (colorKey === "PURPLE") colorKey = "VIOLET";
    if (principal.id === "immaculate_conception_of_the_blessed_virgin_mary")
      colorKey = "BLUE";

    // Special pink color for Gaudete and Laetare Sundays
    if (principal.id === "advent_3_sunday" || principal.id === "lent_4_sunday")
      colorKey = "PINK";

    // Safe fallback configuration
    const colors = COLOR_MAP[colorKey] || COLOR_MAP["WHITE"];

    // Process Date and Week Information
    const dateInfo = CalendarEngine.processDateInfo(principal, date, lang);

    // Generate Badges (Ranks, Obligation, etc.)
    let badgesHTML = "";
    if (principal.rank !== "FERIA" && principal.rank !== "WEEKDAY") {
      let cb = colors.badge;

      // Optional override for Solemnities
      if (principal.rank === "SOLEMNITY") {
        // cb = COLOR_MAP['RED'].badge;
      }

      badgesHTML += `<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${cb} whitespace-nowrap">${
        principal.rankName || principal.rank
      }</span>`;
    }

    // Holy Day of Obligation Badge
    if (principal.isHolyDayOfObligation) {
      const obligationText = UI_STRINGS[lang]?.obligationLabel || "PRECEPTO";
      badgesHTML += `<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold bg-slate-800 text-white ring-1 ring-inset ring-slate-800 whitespace-nowrap shadow-sm ms-1">${obligationText}</span>`;
    }

    // Build the final Card HTML (via UI Engine)
    const dExtra = { ...dateInfo, badges: badgesHTML };
    html += UI.createCard(principal, fkey, todayStr, lang, dExtra, colors);
  });

  // Inject generated HTML into container
  container.innerHTML = html;

  // 5. Update Global UI Elements (Header, Subtitles)
  // Calculate Cycle (A, B, C) and Year II/I parity
  const cycle = ["C", "A", "B"][(endYear - 2022) % 3];
  const isEven = endYear % 2 === 0;

  document.getElementById("main-title").innerText =
    lang === "es" ? "CALENDARIO LITÚRGICO" : "CALENDARIUM LITURGICUM";

  document.getElementById("cycle-subtitle").innerText =
    lang === "es"
      ? `Ciclo ${cycle} • Año ${isEven ? "Par (II)" : "Impar (I)"}`
      : `Cyclus ${cycle} • Annus ${isEven ? "Par (II)" : "Impar (I)"}`;

  document.getElementById("country-year-subtitle").innerText = `${
    lang === "es" ? "España" : "Hispania"
  } • ${endYear - 1} / ${endYear}`;

  // Update floating button text
  const todayLabel = UI_STRINGS[lang]?.todayLabel || "HOY";
  const btnTodaySpan = document.getElementById("go-today-text");
  if (btnTodaySpan) btnTodaySpan.innerText = todayLabel;
}

/* ==============================================================
   APPLICATION INITIALIZATION
   ============================================================== */

const initApp = async () => {
  await updateCalendar();

  // Setup Event Listeners
  document.getElementById("lang-selector").addEventListener("change", () => {
    updateCalendar();
    // Update the top widget as well
    if (typeof DateWidget !== "undefined") DateWidget.render();
  });

  document
    .getElementById("year-selector")
    .addEventListener("change", updateCalendar);

  document
    .getElementById("season-selector")
    .addEventListener("change", scrollToSeason);

  // Auto-scroll to current day on load
  setTimeout(goToToday, 500);
};

// Start the application
initApp();
