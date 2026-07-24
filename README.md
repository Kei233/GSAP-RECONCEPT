# GSPA Reconcept.

Este proyecto es un reconcepto muy simplificado de la pagina web de la Galleria dell'Accademia di Firenze.

El objetivo no es replicar el sitio real, sino proponer una version visual ligera con enfoque en:
- narrativa visual,
- animaciones al hacer scroll,
- y una estructura de codigo más mantenible.

## Alcance del proyecto

- Es una demo front-end estatica (HTML + CSS + JS).
- No incluye backend ni logica de reservas real.
- No representa informacion oficial del museo.

## Estructura

```text
gspa-reconcept/
  index.html
  styles/
    main.css
  scripts/
    main.js
```

## Librerias usadas

Este proyecto usa animacion con **GSAP** y complementos cargados por CDN:

1. `gsap` (core): timelines y transiciones base.
2. `ScrollTrigger`: animaciones sincronizadas con scroll, pin de secciones y scrub.
3. `SplitType`: divide texto en palabras/caracteres para animaciones tipograficas finas.

En `index.html` se cargan asi:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/split-type"></script>
<script src="./scripts/main.js" defer></script>
```

En `main.js`, GSAP se inicializa con:

```js
gsap.registerPlugin(ScrollTrigger);
```

## Como ejecutar

No requiere build ni instalacion de dependencias.

1. Abre `gspa-reconcept/index.html` en el navegador.
2. Haz scroll para ver las animaciones por secciones.

## Guia rapida del JS

El archivo `scripts/main.js` esta organizado por funciones pequeñas:

- `buildIntroTimeline()`: intro inicial.
- `buildHeroTitleTimeline()`: entrada del titulo principal.
- `initPanelAnimations()`: animaciones del panel de reservas.
- `initHorizontalPanelScroll()`: scroll horizontal con `ScrollTrigger`.
- `initNarrativeAnimation()`: efectos tipograficos en bloque narrativo.
- `initBoxSectionAnimation()` y `initStackedCardsAnimation()`: seccion final de tarjetas.
- `initAnimations()`: orquestacion general.

## Nota

La version `gspa-reconcept/` prioriza legibilidad y mantenimiento, manteniendo el comportamiento visual esperado del reconcepto.

