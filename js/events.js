/* events.js - Interaction Handlers and Scroll Logic */

/**
 * Scrolls the page smoothly to the banner of the selected liturgical season.
 * Triggered when the season selector changes.
 */
function scrollToSeason() {
  const t = document.getElementById("season-selector").value;
  const el = document.getElementById(`banner-${t}`);
  if (el) {
    // Offset calculation for the sticky header
    const y = el.getBoundingClientRect().top + window.pageYOffset - 180;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/**
 * Locates the current day's card (with ID 'today') and scrolls it into view.
 * Highlights the card briefly with a border animation.
 */
function scrollToToday() {
  const el = document.getElementById("today");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("border-3");
    // Remove highlight after animation completes
    setTimeout(() => el.classList.remove("border-3"), 2000);
  }
}

/**
 * Handles the "Go to Today" logic.
 * Checks if the current day is in the currently viewed year.
 * If not, switches the calendar year first, then scrolls.
 */
function goToToday() {
  const yearSelector = document.getElementById("year-selector");
  const todayDate = new Date();

  // Determine if today belongs to next liturgical year (Advent starts in late Nov)
  const startNextAdvent = getStartOfLiturgicalYear(todayDate.getFullYear() + 1);
  const targetYear =
    todayDate >= startNextAdvent
      ? todayDate.getFullYear() + 1
      : todayDate.getFullYear();

  // If we are looking at a different year, switch year first
  if (parseInt(yearSelector.value) !== targetYear) {
    yearSelector.value = targetYear;
    // updateCalendar is globally available from main.js
    updateCalendar().then(() => setTimeout(scrollToToday, 300));
  } else {
    // If the year is correct, just scroll
    scrollToToday();
  }
}
