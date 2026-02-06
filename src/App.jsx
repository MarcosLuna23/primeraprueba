import { useEffect, useState } from "react";
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
            <Button className="btn--primary" href="#contacto">
              Pedir presupuesto
            </Button>
            {/* WhatsApp button removed */}
            <Button className="btn--ghost" href="#proyectos">Ver proyectos</Button>
          </motion.div>
          <motion.ul className="trust" variants={m.fadeUp}>
            <li>Respuesta &lt; 24h</li>
            <li>Rendimiento (Core Web Vitals)</li>
            <li>SEO técnico + analítica</li>
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

            <div className="phoneContent" aria-hidden="true">
              <div className="phoneStatus">
                <span className="phoneTime">15:48</span>
                <span className="phoneIcons">
                  <span className="pxSignal"><i /><i /><i /><i /></span>
                  <span className="pxWifi" />
                  <span className="pxBattery"><b /></span>
                </span>
              </div>

              <div className="phoneIsland" />

              <div className="phoneHeader">Ajustes</div>

              <div className="phoneList">
                <div className="phoneRow">
                  <span className="phoneIcon i-red">🔔</span>
                  <span className="phoneRowText">Notificaciones</span>
                  <span className="phoneChevron">›</span>
                </div>
                <div className="phoneRow">
                  <span className="phoneIcon i-pink">🔊</span>
                  <span className="phoneRowText">Sonidos y vibraciones</span>
                  <span className="phoneChevron">›</span>
                </div>
                <div className="phoneRow">
                  <span className="phoneIcon i-blue">🌙</span>
                  <span className="phoneRowText">Modos</span>
                  <span className="phoneChevron">›</span>
                </div>
                <div className="phoneRow">
                  <span className="phoneIcon i-gray">⏱</span>
                  <span className="phoneRowText">Tiempo de uso</span>
                  <span className="phoneChevron">›</span>
                </div>

                <div className="phoneGroupLabel">GENERAL</div>

                <div className="phoneRow">
                  <span className="phoneIcon i-gray">⚙️</span>
                  <span className="phoneRowText">General</span>
                  <span className="phoneChevron">›</span>
                </div>
                <div className="phoneRow">
                  <span className="phoneIcon i-blue">🔆</span>
                  <span className="phoneRowText">Pantalla y brillo</span>
                  <span className="phoneChevron">›</span>
                </div>
                <div className="phoneRow">
                  <span className="phoneIcon i-green">🔋</span>
                  <span className="phoneRowText">Batería</span>
                  <span className="phoneChevron">›</span>
                </div>
              </div>
            </div>
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
          <h3>Cuéntanos tu objetivo. Nosotros ponemos el plan.</h3>
          <p className="muted">En 10 minutos entendemos tu caso y te decimos enfoque, plazos y presupuesto orientativo.</p>
        </div>
        <div className="ctaBand__right">
          <img className="sectionPhoto" src="/sections/services.jpg" alt="" loading="lazy" />
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
          <img className="casePhoto" src="/sections/projects.jpg" alt="" loading="lazy" />
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
          <img className="casePhoto" src="/sections/team.jpg" alt="" loading="lazy" />
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
          <img className="casePhoto" src="/sections/services.jpg" alt="" loading="lazy" />
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
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="brand brand--footer">
              <span className="brand__mark" aria-hidden="true" />
              <span className="brand__text">{BRAND.name}</span>
            </div>
            <p className="muted small">
              {BRAND.tagline} · {BRAND.city} / {BRAND.country}
            </p>
            <p className="muted small" style={{ marginTop: 10 }}>
              Respuesta en menos de 24h. Presupuesto claro y por escrito.
            </p>
          </div>

          <div className="footer__col">
            <p className="footer__label">Contacto</p>
            <a className="footer__link" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <span className="footer__meta">Tel: {BRAND.phoneDisplay}</span>
          </div>

          <div className="footer__col">
            <p className="footer__label">Enlaces</p>
            <a className="footer__link" href="#servicios">Servicios</a>
            <a className="footer__link" href="#proyectos">Proyectos</a>
            <a className="footer__link" href="#contacto">Contacto</a>
          </div>

          <div className="footer__col footer__cta">
            <p className="footer__label">¿Hablamos?</p>
            <Button className="btn--primary" href="#contacto">Pedir presupuesto</Button>
            <span className="footer__meta">Sin compromiso · 10 min</span>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <a className="footer__link" href="#">Aviso legal</a>
            <a className="footer__link" href="#">Privacidad</a>
            <a className="footer__link" href="#">Cookies</a>
          </div>
          <div className="footer__copy muted small">© {year} {BRAND.name}. Todos los derechos reservados.</div>
        </div>
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
          <Results />
          <Services />
          <Pricing />
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
