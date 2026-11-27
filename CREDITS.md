# Credits and UI library report

Handy Labs 2.0 uses ideas and small techniques from the libraries below. No library is installed as a dependency; everything is plain CSS and JavaScript.
"Adapted" means the technique was read from the library source and rewritten for this static site. "Inspired" means only the concept was used and every line is original.

| Library | Component | Where it is used | How | Licence |
|---|---|---|---|---|
| Magic UI | Marquee | Home ticker (`.tick`) | Adapted: `translateX(calc(-100% - var(--gap)))` keyframes, `--gap` variable, repeated tracks, pause on hover | MIT |
| Magic UI | Magic Card | Project plates (`.plate`) | Adapted: pointer-following radial-gradient border plus inner spotlight (`--mx`, `--my`) | MIT |
| Animata | Background / Diagonal Lines | V8V plate and page texture | Adapted: `repeating-linear-gradient(45deg, …)` with a small background size | MIT |
| Eldora UI | Terminal | Releases status window | Adapted: window chrome, command title bar, rows revealed one after another | MIT |
| Uiverse | "go-corner" card by Prince4fff | Corner arrow on plates (`.gc`) | Markup pattern only; the CSS is original because only part of the stylesheet is visible on the element page | MIT |
| Aceternity UI | Vortex | Spinning ring on the Vortex page | Inspired; own CSS, nothing copied (licence of free components is not stated) | not used |
| React Bits | Glitch Text | V8V heading | Inspired; own CSS, nothing copied (MIT + Commons Clause forbids redistributing ported components) | not used |

Other credits: fonts Unbounded and Golos Text (SIL Open Font Licence, served by Google Fonts). The frosted-glass header, menu and toast were modelled on a reference screenshot supplied by the site owner.

Plain `Marquee` in Eldora UI is derived from the same Magic UI component and was not used separately.
