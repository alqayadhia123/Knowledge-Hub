"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Language = "ar" | "en";
type Theme = "dark" | "light";
type NavKey = "overview" | "projects" | "research" | "courses" | "agent" | "library";

const copy = {
  ar: {
    workspace: "مساحة المعرفة", overview: "نظرة عامة", projects: "المشاريع", research: "الأبحاث والمراجع",
    courses: "الدورات والورش", agent: "المساعد الذكي", library: "مكتبة المعرفة", admin: "لوحة الإدارة",
    search: "ابحث في المعرفة والمشاريع...", welcome: "مرحباً بعودتك", subtitle: "مساحة واحدة تجمع أبحاثك ومشاريعك وتعلّمك — بمساعدة ذكاء اصطناعي واعٍ بالمصادر والصلاحيات.",
    newResearch: "ابدأ بحثاً جديداً", askAgent: "اسأل الوكيل", activeProjects: "مشاريع نشطة", researchPapers: "مراجع بحثية", learning: "مسارات تعلّم", completion: "إنجازات موثقة",
    portfolio: "مساحة المشاريع", portfolioSub: "تابع أعمالك البحثية والتقنية من مكان واحد.", viewAll: "عرض الكل", open: "فتح المساحة",
    voice: "VoiceGuard Enterprise Agent", voiceDesc: "إطار تقييم وكلاء الصوت المؤسسيين", sanad: "SANAD Research Project", sanadDesc: "تقييم ضوابط الهوية الرقمية المقاومة للتصيد",
    hub: "Knowledge Hub", hubDesc: "منصة إدارة المعرفة الشخصية", inProgress: "قيد التطوير", planning: "تخطيط",
    learningPath: "مسار الورشة المضافة", workshop: "توظيف الذكاء الاصطناعي في تطوير الأبحاث العلمية",
    workshopDesc: "من مراجعة الأدبيات إلى التحليل والتوثيق والنشر، مع إبقاء الباحث مسؤولاً عن التحقق.",
    literature: "مراجعة الأدبيات", writing: "التحرير الأكاديمي", references: "إدارة المراجع", analysis: "تحليل البيانات", human: "الإنسان داخل الحلقة",
    agentTitle: "Agent Reality ChatGPT", agentSub: "مساعدك البحثي والمعرفي", agentPrompt: "ما الذي تريد العمل عليه اليوم؟",
    agentHint: "اسأل عن بحث، مرجع، مشروع، أو مفهوم علمي...", send: "إرسال", demo: "نموذج واجهة فقط · لم يتم ربط نموذج ذكاء اصطناعي بعد",
    recent: "آخر النشاطات", recentSub: "مساحة عمل منظمة وقابلة للتتبع", added: "تمت إضافة مواصفات الوكيل", updated: "تحديث خارطة الطريق", ready: "جاهز للمراجعة",
    theme: "المظهر", language: "اللغة", greeting: "أهلاً بك في Knowledge Hub",
    sections: "الأقسام", noResults: "لا توجد نتائج مطابقة.", mockReply: "هذه استجابة تجريبية من واجهة النموذج الأولي. عند ربط محرك الوكيل، ستُبنى الإجابة من المصادر التي تملك صلاحية الوصول إليها، وستظهر الاستشهادات وحالة التحقق."
  },
  en: {
    workspace: "Knowledge workspace", overview: "Overview", projects: "Projects", research: "Research & Sources",
    courses: "Courses & Workshops", agent: "AI Assistant", library: "Knowledge Library", admin: "Admin Console",
    search: "Search knowledge and projects...", welcome: "Welcome back", subtitle: "One workspace for your research, projects, and learning — with source-aware, permission-conscious AI assistance.",
    newResearch: "Start research", askAgent: "Ask the agent", activeProjects: "Active projects", researchPapers: "Research sources", learning: "Learning paths", completion: "Verified milestones",
    portfolio: "Project portfolio", portfolioSub: "Track your research and technical work in one place.", viewAll: "View all", open: "Open workspace",
    voice: "VoiceGuard Enterprise Agent", voiceDesc: "Evaluation framework for enterprise voice agents", sanad: "SANAD Research Project", sanadDesc: "Evaluation of phishing-resistant digital identity controls",
    hub: "Knowledge Hub", hubDesc: "Personal knowledge management platform", inProgress: "In progress", planning: "Planning",
    learningPath: "Featured learning path", workshop: "Applying AI to Scientific Research Development",
    workshopDesc: "From literature review to analysis, referencing, and publication — with researcher-led verification.",
    literature: "Literature review", writing: "Academic editing", references: "Reference management", analysis: "Data analysis", human: "Human in the loop",
    agentTitle: "Agent Reality ChatGPT", agentSub: "Your research and knowledge assistant", agentPrompt: "What would you like to work on today?",
    agentHint: "Ask about a paper, source, project, or research concept...", send: "Send", demo: "UI prototype only · no AI model is connected yet",
    recent: "Recent activity", recentSub: "A structured, traceable workspace", added: "Agent specification added", updated: "Roadmap updated", ready: "Ready for review",
    theme: "Theme", language: "Language", greeting: "Welcome to Knowledge Hub",
    sections: "Workspace", noResults: "No matching results.", mockReply: "This is a prototype response. Once the agent runtime is connected, answers will be grounded in records you are authorized to access, with source citations and verification status."
  }
};

const projects = [
  { key: "voice", name: "VoiceGuard Enterprise Agent", desc: "Evaluation framework for enterprise voice agents", status: "inProgress", progress: 68, initials: "VG", tone: "violet" },
  { key: "sanad", name: "SANAD Research Project", desc: "Phishing-resistant identity lifecycle controls", status: "inProgress", progress: 42, initials: "SN", tone: "blue" },
  { key: "hub", name: "Knowledge Hub", desc: "Personal knowledge management platform", status: "planning", progress: 24, initials: "KH", tone: "cyan" }
];

export default function HomePage() {
  const [lang, setLang] = useState<Language>("ar");
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<NavKey>("overview");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const t = copy[lang];
  const isAr = lang === "ar";
  const filteredProjects = useMemo(() => projects.filter(p => (p.name + " " + p.desc).toLowerCase().includes(query.toLowerCase())), [query]);

  function submitMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = message.trim();
    if (!value) return;
    setChat(items => [...items, { role: "user", text: value }, { role: "assistant", text: t.mockReply }]);
    setMessage("");
    setActive("agent");
  }

  const nav: { key: NavKey; label: string; icon: string }[] = [
    { key: "overview", label: t.overview, icon: "⌂" },
    { key: "projects", label: t.projects, icon: "▦" },
    { key: "research", label: t.research, icon: "⌕" },
    { key: "courses", label: t.courses, icon: "▤" },
    { key: "agent", label: t.agent, icon: "✳" },
    { key: "library", label: t.library, icon: "◫" }
  ];

  return (
    <main className="app-shell" data-theme={theme} dir={isAr ? "rtl" : "ltr"} lang={lang}>
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Knowledge Hub home">
          <span className="brand-mark">K<span>H</span></span>
          <span className="brand-copy"><strong>Knowledge Hub</strong><small>AI RESEARCH WORKSPACE</small></span>
        </Link>
        <div className="side-label">{t.sections}</div>
        <nav className="nav-list" aria-label={t.sections}>
          {nav.map(item => <button key={item.key} className={`nav-item ${active === item.key ? "active" : ""}`} onClick={() => setActive(item.key)}>
            <span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.key === "agent" && <i className="nav-dot" />}
          </button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="security-card"><span className="security-icon">◇</span><div><strong>{isAr ? "المعرفة أولاً" : "Knowledge first"}</strong><small>{isAr ? "مصادر موثوقة وصلاحيات واضحة" : "Trusted sources. Clear access."}</small></div></div>
          <a className="admin-link" href="/admin"><span>⚙</span>{t.admin}<span className="external">↗</span></a>
          <div className="profile"><div className="avatar">AA</div><div className="profile-text"><strong>Abdulbari Alqayadh</strong><small>Workspace owner</small></div><span className="more">···</span></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{nav.find(n => n.key === active)?.label}</strong></div>
          <div className="top-actions">
            <label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} aria-label={t.search}/><kbd>⌘ K</kbd></label>
            <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title={t.theme} aria-label={t.theme}>{theme === "dark" ? "☼" : "☾"}</button>
            <button className="lang-button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={t.language}>{lang === "ar" ? "EN" : "عربي"}</button>
            <div className="top-avatar">AA</div>
          </div>
        </header>

        <div className="content">
          {active === "overview" && <>
            <section className="hero">
              <div className="hero-copy"><div className="eyebrow"><span className="pulse" /> PERSONAL KNOWLEDGE INTELLIGENCE</div><h1>{t.welcome}<br/><span>Abdulbari.</span></h1><p>{t.subtitle}</p>
                <div className="hero-actions"><button className="primary-button" onClick={() => setActive("research")}>＋ {t.newResearch}</button><button className="secondary-button" onClick={() => setActive("agent")}>✳ {t.askAgent}</button></div>
              </div>
              <div className="orb-wrap"><div className="orb"><div className="orb-core">✳</div><span className="orbit orbit-one"/><span className="orbit orbit-two"/><i className="orb-star star-one">✦</i><i className="orb-star star-two">✧</i></div><div className="orb-caption">AGENT REALITY <b>●</b> READY FOR INTEGRATION</div></div>
              <div className="hero-grid-line"/>
            </section>

            <section className="stats-grid">
              <article className="stat-card"><div className="stat-top"><span>{t.activeProjects}</span><i className="stat-icon purple">▦</i></div><strong>03</strong><small><span className="trend">↗ 2</span> {isAr ? "مشاريع قيد العمل" : "projects in workspace"}</small></article>
              <article className="stat-card"><div className="stat-top"><span>{t.researchPapers}</span><i className="stat-icon blue">⌕</i></div><strong>—</strong><small>{isAr ? "بانتظار إضافة المصادر" : "Awaiting source ingestion"}</small></article>
              <article className="stat-card"><div className="stat-top"><span>{t.learning}</span><i className="stat-icon cyan">▤</i></div><strong>01</strong><small>{isAr ? "ورشة موثقة" : "workshop documented"}</small></article>
              <article className="stat-card"><div className="stat-top"><span>{t.completion}</span><i className="stat-icon green">✓</i></div><strong>—</strong><small>{isAr ? "سيتم احتسابها بعد تفعيل السجل" : "Available after records are enabled"}</small></article>
            </section>

            <section className="section-block">
              <div className="section-heading"><div><span className="eyebrow">YOUR WORK</span><h2>{t.portfolio}</h2><p>{t.portfolioSub}</p></div><button className="text-button" onClick={() => setActive("projects")}>{t.viewAll} <span>←</span></button></div>
              <div className="project-grid">{filteredProjects.map(p => <article className="project-card" key={p.key}><div className="project-head"><div className={`project-icon ${p.tone}`}>{p.initials}</div><button className="dots">···</button></div><h3>{p.name}</h3><p>{isAr ? (p.key === "voice" ? "إطار تقييم وكلاء الصوت المؤسسيين" : p.key === "sanad" ? "تقييم ضوابط الهوية الرقمية المقاومة للتصيد" : "منصة إدارة المعرفة الشخصية") : p.desc}</p><div className="project-status"><span className="status-dot"/>{p.status === "planning" ? t.planning : t.inProgress}<strong>{p.progress}%</strong></div><div className="progress-track"><span style={{width: p.progress + "%"}}/></div><button className="card-link" onClick={() => setActive("projects")}>{t.open} <span>↗</span></button></article>)}</div>
              {filteredProjects.length === 0 && <p className="empty-state">{t.noResults}</p>}
            </section>

            <section className="lower-grid">
              <article className="workshop-card"><div className="workshop-art"><span className="art-orbit"/><span className="art-glyph">✳</span><small>RESEARCH / AI</small></div><div className="workshop-content"><span className="eyebrow">{t.learningPath}</span><h3>{t.workshop}</h3><p>{t.workshopDesc}</p><div className="tag-row"><span>{t.literature}</span><span>{t.writing}</span><span>{t.references}</span></div><button className="card-link" onClick={() => setActive("courses")}>{t.open} <span>↗</span></button></div></article>
              <article className="activity-card"><div className="section-heading compact"><div><span className="eyebrow">TIMELINE</span><h2>{t.recent}</h2><p>{t.recentSub}</p></div></div><div className="activity-list"><div className="activity-item"><i className="activity-icon purple">✳</i><div><strong>{t.added}</strong><small>docs/AGENT_REALITY_CHATGPT.md</small></div><span>{t.ready}</span></div><div className="activity-item"><i className="activity-icon blue">↗</i><div><strong>{t.updated}</strong><small>docs/ROADMAP.md</small></div><span>{t.ready}</span></div></div></article>
            </section>
          </>}

          {active !== "overview" && <section className="workspace-panel">
            <span className="eyebrow">KNOWLEDGE HUB / {active.toUpperCase()}</span>
            <h1>{active === "agent" ? t.agentTitle : nav.find(n => n.key === active)?.label}</h1>
            <p className="panel-intro">{active === "agent" ? t.agentSub : t.subtitle}</p>
            {active === "agent" ? <div className="chat-panel"><div className="chat-header"><div className="agent-avatar">✳</div><div><strong>{t.agentTitle}</strong><small>{t.demo}</small></div><span className="prototype-pill">PROTOTYPE</span></div><div className="chat-body">{chat.length === 0 ? <div className="chat-empty"><div className="chat-empty-icon">✳</div><h2>{t.agentPrompt}</h2><p>{t.agentSub}</p><div className="suggestion-row"><button onClick={() => setMessage(isAr ? "ساعدني في بناء سؤال بحثي واضح" : "Help me formulate a clear research question")}>{isAr ? "صياغة سؤال بحثي" : "Research question"}</button><button onClick={() => setMessage(isAr ? "كيف أتحقق من مرجع أكاديمي؟" : "How do I verify an academic source?")}>{isAr ? "التحقق من المراجع" : "Verify a source"}</button></div></div> : chat.map((m,i) => <div className={`chat-message ${m.role}`} key={i}><span>{m.role === "user" ? "AA" : "✳"}</span><p>{m.text}</p></div>)}</div><form className="chat-input" onSubmit={submitMessage}><input value={message} onChange={e => setMessage(e.target.value)} placeholder={t.agentHint}/><button type="submit">{t.send} <span>↑</span></button></form><p className="chat-disclaimer">{t.demo}</p></div> : <div className="coming-grid"><article><span>✳</span><h3>{active === "courses" ? t.workshop : active === "projects" ? t.voice : active === "research" ? t.references : t.library}</h3><p>{active === "courses" ? t.workshopDesc : t.subtitle}</p><span className="coming-label">{isAr ? "مخطط للتنفيذ" : "Planned for implementation"}</span></article><article><span>◇</span><h3>{isAr ? "مصادر موثقة" : "Verified sources"}</h3><p>{isAr ? "ستظهر هنا المواد المرتبطة بهذا القسم بعد إعداد قاعدة البيانات." : "Records for this section will appear here after the database is configured."}</p><span className="coming-label">{isAr ? "بانتظار قاعدة البيانات" : "Database pending"}</span></article></div>}
          </section>}
          <footer className="footer"><span>KNOWLEDGE HUB © 2026</span><span>AI RESEARCH WORKSPACE <i/> {isAr ? "الإنسان يقرر، والذكاء الاصطناعي يساعد" : "Human decides. AI assists."}</span></footer>
        </div>
      </section>
    </main>
  );
}
