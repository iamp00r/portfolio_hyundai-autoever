const D = window.PF_DATA;

/* ---------- 01 Hero: 커서 반응 빛 (DESIGN_GUIDE.md §5-2) ---------- */
function useCursorAura(ref) {
  React.useEffect(() => {
    const hero = ref.current;
    if (!hero || reduceMotion()) return;
    const HOME = { x: 62, y: 46 };
    const fine = window.matchMedia("(pointer: fine)").matches;
    let target = { ...HOME }, m = { ...HOME }, l = { ...HOME };
    let raf = 0, visible = true, lastInput = 0, returnTimer = 0, t0 = performance.now();
    const start = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };
    const lerp = (a, b, k) => a + (b - a) * k;

    const setTarget = (cx, cy) => {
      const r = hero.getBoundingClientRect();
      target = { x: ((cx - r.left) / r.width) * 100, y: ((cy - r.top) / r.height) * 100 };
      lastInput = performance.now();
      clearTimeout(returnTimer);
      start();
    };
    const goHome = (delay) => { clearTimeout(returnTimer); returnTimer = setTimeout(() => { target = { ...HOME }; start(); }, delay); };
    const onMove = (e) => setTarget(e.clientX, e.clientY);
    const onLeave = () => goHome(0);
    const onTouch = (e) => { const t = e.touches[0]; if (t) { setTarget(t.clientX, t.clientY); goHome(1200); } };

    const tick = (now) => {
      raf = 0;
      if (!visible) return;
      // 터치 기기: 입력이 없으면 12초 주기로 천천히 떠다님
      if (!fine && now - lastInput > 2400) {
        const p = ((now - t0) / 12000) * Math.PI * 2;
        target = { x: HOME.x + Math.cos(p) * 14, y: HOME.y + Math.sin(p * 2) * 10 };
      }
      m = { x: lerp(m.x, target.x, fine ? 0.35 : 0.08), y: lerp(m.y, target.y, fine ? 0.35 : 0.08) };
      l = { x: lerp(l.x, target.x, 0.06), y: lerp(l.y, target.y, 0.06) };
      hero.style.setProperty("--mx", m.x.toFixed(2) + "%");
      hero.style.setProperty("--my", m.y.toFixed(2) + "%");
      hero.style.setProperty("--lx", l.x.toFixed(2) + "%");
      hero.style.setProperty("--ly", l.y.toFixed(2) + "%");
      // 마우스 기기는 빛이 목표에 도달하면 루프를 멈추고, 다음 입력 때 다시 시작
      const settled = fine && Math.abs(l.x - target.x) + Math.abs(l.y - target.y) + Math.abs(m.x - target.x) + Math.abs(m.y - target.y) < 0.05;
      if (!settled) raf = requestAnimationFrame(tick);
    };

    // 히어로가 화면 밖이면 루프 정지 + 스크롤 비율만큼 빛을 흐리게
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(hero);
    const onScroll = () => {
      const h = hero.offsetHeight || 1;
      hero.style.setProperty("--aura-o", Math.max(0, 1 - window.scrollY / h).toFixed(3));
    };

    if (fine) {
      hero.addEventListener("pointermove", onMove, { passive: true });
      hero.addEventListener("pointerleave", onLeave);
    } else {
      hero.addEventListener("touchstart", onTouch, { passive: true });
      hero.addEventListener("touchmove", onTouch, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    start();
    return () => {
      cancelAnimationFrame(raf); clearTimeout(returnTimer); io.disconnect();
      hero.removeEventListener("pointermove", onMove); hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("touchstart", onTouch); hero.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function Hero() {
  const H = D.hero;
  const ref = React.useRef(null);
  useCursorAura(ref);
  return (
    <section id="top" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="container hero__inner">
        <p className="hero__overline">
          <span className="only-desktop">{H.overline}</span>
          <span className="only-mobile">{H.overlineShort}</span>
        </p>
        <h1 id="hero-title" className="hero__title">
          {H.headline.map((line, i) => {
            const at = line.indexOf(H.accent);
            if (at < 0) return <span key={i} className="hero__line">{line} </span>;
            return (
              <span key={i} className="hero__line">
                {line.slice(0, at)}<span className="hero__accent">{H.accent}</span>{line.slice(at + H.accent.length)}{" "}
              </span>
            );
          })}
        </h1>
        <p className="hero__body">{H.body}</p>
        <div className="hero__cta">
          <Button href={H.cta.href} size="lg" icon="right">{H.cta.label}</Button>
        </div>
        <ul className="hero__tags" aria-label="역량 키워드">
          {H.tags.map((t) => <li key={t.t} className={`hashtag${t.ai ? " hashtag--ai" : ""}`}>{t.t}</li>)}
        </ul>
        <a className="hero__scroll only-mobile" href="#strength">{H.scrollHint} <ArrowIcon dir="down" /></a>
      </div>
    </section>
  );
}

/* ---------- 02 Strength ---------- */
function Strength() {
  const S = D.strength;
  return (
    <section id="strength" className="section section--sunken" aria-labelledby="strength-title">
      <div className="container">
        <SectionHeader no={S.no} label={S.label} title={<span id="strength-title">{S.title}</span>} lead={S.lead} />
        <ol className="strength">
          {S.items.map((it, i) => (
            <li key={it.no} className="strength__card rv" style={{ "--i": i }}>
              <p className="strength__no"><span>{it.no}</span> {it.en}</p>
              <h3 className="strength__title">{it.title}</h3>
              <p className="strength__body">{it.body}</p>
              <ul className="strength__proof" aria-label="근거">
                {it.proof.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 03 Projects ---------- */
function AiSplit({ ai, human }) {
  const P = D.projects;
  return (
    <dl className="ai-split">
      <div className="ai-split__row ai-split__row--ai"><dt>{P.aiLabel}</dt><dd>{ai}</dd></div>
      <div className="ai-split__row"><dt>{P.humanLabel}</dt><dd>{human}</dd></div>
    </dl>
  );
}

/* DIDIT는 캡처가 없어 레이아웃 구조를 도식으로 보여 준다 */
function DiditDiagram() {
  return (
    <div className="didit-dia" role="img" aria-label="DIDIT 워크스페이스 레이아웃 구조도. 왼쪽 프로젝트·채널 사이드바와 오른쪽 채팅 패널은 고정되고, 가운데 영역만 라운지·회의실·회의록으로 바뀐다">
      <div className="didit-dia__col didit-dia__col--rail"><span /><span /><span /></div>
      <div className="didit-dia__col didit-dia__col--channels">
        <b># 채널</b><i /><i /><i className="is-on" /><i />
      </div>
      <div className="didit-dia__main">
        <div className="didit-dia__swap">
          <em>라운지</em><em className="is-on">회의실</em><em>회의록</em>
        </div>
        <div className="didit-dia__summary">
          <span className="didit-dia__ai">AI 요약</span>
          <i /><i /><i className="short" />
        </div>
      </div>
      <div className="didit-dia__col didit-dia__col--chat"><i /><i className="me" /><i /><i className="me" /></div>
      <p className="didit-dia__cap">고정 영역 · <strong>가운데만 전환</strong></p>
    </div>
  );
}

function FeaturedCard() {
  const F = D.projects.featured;
  return (
    <a className="pcard pcard--featured rv" href={F.href}>
      <div className="pcard__media pcard__media--duo">
        {F.shots.map((s, i) => <Pic key={s.src} src={s.src} alt={s.alt} className={`pcard__phone pcard__phone--${i}`} />)}
      </div>
      <div className="pcard__body">
        <div className="pcard__tags">{F.tags.map((t) => <Tag key={t.t} kind={t.kind}>{t.t}</Tag>)}</div>
        <h3 className="pcard__name">{F.name}</h3>
        <p className="pcard__sub">{F.sub}</p>
        <p className="pcard__meta">{F.meta.join(" · ")}</p>
        <AiSplit ai={F.ai} human={F.human} />
        <span className="pcard__cta">{F.cta} <ArrowIcon /></span>
      </div>
    </a>
  );
}

function SubCard({ p, i }) {
  const P = D.projects;
  const [open, setOpen] = React.useState(false);
  const regionId = `${p.id}-detail`;
  return (
    <article className="pcard pcard--sub rv" style={{ "--i": i }} aria-labelledby={`${p.id}-name`}>
      <div className="pcard__media">
        {p.video ? <LoopVideo {...p.video} className="pcard__shot pcard__shot--video" />
          : p.visual === "didit" ? <DiditDiagram /> : <Pic src={p.image.src} alt={p.image.alt} className="pcard__shot" />}
      </div>
      <div className="pcard__body">
        <div className="pcard__tags">{p.tags.map((t) => <Tag key={t.t} kind={t.kind}>{t.t}</Tag>)}</div>
        <h3 id={`${p.id}-name`} className="pcard__name">{p.name}</h3>
        <p className="pcard__sub">{p.sub}</p>
        <p className="pcard__meta">{p.meta.join(" · ")}</p>
        <AiSplit ai={p.ai} human={p.human} />
        <button type="button" className="accordion__btn" aria-expanded={open} aria-controls={regionId} onClick={() => setOpen((v) => !v)}>
          {open ? P.detailToggleClose : P.detailToggle}
          <svg className="accordion__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div id={regionId} className="accordion__panel" hidden={!open}>
          {p.video && p.visual === "didit" && <div className="accordion__figure"><DiditDiagram /></div>}
          <ol className="accordion__steps">
            {p.detail.map((d) => (
              <li key={d.h}><h4>{d.h}</h4><p>{d.p}</p></li>
            ))}
          </ol>
          <a className="text-link" href={p.doc.href} target="_blank" rel="noopener noreferrer">{p.doc.label} <ArrowIcon dir="out" /></a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const P = D.projects;
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader no={P.no} label={P.label} title={<span id="projects-title">{P.title}</span>} lead={P.lead} />
        <FeaturedCard />
        <div className="pgrid">
          {P.others.map((p, i) => <SubCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 Skills ---------- */
function Skills() {
  const S = D.skills;
  return (
    <section id="skills" className="section section--sunken" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader no={S.no} label={S.label} title={<span id="skills-title">{S.title}</span>} lead={S.lead} />
        <div className="skills">
          {S.groups.map((g, i) => (
            <section key={g.title} className="skills__group rv" style={{ "--i": i }} aria-labelledby={`sk-${i}`}>
              <p className="skills__en">{g.en}</p>
              <h3 id={`sk-${i}`} className="skills__title">{g.title}</h3>
              <ul className="skills__list">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </section>
          ))}
        </div>
        <div className="certs rv">
          <h3 className="certs__title">{S.certTitle}</h3>
          <ul className="certs__list">
            {S.certs.map((c) => (
              <li key={c.t} className={`tag ${c.award ? "tag--award" : "tag--tool"}`}>{c.t}<span className="certs__note">{c.note}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 Journey ---------- */
function Journey() {
  const J = D.journey;
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeader no={J.no} label={J.label} title={<span id="journey-title">{J.title}</span>} lead={J.lead} />
        <ul className="journey__legend rv" aria-label="범례">
          {J.legend.map((l) => <li key={l.k}><span className={`dot dot--${l.k}`} aria-hidden="true" />{l.v}</li>)}
        </ul>
        <ol className="journey rv">
          {J.years.map((yr) => (
            <li key={yr.y} className={`journey__year${yr.next ? " journey__year--next" : ""}`}>
              <p className="journey__y">{yr.y}</p>
              <ul className="journey__items">
                {yr.items.map((it) => (
                  <li key={it.name} className="tl-item">
                    <span className={`dot dot--${it.t}`} aria-hidden="true" />
                    <span className="sr-only">{J.legend.find((l) => l.k === it.t).v}: </span>
                    <div>
                      <p className="tl-item__name">{it.name}</p>
                      <p className="tl-item__note">{it.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function App() {
  useReveal();
  useHashScroll();
  return (
    <>
      <Gnb activeIds={D.nav.map((n) => n.id)} />
      <main id="main">
        <Hero />
        <Strength />
        <Projects />
        <Skills />
        <Journey />
      </main>
      <Contact />
      <BackToTop />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
