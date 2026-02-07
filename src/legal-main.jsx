import React from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import "./styles.css";

const BRAND = {
  name: "Axon Web Studio",
  email: "marcostomascampos@gmail.com",
  phoneDisplay: "+34 646 737 527",
  city: "Valencia",
  country: "España",
  tagline: "Webs rápidas y apps a medida",
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
      transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
    },
  };
  const inView = {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.22, margin: "-40px" },
    variants: fadeUp,
  };
  return { fadeUp, inView };
}

function Section({ id, alt, narrow, title, subtitle, children }) {
  const m = useMotion();
  return (
    <section id={id} className={cn("section", alt && "section--alt")} aria-label={title}>
      <div className={cn("container", narrow && "container--narrow")}>
        <motion.header className="section__header" {...m.inView}>
          <h2>{title}</h2>
          {subtitle ? <p className="section__sub">{subtitle}</p> : null}
        </motion.header>
        <div>{children}</div>
      </div>
    </section>
  );
}

function HeaderLite() {
  return (
    <header className="header header--float is-scrolled">
      <div className="container header__inner">
        <a className="brand" href="/" aria-label="Ir al inicio">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">{BRAND.name}</span>
        </a>
        <div className="headerRight">
          <a className="nav__link" href="/">Volver a la web</a>
          <a className="nav__cta" href="/#contacto">Pedir propuesta</a>
        </div>
      </div>
    </header>
  );
}

function FooterLite() {
  const year = new Date().getFullYear();
  return (
    <footer className="siteFooter">
      <div className="container">
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

function LegalContent({ kind }) {
  const updated = "2026-02-07";

  const demoPill = (
    <div className="pill" style={{ marginBottom: 14 }}>
      Sitio de demostración (demo). Datos identificativos ficticios.
    </div>
  );

  if (kind === "aviso-legal") {
    return (
      <Section id="aviso-legal" narrow title="Aviso legal" subtitle="Información legal del sitio web.">
        <div className="box">
          <p className="muted small"><strong>Última actualización:</strong> {updated}</p>
          {demoPill}
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
    );
  }

  if (kind === "privacidad") {
    return (
      <Section id="privacidad" narrow alt title="Política de privacidad" subtitle="Cómo tratamos los datos personales y con qué finalidad.">
        <div className="box">
          <p className="muted small"><strong>Última actualización:</strong> {updated}</p>
          {demoPill}
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
    );
  }

  return (
    <Section id="cookies" narrow title="Política de cookies" subtitle="Qué cookies usamos y cómo gestionarlas.">
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
  );
}

function LegalApp() {
  const kind = (window.__LEGAL_PAGE || "aviso-legal").toString();
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <HeaderLite />
      <div className="page">
        <main id="contenido">
          <LegalContent kind={kind} />
        </main>
        <FooterLite />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<LegalApp />);
