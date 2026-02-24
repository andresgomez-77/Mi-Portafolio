# Andrés Felipe Gómez Pinzón — Portafolio Personal

> Portafolio profesional desarrollado con React, TypeScript y Vite. Diseñado para comunicar de forma clara mi perfil técnico, experiencia y proyectos a equipos de selección y colaboradores potenciales.

 **Demo en producción:** [mi-portafolio.vercel.app](https://mi-portafolio.vercel.app)

---

## Sobre el proyecto

Este portafolio nació con un objetivo concreto: tener un espacio propio donde presentar mi trabajo de manera honesta y ordenada, sin depender de plataformas de terceros. Cada sección fue pensada para responder las preguntas que normalmente hace un reclutador técnico: quién soy, qué sé hacer, qué he construido y cómo contactarme.

El diseño apunta a un estilo técnico oscuro con detalles en ámbar, inspirado en interfaces de desarrollo real. No es una plantilla, cada componente fue escrito desde cero con atención al detalle y a la experiencia de usuario.

---

## Stack tecnológico

| Capa        | Tecnología                        |
| ----------- | --------------------------------- |
| Framework   | React 18 + TypeScript             |
| Build tool  | Vite                              |
| UI Library  | Material UI (MUI v5)              |
| Animaciones | Framer Motion                     |
| Estilos     | MUI sx + tokens de diseño propios |
| Deploy      | Vercel                            |

---

## Estructura del proyecto

```
portafolio-andres/
├── public/
│   └── assets/
│       ├── doc/          # CV descargable
│       └── img/          # Imágenes de proyectos y logos
└── src/
    ├── components/
    │   ├── layout/       # Navbar, Footer
    │   ├── sections/     # Hero, About, Experience, Skills, Projects, Education, Contact
    │   └── ui/           # Componentes reutilizables (SkillBar, ProjectCard, TerminalWidget...)
    ├── data/             # portfolioData.ts — toda la información personal centralizada
    ├── hooks/            # useTypewriter, useInView, useCountUp, useForm
    ├── pages/            # HomePage
    ├── theme/            # Tokens de diseño: colores, tipografía, sombras
    └── types/            # Tipos TypeScript compartidos
```

---

## Características

**Terminal animada en el Hero** — simula una sesión de bash que presenta el perfil técnico de forma interactiva: nombre, rol, stack principal y estado de disponibilidad. Escrita desde cero sin librerías externas.

**Contador de visitas en tiempo real** — registra visitas totales y del día usando almacenamiento persistente compartido. Los datos se acumulan entre sesiones sin necesidad de un backend dedicado.

**Navbar con detección de sección activa** — el indicador numérico de cada enlace aparece únicamente al hacer hover o cuando la sección correspondiente está en pantalla, evitando ruido visual innecesario.

**Timeline de experiencia alternada** — en escritorio, las tarjetas de experiencia se distribuyen a izquierda y derecha del eje central. En mobile, colapsan en una línea vertical limpia.

**Cards de proyectos con efecto tilt 3D** — al mover el cursor sobre una tarjeta, esta responde con una leve rotación en perspectiva calculada en tiempo real con `useMotionValue` y `useSpring` de Framer Motion.

**Formulario de contacto con validación** — cada campo valida en tiempo real una vez que el usuario lo ha tocado. El estado del formulario transiciona entre idle, loading, success y error con animaciones de entrada y salida.

**Diseño completamente responsivo** — probado en mobile (iPhone XR), tablet y escritorio. El layout se adapta con breakpoints de MUI sin romper ninguna sección.

---

## Secciones

- **Hero** — presentación principal con typewriter, terminal animada y contador de visitas
- **Sobre mí** — descripción profesional, foto y estadísticas clave
- **Experiencia** — timeline con tarjetas de experiencia profesional y stack tecnológico por empresa
- **Skills** — barras de nivel animadas agrupadas por categoría con tabs
- **Proyectos** — grid filtrable con 6 proyectos: Encriptador de Texto, Juego del Ahorcado, Tienda Virtual, Conversor de Moneda, Hotel Alura y StarJeak Streaming
- **Formación académica** — timeline de estudios y certificaciones
- **Contacto** — formulario funcional con validación y enlaces directos

---

## Cómo ejecutar el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/andresgomez-77/Mi-Portafolio.git
cd Mi-Portafolio/portafolio-andres

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`.

```bash
# Compilar para producción
npm run build

# Previsualizar el build
npm run preview
```

---

## Personalización

Toda la información personal está centralizada en un único archivo:

```
src/data/portfolioData.ts
```

Desde allí se controlan el nombre, roles, descripción, experiencia, proyectos, formación y enlaces sociales. Modificar ese archivo es suficiente para actualizar el contenido en todo el sitio.

---

## Contacto

**Andrés Felipe Gómez Pinzón**
📧 andresgomez-77@hotmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/andresfgomezp/)
🐙 [GitHub](https://github.com/andresgomez-77)
📍 Colombia

---

<p align="center">Diseñado y desarrollado por Andrés Felipe Gómez Pinzón — 2025</p>
