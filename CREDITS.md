# Credits and UI library report

Handy Labs 2.0 uses ideas and small techniques from the libraries below. No library is installed as a dependency; everything is plain CSS and JavaScript.
"Adapted" means the technique was read from the library source and rewritten for this static site. "Inspired" means only the component's name and concept were used and every line is original; the source was not read.

| Library | Component | Where it is used | How | Licence |
|---|---|---|---|---|
| Magic UI | Marquee | Home ticker (`.tick`) | Adapted: repeated tracks, `--gap` variable, looping `translateX`, pause on hover | MIT |
| Magic UI | Magic Card | Project plates (`.plate`) | Adapted: pointer-following radial-gradient border plus inner spotlight (`--mx`, `--my`) | MIT |
| Animata | Background / Diagonal Lines | V8V plate and page texture | Adapted: `repeating-linear-gradient(45deg, …)` with a small background size | MIT |
| Eldora UI | Terminal | Releases status window | Adapted: window chrome with a command title bar, rows revealed one after another | MIT |
| Eldora UI | Animated Badge | Pulsing dots on status chips | Inspired; own CSS | not used |
| Uiverse | "go-corner" card by Prince4fff | Corner arrow on plates (`.gc`) | Markup pattern only; the CSS is original because only part of the stylesheet is visible on the element page | MIT |
| Aceternity UI | Vortex | Spinning rings on the Vortex page | Inspired; own CSS. Source not read: the licence of the free components is not stated | not used |
| Aceternity UI | Glare Card | 3D tilt of project plates | Inspired; own CSS and JavaScript | not used |
| Aceternity UI | Moving Border | Light running around the Glasswave player | Inspired; own CSS (animated conic gradient) | not used |
| Aceternity UI | Encrypted Text | Headline decode when a page opens | Inspired; own JavaScript | not used |
| React Bits | Glitch Text | V8V heading | Inspired; own CSS. Source not read: MIT + Commons Clause forbids redistributing ported components | not used |
| React Bits | Decrypted Text | Headline decode (same effect as above) | Inspired; own JavaScript | not used |

Other credits: fonts Unbounded and Golos Text (SIL Open Font Licence, served by Google Fonts). The frosted-glass header, menu and toast were modelled on a reference screenshot supplied by the site owner.

Motion is in `assets/css/motion.css`, loaded by `assets/js/fx.js` only when the visitor has not asked for reduced motion.
