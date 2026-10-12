/* 공통 컴포넌트 — index.html, work/yeogimalgo.html 에서 함께 쓴다.
   BEM 클래스, 상태는 is-* / aria-* 로 표현 (DESIGN_GUIDE.md §7-2) */

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 섹션 등장: .rv 요소가 화면 하단 12%에 들어오면 .in (1회) */
function useReveal(dep) {
  React.useEffect(() => {
    const els = document.querySelectorAll(".rv:not(.in)");
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/* React가 렌더링한 뒤에 URL 해시 위치로 이동 (다른 페이지에서 #projects 등으로 들어온 경우) */
function useHashScroll() {
  React.useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);
}

/* 현재 보이는 섹션 id (GNB 밑줄용) */
function useActiveSection(ids) {
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

function ArrowIcon({ dir = "right" }) {
  const d = { right: "M5 12h14M13 6l6 6-6 6", down: "M12 5v14M6 13l6 6 6-6", up: "M12 19V5M6 11l6-6 6 6", left: "M19 12H5M11 6l-6 6 6 6", out: "M7 17L17 7M9 7h8v8" }[dir];
  return (
    <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Button({ href, variant = "primary", size, icon = "right", children, className = "", ...rest }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`.trim();
  const inner = <>{children}{icon && <ArrowIcon dir={icon} />}</>;
  if (href) return <a className={cls} href={href} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}

function Tag({ kind = "role", children }) {
  return <span className={`tag tag--${kind}`}>{children}</span>;
}

function SectionHeader({ no, label, title, lead, inverse }) {
  return (
    <header className={`sec-head rv${inverse ? " sec-head--inverse" : ""}`}>
      <p className="sec-head__overline">{no} — {label}</p>
      <h2 className="sec-head__title">{title}</h2>
      {lead && <p className="sec-head__lead">{lead}</p>}
    </header>
  );
}

/* WebP 우선, PNG 대체. src는 확장자 없이 전달 (.svg는 그대로 사용) */
function Pic({ src, alt, className, eager }) {
  if (src.endsWith(".svg")) {
    return (
      <picture className={className}>
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      </picture>
    );
  }
  return (
    <picture className={className}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.png`} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

/* 움짤처럼 도는 무음 영상. 화면 밖에선 멈추고, 동작 줄이기 설정이면 포스터만 보여 준다 */
function LoopVideo({ src, poster, label, className }) {
  const ref = React.useRef(null);
  const [still, setStill] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = (e) => setStill(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  React.useEffect(() => {
    const v = ref.current;
    if (!v || still) { v && v.pause(); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  return (
    <div className={className}>
      <video ref={ref} muted loop playsInline preload="metadata" poster={`${poster}.webp`}
        aria-label={label} controls={still}>
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

/* GNB: 투명 → 80px 이후 glass. 모바일은 Hyundai Blue 전체 화면 시트 */
function Gnb({ base = "", activeIds = [] }) {
  const D = window.PF_DATA;
  const [glass, setGlass] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection(activeIds);
  const sheetRef = React.useRef(null);
  const toggleRef = React.useRef(null);

  React.useEffect(() => {
    const on = () => setGlass(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    if (!open) return;
    const sheet = sheetRef.current;
    const focusables = () => [toggleRef.current, ...sheet.querySelectorAll("a")];
    sheet.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  return (
    <header className={`gnb${glass ? " is-glass" : ""}${open ? " is-open" : ""}`}>
      <a className="skip-link" href="#main">{D.ui.skip}</a>
      <div className="gnb__inner">
        <a className="gnb__logo" href={`${base}#top`} onClick={() => setOpen(false)}>{D.nameEn}</a>
        <nav className="gnb__nav" aria-label="주요 메뉴">
          <ul className="gnb__list">
            {D.nav.map((n) => (
              <li key={n.id}>
                <a className={`gnb__link${active === n.id ? " is-active" : ""}`} href={`${base}#${n.id}`} aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button ref={toggleRef} type="button" className="gnb__toggle" aria-expanded={open} aria-controls="gnb-sheet" aria-label={open ? D.ui.menuClose : D.ui.menuOpen} onClick={() => setOpen((v) => !v)}>
          <span className="gnb__bars" aria-hidden="true"><span /><span /><span /></span>
        </button>
      </div>
      <div id="gnb-sheet" ref={sheetRef} className="gnb__sheet" hidden={!open}>
        <ul>
          {D.nav.map((n) => (
            <li key={n.id}><a href={`${base}#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a></li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Contact() {
  const C = window.PF_DATA.contact;
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <p className="contact__overline rv">{C.no} — {C.label}</p>
        <h2 id="contact-title" className="contact__title rv">{C.title}</h2>
        <p className="contact__body rv">{C.body}</p>
        <ul className="contact__links rv">
          {C.links.map((l) => (
            <li key={l.k}>
              <a className={`contact__link${l.primary ? " contact__link--primary" : ""}`} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="contact__k">{l.k}</span>
                <span className="contact__v">{l.v}</span>
                <ArrowIcon dir={l.external ? "out" : "right"} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer"><p>{C.footer}</p></footer>
    </section>
  );
}

/* 우측 하단 '맨 위로' 버튼 — 첫 화면을 지나면 나타난다 */
function BackToTop() {
  const D = window.PF_DATA;
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
    document.querySelector(".gnb__logo")?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className={`to-top${show ? " is-visible" : ""}`} onClick={toTop} aria-label={D.ui.toTop} tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <ArrowIcon dir="up" />
    </button>
  );
}

Object.assign(window, { BackToTop, useReveal, useHashScroll, useActiveSection, ArrowIcon, Button, Tag, SectionHeader, Pic, Gnb, Contact, reduceMotion });
