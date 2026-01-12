/* ==============================================================
   GENERAL LITURGICAL CALENDAR CONFIGURATION
   ============================================================== */

/**
 * Mapping table to normalize Romcal internal constants to application keys.
 * Ensures compatibility across different Romcal versions (e.g. CHRISTMASTIDE vs CHRISTMAS_TIME).
 */
const ROMCAL_MAP = {
  CHRISTMASTIDE: "CHRISTMAS",
  CHRISTMAS_TIME: "CHRISTMAS",
  ADVENT: "ADVENT",
  LENT: "LENT",
  EASTER: "EASTER",
  ORDINARY_TIME: "ORDINARY_TIME",
};

/**
 * Repository of static information for each liturgical season.
 * This data drives the generation of visual banners and the dynamic season selector.
 */
const SEASON_INFO = {
  ADVENT: {
    title: "Advent Season",
    latTitle: "Tempus Adventus",
    desc: "Preparation for the coming of Christ.",
    latDesc: "Præparatio adventus Christi.",
  },
  CHRISTMAS: {
    title: "Christmas Season",
    latTitle: "Tempus Nativitatis",
    desc: "Celebration of the Birth of the Lord.",
    latDesc: "Nativitas Domini.",
  },
  ORDINARY_TIME_1: {
    title: "Ordinary Time I",
    latTitle: "Tempus per Annum I",
    desc: "Public life of Jesus.",
    latDesc: "Initium ministerii publici Iesu.",
  },
  LENT: {
    title: "Lent Season",
    latTitle: "Tempus Quadragesimæ",
    desc: "Penance and preparation for Easter.",
    latDesc: "Pænitentia et præparatio ad Pascha.",
  },
  HOLY_WEEK: {
    title: "Holy Week",
    latTitle: "Hebdomada Sancta",
    desc: "Passion of the Lord.",
    latDesc: "Passio Domini.",
  },
  EASTER: {
    title: "Easter Season",
    latTitle: "Tempus Paschale",
    desc: "Celebration of the Risen Christ.",
    latDesc: "Christus resurrexit.",
  },
  ORDINARY_TIME_2: {
    title: "Ordinary Time II",
    latTitle: "Tempus per Annum II",
    desc: "Teachings, miracles, and growth of the Kingdom.",
    latDesc: "Doctrina et miracula Domini.",
  },
};

/**
 * Theme configuration mapping.
 * Associates liturgical colors with specific Tailwind CSS utility classes for consistent branding.
 */
const COLOR_MAP = {
  VIOLET: {
    bg: "bg-purple-50",
    text: "text-purple-900",
    border: "border-purple-200",
    hoverBg: "group-hover:bg-purple-50/50",
    icon: "bg-purple-500",
    badge: "bg-purple-100 text-purple-700 ring-purple-600/20",
  },
  WHITE: {
    bg: "bg-white",
    text: "text-slate-800",
    border: "border-slate-200",
    hoverBg: "group-hover:bg-slate-50",
    icon: "bg-yellow-400", // Gold-ish
    badge: "bg-slate-100 text-slate-700 ring-slate-600/20",
  },
  GREEN: {
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    border: "border-emerald-200",
    hoverBg: "group-hover:bg-emerald-50/50",
    icon: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  },
  RED: {
    bg: "bg-rose-50",
    text: "text-rose-900",
    border: "border-rose-200",
    hoverBg: "group-hover:bg-rose-50/50",
    icon: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700 ring-rose-600/20",
  },
  PINK: {
    bg: "bg-pink-50",
    text: "text-pink-900",
    border: "border-pink-200",
    hoverBg: "group-hover:bg-pink-50/50",
    icon: "bg-pink-500",
    badge: "bg-pink-100 text-pink-700 ring-pink-600/20",
  },
  BLUE: {
    bg: "bg-sky-50",
    text: "text-sky-900",
    border: "border-sky-200",
    hoverBg: "group-hover:bg-sky-50/50",
    icon: "bg-sky-500",
    badge: "bg-sky-100 text-sky-700 ring-sky-600/20",
  },
  BLACK: {
    bg: "bg-slate-50",
    text: "text-slate-900",
    border: "border-slate-300",
    hoverBg: "group-hover:bg-slate-100",
    icon: "bg-slate-700",
    badge: "bg-slate-200 text-slate-800 ring-slate-700/20",
  },
};

/**
 * Localized string constants for UI elements (Buttons, labels).
 */
const UI_STRINGS = {
  es: {
    todayLabel: "HOY",
    obligationLabel: "PRECEPTO",
  },
  la: {
    todayLabel: "HODIE",
    obligationLabel: "DE PRÆCEPTO",
  },
};
