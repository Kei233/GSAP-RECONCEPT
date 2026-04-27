gsap.registerPlugin(ScrollTrigger);

// Helper: crea una instancia de SplitType solo si el target existe.
function splitOrNull(target) {
  if (!target) {
    return null;
  }
  return new SplitType(target);
}

// Intro de pantalla: texto inicial + paneles que salen.
function buildIntroTimeline() {
  const introTextSplit = splitOrNull("#letrasDeEntrada");
  const words = introTextSplit?.words ?? [];

  return gsap
    .timeline({
      defaults: { duration: 0.12, ease: "power2.inOut" },
    })
    .set("#letrasDeEntrada", { display: "block" })
    .from(words, {
      delay: 0.7,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      filter: "blur(4px)",
      ease: "power2.inOut",
    })
    .to(words, {
      duration: 0.7,
      opacity: 0,
    })
    .set("#letrasDeEntrada", { display: "none" })
    .set(".fadeIn .palet", { display: "block" })
    .set(".fadeIn", { backgroundColor: "transparent" })
    .to(".fadeIn .palet", {
      x: "100%",
      y: 0,
      duration: 1.3,
      ease: "power2.in",
      stagger: 0.24,
    })
    .set(".fadeIn", { display: "none" });
}

// Animacion principal del titulo del hero.
function buildHeroTitleTimeline() {
  const titleSplit = splitOrNull("#letras");
  const subtitleSplit = splitOrNull(".subText");

  return gsap
    .timeline({
      defaults: { duration: 1.5, ease: "power3.inOut" },
    })
    .from(titleSplit?.chars ?? [], {
      stagger: 0.1,
      y: "100%",
      opacity: 0,
    })
    .to(".letrasContainer", {
      clipPath: "inset(0% 0% 0% 0% round 16px)",
    })
    .from(
      subtitleSplit?.words ?? [],
      {
        stagger: 0.5,
        opacity: 0,
        y: "-100%",
        ease: "back.inOut(2)",
      },
      3,
    );
}

// Animacion de entrada del panel de reservas.
function initPanelAnimations() {
  const panelKicker = document.querySelector(".panel-kicker");
  const panelTitle = document.querySelector(".panel-1 h2");

  const kickerSplit = splitOrNull(panelKicker);
  const titleSplit = splitOrNull(panelTitle);

  const panelIntroTimeline = gsap.timeline({
    paused: true,
    defaults: { duration: 0.75, ease: "power2.inOut" },
  });

  panelIntroTimeline
    .from(".divPanel1", {
      opacity: 0,
      x: -100,
      stagger: 0.5,
    })
    .from(kickerSplit?.chars ?? [], {
      opacity: 0,
      stagger: 0.1,
    })
    .from(
      titleSplit?.chars ?? [],
      {
        ease: "back.out(1.2)",
        stagger: 0.12,
        opacity: 0,
        y: 50,
      },
      0,
    )
    .from(
      ".panel-description",
      {
        opacity: 0,
        filter: "blur(4px)",
        scale: 1.02,
      },
      0,
    );

  return panelIntroTimeline;
}

// Fade simple para la agenda cuando entra al viewport.
function initAgendaAnimation() {
  gsap.from(".agenda-inner", {
    opacity: 0,
    y: "-20%",
    scrollTrigger: {
      trigger: ".agenda",
      start: "top 40%",
      end: "+=200",
    },
  });
}

// Scroll horizontal del bloque de paneles con pin.
function initHorizontalPanelScroll(panelIntroTimeline) {
  const container = document.querySelector(".container");
  if (!container) {
    return;
  }

  gsap.to(container, {
    x: () => -Math.floor(container.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${container.scrollWidth - window.innerWidth}`,
      onEnter: () => panelIntroTimeline.play(),
    },
    modifiers: {
      x: (x) => `${Math.round(parseFloat(x))}px`,
    },
  });
}

// Movimiento ambiental del hero (fondo + overlays + cards).
function initHeroAmbientAnimation() {
  gsap
    .timeline({
      defaults: { duration: 4, ease: "power2.inOut" },
    })
    .to(".hero", {
      duration: 3,
      backgroundPosition: "100% 25%",
    })
    .to(
      ".hero",
      {
        "--white1": "rgba(255, 255, 255, 0.95)",
        "--white2": "rgba(40,40,40,0.7)",
        "--white3": "rgba(0,0,0,0.4)",
      },
      0,
    )
    .to(".hero", {
      duration: 6,
      backgroundPosition: "-100% 25%",
    })
    .to(".hero", {
      backgroundPosition: "50% 30%",
    })
    .from(
      ".letter",
      {
        duration: 0.75,
        x: (index) => (index === 0 ? -90 : 90),
        opacity: 0,
        stagger: 0.14,
      },
      "<",
    )
    .to(".hero", {
      "--white1": "rgba(33, 28, 18, 0.8)",
      "--white2": "rgba(100, 85, 55, 0.3)",
      "--white3": "rgba(200, 170, 110, 0.4)",
    })
    .to(
      ".letrasContainer",
      {
        backdropFilter: "blur(8px)",
      },
      "<",
    );
}

// Animacion tipografica de la seccion narrativa.
function initNarrativeAnimation() {
  const narrativeLead = document.querySelector(".narr p");
  const narrativeKicker = document.querySelector(".narr-kicker");
  const narrativeTitle = document.querySelector("#masterPiece");
  const narrativeLink = document.querySelector(".link");

  const leadSplit = splitOrNull(narrativeLead);
  const kickerSplit = splitOrNull(narrativeKicker);
  const titleSplit = splitOrNull(narrativeTitle);
  const linkSplit = splitOrNull(narrativeLink);

  gsap
    .timeline({
      defaults: { duration: 0.75, ease: "back.out(2)" },
      scrollTrigger: {
        trigger: ".narr",
        start: "top center",
      },
    })
    .from(leadSplit?.chars ?? [], {
      stagger: 0.01,
      opacity: 0,
      scale: 2,
    })
    .from(
      titleSplit?.words ?? [],
      {
        stagger: 0.3,
        x: -100,
        opacity: 0,
      },
      0,
    )
    .from(
      linkSplit?.chars ?? [],
      {
        stagger: 0.12,
        y: 100,
        opacity: 0,
      },
      1,
    )
    .from(
      kickerSplit?.chars ?? [],
      {
        opacity: 0,
        stagger: 0.12,
        y: -20,
        scale: 1.2,
      },
      "-=1",
    );
}

// Reveal del bloque principal de boxes con scroll y pin.
function initBoxSectionAnimation() {
  const box = document.querySelector(".box");
  const boxesSection = document.querySelector(".boxes");
  const boxesContainer = document.querySelector(".boxes-container");

  if (!box || !boxesSection || !boxesContainer) {
    return;
  }

  gsap
    .timeline({
      scrollTrigger: {
        trigger: boxesContainer,
        start: "bottom bottom",
        end: `+=${boxesSection.offsetHeight}`,
        toggleActions: "play none none reverse",
        pin: ".boxes-container",
      },
    })
    .from(box, {
      duration: 0.75,
      opacity: 0,
      x: -100,
    })
    .to(
      box,
      {
        duration: 0.75,
        ease: "none",
        clipPath: "inset(0% 0% 0% 0% round 12px)",
      },
      "-=0.6",
    )
    .to(".box-inner", {
      opacity: 1,
    });
}

// Entrada escalonada de las tarjetas superpuestas de la derecha.
function initStackedCardsAnimation() {
  const boxesSection = document.querySelector(".boxes");
  if (!boxesSection) {
    return;
  }

  const cards = gsap.utils.toArray(".box-t");
  const section = Math.round(boxesSection.offsetHeight / 3.4);

  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      ease: "none",
      x: "100%",
      scrollTrigger: {
        trigger: card,
        start: `center+=${section * index} center`,
        end: `${card.offsetHeight}`,
        scrub: 2,
      },
    });
  });
}

// Punto unico de inicializacion: mantiene el orden de animaciones.
function initAnimations() {
  const introTimeline = buildIntroTimeline();
  const heroTitleTimeline = buildHeroTitleTimeline();
  introTimeline.add(heroTitleTimeline);

  const panelIntroTimeline = initPanelAnimations();

  initAgendaAnimation();
  initHorizontalPanelScroll(panelIntroTimeline);
  initHeroAmbientAnimation();
  initNarrativeAnimation();
  initBoxSectionAnimation();
  initStackedCardsAnimation();
}

// Arranque de toda la experiencia visual.
initAnimations();
