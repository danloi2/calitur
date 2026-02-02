# Calitur

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E)
[![Release](https://img.shields.io/github/v/tag/danloi2/calitur?label=Release&color=0ea5e9&style=flat-square)](https://github.com/danloi2/calitur/releases)

Dynamic Liturgical Calendar website powered by [Romcal](https://github.com/romcal/romcal) and redesigned with **Tailwind CSS**.

This project displays the Roman Catholic liturgical calendar with support for:

- **Localization**: English/Latin and Spanish.
- **Dynamic Theming**: Liturgical colors (Green, Purple, Red, White) adapt to the current season/day.
- **Day/Night Mode**: Automatic time-of-day detection (Sun/Moon icons).
- **Responsive Design**: Modern, glassmorphic UI that looks great on mobile and desktop.

## 🚀 Deployment

**This project is ready for static deployment.** No Node.js is required on the server.

### GitHub Pages (Recommended)

1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Set **Source** to `Deploy from a branch`.
4. Select branch `main` and folder **`/` (root)**.
5. Save.

The site will be live immediately using the pre-built CSS.

## 🛠 Local Development

To modify styles or run the project locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm start
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080) in your browser.

### 3. Edit Styles (Tailwind)

To make design changes, edit `css/input.css` or your HTML files, then run:

```bash
# Watch mode (updates automatically)
npm run build:css
```

The styles are output to `css/output.css`.

## 📂 Project Structure

- **`index.html`**: Main entry point.
- **`css/`**: Contains Tailwind input and output files.
- **`js/`**:
  - `main.js`: Main application logic.
  - `ui.js`: DOM generation for calendar cards.
  - `fecha.js`: Date/Time widget logic.
  - `config.js`: Configuration and color mappings.
- **`romcal/`**: Static Romcal library files.

## Credits

- Calendar engine: [Romcal](https://github.com/romcal/romcal)
- Icons: [Heroicons](https://heroicons.com)

---

[![GitHub](https://img.shields.io/badge/GitHub-Daniel_Losada-181717?logo=github&logoColor=white)](https://github.com/danloi2)
[![Investigador EHU](https://img.shields.io/badge/Researcher-EHU-blue?logo=researchgate)](https://ekoizpen-zientifikoa.ehu.eus/investigadores/130988/detalle)

## License & Attribution

This project is an example implementation based on the **[Romcal](https://github.com/romcal/romcal)** library.

- **Romcal**: Copyright (c) 2023 [romcal](https://github.com/romcal/romcal) (MIT License).
- **This Implementation**: Released under the MIT License.

  ## 👥 Author

**Developed by Daniel Losada**

[![GitHub](https://img.shields.io/badge/GitHub-danloi2-181717?style=for-the-badge&logo=github)](https://github.com/danloi2)
[![Researcher EHU](https://img.shields.io/badge/Researcher-EHU-blue?style=for-the-badge&logo=researchgate)](https://github.com/danloi2)
