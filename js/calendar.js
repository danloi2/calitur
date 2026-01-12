const CalendarEngine = {
  /**
   * Generates liturgical data for a specific year using the Romcal library.
   * Merges two Gregorian years to cover the full Liturgical Cycle (Advent to Christ the King).
   * @param {number} endYear - The year the liturgical cycle ends.
   * @param {object} bundle - Localization bundle for Romcal.
   * @returns {Promise<object>} Map of date strings (YYYY-MM-DD) to arrays of events.
   */
  async getData(endYear, bundle) {
    const romcal = new Romcal.Romcal({ localizedCalendar: bundle });
    // Generate data for overlap years to ensure full coverage
    const [cal1, cal2] = await Promise.all([
      romcal.generateCalendar(endYear - 1),
      romcal.generateCalendar(endYear),
    ]);
    const allEvents = [
      ...Object.values(cal1).flat(),
      ...Object.values(cal2).flat(),
    ];

    // Define the boundaries of the requested liturgical year
    const start = getStartOfLiturgicalYear(endYear);
    const end = getEndOfLiturgicalYear(endYear);

    const map = {};
    allEvents.forEach((d) => {
      const f = new Date(d.date);
      // Filter events to strictly fall within the liturgical year boundaries
      if (f >= start && f <= end) {
        const k = f.toISOString().split("T")[0];
        if (!map[k]) map[k] = [];
        map[k].push(d);
      }
    });
    return map;
  },

  /**
   * Determines the highest priority event for a given day.
   * @param {Array} events - List of events for a single day.
   * @returns {object} The event with the highest rank.
   */
  getPrincipalEvent(events) {
    const rankMap = {
      SOLEMNITY: 4,
      SUNDAY: 4,
      FEAST: 3,
      MEMORIAL: 2,
      FERIA: 1,
      WEEKDAY: 1,
    };
    return events.reduce((prev, current) =>
      (rankMap[current.rank] || 0) > (rankMap[prev.rank] || 0) ? current : prev
    );
  },

  /**
   * Processes raw event data to extract formatted date strings and week descriptions.
   * Handles localization logic for Latin/English date formats.
   * @param {object} principal - The main event object.
   * @param {Date} date - The JavaScript Date object.
   * @param {string} lang - Language code ('es' or 'la').
   * @returns {object} Formatted date parts: dayName, monthName, week, and day number.
   */
  processDateInfo(principal, date, lang) {
    const daysLatin = {
      sun: "Dom.",
      mon: "Fer. II",
      tue: "Fer. III",
      wed: "Fer. IV",
      thu: "Fer. V",
      fri: "Fer. VI",
      sat: "Sabb.",
    };
    const monthsLatin = {
      jan: "Ian.",
      feb: "Feb.",
      mar: "Mar.",
      apr: "Apr.",
      may: "Mai.",
      jun: "Iun.",
      jul: "Iul.",
      aug: "Aug.",
      sep: "Sept.",
      oct: "Oct.",
      nov: "Nov.",
      dec: "Dec.",
    };

    const dayKeyEn = new Intl.DateTimeFormat("en-US", { weekday: "short" })
      .format(date)
      .toLowerCase();
    const monthKeyEn = new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toLowerCase();

    const dayName =
      lang === "es"
        ? new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(date)
        : daysLatin[dayKeyEn] || dayKeyEn;

    const monthName =
      lang === "es"
        ? new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date)
        : monthsLatin[monthKeyEn] || monthKeyEn;

    let seasonName = principal.seasonNames?.[0] || "";
    let week = principal.calendar?.weekOfSeason
      ? lang === "es"
        ? `Semana ${principal.calendar.weekOfSeason} de ${seasonName}`
        : `Hebdomada ${principal.calendar.weekOfSeason} de ${seasonName}`
      : "";

    return { dayName, monthName, week, num: date.getDate() };
  },
};
