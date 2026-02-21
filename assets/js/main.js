// ===================================================
// PORTAFOLIO - ANDRÉS GÓMEZ
// main.js — Funcionalidades principales
// ===================================================

// ===== CURSOR PERSONALIZADO =====
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

const handleMouseMove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
};

// El follower va con un pequeño delay (suavizado)
const animateFollower = () => {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
};

document.addEventListener("mousemove", handleMouseMove);
animateFollower();

// Efecto en links y botones
const interactiveElements = document.querySelectorAll(
  "a, button, .skill-tag, .hobby-card, .social-icon",
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    cursorFollower.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    cursorFollower.classList.remove("active");
  });
});

// ===== NAVBAR: scroll + hamburger =====
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

// Clase scrolled cuando el usuario hace scroll
const handleScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Botón back-to-top
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
};

window.addEventListener("scroll", handleScroll);

// Abrir/cerrar menú hamburguesa
const handleHamburgerClick = () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen.toString());

  // Bloquear scroll del body cuando el menú está abierto
  document.body.style.overflow = isOpen ? "hidden" : "";
};

const handleHamburgerKeyDown = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleHamburgerClick();
  }
};

hamburger.addEventListener("click", handleHamburgerClick);
hamburger.addEventListener("keydown", handleHamburgerKeyDown);

// Cerrar menú al hacer click en un link
const navLinks = document.querySelectorAll(".navbar__link, .navbar__cv-btn");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById("typewriter");

const roles = [
  "Desarrollador Front-End",
  "Ingeniero Electrónico",
  "Aprendiz eterno 👨‍💻",
  "React en progreso ⚛️",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

const typeWriter = () => {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Escribiendo
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      // Pausa al terminar de escribir
      isDeleting = true;
      typewriterTimeout = setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    // Borrando
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typewriterTimeout = setTimeout(typeWriter, 400);
      return;
    }
  }

  const speed = isDeleting ? 60 : 90;
  typewriterTimeout = setTimeout(typeWriter, speed);
};

// Iniciar el efecto
typeWriter();

// ===== REVEAL ON SCROLL (Intersection Observer) =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const handleReveal = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Para las barras de skills: animar el fill
      const fills = entry.target.querySelectorAll(".skill-item__fill");
      fills.forEach((fill) => {
        const targetWidth = fill.getAttribute("data-width");
        // Pequeño delay para que se vea bonito
        setTimeout(() => {
          fill.style.width = targetWidth + "%";
        }, 200);
      });

      // Una vez visible, no necesita seguir observándose
      revealObserver.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(
  handleReveal,
  revealObserverOptions,
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById("back-to-top");

const handleBackToTopClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleBackToTopKeyDown = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleBackToTopClick();
  }
};

backToTopBtn.addEventListener("click", handleBackToTopClick);
backToTopBtn.addEventListener("keydown", handleBackToTopKeyDown);

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const submitBtn = document.getElementById("btn-submit");

// Contador de caracteres del textarea
const mensajeInput = document.getElementById("mensaje");
const counterEl = document.getElementById("counter-mensaje");
const MAX_CHARS = 300;

const handleMensajeInput = () => {
  const remaining = MAX_CHARS - mensajeInput.value.length;
  counterEl.textContent = `${remaining} caracteres restantes`;

  if (remaining < 0) {
    counterEl.style.color = "#ff4d4d";
  } else if (remaining < 50) {
    counterEl.style.color = "#ffc800";
  } else {
    counterEl.style.color = "";
  }
};

mensajeInput.addEventListener("input", handleMensajeInput);

// Validaciones
const validators = {
  nombre: (value) => {
    if (!value.trim()) return "El nombre es obligatorio.";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
      return "Solo se permiten letras y acentos.";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "El correo es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Ingresa un correo válido.";
    return "";
  },
  asunto: (value) => {
    if (!value.trim()) return "El asunto es obligatorio.";
    if (value.trim().length < 3)
      return "El asunto debe tener al menos 3 caracteres.";
    return "";
  },
  mensaje: (value) => {
    if (!value.trim()) return "El mensaje es obligatorio.";
    if (value.trim().length < 10)
      return "El mensaje debe tener al menos 10 caracteres.";
    if (value.length > MAX_CHARS) return `Máximo ${MAX_CHARS} caracteres.`;
    return "";
  },
};

// Mostrar/ocultar error de un campo
const showFieldError = (fieldId, message) => {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`error-${fieldId}`);

  if (message) {
    input.classList.add("error");
    errorEl.textContent = message;
  } else {
    input.classList.remove("error");
    errorEl.textContent = "";
  }
};

// Validar un campo en tiempo real (al salir del campo)
const handleFieldBlur = (e) => {
  const fieldId = e.target.id;
  if (validators[fieldId]) {
    const error = validators[fieldId](e.target.value);
    showFieldError(fieldId, error);
  }
};

// Añadir validación en blur a los campos
["nombre", "email", "asunto", "mensaje"].forEach((fieldId) => {
  const input = document.getElementById(fieldId);
  if (input) {
    input.addEventListener("blur", handleFieldBlur);
    // Limpiar error al escribir
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        input.classList.remove("error");
        document.getElementById(`error-${fieldId}`).textContent = "";
      }
    });
  }
});

// Envío del formulario
const handleFormSubmit = (e) => {
  e.preventDefault();

  const fields = ["nombre", "email", "asunto", "mensaje"];
  let isValid = true;

  // Validar todos los campos
  fields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    const error = validators[fieldId](input.value);
    showFieldError(fieldId, error);
    if (error) isValid = false;
  });

  if (!isValid) return;

  // Simular envío (aquí conectarías tu backend o EmailJS)
  const btnText = submitBtn.querySelector(".btn-text");
  const btnIcon = submitBtn.querySelector("i");

  submitBtn.disabled = true;
  btnText.textContent = "Enviando...";
  btnIcon.className = "fas fa-spinner fa-spin";

  // Simulación de delay de envío
  setTimeout(() => {
    contactForm.reset();
    counterEl.textContent = `${MAX_CHARS} caracteres restantes`;
    counterEl.style.color = "";

    formSuccess.classList.add("visible");
    submitBtn.disabled = false;
    btnText.textContent = "Enviar mensaje";
    btnIcon.className = "fas fa-paper-plane";

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      formSuccess.classList.remove("visible");
    }, 5000);
  }, 1500);
};

contactForm.addEventListener("submit", handleFormSubmit);

// ===== CERRAR MENÚ CON ESCAPE =====
const handleKeyDown = (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    hamburger.focus();
  }
};

document.addEventListener("keydown", handleKeyDown);

// ===== LINK ACTIVO EN NAVBAR AL HACER SCROLL =====
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".navbar__link");

const handleActiveLink = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  allNavLinks.forEach((link) => {
    link.style.color = "";
    const href = link.getAttribute("href").replace("#", "");
    if (href === currentSection) {
      link.style.color = "var(--color-primary)";
    }
  });
};

window.addEventListener("scroll", handleActiveLink);

// Inicializar el estado del scroll al cargar
handleScroll();
handleActiveLink();

// ===== EFECTO DUNA AZUL INTERACTIVO (OPTIMIZADO) =====
const heroBg = document.querySelector(".hero__bg");
const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
let duneX = 50;
let duneY = 50;
let targetX = 50;
let targetY = 50;
let isHeroVisible = false;
let duneAnimationId = null;
let lastMouseMoveTime = 0;
const MOUSEMOVE_THROTTLE = 16; // ~60fps

// Detectar si estamos en un dispositivo móvil o táctil
const isTouchDevice = () => {
  return (
    (navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 2 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

// Detener animación si estamos en móvil
if (isMobileDevice || isTouchDevice()) {
  console.log("🚀 Duna interactiva desactivada en dispositivo móvil");
} else {
  // Throttle del mousemove para mejorar rendimiento
  const handleDuneMouseMove = (e) => {
    const now = Date.now();
    if (now - lastMouseMoveTime < MOUSEMOVE_THROTTLE) return;
    lastMouseMoveTime = now;

    // Calcular posición del mouse como porcentaje
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  };

  const animateDuneGradient = () => {
    // Solo animar si el hero está visible en viewport
    if (!isHeroVisible) {
      duneAnimationId = requestAnimationFrame(animateDuneGradient);
      return;
    }

    // Suavizar movimiento (easing)
    duneX += (targetX - duneX) * 0.02;
    duneY += (targetY - duneY) * 0.02;

    if (heroBg) {
      heroBg.style.backgroundImage = `
        radial-gradient(ellipse 800px 300px at ${duneX * 0.8}% ${
          duneY * 0.6
        }%, rgba(46, 43, 255, 0.15) 0%, transparent 40%),
        radial-gradient(ellipse 900px 400px at ${100 - duneX * 0.7}% ${
          100 - duneY * 0.5
        }%, rgba(46, 43, 255, 0.12) 0%, transparent 50%),
        radial-gradient(ellipse 700px 350px at ${duneX}% ${duneY}%, rgba(46, 43, 255, 0.08) 0%, transparent 60%)
      `;
    }

    duneAnimationId = requestAnimationFrame(animateDuneGradient);
  };

  // Intersection Observer para activar/desactivar duna cuando entra en viewport
  const duneObserverOptions = {
    threshold: 0.1,
  };

  const handleDuneIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isHeroVisible = true;
      } else {
        isHeroVisible = false;
      }
    });
  };

  const duneObserver = new IntersectionObserver(
    handleDuneIntersection,
    duneObserverOptions,
  );

  if (heroBg && heroBg.parentElement) {
    duneObserver.observe(heroBg.parentElement);
  }

  // Iniciar animación solo en desktop/no móvil
  document.addEventListener("mousemove", handleDuneMouseMove);
  animateDuneGradient();
  console.log("✨ Duna interactiva optimizada activada");
}
