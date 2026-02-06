import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./styles.css";

const BRAND = {
  name: "Axon Web Studio",
  tagline: "Webs rápidas y apps a medida", 
  city: "Valencia",
  country: "España",
  email: "marcostomascampos@gmail.com",
  phoneDisplay: "+34 646 737 527",
  phoneWa: "34646737527", // sin + y sin espacios. Ej: 34600111222
  domain: "", // opcional (si tienes dominio, ponlo aquí)
};

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function useMotion() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
  };

  const inView = {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.22, margin: "-40px" },
    variants: fadeUp,
  };

  return { reduce, fadeUp, stagger, inView };
}

function Button({ as = "a", className, ...props }) {
  const Comp = as;
  return <Comp className={cn("btn", className)} {...props} />;
}

function Section({ id, alt, narrow, title, subtitle, children }) {
  const m = useMotion();

  return (
    <section
      id={id}
      className={cn("section", alt && "section--alt")}
      aria-label={title}
    >
      <div className={cn("container", narrow && "container--narrow")}>
        <motion.header className="section__header" {...m.inView}>
          <h2>{title}</h2>
          {subtitle ? <p className="section__sub">{subtitle}</p> : null}
        </motion.header>

        {/* Keep scroll animations lightweight: only animate the header by default */}
        <div>
          {children}
        </div>
      </div>
    </section>
  );
}

function Header({ onNav }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      const menu = document.querySelector("#menu");
      const toggle = document.querySelector(".nav__toggle");
      if (!menu || !toggle) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <header className={cn("header header--float", scrolled && "is-scrolled")}>
      <div className="container header__inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Ir al inicio"
          onClick={() => onNav?.("inicio")}
        >
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">{BRAND.name}</span>
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span className="nav__toggleLines" aria-hidden="true" />
            <span className="sr-only">Abrir menú</span>
          </button>

          <ul
            id="menu"
            className={cn("nav__menu", open && "is-open")}
            onClick={(e) => {
              if (e.target?.closest?.("a")) setOpen(false);
            }}
          >
            <li><a className="nav__link" href="#servicios">Servicios</a></li>
            <li><a className="nav__link" href="#proyectos">Proyectos</a></li>
            <li><a className="nav__link" href="#proceso">Proceso</a></li>
            <li><a className="nav__link" href="#equipo">Equipo</a></li>
            <li><a className="nav__link" href="#faq">FAQ</a></li>
            <li>
              <a
                className="nav__cta"
                href={`https://wa.me/${BRAND.phoneWa}?text=${encodeURIComponent("Hola, quiero presupuesto para una web/app.")}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const m = useMotion();

  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <motion.div
          className="hero__copy"
          variants={m.stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="pill" variants={m.fadeUp}>
            {BRAND.city} · Toda {BRAND.country} · Presupuesto en 24h
          </motion.p>
          <motion.h1 variants={m.fadeUp}>
            Desarrollo web y apps a medida para captar clientes
          </motion.h1>
          <motion.p className="lead" variants={m.fadeUp}>
            Creamos webs rápidas, modernas y orientadas a convertir: desde landings hasta aplicaciones web complejas.
            Diseño + desarrollo + mantenimiento, sin líos.
          </motion.p>
          <motion.div className="hero__actions" variants={m.fadeUp}>
            <Button className="btn--primary" href="#contacto">Pedir presupuesto</Button>
            <Button className="btn--ghost" href="#proyectos">Ver proyectos</Button>
          </motion.div>
          <motion.ul className="trust" variants={m.fadeUp}>
            <li>Respuesta &lt; 24h</li>
            <li>Plazos realistas</li>
            <li>Soporte y evolución</li>
          </motion.ul>
        </motion.div>

        <motion.div className="hero__card" aria-label="Resumen de servicios" {...m.inView}>
          <div className="card">
            <img
              className="heroPhoto"
              src="/hero.jpg"
              alt="Equipo trabajando en un proyecto digital"
              loading="lazy"
            />
            <h2 className="card__title">Lo que entregamos</h2>
            <ul className="checklist">
              <li>Web optimizada (Core Web Vitals)</li>
              <li>SEO técnico + on-page</li>
              <li>Analítica (GA4/Matomo) y eventos</li>
              <li>Formularios + WhatsApp</li>
              <li>Seguridad y backups</li>
            </ul>
            <p className="muted">*Adaptamos la propuesta a tu caso (pyme, clínica, inmobiliaria, startup…).</p>
          </div>
        </motion.div>
      </div>

      <motion.div className="container logos" aria-label="Tecnologías" {...m.inView}>
        <p className="logos__label">Trabajamos con:</p>
        <div className="logos__row">
          <span className="chip">HTML/CSS/JS</span>
          <span className="chip">React / Next.js</span>
          <span className="chip">Node.js</span>
          <span className="chip">APIs</span>
          <span className="chip">WordPress (si encaja)</span>
          <span className="chip">SEO</span>
        </div>
      </motion.div>
    </section>
  );
}

function Services() {
  const m = useMotion();

  return (
    <Section
      id="servicios"
      title="Servicios"
      subtitle={`Web, apps y software a medida desde ${BRAND.city} para toda ${BRAND.country}.`}
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="box" variants={m.fadeUp}>
          <h3>Diseño y desarrollo web</h3>
          <p>Web corporativa, landing pages y e-commerce. Rápidas, accesibles y listas para posicionar.</p>
          <ul className="mini">
            <li>Arquitectura de contenidos</li>
            <li>Copy + estructura de conversión</li>
            <li>Optimización de velocidad</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Aplicaciones web</h3>
          <p>Paneles de administración, CRMs, automatizaciones, integraciones y productos tipo SaaS.</p>
          <ul className="mini">
            <li>Roles y permisos</li>
            <li>Integración con herramientas</li>
            <li>APIs seguras</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Mantenimiento y mejora</h3>
          <p>Actualizaciones, seguridad, copias de seguridad, monitorización y mejoras continuas.</p>
          <ul className="mini">
            <li>Soporte</li>
            <li>Backups y recuperación</li>
            <li>Roadmap mensual</li>
          </ul>
        </motion.article>
      </motion.div>

      <motion.div
        className="ctaBand"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={m.fadeUp}
      >
        <div>
          <h3>¿Buscas una web que te traiga clientes?</h3>
          <p className="muted">Te decimos qué haríamos en tu caso y cuánto tardaríamos.</p>
        </div>
        <div className="ctaBand__right">
          <img className="sectionPhoto" src="/sections/services.jpg" alt="" loading="lazy" />
          <Button className="btn--primary" href="#contacto">Hablar con el equipo</Button>
        </div>
      </motion.div>
    </Section>
  );
}

function Projects() {
  const m = useMotion();

  return (
    <Section
      id="proyectos"
      alt
      title="Proyectos"
      subtitle="Plantillas de caso para que los sustituyas por vuestros proyectos reales."
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/projects.jpg" alt="" loading="lazy" />
          <div className="case__top">
            <h3>Web corporativa + captación</h3>
            <p className="muted">Objetivo: generar leads</p>
          </div>
          <ul className="case__list">
            <li>Landing orientada a conversión</li>
            <li>SEO on-page + velocidad</li>
            <li>Formulario + WhatsApp</li>
          </ul>
          <p className="case__result"><strong>Resultado:</strong> + conversiones (sustituir por dato real)</p>
        </motion.article>

        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/projects.jpg" alt="" loading="lazy" />
          <div className="case__top">
            <h3>Aplicación web / panel</h3>
            <p className="muted">Objetivo: ahorrar tiempo</p>
          </div>
          <ul className="case__list">
            <li>Automatización de procesos</li>
            <li>Roles y permisos</li>
            <li>Integración con APIs</li>
          </ul>
          <p className="case__result"><strong>Resultado:</strong> menos tareas manuales</p>
        </motion.article>

        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/projects.jpg" alt="" loading="lazy" />
          <div className="case__top">
            <h3>E-commerce / catálogo</h3>
            <p className="muted">Objetivo: vender online</p>
          </div>
          <ul className="case__list">
            <li>Checkout y pagos</li>
            <li>Catálogo optimizado</li>
            <li>Tracking de conversiones</li>
          </ul>
          <p className="case__result"><strong>Resultado:</strong> mejor experiencia de compra</p>
        </motion.article>
      </motion.div>
    </Section>
  );
}

function Process() {
  return (
    <Section
      id="proceso"
      title="Proceso"
      subtitle="Así trabajamos para que sepas qué pasa en cada fase."
    >
      <ol className="steps">
        <li>
          <h3>Brief y objetivos</h3>
          <p>Entendemos tu negocio, tus clientes y lo que quieres conseguir.</p>
        </li>
        <li>
          <h3>Propuesta y alcance</h3>
          <p>Definimos entregables, plazos y un presupuesto claro (sin sorpresas).</p>
        </li>
        <li>
          <h3>Diseño y estructura</h3>
          <p>Wireframes / prototipo. Copy y flujo orientado a conversión.</p>
        </li>
        <li>
          <h3>Desarrollo</h3>
          <p>Iteramos por hitos. Revisiones rápidas y comunicación directa.</p>
        </li>
        <li>
          <h3>Publicación y medición</h3>
          <p>SEO técnico, analítica, eventos y seguimiento de resultados.</p>
        </li>
        <li>
          <h3>Mantenimiento</h3>
          <p>Actualizaciones, mejoras y evolución del producto.</p>
        </li>
      </ol>
    </Section>
  );
}

function Team() {
  const m = useMotion();

  return (
    <Section
      id="equipo"
      alt
      title="Sobre el equipo"
      subtitle={`Somos un equipo técnico, cercano y orientado a resultados. Trabajamos desde ${BRAND.city} y damos servicio a toda ${BRAND.country}.`}
    >
      <motion.div
        className="grid grid--2"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="box" variants={m.fadeUp}>
          <img className="sectionPhoto" src="/sections/team.jpg" alt="" loading="lazy" />
          <h3>Lo que valoran nuestros clientes</h3>
          <ul className="mini">
            <li>Comunicación clara</li>
            <li>Calidad y orden</li>
            <li>Velocidad (en la web y en la ejecución)</li>
            <li>Enfoque negocio (no “features por hacer”)</li>
          </ul>
        </motion.div>
        <motion.div className="box" variants={m.fadeUp}>
          <h3>Áreas</h3>
          <ul className="mini">
            <li>Front-end y UX</li>
            <li>Back-end y APIs</li>
            <li>Bases de datos</li>
            <li>DevOps básico (deploy, backups, monitorización)</li>
          </ul>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" narrow title="FAQ" subtitle="Respuestas rápidas a lo que más nos preguntan.">
      <div className="faq">
        <details>
          <summary>¿Cuánto cuesta una web?</summary>
          <p>
            Depende del alcance. Podemos trabajar por proyecto (presupuesto cerrado) o con una bolsa de
            horas/mantenimiento mensual.
          </p>
        </details>
        <details>
          <summary>¿En cuánto tiempo estará lista?</summary>
          <p>
            Una landing sencilla puede estar en 1–2 semanas; una web completa suele ser 3–6 semanas. Las
            aplicaciones dependen de módulos.
          </p>
        </details>
        <details>
          <summary>¿Incluye SEO?</summary>
          <p>
            Incluimos SEO técnico y on-page básico (estructura, metadatos, rendimiento). Si quieres
            posicionamiento continuo, lo planteamos como servicio mensual.
          </p>
        </details>
        <details>
          <summary>¿Hacéis mantenimiento?</summary>
          <p>Sí: actualizaciones, seguridad, backups, monitorización y mejoras.</p>
        </details>
      </div>
    </Section>
  );
}

function Contact() {
  const [note, setNote] = useState("");

  const waLink = useMemo(() => {
    const text = encodeURIComponent("Hola, quiero presupuesto para una web/app.");
    return `https://wa.me/${BRAND.phoneWa}?text=${text}`;
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = (fd.get("name") || "").toString().trim();
    const company = (fd.get("company") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    const subject = encodeURIComponent(`Nuevo contacto web — ${name}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        company ? `Empresa: ${company}` : null,
        `Email: ${email}`,
        phone ? `Tel: ${phone}` : null,
        "",
        "Mensaje:",
        message,
      ]
        .filter(Boolean)
        .join("\n")
    );

    setNote("Abriendo tu email para enviar el mensaje…");
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      e.currentTarget.reset();
      setNote(`Si no se abrió tu cliente de correo, escríbenos a ${BRAND.email}.`);
    }, 1200);
  }

  return (
    <Section
      id="contacto"
      alt
      title="Contacto"
      subtitle="Cuéntanos qué necesitas (web/app, plazo y objetivo) y te respondemos con una propuesta."
    >
      <div className="grid grid--2">
        <form className="form" onSubmit={onSubmit}>
          <label>
            Nombre
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Empresa (opcional)
            <input name="company" type="text" autoComplete="organization" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Teléfono (opcional)
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            ¿Qué quieres conseguir?
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Ej: necesito una web para captar clientes en Valencia..."
            />
          </label>

          <div className="form__row">
            <Button as="button" className="btn--primary" type="submit">Enviar</Button>
            <Button className="btn--ghost" href={waLink} target="_blank" rel="noreferrer">
              WhatsApp
            </Button>
          </div>

          <p className="muted small">
            Al enviar aceptas la política de privacidad. (Pendiente de poner la página/legal definitivo)
          </p>

          <p className="form__note" aria-live="polite">{note}</p>
        </form>

        <aside className="box">
          <img className="sectionPhoto" src="/sections/contact.jpg" alt="" loading="lazy" />
          <h3>Zona de trabajo</h3>
          <p>
            Estamos en <strong>{BRAND.city}</strong> y trabajamos también en remoto para <strong>toda {BRAND.country}</strong>.
          </p>
          <ul className="mini">
            <li>Reunión inicial: 30–45 min</li>
            <li>Presupuesto claro y por escrito</li>
            <li>Entregas por hitos</li>
          </ul>

          <div className="divider" />

          <h3>Datos</h3>
          <p className="muted small">
            Email: {BRAND.email}
            <br />
            Tel: {BRAND.phoneDisplay}
          </p>
        </aside>
      </div>
    </Section>
  );
}

function SponsorsMarquee() {
  // Nota: usamos iconos SVG open-source (Simple Icons). Algunas marcas (ej. Vicio, ChatGPT)
  // puede que no tengan icono oficial aquí: en ese caso mostramos texto.
  const sponsors = [
    { name: "Vercel", logo: "/brands/vercel.svg" },
    { name: "GitHub", logo: "/brands/github.svg" },
    { name: "React", logo: "/brands/react.svg" },
    { name: "Node.js", logo: "/brands/nodejs.svg" },
    { name: "Next.js", logo: "/brands/nextjs.svg" },
    { name: "Figma", logo: "/brands/figma.svg" },
    { name: "Google Analytics", logo: "/brands/ga.svg" },
    { name: "VS Code" },

    { name: "Coca‑Cola", logo: "/brands/cocacola.svg" },
    { name: "Revolut", logo: "/brands/revolut.svg" },
    { name: "Vicio" },
    { name: "Twitch", logo: "/brands/twitch.svg" },
    { name: "YouTube", logo: "/brands/youtube.svg" },
    { name: "Kick", logo: "/brands/kick.svg" },
    { name: "Instagram", logo: "/brands/instagram.svg" },
    { name: "ChatGPT" },
  ];

  const base = sponsors.filter((s) => s.logo);
  // Repeat logos so the strip is always wider than the viewport (prevents blank gaps on large screens)
  const strip = Array.from({ length: 5 }, () => base).flat();

  return (
    <section className="sponsors" aria-label="Sponsors y colaboradores">
      <div className="sponsors__viewport">
        {/* Two identical strips, shifted by 100% + gap. */}
        <div className="sponsors__group" aria-hidden="true">
          {strip.map((s, idx) => (
            <div
              key={`a-${s.name}-${idx}`}
              className="sponsors__item"
              title={s.name}
              aria-label={s.name}
              role="img"
            >
              <img className="sponsors__logo" src={s.logo} alt={s.name} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="sponsors__group" aria-hidden="true">
          {strip.map((s, idx) => (
            <div
              key={`b-${s.name}-${idx}`}
              className="sponsors__item"
              title={s.name}
              aria-label={s.name}
              role="img"
            >
              <img className="sponsors__logo" src={s.logo} alt={s.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="brand brand--footer">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">{BRAND.name}</span>
          </div>
          <p className="muted small">{BRAND.tagline} · {BRAND.city} / {BRAND.country}</p>
        </div>

        <div className="footer__links">
          <a href="#">Aviso legal</a>
          <a href="#">Privacidad</a>
          <a href="#">Cookies</a>
        </div>

        <div className="footer__copy muted small">© {year} {BRAND.name}. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = `Desarrollo web y apps en ${BRAND.city} | ${BRAND.name}`;
  }, []);

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <div className="page">
        <main id="contenido">
          <Hero />
          <SponsorsMarquee />
          <Services />
          <Projects />
          <Process />
          <Team />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
