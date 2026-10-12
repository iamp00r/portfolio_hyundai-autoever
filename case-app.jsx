const D = window.PF_DATA;
const CS = D.caseStudy;

/* 좌측 sticky 목차 (Desktop) · 상단 접이식 목차 (Mobile) */
function Toc() {
  const active = useActiveSection(CS.sections.map((s) => s.id));
  const [open, setOpen] = React.useState(false);
  const links = (
    <ol className="toc__list">
      {CS.sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className={`toc__link${active === s.id ? " is-active" : ""}`} aria-current={active === s.id ? "true" : undefined} onClick={() => setOpen(false)}>
            <span className="toc__no">{String(i + 1).padStart(2, "0")}</span>{s.label}
          </a>
        </li>
      ))}
    </ol>
  );
  const current = CS.sections.find((s) => s.id === active) || CS.sections[0];
  return (
    <nav className="toc" aria-label={D.ui.toc}>
      <div className="toc__desktop">
        <p className="toc__title">{D.ui.toc}</p>
        {links}
      </div>
      <div className="toc__mobile">
        <button type="button" className="toc__toggle" aria-expanded={open} aria-controls="toc-mobile" onClick={() => setOpen((v) => !v)}>
          <span className="toc__title">{D.ui.toc}</span>
          <span className="toc__current">{current.label}</span>
          <svg className="accordion__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div id="toc-mobile" hidden={!open}>{links}</div>
      </div>
    </nav>
  );
}

function Block({ id, no, title, lead, children }) {
  return (
    <section id={id} className="cs-block" aria-labelledby={`${id}-title`}>
      <p className="cs-block__no rv">{no}</p>
      <h2 id={`${id}-title`} className="cs-block__title rv">{title}</h2>
      {lead && <p className="cs-block__lead rv">{lead}</p>}
      {children}
    </section>
  );
}

function CaseHero() {
  return (
    <header className="cs-hero">
      <div className="container cs-hero__inner">
        <div className="cs-hero__text">
          <a className="text-link cs-hero__back" href="../index.html#projects"><ArrowIcon dir="left" />{D.ui.backHome}</a>
          <p className="cs-hero__overline">{CS.overline}</p>
          <h1 className="cs-hero__title">{CS.title}</h1>
          <p className="cs-hero__sub">{CS.sub}</p>
          <dl className="facts">
            {CS.facts.map((f) => <div key={f.k} className="facts__item"><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
          </dl>
        </div>
        <div className="cs-hero__visual">
          <Pic src={CS.hero.src} alt={CS.hero.alt} className="phone" eager />
        </div>
      </div>
    </header>
  );
}

function CaseApp() {
  useReveal();
  useHashScroll();
  const n = (id) => String(CS.sections.findIndex((s) => s.id === id) + 1).padStart(2, "0") + " — " + CS.sections.find((s) => s.id === id).label.toUpperCase();
  return (
    <>
      <Gnb base="../index.html" />
      <main id="main">
        <CaseHero />
        <div className="container cs-layout">
          <Toc />
          <div className="cs-body">
            <Block id="overview" no={n("overview")} title={CS.overview.title}>
              <p className="cs-p rv">{CS.overview.body}</p>
            </Block>

            <Block id="process" no={n("process")} title={CS.process.title} lead={CS.process.lead}>
              <ol className="pflow rv" aria-label="작업 단계">
                {CS.process.steps.map((s, i) => (
                  <li key={s.phase} className="pflow__item"><span>{String(i + 1).padStart(2, "0")}</span>{s.phase}</li>
                ))}
              </ol>
              <ol className="ptl">
                {CS.process.steps.map((s, i) => (
                  <li key={s.phase} className="ptl__step rv" style={{ "--i": i }}>
                    <span className="ptl__no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div className="ptl__body">
                      <p className="ptl__meta"><span className="ptl__phase">{s.phase}</span><span className="ptl__tool">{s.tool}</span></p>
                      <h3 className="ptl__h">{s.h}</h3>
                      <p className="ptl__p">{s.p}</p>
                      <dl className="ptl__roles">
                        <div className="ptl__role ptl__role--ai"><dt>{CS.process.aiLabel}</dt><dd>{s.ai}</dd></div>
                        <div className="ptl__role"><dt>{CS.process.humanLabel}</dt><dd>{s.human}</dd></div>
                        <div className="ptl__role ptl__role--out"><dt>{CS.process.outLabel}</dt><dd>{s.out}</dd></div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="problem" no={n("problem")} title={CS.problem.title}>
              <div className="cs-cards">
                {CS.problem.items.map((it, i) => (
                  <article key={it.k} className="cs-card rv" style={{ "--i": i }}>
                    <p className="cs-card__k">{it.k}</p>
                    <h3 className="cs-card__h">{it.h}</h3>
                    <p>{it.p}</p>
                  </article>
                ))}
              </div>
            </Block>

            <Block id="flow" no={n("flow")} title={CS.flow.title} lead={CS.flow.lead}>
              <ol className="flow rv">
                {CS.flow.steps.map((s) => (
                  <li key={s.no} className="flow__step">
                    <span className="flow__no">{s.no}</span>
                    <h3 className="flow__h">{s.h}</h3>
                    <p className="flow__p">{s.p}</p>
                  </li>
                ))}
              </ol>
              <p className="flow__branch rv">{CS.flow.branch}</p>
            </Block>

            <Block id="ui" no={n("ui")} title={CS.ui.title} lead={CS.ui.lead}>
              <ul className="shots rv" aria-label="화면 캡처">
                {CS.ui.shots.map((s) => (
                  <li key={s.src}>
                    <figure className="shots__fig">
                      <Pic src={s.src} alt={s.alt} className="phone" />
                      <figcaption>{s.cap}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
              <ol className="decisions">
                {CS.ui.decisions.map((d, i) => (
                  <li key={d.h} className="decisions__item rv" style={{ "--i": i }}>
                    <span className="decisions__no">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{d.h}</h3><p>{d.p}</p></div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="result" no={n("result")} title={CS.result.title}>
              <ul className="results rv">
                {CS.result.items.map((r) => (
                  <li key={r.big} className="results__item"><b>{r.big}</b><span>{r.small}</span></li>
                ))}
              </ul>
              <h3 className="cs-sub rv">{CS.result.retroTitle}</h3>
              <div className="cs-cards">
                {CS.result.retro.map((r, i) => (
                  <article key={r.h} className="cs-card rv" style={{ "--i": i }}>
                    <h4 className="cs-card__h">{r.h}</h4>
                    <p>{r.p}</p>
                  </article>
                ))}
              </div>
              <p className="cs-next rv"><Button href={CS.nextProject.href} variant="secondary">{CS.nextProject.label}</Button></p>
            </Block>
          </div>
        </div>
      </main>
      <Contact />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CaseApp />);
