import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

// WhatsApp CTAs removed

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
    // rAF-throttle scroll state updates to avoid re-rendering on every scroll event
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 8;
        setScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
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

        <div className="headerRight" aria-label="Zona derecha">
          {/* Dynamic island (moved to the right, includes status) */}
          <div className={cn("headerIsland", open && "is-open")} aria-label="Accesos rápidos">
            <div className="headerIsland__pill" aria-label="Estado y acciones rápidas">
              <span className="headerIsland__dot" aria-hidden="true" />
              <a className="headerIsland__label" href="#contacto">Disponible ahora</a>

              <div className="headerIsland__actions" aria-label="Acciones">
                <a className="islandBtn" href={`mailto:${BRAND.email}`} aria-label="Enviar email">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/>
                  </svg>
                </a>
                <a className="islandBtn" href={`tel:+${BRAND.phoneWa}`} aria-label="Llamar">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path fill="currentColor" d="M6.6 10.8c1.3 2.4 3.2 4.3 5.6 5.6l1.9-1.9c.2-.2.6-.3.9-.2 1 .3 2.1.5 3.2.5.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9C10.4 20.9 3.1 13.6 3.1 4.9c0-.5.4-.9.9-.9h3.4c.5 0 .9.4.9.9 0 1.1.2 2.2.5 3.2.1.3 0 .7-.2.9l-2 1.9Z"/>
                  </svg>
                </a>
                <a
                  className="islandBtn"
                  href={`https://wa.me/${BRAND.phoneWa}?text=${encodeURIComponent("Hola, quiero presupuesto")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  {/* WhatsApp original icon */}
                  <svg
                    className="waIcon"
                    viewBox="0 0 448 512"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438.7c-33.4 0-66.1-9-94.6-26.1l-6.8-4-69.8 18.3 18.6-68-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.9-185.8 184.9zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

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

          <AnimatePresence>
            {open ? (
              <motion.ul
                id="menu"
                className={cn("nav__menu", open && "is-open")}
                onClick={(e) => {
                  if (e.target?.closest?.("a")) setOpen(false);
                }}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <li><a className="nav__link" href="#auditoria">Auditoría</a></li>
                <li><a className="nav__link" href="#servicios">Servicios</a></li>
                <li><a className="nav__link" href="#proyectos">Proyectos</a></li>
                <li><a className="nav__link" href="#proceso">Proceso</a></li>
                <li><a className="nav__link" href="#equipo">Equipo</a></li>
                <li><a className="nav__link" href="#precios">Precios</a></li>
                <li><a className="nav__link" href="#faq">FAQ</a></li>
                <li>
                  <a className="nav__cta" href="#contacto">
                    Pedir presupuesto
                  </a>
                </li>
              </motion.ul>
            ) : null}
          </AnimatePresence>
          </nav>
        </div>
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
            Tu web debería traer clientes.
            <br />
            Si no lo hace, la optimizamos.
          </motion.h1>
          <motion.p className="lead" variants={m.fadeUp}>
            Para negocios que ya tienen web, pero no le sacan todo el rendimiento. Mejoramos velocidad, SEO técnico,
            conversión y medición para que empiece a generar contactos de forma constante.
          </motion.p>
          <motion.div className="hero__actions" variants={m.fadeUp}>
            <Button className="btn--primary" href="#auditoria">
              Quiero una auditoría
            </Button>
            <Button className="btn--ghost" href="#proyectos">Ver proyectos</Button>
          </motion.div>
          <motion.ul className="trust" variants={m.fadeUp}>
            <li>Diagnóstico claro</li>
            <li>Mejoras rápidas (quick wins)</li>
            <li>Tracking (GA4/Matomo + eventos)</li>
            <li>Mantenimiento y optimización</li>
          </motion.ul>
        </motion.div>

        <motion.div className="hero__card" aria-label="Resumen de servicios" {...m.inView}>
          <div className="iphoneFrame" aria-hidden="true">
            <img
              className="iphoneFrame__img"
              src="/iphone-14-pro-silver.svg"
              alt=""
              decoding="async"
              fetchpriority="high"
            />

            {/* Screen overlay: aligned to the SVG screen cutout */}
            <div className="iphoneFrame__screen">
              {/* status icons removed (already in the SVG mock) */}

              <div className="iphoneFrame__content">
                <h2 className="iosTitle">Lo que entregamos</h2>
                <ul className="iosList">
                  <li>Web optimizada (Core Web Vitals)</li>
                  <li>SEO técnico + on-page</li>
                  <li>Analítica (GA4/Matomo) y eventos</li>
                  <li>Formularios</li>
                  <li>Seguridad y backups</li>
                </ul>
                <p className="iosNote">
                  *Adaptamos la propuesta a tu caso (pyme, clínica, inmobiliaria, startup…).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="container logos" aria-label="Tecnologías" {...m.inView}>
        <p className="logos__label">Trabajamos con:</p>
        <div className="tech">
          <div className="tech__item">
            <img className="tech__icon" src="/tech/html5.svg" alt="HTML5" loading="lazy" decoding="async" />
            <span className="tech__label">HTML</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/tech/css3.svg" alt="CSS3" loading="lazy" decoding="async" />
            <span className="tech__label">CSS</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/tech/javascript.svg" alt="JavaScript" loading="lazy" decoding="async" />
            <span className="tech__label">JavaScript</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/brands/react.svg" alt="React" loading="lazy" decoding="async" />
            <span className="tech__label">React</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/brands/nextjs.svg" alt="Next.js" loading="lazy" decoding="async" />
            <span className="tech__label">Next.js</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/brands/nodejs.svg" alt="Node.js" loading="lazy" decoding="async" />
            <span className="tech__label">Node.js</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/tech/api.svg" alt="APIs" loading="lazy" decoding="async" />
            <span className="tech__label">APIs</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/tech/wordpress.svg" alt="WordPress" loading="lazy" decoding="async" />
            <span className="tech__label">WordPress</span>
          </div>
          <div className="tech__item">
            <img className="tech__icon" src="/tech/seo.svg" alt="SEO" loading="lazy" decoding="async" />
            <span className="tech__label">SEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Results() {
  const m = useMotion();

  return (
    <Section
      id="resultados"
      alt
      title="Resultados que importan"
      subtitle="No vendemos ‘páginas bonitas’. Diseñamos y desarrollamos para que el producto rinda y convierta."
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="box" variants={m.fadeUp}>
          <h3>Velocidad y rendimiento</h3>
          <p className="muted">Webs rápidas = mejor SEO + mejor conversión. Optimizamos Core Web Vitals desde el principio.</p>
          <ul className="mini">
            <li>Lazy-loading e imágenes optimizadas</li>
            <li>Bundle y CSS controlados</li>
            <li>Buenas prácticas de accesibilidad</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Conversión y claridad</h3>
          <p className="muted">Estructura, copy y CTAs pensados para guiar al usuario y generar contactos.</p>
          <ul className="mini">
            <li>Jerarquía visual premium</li>
            <li>CTAs con intención</li>
            <li>Fricción mínima (WhatsApp + formulario)</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Medición y mejora continua</h3>
          <p className="muted">Sin datos no hay decisiones. Dejamos eventos y analítica listos para iterar.</p>
          <ul className="mini">
            <li>GA4/Matomo + eventos</li>
            <li>Embudo y seguimiento</li>
            <li>Roadmap de mejoras</li>
          </ul>
        </motion.article>
      </motion.div>

      <div style={{ marginTop: 18 }}>
        <Button className="btn--primary" href="#contacto">
          Pedir presupuesto
        </Button>
      </div>
    </Section>
  );
}

function Symptoms() {
  const m = useMotion();

  return (
    <Section
      id="diagnostico"
      alt
      title="¿Tu web ya existe, pero no está dando resultados?"
      subtitle="Si tienes visitas pero no llegan contactos (o ni siquiera sabes cuántas), casi siempre hay oportunidades rápidas: velocidad, SEO técnico, conversión y medición."
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="box" variants={m.fadeUp}>
          <h3>Síntomas típicos</h3>
          <ul className="mini">
            <li>Pocas solicitudes / llamadas</li>
            <li>La gente entra y se va</li>
            <li>No se entiende la propuesta en 5 segundos</li>
            <li>En móvil se ve “regular”</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Lo que solemos encontrar</h3>
          <ul className="mini">
            <li>Core Web Vitals pobres (lento)</li>
            <li>SEO técnico sin resolver</li>
            <li>CTAs débiles / sin intención</li>
            <li>Formularios con fricción</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Cómo lo arreglamos</h3>
          <ul className="mini">
            <li>Auditoría + prioridades (quick wins)</li>
            <li>Implementación y QA</li>
            <li>Tracking (GA4/Matomo + eventos)</li>
            <li>Optimización mensual</li>
          </ul>
        </motion.article>
      </motion.div>

      <div style={{ marginTop: 16 }}>
        <Button className="btn--primary" href="#auditoria">Quiero una auditoría</Button>
        <Button className="btn--ghost" href="#contacto" style={{ marginLeft: 10 }}>Hablar con el equipo</Button>
      </div>
    </Section>
  );
}

function AuditOffer() {
  const m = useMotion();
  const [note, setNote] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = (fd.get("url") || "").toString().trim();
    const sector = (fd.get("sector") || "").toString().trim();
    const goal = (fd.get("goal") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();

    const subject = encodeURIComponent("Auditoría web — solicitud");
    const body = encodeURIComponent(
      [
        "Quiero una auditoría express.",
        "",
        `URL: ${url}`,
        sector ? `Sector: ${sector}` : null,
        goal ? `Objetivo: ${goal}` : null,
        email ? `Email de contacto: ${email}` : null,
      ].filter(Boolean).join("\n")
    );

    setNote("Abriendo tu email para solicitar la auditoría…");
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      e.currentTarget.reset();
      setNote(`Si no se abrió tu cliente de correo, escríbenos a ${BRAND.email}.`);
    }, 1200);
  }

  return (
    <Section
      id="auditoria"
      title="Auditoría express (para webs que no convierten)"
      subtitle="Te devolvemos un diagnóstico claro con prioridades: qué arreglar primero para conseguir más contactos con la misma web."
    >
      <div className="grid grid--2">
        <motion.form className="form" onSubmit={onSubmit} {...m.inView}>
          <label>
            URL de tu web
            <input name="url" type="url" placeholder="https://" required />
          </label>
          <label>
            Sector (opcional)
            <input name="sector" type="text" placeholder="Clínica, inmobiliaria, servicios, e‑commerce…" />
          </label>
          <label>
            ¿Qué quieres conseguir?
            <textarea name="goal" rows={4} placeholder="Ej: más llamadas, más leads, más reservas…" required />
          </label>
          <label>
            Email (para responderte)
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <div className="form__row">
            <Button as="button" className="btn--primary" type="submit">Solicitar auditoría</Button>
          </div>
          <p className="form__note" aria-live="polite">{note}</p>
        </motion.form>

        <motion.aside className="box" {...m.inView}>
          <h3>Qué revisamos</h3>
          <ul className="mini">
            <li>Velocidad (Core Web Vitals)</li>
            <li>SEO técnico (indexación, estructura, metadatos)</li>
            <li>Conversión (copy, CTAs, estructura)</li>
            <li>Tracking (GA4/Matomo + eventos)</li>
          </ul>
          <div className="divider" />
          <h3>Qué te llevas</h3>
          <ul className="mini">
            <li>Lista priorizada (quick wins)</li>
            <li>Estimación de esfuerzo/plazo</li>
            <li>Recomendación de mantenimiento</li>
          </ul>
        </motion.aside>
      </div>
    </Section>
  );
}

function Sectors() {
  const m = useMotion();

  return (
    <Section
      id="sectores"
      alt
      title="Esto funciona especialmente bien para…"
      subtitle="Negocios que ya tienen web, pero quieren que sea una máquina de captación."
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="box" variants={m.fadeUp}>
          <h3>Servicios locales</h3>
          <p className="muted">Fontaneros, clínicas, abogados, reformas, academias…</p>
          <ul className="mini">
            <li>SEO local + páginas de servicio</li>
            <li>WhatsApp/formulario sin fricción</li>
            <li>Medición de llamadas/leads</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>E‑commerce / catálogo</h3>
          <p className="muted">Tiendas pequeñas y medianas que quieren vender más.</p>
          <ul className="mini">
            <li>Rendimiento + UX en móvil</li>
            <li>Tracking de conversiones</li>
            <li>Optimización de fichas</li>
          </ul>
        </motion.article>

        <motion.article className="box" variants={m.fadeUp}>
          <h3>Marca personal / B2B</h3>
          <p className="muted">Consultores, agencias, estudios, SaaS…</p>
          <ul className="mini">
            <li>Propuesta clara + casos</li>
            <li>Captación por contenido</li>
            <li>Embudo y eventos</li>
          </ul>
        </motion.article>
      </motion.div>

      <div style={{ marginTop: 16 }}>
        <Button className="btn--primary" href="#auditoria">Quiero una auditoría</Button>
      </div>
    </Section>
  );
}

function Pricing() {
  const m = useMotion();

  return (
    <Section
      id="precios"
      title="Precios orientativos"
      subtitle="Rangos habituales para ayudarte a encajar alcance y prioridades. Cerramos presupuesto final tras un brief rápido."
    >
      <motion.div
        className="grid grid--4"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="priceCard" variants={m.fadeUp}>
          <div className="priceCard__top">
            <h3>Landing</h3>
            <p className="priceCard__price">700–1.200€</p>
            <p className="muted">Ideal para captar leads rápido.</p>
          </div>
          <ul className="mini">
            <li>Copy + estructura de conversión</li>
            <li>SEO on-page básico</li>
            <li>WhatsApp + eventos</li>
          </ul>
        </motion.article>

        <motion.article className="priceCard" variants={m.fadeUp}>
          <div className="priceCard__top">
            <h3>Web corporativa</h3>
            <p className="priceCard__price">1.400–2.800€</p>
            <p className="muted">Marca, confianza y posicionamiento.</p>
          </div>
          <ul className="mini">
            <li>5–8 secciones/páginas</li>
            <li>Rendimiento + accesibilidad</li>
            <li>Analítica lista</li>
          </ul>
        </motion.article>

        <motion.article className="priceCard priceCard--featured" variants={m.fadeUp}>
          <div className="priceCard__top">
            <h3>E‑commerce</h3>
            <p className="priceCard__price">2.500–6.000€</p>
            <p className="muted">Vender online con experiencia premium.</p>
          </div>
          <ul className="mini">
            <li>Catálogo + categorías</li>
            <li>Pagos/checkout (según plataforma)</li>
            <li>Tracking de conversiones</li>
          </ul>
        </motion.article>

        <motion.article className="priceCard" variants={m.fadeUp}>
          <div className="priceCard__top">
            <h3>Mantenimiento</h3>
            <p className="priceCard__price">120–350€/mes</p>
            <p className="muted">Soporte, mejoras y seguridad.</p>
          </div>
          <ul className="mini">
            <li>Actualizaciones + backups</li>
            <li>Mejoras continuas</li>
            <li>Monitorización básica</li>
          </ul>
        </motion.article>
      </motion.div>

      <p className="muted small" style={{ marginTop: 14 }}>
        *Los rangos dependen de integraciones, contenido, idioma y nivel de diseño. Si me dices objetivo y plazo,
        te doy una estimación cerrada.
      </p>

      <div style={{ marginTop: 14 }}>
        <Button className="btn--primary" href="#contacto">
          Pedir presupuesto
        </Button>
      </div>
    </Section>
  );
}

function Services() {
  const m = useMotion();

  return (
    <Section
      id="servicios"
      title="Servicios"
      subtitle="Descubre cómo marcamos la diferencia, de la idea al lanzamiento."
    >
      <motion.div
        className="grid grid--4"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="storyCard" variants={m.fadeUp}>
          <div className="storyCard__media">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Equipo revisando un portátil"
            />
            <span className="storyCard__badge">Implementación</span>
          </div>
          <div className="storyCard__body">
            <h3>Instalación y puesta en marcha</h3>
            <p>Configuramos entornos, despliegues y herramientas para dejar tu proyecto listo para producir desde el día uno.</p>
            <p className="storyCard__meta">1–3 días</p>
          </div>
        </motion.article>

        <motion.article className="storyCard" variants={m.fadeUp}>
          <div className="storyCard__media">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.pexels.com/photos/8867472/pexels-photo-8867472.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Soporte técnico revisando una pantalla"
            />
            <span className="storyCard__badge">Soporte</span>
          </div>
          <div className="storyCard__body">
            <h3>Mantenimiento y soporte</h3>
            <p>Monitorización, corrección de errores y mejoras continuas para mantener estabilidad, rendimiento y seguridad.</p>
            <p className="storyCard__meta">24–48h</p>
          </div>
        </motion.article>

        <motion.article className="storyCard" variants={m.fadeUp}>
          <div className="storyCard__media">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.pexels.com/photos/8154790/pexels-photo-8154790.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Planificación y actualizaciones"
            />
            <span className="storyCard__badge">Operación</span>
          </div>
          <div className="storyCard__body">
            <h3>Actualizaciones y contenidos</h3>
            <p>Actualizamos funcionalidades, contenidos y recursos digitales para que tu web, app y campañas estén siempre al día.</p>
            <p className="storyCard__meta">Semanal / mensual</p>
          </div>
        </motion.article>

        <motion.article className="storyCard" variants={m.fadeUp}>
          <div className="storyCard__media">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.pexels.com/photos/7013070/pexels-photo-7013070.png?auto=compress&cs=tinysrgb&w=1600"
              alt="Análisis y optimización"
            />
            <span className="storyCard__badge">Estrategia</span>
          </div>
          <div className="storyCard__body">
            <h3>Consultoría y optimización</h3>
            <p>Auditoría, roadmap y optimización (CRO/SEO/performance) para mejorar conversión, costes y crecimiento.</p>
            <p className="storyCard__meta">Mensual</p>
          </div>
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
          <h3>¿Te lo aterrizamos a tu caso?</h3>
          <p className="muted">Cuéntanos qué necesitas y te decimos el plan y el plazo.</p>
        </div>
        <div className="ctaBand__right">
          <img className="sectionPhoto" src="/sections/services.jpg" alt="" loading="lazy" decoding="async" />
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
      subtitle="Selección de trabajos reales y ejemplos de lo que podemos construir."
    >
      <motion.div
        className="grid grid--3"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/projects.jpg" alt="" loading="lazy" decoding="async" />
          <div className="case__top">
            <h3>Tienda de vinilos (Loopers)</h3>
            <p className="muted">Objetivo: ventas</p>
          </div>
          <ul className="case__list">
            <li>E-commerce en PHP/HTML/CSS/JS</li>
            <li>Catálogo + experiencia de compra</li>
            <li>Base para SEO + analítica</li>
          </ul>
          <p className="case__result"><strong>Enlace:</strong> <a href="https://loopers-ten.vercel.app/" target="_blank" rel="noreferrer">ver proyecto</a></p>
        </motion.article>

        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/team.jpg" alt="" loading="lazy" decoding="async" />
          <div className="case__top">
            <h3>Plataforma de entrenamiento cognitivo</h3>
            <p className="muted">Objetivo: ayudar a usuarios y cuidadores</p>
          </div>
          <ul className="case__list">
            <li>Ejercicios y contenidos guiados</li>
            <li>UX accesible y calmada</li>
            <li>Iteración con feedback real</li>
          </ul>
          <p className="case__result"><strong>Estado:</strong> privado (demo bajo solicitud)</p>
        </motion.article>

        <motion.article className="case" variants={m.fadeUp}>
          <img className="casePhoto" src="/sections/services.jpg" alt="" loading="lazy" decoding="async" />
          <div className="case__top">
            <h3>Landing de captación + SEO</h3>
            <p className="muted">Objetivo: leads cualificados</p>
          </div>
          <ul className="case__list">
            <li>Copy orientado a conversión</li>
            <li>Core Web Vitals + SEO técnico</li>
            <li>WhatsApp + eventos</li>
          </ul>
          <p className="case__result"><strong>Resultado:</strong> más contactos con menos fricción</p>
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
      subtitle="Un equipo técnico (de verdad) con mentalidad de producto: claridad, velocidad y foco en resultados."
    >
      <motion.div
        className="team"
        variants={m.stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article className="team__hero" variants={m.fadeUp}>
          <img className="team__photo" src="/sections/team.jpg" alt="" loading="lazy" decoding="async" />
          <div className="team__overlay">
            <h3>Trabajamos como si fuera nuestro</h3>
            <p className="muted">Sin humo. Sin entregas a medias. Con comunicación clara y un proceso que se entiende.</p>

            <ul className="team__bullets">
              <li>
                <span className="team__dot" aria-hidden="true" />
                <span><strong>Comunicación directa</strong> (sin intermediarios)</span>
              </li>
              <li>
                <span className="team__dot" aria-hidden="true" />
                <span><strong>Orden y calidad</strong> en el código y en el diseño</span>
              </li>
              <li>
                <span className="team__dot" aria-hidden="true" />
                <span><strong>Entrega rápida</strong> por hitos, con mejoras continuas</span>
              </li>
            </ul>
          </div>
        </motion.article>

        <motion.div className="team__cards" variants={m.fadeUp}>
          <article className="teamCard">
            <h3>Áreas</h3>
            <ul className="mini">
              <li>Front-end (React/Next) y UX</li>
              <li>Back-end, APIs y automatizaciones</li>
              <li>Base de datos y rendimiento</li>
              <li>DevOps básico (deploy, backups, monitorización)</li>
            </ul>
          </article>

          <article className="teamCard">
            <h3>Cómo trabajamos</h3>
            <ul className="mini">
              <li>Brief → objetivos → alcance</li>
              <li>Prototipo rápido + validación</li>
              <li>Desarrollo por sprints</li>
              <li>Entrega + analítica + optimización</li>
            </ul>
          </article>

          <article className="teamCard teamCard--accent">
            <h3>Lo que te llevas</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              Un producto rápido, medible y fácil de mantener.
            </p>
            <ul className="mini">
              <li>Checklist de lanzamiento</li>
              <li>Documentación mínima y útil</li>
              <li>Soporte real cuando lo necesitas</li>
            </ul>
          </article>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Faq() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setPrefersReduced(!!mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const animateHeight = (el, from, to) => {
    if (!el) return null;
    if (el._anim) el._anim.cancel();

    el.classList.add("is-animating");

    const anim = el.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      {
        duration: 240,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "both",
      }
    );

    el._anim = anim;
    const cleanup = () => {
      el._anim = null;
      el.classList.remove("is-animating");
    };
    anim.onfinish = cleanup;
    anim.oncancel = cleanup;

    return anim;
  };

  const toggleDetails = (detailsEl) => {
    if (!detailsEl) return;
    const content = detailsEl.querySelector(".faq__content");
    if (!content) return;

    if (prefersReduced) {
      detailsEl.open = !detailsEl.open;
      content.style.height = detailsEl.open ? "auto" : "0px";
      return;
    }

    const isOpen = detailsEl.open;

    if (isOpen) {
      // CLOSE: keep it open during animation, then close at the end.
      // Use scrollHeight to avoid forcing layout with getBoundingClientRect().
      const startH = content.scrollHeight;
      content.style.height = `${startH}px`;

      // Kick animation on next frame to let the browser apply the starting height.
      window.requestAnimationFrame(() => {
        const anim = animateHeight(content, startH, 0);
        if (!anim) return;
        anim.onfinish = () => {
          content.style.height = "0px";
          detailsEl.open = false;
          content._anim = null;
          content.classList.remove("is-animating");
        };
      });
      return;
    }

    // OPEN: set open first so content is measurable, then animate 0 -> full.
    detailsEl.open = true;

    // Start closed
    content.style.height = "0px";

    // Measure target
    const fullH = content.scrollHeight;

    window.requestAnimationFrame(() => {
      const anim = animateHeight(content, 0, fullH);
      if (!anim) return;
      anim.onfinish = () => {
        content.style.height = "auto";
        content._anim = null;
        content.classList.remove("is-animating");
      };
    });
  };

  const onFaqClickCapture = (e) => {
    const summary = e.target?.closest?.("summary");
    if (!summary) return;
    const details = summary.closest("details");
    if (!details) return;

    // Prevent native <details> toggle (which skips close animation because it hides content immediately)
    e.preventDefault();

    toggleDetails(details);
  };

  return (
    <Section id="faq" narrow title="FAQ" subtitle="Respuestas rápidas a lo que más nos preguntan.">
      <div className="faq" onClickCapture={onFaqClickCapture}>
        <details>
          <summary>¿Cuánto cuesta una web?</summary>
          <div className="faq__content">
            <p>
              Depende del alcance. Podemos trabajar por proyecto (presupuesto cerrado) o con una bolsa de
              horas/mantenimiento mensual.
            </p>
          </div>
        </details>
        <details>
          <summary>¿En cuánto tiempo estará lista?</summary>
          <div className="faq__content">
            <p>
              Una landing sencilla puede estar en 1–2 semanas; una web completa suele ser 3–6 semanas. Las
              aplicaciones dependen de módulos.
            </p>
          </div>
        </details>
        <details>
          <summary>¿Incluye SEO?</summary>
          <div className="faq__content">
            <p>
              Incluimos SEO técnico y on-page básico (estructura, metadatos, rendimiento). Si quieres
              posicionamiento continuo, lo planteamos como servicio mensual.
            </p>
          </div>
        </details>
        <details>
          <summary>¿Hacéis mantenimiento?</summary>
          <div className="faq__content">
            <p>Sí: actualizaciones, seguridad, backups, monitorización y mejoras.</p>
          </div>
        </details>
      </div>
    </Section>
  );
}

function Contact() {
  const [note, setNote] = useState("");

  // WhatsApp button removed

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
          </div>

          <p className="muted small">
            Al enviar aceptas la política de privacidad. (Pendiente de poner la página/legal definitivo)
          </p>

          <p className="form__note" aria-live="polite">{note}</p>
        </form>

        <aside className="box">
          <img className="sectionPhoto" src="/sections/contact.jpg" alt="" loading="lazy" decoding="async" />
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

function LegalPages() {
  const updated = "2026-02-07";

  // ⚠️ IMPORTANTE: esto es una plantilla. Sustituye los campos [ENTRE_CORCHETES]
  // por tus datos reales (titular, CIF/NIF, dirección, etc.).

  return (
    <>
      <Section
        id="aviso-legal"
        narrow
        title="Aviso legal"
        subtitle="Información legal del sitio web."
      >
        <div className="box">
          <p className="muted small"><strong>Última actualización:</strong> {updated}</p>
          <div className="pill" style={{ marginBottom: 14 }}>
            Sitio de demostración (demo). Datos identificativos ficticios.
          </div>

          <h3>Titular del sitio</h3>
          <p className="muted">
            <strong>Nombre comercial:</strong> {BRAND.name}<br />
            <strong>Titular:</strong> Marcos Luna Campos (demo)<br />
            <strong>NIF:</strong> 00000000T (ficticio)<br />
            <strong>Domicilio:</strong> Calle Ejemplo 123, 46000 Valencia, España (ficticio)<br />
            <strong>Email:</strong> {BRAND.email}<br />
            <strong>Teléfono:</strong> {BRAND.phoneDisplay}
          </p>

          <h3>Objeto</h3>
          <p className="muted">
            Este sitio web tiene como finalidad informar sobre los servicios de desarrollo web/software, mantenimiento y
            optimización ofrecidos por {BRAND.name}, así como facilitar el contacto con potenciales clientes.
          </p>

          <h3>Condiciones de uso</h3>
          <ul className="mini">
            <li>El usuario se compromete a utilizar este sitio de forma lícita y respetuosa.</li>
            <li>No se permite el uso del sitio para actividades ilícitas o que puedan causar daños a terceros.</li>
            <li>Nos reservamos el derecho a modificar contenidos, servicios o condiciones sin previo aviso.</li>
          </ul>

          <h3>Propiedad intelectual e industrial</h3>
          <p className="muted">
            Los contenidos del sitio (textos, diseño, logos, código, etc.) están protegidos por derechos de propiedad
            intelectual/industrial. Queda prohibida su reproducción total o parcial sin autorización, salvo en los casos
            permitidos por la legislación.
          </p>

          <h3>Responsabilidad</h3>
          <p className="muted">
            Aunque intentamos mantener la información actualizada, {BRAND.name} no garantiza la inexistencia de errores u
            omisiones. No nos hacemos responsables del uso que terceros puedan hacer de la información publicada ni de
            posibles daños derivados del acceso o uso del sitio.
          </p>

          <h3>Enlaces a terceros</h3>
          <p className="muted">
            Este sitio puede contener enlaces a páginas de terceros. {BRAND.name} no se responsabiliza del contenido ni de
            las políticas de privacidad de dichas páginas.
          </p>
        </div>
      </Section>

      <Section
        id="privacidad"
        narrow
        alt
        title="Política de privacidad"
        subtitle="Cómo tratamos los datos personales y con qué finalidad."
      >
        <div className="box">
          <p className="muted small"><strong>Última actualización:</strong> {updated}</p>

          <div className="pill" style={{ marginBottom: 14 }}>
            Sitio de demostración (demo). Datos identificativos ficticios.
          </div>

          <h3>Responsable del tratamiento</h3>
          <p className="muted">
            <strong>Responsable:</strong> Marcos Luna Campos (demo)<br />
            <strong>NIF:</strong> 00000000T (ficticio)<br />
            <strong>Domicilio:</strong> Calle Ejemplo 123, 46000 Valencia, España (ficticio)<br />
            <strong>Email:</strong> {BRAND.email}
          </p>

          <h3>Datos que recopilamos</h3>
          <ul className="mini">
            <li>Datos que envías en el formulario: nombre, email, teléfono (si lo indicas), empresa (si lo indicas) y mensaje.</li>
            <li>Datos de navegación (si se activa analítica): páginas vistas, eventos y métricas técnicas.</li>
          </ul>

          <h3>Finalidad</h3>
          <ul className="mini">
            <li>Responder a solicitudes de información y presupuestos.</li>
            <li>Gestionar la relación comercial y comunicaciones derivadas de tu consulta.</li>
            <li>Mejorar el sitio y medir rendimiento (solo si se habilita analítica con base legal adecuada).</li>
          </ul>

          <h3>Base legal</h3>
          <ul className="mini">
            <li><strong>Consentimiento</strong>: cuando envías el formulario o solicitas la auditoría.</li>
            <li><strong>Interés legítimo</strong>: para la seguridad del sitio y mejoras técnicas básicas.</li>
            <li><strong>Ejecución de contrato</strong>: si se contratan servicios.</li>
          </ul>

          <h3>Conservación</h3>
          <p className="muted">
            Conservaremos los datos el tiempo necesario para atender tu solicitud y, si hay relación contractual, durante
            los plazos legales aplicables.
          </p>

          <h3>Destinatarios</h3>
          <p className="muted">
            No cedemos datos a terceros salvo obligación legal. Podemos utilizar proveedores técnicos (hosting, email,
            analítica) que actúan como encargados del tratamiento.
          </p>

          <h3>Derechos</h3>
          <p className="muted">
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
            escribiendo a {BRAND.email}. También puedes reclamar ante la AEPD.
          </p>

          <h3>Seguridad</h3>
          <p className="muted">
            Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, aunque ningún sistema es 100%
            infalible.
          </p>
        </div>
      </Section>

      <Section
        id="cookies"
        narrow
        title="Política de cookies"
        subtitle="Qué cookies usamos y cómo gestionarlas."
      >
        <div className="box">
          <p className="muted small"><strong>Última actualización:</strong> {updated}</p>

          <h3>¿Qué son las cookies?</h3>
          <p className="muted">
            Las cookies son pequeños archivos que se guardan en tu dispositivo para permitir funciones técnicas,
            personalización o medición del uso del sitio.
          </p>

          <h3>Cookies utilizadas</h3>
          <ul className="mini">
            <li><strong>Técnicas</strong>: necesarias para el funcionamiento básico del sitio.</li>
            <li><strong>Analítica</strong> (opcional): si activamos GA4/Matomo, se usarán cookies o identificadores para medir el uso.</li>
          </ul>

          <h3>Gestión de cookies</h3>
          <p className="muted">
            Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Ten en cuenta que algunas
            funcionalidades podrían verse afectadas.
          </p>

          <h3>Consentimiento</h3>
          <p className="muted">
            Si se habilitan cookies no técnicas (por ejemplo, analítica), se mostrará un aviso/gestor de consentimiento
            para que puedas aceptarlas o rechazarlas.
          </p>
        </div>
      </Section>
    </>
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
  // Keep it reasonably small to avoid too many DOM nodes.
  const strip = Array.from({ length: 3 }, () => base).flat();

  return (
    <section className="sponsors" aria-label="Empresas con las que colaboramos">
      <div className="container">
        <header className="section__header">
          <h2>Empresas con las que colaboramos</h2>
          <p className="section__sub">Herramientas y partners habituales en nuestros proyectos.</p>
        </header>
      </div>

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
              <img className="sponsors__logo" src={s.logo} alt={s.name} loading="lazy" decoding="async" />
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
              <img className="sponsors__logo" src={s.logo} alt={s.name} loading="lazy" decoding="async" />
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
    <footer className="siteFooter">
      <div className="container">
        <div className="siteFooter__grid">
          <div className="siteFooter__brand">
            <div className="brand brand--footer">
              <span className="brand__mark" aria-hidden="true" />
              <span className="brand__text">{BRAND.name}</span>
            </div>
            <p className="siteFooter__tagline">
              {BRAND.tagline} · {BRAND.city} / {BRAND.country}
            </p>
            <p className="siteFooter__note">
              Diseño, desarrollo y optimización para que tu web/app convierta y escale.
            </p>

            <div className="siteFooter__social" aria-label="Redes">
              <a className="siteFooter__socialBtn" href="#" aria-label="GitHub">
                <img src="/brands/github.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
              </a>
              <a className="siteFooter__socialBtn" href="#" aria-label="Instagram">
                <img src="/brands/instagram.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
              </a>
              <a className="siteFooter__socialBtn" href="#" aria-label="YouTube">
                <img src="/brands/youtube.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>

          <nav className="siteFooter__col" aria-label="Servicios">
            <p className="siteFooter__label">Servicios</p>
            <a className="siteFooter__link" href="#servicios">Instalación y puesta en marcha</a>
            <a className="siteFooter__link" href="#servicios">Mantenimiento y soporte</a>
            <a className="siteFooter__link" href="#servicios">Actualizaciones y contenidos</a>
            <a className="siteFooter__link" href="#servicios">Consultoría y optimización</a>
          </nav>

          <nav className="siteFooter__col" aria-label="Secciones">
            <p className="siteFooter__label">Secciones</p>
            <a className="siteFooter__link" href="#proyectos">Proyectos</a>
            <a className="siteFooter__link" href="#proceso">Proceso</a>
            <a className="siteFooter__link" href="#faq">FAQ</a>
            <a className="siteFooter__link" href="#contacto">Contacto</a>
          </nav>

          <div className="siteFooter__col siteFooter__contact">
            <p className="siteFooter__label">Contacto</p>
            <a className="siteFooter__link" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <p className="siteFooter__meta">Tel: {BRAND.phoneDisplay}</p>
            <div className="siteFooter__cta">
              <Button className="btn--primary" href="#contacto">Pedir propuesta</Button>
              <p className="siteFooter__meta">Sin compromiso · te respondemos en &lt; 24h</p>
            </div>
          </div>
        </div>

        <div className="siteFooter__bottom">
          <div className="siteFooter__legal">
            <a className="siteFooter__legalLink" href="/aviso-legal.html">Aviso legal</a>
            <a className="siteFooter__legalLink" href="/privacidad.html">Privacidad</a>
            <a className="siteFooter__legalLink" href="/cookies.html">Cookies</a>
          </div>
          <div className="siteFooter__copy">© {year} {BRAND.name}. Todos los derechos reservados.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = `Desarrollo web y apps en ${BRAND.city} | ${BRAND.name}`;
  }, []);

  useEffect(() => {
    // Global scroll perf helper: temporarily reduce expensive effects while scrolling.
    // This avoids layout/painters fighting the scroll thread on Chromium (Chrome/Brave).
    const root = document.documentElement;
    let t = null;
    let ticking = false;

    const setScrolling = (v) => root.classList.toggle("is-scrolling", v);

    const onScroll = () => {
      if (t) window.clearTimeout(t);
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setScrolling(true);
          ticking = false;
        });
      }
      t = window.setTimeout(() => setScrolling(false), 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) window.clearTimeout(t);
      setScrolling(false);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <div className="page">
        <main id="contenido">
          <Hero />
          <Results />
          <Symptoms />
          <AuditOffer />
          <Services />
          <Pricing />
          <Sectors />
          <Projects />
          <Process />
          <Team />
          <Faq />
          <SponsorsMarquee />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
