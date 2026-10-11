const { Badge, Button, Card } = window.DesignSystem_4f270c;
const D = window.PF_DATA;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "warm",
  "accent": "#0AA0D2",
  "density": "regular",
  "typeScale": 100,
  "scrollAnim": true,
  "showProposal": true,
  "showPerspective": true,
  "showAwards": true
}/*EDITMODE-END*/;

const MOODS = { warm: "Warm Minimal", night: "Night", paper: "Paper" };
const ACCENT_SOFT = { "#0AA0D2": "#E2F4FA", "#0A3255": "#E4EAF0" };

function useReveal(dep) {
  React.useEffect(() => {
    const els = document.querySelectorAll(".rv:not(.in)");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function CountUp({ to, prefix = "", suffix = "", anim }) {
  const [n, setN] = React.useState(anim ? 0 : to);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!anim) { setN(to); return; }
    const el = ref.current; if (!el) return;
    let raf, started = false;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !started) {
        started = true;
        const t0 = performance.now(), dur = 1200;
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur), e2 = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * e2));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, anim]);
  return <span ref={ref}>{prefix}{n.toLocaleString("ko-KR")}<small>{suffix}</small></span>;
}

// 카드 위 커서 스포트라이트 + 살짝 기울기 (.spot 요소에 위임)
function useSpotlight(on) {
  React.useEffect(() => {
    if (!on || !matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cur = null;
    const reset = () => { if (cur) cur.style.rotate = ""; cur = null; };
    const move = (e) => {
      const el = e.target.closest && e.target.closest(".spot");
      if (el !== cur) reset();
      if (!el) return;
      cur = el;
      const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
      const dx = x / r.width - 0.5, dy = y / r.height - 0.5, mag = Math.hypot(dx, dy);
      el.style.rotate = mag ? `${-dy} ${dx} 0 ${(mag * 7).toFixed(2)}deg` : "";
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    return () => { reset(); document.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", reset); };
  }, [on]);
}

// ↑↑↓↓←→←→BA — 한글 입력 상태에서도 동작하도록 e.code로 비교
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
function useKonami(fire) {
  React.useEffect(() => {
    let i = 0;
    const on = (e) => {
      if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      i = e.code === KONAMI[i] ? i + 1 : (e.code === KONAMI[0] ? 1 : 0);
      if (i === KONAMI.length) { i = 0; fire(); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [fire]);
}

const CONFETTI_C = ["#0A3255", "#0AA0D2", "#B4E114", "#5CC2E4"];
function Quest({ open, onClose }) {
  const bits = React.useMemo(() => Array.from({ length: 56 }, (_, i) => ({
    l: Math.random() * 100, d: Math.random() * 0.6, t: 2.2 + Math.random() * 1.6,
    r: Math.random() * 720 - 360, x: Math.random() * 160 - 80, w: 6 + Math.random() * 8, c: CONFETTI_C[i % CONFETTI_C.length]
  })), [open]);
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="quest" role="dialog" aria-modal="true" aria-labelledby="quest-t" onClick={onClose}>
      <div className="confetti" aria-hidden="true">
        {bits.map((b, i) => <i key={i} style={{ left: b.l + "%", width: b.w, height: b.w * 0.6, background: b.c, animationDelay: b.d + "s", animationDuration: b.t + "s", "--r": b.r + "deg", "--x": b.x + "px" }}></i>)}
      </div>
      <div className="quest-card" onClick={(e) => e.stopPropagation()}>
        <h3 id="quest-t">숨은 퀘스트를 찾아주셨군요!</h3>
        <p className="quest-body">여기까지 살펴봐 주셔서 감사합니다. 작은 디테일까지 챙기는 저 <b>{D.name}</b>도 새로운 즐거움으로 통하는 문, 넥슨스페이스에 합류하고 싶습니다.</p>
        <div className="quest-exp"><span>EXP</span><div><i></i></div><em>100%</em></div>
        <div className="quest-cta">
          <button className="btn btn-line" type="button" onClick={onClose} autoFocus>닫기</button>
        </div>
      </div>
    </div>
  );
}

// **강조** 문법을 <b>로 변환
function R(text) {
  if (typeof text !== "string") return text;
  return text.split(/\*\*(.+?)\*\*/g).map((t, i) => (i % 2 ? <b key={i}>{t}</b> : t));
}

function SecHead({ label, title, lead, id }) {
  return (
    <div className="sec-head rv" id={id}>
      <p className="eyebrow">{label}</p>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{R(lead)}</p>}
    </div>
  );
}

function Nav({ active }) {
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const on = () => setStuck(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={"nav" + (stuck ? " stuck" : "")}>
      <a className="mark" href="#top">하지연<span> · </span>포트폴리오</a>
      <div className="nav-links">
        {D.nav.map((n) => <a key={n.id} href={"#" + n.id} className={active === n.id ? "on" : ""}>{n.label}</a>)}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-name">
          <b>{D.name}</b><em>{D.nameEn}</em>
        </div>
        <h1>
          {D.headline.map((l, i) => {
            const parts = D.accentWord && l.includes(D.accentWord) ? l.split(D.accentWord) : null;
            return <span className="ln" key={i}><i>{parts ? <>{parts[0]}<span className="accentword">{D.accentWord}</span>{parts.slice(1).join(D.accentWord)}</> : l}</i></span>;
          })}
        </h1>
        <p className="hero-body">{D.heroBody}</p>
        <div className="hero-facts">
          {D.quickFacts.map((f) => <span className="fact" key={f}>{f}</span>)}
        </div>
        <div className="hero-cta">
          {D.cta.map((c) => (
            <a key={c.label} className={"btn " + (c.fill ? "btn-fill" : "btn-line")} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{c.label}</a>
          ))}
        </div>
      </div>
      <div className="wrap hero-foot">
        <p className="eyebrow" style={{ margin: 0 }}>{D.eyebrow}</p>
        <div className="scrollcue"><span className="bar"></span>Scroll</div>
      </div>
      <div className="hero-rule"></div>
    </header>
  );
}

function Journey() {
  const j = D.journey;
  return (
    <section className="sec" id="journey">
      <div className="wrap">
        <div className="jr-top">
          <SecHead label={j.label} title={j.title} lead={j.lead} />
          <div className="jr-legend rv">
            {j.legend.map((l) => <span key={l.k} className={"jr-lg t-" + l.k}><i></i>{l.v}</span>)}
          </div>
        </div>
        <div className="jr">
          {j.years.map((yr, i) => (
            <div className={"jr-col rv" + (yr.next ? " next" : "")} key={yr.y} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="jr-y">{yr.y}</span>
              <span className="jr-dot"></span>
              <ul>
                {yr.items.map((it) => (
                  <li key={it.name} className={"t-" + it.t}>
                    <b>{it.name}</b>
                    <span>{it.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const a = D.about;
  return (
    <section className="sec alt" id="about">
      <div className="wrap">
        <SecHead label={a.label} title={a.title} lead={a.lead} />
        <div className="about-grid">
          {a.items.map((it, i) => (
            <div className="about-item spot rv" key={it.no} style={{ "--d": i * 90 + "ms" }}>
              <span className="no">{it.no}</span>
              <span className="tg">{it.tag}</span>
              <h3 className="h3">{it.title}</h3>
              <p className="body">{R(it.body)}</p>
              {it.proof && <p className="proof">{it.proof}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ anim }) {
  const s = D.stats;
  return (
    <section className="sec deep">
      <div className="wrap">
        <div className="sec-head rv" style={{ marginBottom: 0 }}>
          <p className="eyebrow">{s.label}</p>
          <h2 className="h2">{s.title}</h2>
        </div>
        <div className="stats">
          {s.items.map((it, i) => (
            <div className="stat rv" key={it.label} style={{ transitionDelay: i * 80 + "ms", borderLeftColor: "rgba(255,255,255,.2)" }}>
              <div className="stat-v"><CountUp to={it.value} prefix={it.prefix || ""} suffix={it.suffix} anim={anim} /></div>
              <p className="stat-l" style={{ color: "#fff" }}>{it.label}</p>
              <p className="cap" style={{ color: "rgba(255,255,255,.5)" }}>{it.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const p = D.projects, f = p.featured;
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <SecHead label={p.label} title={p.title} lead={p.lead} />
        <div className="pcase rv">
          <div className="pcase-head">
            <div>
              <Badge tone="primary">{f.badge}</Badge>
              <div className="pcase-name">{f.name}</div>
              <p className="body" style={{ fontWeight: 500 }}>{f.sub}</p>
            </div>
            <div className="pmeta">{f.meta.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          {f.shots && (
            <div className="pshots rv">
              {f.shots.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={`${f.name} ${s.cap} 화면`} />
                </figure>
              ))}
            </div>
          )}
          <div className="pcase-grid">
            <div className="pblk">
              <h4>{f.problem.title}</h4>
              <p className="body">{R(f.problem.body)}</p>
            </div>
            <div className="pblk">
              <h4>{f.process.title}</h4>
              <ol className="psteps">{f.process.steps.map((s, i) => <li key={i}>{R(s)}</li>)}</ol>
            </div>
          </div>
          <div className="pblk" style={{ borderTop: "none" }}>
            <h4>{f.results.title}</h4>
            <div className="pres">
              {f.results.items.map((r) => (
                <div key={r.big}>
                  <div className="big">{r.big}</div>
                  <p className="cap">{r.small}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pcase-foot">
            <p className="body">{f.learning}</p>
          </div>
        </div>
        <div className="rail">
          {p.others.map((o, i) => (
            <div className="rv" key={o.name} style={{ transitionDelay: i * 70 + "ms", display: "flex" }}>
              <div className="pcard">
                <span className="tg">{o.tag}</span>
                <span className="nm">{o.name}</span>
                <span className="rl">{o.role}</span>
                <p className="body" style={{ fontSize: "14px" }}>{R(o.body)}</p>
                <div className="chips">{o.chips.map((c) => <Badge key={c} tone="neutral">{c}</Badge>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const s = D.skills;
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <SecHead label={s.label} title={s.title} lead={s.lead} />
        <div className="sk-grid">
          {s.groups.map((g, i) => (
            <div className="sk rv" key={g.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <h3>{g.title}<Badge tone={g.tone}>{String(g.items.length).padStart(2, "0")}</Badge></h3>
              <ul>{g.items.map((it) => <li key={it}>{R(it)}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Perspective() {
  const p = D.insight;
  return (
    <section className="sec alt" id="perspective">
      <div className="wrap persp">
        <div className="persp-pin rv">
          <p className="eyebrow">{p.label}</p>
          <h2 className="h2">{p.title}</h2>
        </div>
        <div>
          <div className="essay rv">{p.essay.map((t, i) => <p key={i}>{R(t)}</p>)}</div>
          <div className="notes">
            {p.notes.map((n, i) => (
              <div className="note spot rv" key={n.no} style={{ "--d": i * 80 + "ms" }}>
                <span className="no">{n.no}</span>
                <p className="body">{R(n.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proposal() {
  const p = D.proposal;
  return (
    <section className="sec" id="proposal">
      <div className="wrap">
        <SecHead label={p.label} title={p.title} lead={p.lead} />
        <div className="prop-steps">
          {p.steps.map((s, i) => (
            <div className="prop-step rv" key={s.no} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="no">{s.no}</span>
              <div>
                <h3 className="h3" style={{ marginBottom: 14 }}>{s.title}</h3>
                <p className="body">{R(s.body)}</p>
              </div>
              <p className="metric">{s.metric}</p>
            </div>
          ))}
        </div>
        {p.footnote && <p className="prop-note rv">{R(p.footnote)}</p>}
      </div>
    </section>
  );
}

function Experience() {
  const e = D.experience;
  return (
    <section className="sec alt" id="experience">
      <div className="wrap">
        <SecHead label={e.label} title={e.title} lead={e.lead} />
        <div className="exp">
          {e.items.map((it, i) => (
            <div className="exp-item panel rv" key={it.org} style={{ transitionDelay: i * 70 + "ms" }}>
              <div className="exp-side">
                <span className="per">{it.period}</span>
                <h3 className="org">{it.org}</h3>
                <span className="role">{it.role}</span>
                <div className="exp-metrics">{it.metrics.map((m) => <span key={m}>{m}</span>)}</div>
              </div>
              <div>
                <div className="exp-blocks">
                  {it.blocks.map((b) => (
                    <div className="exp-blk" key={b.h}>
                      <h5>{b.h}</h5>
                      <ul>{b.items.map((x) => <li key={x}>{R(x)}</li>)}</ul>
                    </div>
                  ))}
                </div>
                {it.quote && <p className="exp-quote">{it.quote}</p>}
              </div>
            </div>
          ))}
          <div className="edu rv">
            <span className="k">{e.education.k}</span>
            <span className="v">{e.education.v}</span>
            <span className="p">{e.education.p}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Awards() {
  const a = D.awards;
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SecHead label={a.label} title={a.title} />
        <div className="aw rv">
          {a.items.map((it) => (
            <div className="aw-item spot" key={it.name}>
              <span className="yr">{it.year}</span>
              <span className="nm">{it.name}</span>
              <p className="cap">{it.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const c = D.contact;
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="rv">
          <p className="eyebrow">{c.label}</p>
          <h2>{c.title}</h2>
          <p className="body">{R(c.body)}</p>
        </div>
        <div className="clinks rv">
          {c.links.map((l) => (
            <a className="clink" key={l.k} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="k">{l.k}</span>
              <span className="v">{l.v}</span>
            </a>
          ))}
        </div>
        <div className="foot">
          <span>© 2026 {D.name} · {D.role}</span>
          <span>HA JIYEON — PORTFOLIO</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("");
  const [ready, setReady] = React.useState(false);
  const [prog, setProg] = React.useState(0);
  const [quest, setQuest] = React.useState(false);
  const openQuest = React.useCallback(() => setQuest(true), []);
  const closeQuest = React.useCallback(() => setQuest(false), []);
  useKonami(openQuest);
  useSpotlight(t.scrollAnim);
  const sp = { compact: 0.72, regular: 1, comfy: 1.28 }[t.density] || 1;

  useReveal(`${t.mood}-${t.showProposal}-${t.showPerspective}-${t.showAwards}-${t.scrollAnim}`);
  React.useEffect(() => { const id = setTimeout(() => setReady(true), 80); return () => clearTimeout(id); }, []);
  React.useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setProg(Math.min(100, (window.scrollY / Math.max(1, h.scrollHeight - window.innerHeight)) * 100));
      let cur = "";
      D.nav.forEach((n) => { const el = document.getElementById(n.id); if (el && el.getBoundingClientRect().top <= 160) cur = n.id; });
      setActive(cur);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className={"pf" + (ready ? " ready" : "")} data-mood={t.mood} data-anim={t.scrollAnim ? "on" : "off"}
      style={{ "--accent": t.accent, "--accent-soft": ACCENT_SOFT[t.accent] || "#E2F4FA", "--sp": sp, "--ts": t.typeScale / 100 }}>
      <div className="aura"><i className="a"></i><i className="b"></i><i className="c"></i></div>
      <div className="prog" style={{ width: prog + "%" }}></div>
      <Nav active={active} />
      <Hero />
      <Journey />
      <About />
      <Projects />
      <Experience />
      <Skills />
      {t.showPerspective && <Perspective />}
      {t.showProposal && <Proposal />}
      {t.showAwards && <Awards />}
      <Contact />
      <Quest open={quest} onClose={closeQuest} />
      <TweaksPanel>
        <TweakSection label="무드" />
        <TweakRadio label="톤" value={t.mood} options={["warm", "night", "paper"]} onChange={(v) => setTweak("mood", v)} />
        <TweakColor label="포인트 컬러" value={t.accent} options={["#0AA0D2", "#0A3255"]} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="레이아웃" />
        <TweakRadio label="여백 밀도" value={t.density} options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />
        <TweakSlider label="글자 크기" value={t.typeScale} min={85} max={120} step={5} unit="%" onChange={(v) => setTweak("typeScale", v)} />
        <TweakToggle label="스크롤 애니메이션" value={t.scrollAnim} onChange={(v) => setTweak("scrollAnim", v)} />
        <TweakSection label="섹션" />
        <TweakToggle label="Why HR" value={t.showPerspective} onChange={(v) => setTweak("showPerspective", v)} />
        <TweakToggle label="업무 계획 초안" value={t.showProposal} onChange={(v) => setTweak("showProposal", v)} />
        <TweakToggle label="수상 · 인증" value={t.showAwards} onChange={(v) => setTweak("showAwards", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
