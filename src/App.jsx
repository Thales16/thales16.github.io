import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import TerrainBackground from './components/TerrainBackground';
import SmartCursor from './components/SmartCursor';
import { ArrowUpRight, ArrowUp, Download, Users, Layout, Check, Camera, Search, PenTool, Zap, Rocket, Plus, Minus, Menu, X, Sun, Moon, Eye } from 'lucide-react';

// --- DATA & TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      work: "Work",
      faq: "Q&A",
      cta: "Let's Talk",
      download: "Download Portfolio"
    },
    hero: {
      role: "UX/UI Designer",
      titlePart1: "Great Design",
      titlePart2: "Solves",
      titlePart2Italic: "Real",
      titlePart3: "Problems",
      desc: "I transform complex problems into intuitive, pixel-perfect interfaces. Focused on User Experience, Design Systems, and Brand Storytelling.",
      btn: "View Case Studies",
      scroll: "Scroll"
    },
    about: {
      label: "The Designer",
      title: "About",
      quote: "Design is not just making things pretty. It's about solving problems for real people.",
      section1Title: "User-Centered Approach",
      section1Desc: "My process starts with empathy. I dive deep into user needs through research and testing before placing a single pixel. I believe data should drive design decisions.",
      section2Title: "Scalable Systems",
      section2Desc: "I specialize in building robust Design Systems in Figma. I create atomic components and documentation that bridge the gap between creative vision and developer implementation.",
      stats: {
        exp: "Years Exp.",
        screens: "Screens Designed",
        focus: "User Focus"
      }
    },
    services: {
      label: "Capabilities",
      title: "What I do",
      stackLabel: "My Design Stack",
      list: [
        { id: "01", title: "UI Design", desc: "Creating impactful visual interfaces, focused on typography, grids, and consistent color systems." },
        { id: "02", title: "UX Research", desc: "Usability tests, user journeys, and information architecture to ground decisions." },
        { id: "03", title: "Interaction Design", desc: "Designing intuitive behaviors and meaningful transitions that guide users through complex flows with clarity and ease." },
        { id: "04", title: "Design Systems", desc: "Building scalable component libraries and comprehensive documentation to ensure visual consistency and efficient product evolution." }
      ]
    },
    projects: {
      label: "Selected Work",
      title: "Projects",
      viewMore: "Curious for more?",
      btnBehance: "Visit Behance",
      btnCase: "View Case",
      list: [
        {
          id: "01",
          title: "Lake House Real Estate",
          category: "Web Design · UX/UI",
          description: "Designing a premium real estate website focused on high-end lake properties. Optimized property discovery with advanced filters and a visual-first search experience to increase engagement and lead generation.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/lake house real state.png", // Nome exato do arquivo
          color: "#2a4d69"
        },
        {
          id: "02",
          title: "Digital Certificate LP",
          category: "Landing Page · CRO",
          description: "Creating a conversion-focused landing page to acquire partners for digital certificate sales. Applied UX and CRO principles to simplify form completion and boost qualified lead capture.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/capaPAGE.png",
          color: "#00c853"
        },
        {
          id: "03",
          title: "Sparkle App",
          category: "App Design · Visual Identity",
          description: "Redesigning a photo-sharing experience focused on visual quality and editorial-style publishing. Improved content discovery and user engagement through a clean dark UI and publication-oriented interactions.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/capa sparkle app.png",
          color: "#6200ea"
        }
      ]
    },
    process: {
      title: "How I",
      titleItalic: "Work.",
      steps: [
        {
          title: "Discovery",
          desc: "Deep dive into the problem. User interviews, data analysis, and benchmarking to understand the 'why'.",
          tags: ["User Interviews", "Benchmarking"]
        },
        {
          title: "Strategy",
          desc: "Information architecture and wireframing. Defining the logical structure and flows.",
          tags: ["User Flows", "Sitemaps"]
        },
        {
          title: "Visual Design",
          desc: "Transforming strategy into interface. Creating modern, accessible visual systems.",
          tags: ["High Fidelity", "Prototyping"]
        },
        {
          title: "Delivery",
          desc: "Detailed handoff and documentation. Working side-by-side with developers.",
          tags: ["Dev Handoff", "QA Testing"]
        }
      ]
    },
    faq: {
      label: "Insights",
      title: "Common",
      titleItalic: "Questions.",
      items: [
        {
          q: "Do you also do development?",
          a: "No. While I have Front-end knowledge (React/CSS) to ensure technical feasibility, I do not act as a developer. My focus is on delivering the best UX/UI solution for your development team to implement."
        },
        {
          q: "What is the average project timeline?",
          a: "It depends on the scope. A standard Landing Page typically takes 1-2 weeks. A full App redesign or a complex Dashboard can take anywhere from 4 to 8 weeks. I prioritize quality and research over rushing."
        },
        {
          q: "Do you design Logos/Branding?",
          a: "No. My focus is entirely on digital product design (websites, apps, and systems). I work on applying your existing brand identity to the interface, but I do not offer logo creation or full branding services."
        },
        {
          q: "How do you handoff to developers?",
          a: "I provide a comprehensive Figma file with a clear Design System, assets export, and a walkthrough video explaining the flows and interactions. I also remain available during implementation for QA."
        }
      ]
    },
    contact: {
      label: "What's Next?",
      title: "Let's work",
      titleBreak: "together.",
      copy: "Click to copy",
      copied: "Email copied!",
      location: "Location",
      socials: "Socials",
      credits: "Designed & Developed by Thales Sossella.\nBuilt with React & Framer Motion."
    }
  },
  pt: {
    nav: {
      about: "Sobre",
      services: "Serviços",
      work: "Projetos",
      faq: "FAQ",
      cta: "Vamos Conversar",
      download: "Baixar Portfólio"
    },
    hero: {
      role: "UX/UI Designer",
      titlePart1: "Design de Verdade",
      titlePart2: "Resolve",
      titlePart2Italic: "Problemas",
      titlePart3: "Reais",
      desc: "Transformo problemas complexos em interfaces intuitivas e pixel-perfect. Focado em Experiência do Usuário, Design Systems e Storytelling de Marca.",
      btn: "Ver Case Studies",
      scroll: "Role"
    },
    about: {
      label: "O Designer",
      title: "Sobre",
      quote: "Design não é apenas deixar bonito. É sobre resolver problemas para pessoas reais.",
      section1Title: "Abordagem Centrada no Usuário",
      section1Desc: "Meu processo começa com empatia. Mergulho nas necessidades do usuário através de pesquisa e testes antes de colocar um único pixel. Acredito que dados devem guiar decisões de design.",
      section2Title: "Sistemas Escaláveis",
      section2Desc: "Especialista em construir Design Systems robustos no Figma. Crio componentes atômicos e documentação que unem a visão criativa à implementação, garantindo consistência.",
      stats: {
        exp: "Anos de Exp.",
        screens: "Telas Desenhadas",
        focus: "Foco no Usuário"
      }
    },
    services: {
      label: "Capacidades",
      title: "O que faço",
      stackLabel: "Minhas Ferramentas",
      list: [
        { id: "01", title: "UI Design", desc: "Criação de interfaces visuais impactantes, com foco em tipografia, grids e sistemas de cores consistentes." },
        { id: "02", title: "UX Research", desc: "Testes de usabilidade, jornadas do usuário e arquitetura da informação para basear decisões." },
        { id: "03", title: "Interaction Design", desc: "Projetar comportamentos intuitivos e transições significativas que guiam os usuários por fluxos complexos com clareza e facilidade." },
        { id: "04", title: "Design Systems", desc: "Construção de bibliotecas de componentes escaláveis e documentação abrangente para garantir consistência visual e evolução eficiente do produto." }
      ]
    },
    projects: {
      label: "Trabalhos Selecionados",
      title: "Projetos",
      viewMore: "Curioso por mais?",
      btnBehance: "Visitar Behance",
      btnCase: "Ver Case",
      list: [
        {
          id: "01",
          title: "Lake House Real Estate",
          category: "Web Design · UX/UI",
          description: "Design de um site imobiliário premium focado em propriedades de lago de alto padrão. Otimização da descoberta de imóveis com filtros avançados e experiência visual para aumentar leads.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/lake house real state.png",
          color: "#2a4d69"
        },
        {
          id: "02",
          title: "LP Certificado Digital",
          category: "Landing Page · CRO",
          description: "Criação de Landing Page focada em conversão para aquisição de parceiros. Aplicação de princípios de UX e CRO para simplificar formulários e capturar leads qualificados.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/capaPAGE.png",
          color: "#00c853"
        },
        {
          id: "03",
          title: "Sparkle App",
          category: "App Design · Identidade Visual",
          description: "Redesign de app de fotos focado em qualidade visual e estilo editorial. Melhoria na descoberta de conteúdo e engajamento através de uma UI dark limpa e interações fluidas.",
          link: "https://www.behance.net/thalessossellaa", 
          img: "/capa sparkle app.png",
          color: "#6200ea"
        }
      ]
    },
    process: {
      title: "Como eu",
      titleItalic: "Trabalho.",
      steps: [
        {
          title: "Descoberta",
          desc: "Mergulho profundo no problema. Entrevistas, análise de dados e benchmarking para entender o 'porquê'.",
          tags: ["Entrevistas", "Benchmarking"]
        },
        {
          title: "Estratégia",
          desc: "Arquitetura da informação e wireframing. Definindo a estrutura lógica e fluxos de navegação.",
          tags: ["User Flows", "Sitemaps"]
        },
        {
          title: "Visual Design",
          desc: "Transformando estratégia em interface. Criando sistemas visuais modernos e acessíveis.",
          tags: ["Alta Fidelidade", "Prototipagem"]
        },
        {
          title: "Entrega",
          desc: "Handoff detalhado e documentação. Trabalho lado a lado com devs para garantir fidelidade.",
          tags: ["Dev Handoff", "QA Testing"]
        }
      ]
    },
    faq: {
      label: "Insights",
      title: "Perguntas",
      titleItalic: "Comuns.",
      items: [
        {
          q: "Você também programa?",
          a: "Não. Embora eu tenha conhecimento em Front-end (React/CSS) para garantir a viabilidade técnica, eu não atuo como desenvolvedor. Meu foco é entregar a melhor solução de UX/UI para que seu time de desenvolvimento implemente."
        },
        {
          q: "Qual o prazo médio de um projeto?",
          a: "Depende do escopo. Uma Landing Page padrão leva 1-2 semanas. Um App completo ou Dashboard complexo pode levar de 4 a 8 semanas. Priorizo qualidade e pesquisa ao invés da pressa."
        },
        {
          q: "Você cria Logos/Branding?",
          a: "Não. Meu foco é inteiramente no design de produtos digitais (sites e apps). Eu trabalho aplicando a identidade visual existente da sua marca na interface, mas não ofereço serviços de criação de logos ou branding do zero."
        },
        {
          q: "Como é a entrega para os devs?",
          a: "Entrego um arquivo Figma completo com Design System claro, exportação de assets e vídeo explicativo dos fluxos. Também fico disponível durante a implementação para QA (Garantia de Qualidade)."
        }
      ]
    },
    contact: {
      label: "O que vem agora?",
      title: "Vamos trabalhar",
      titleBreak: "juntos.",
      copy: "Clique para copiar",
      copied: "Email copiado!",
      location: "Localização",
      socials: "Redes",
      credits: "Design e Desenvolvimento por Thales Sossella.\nFeito com React & Framer Motion."
    }
  }
};

const tools = [
  "Figma", "Smart Animate", "Miro", "Maze", "ProtoPie", "Adobe CC", "User Research", "Design Systems", "Wireframing", "Usability Testing"
];

const loadingPhrases = [
  "Initializing Environment...",
  "Loading WebGL Textures...",
  "Compiling Assets...",
  "Calibrating Design System...",
  "Polishing Pixels...",
  "Ready."
];

// --- COMPONENTS ---

const MaskText = ({ children, delay = 0 }) => {
  return (
    <div style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ImageReveal = ({ src, alt }) => {
  return (
    <div className="img-reveal-container">
       <motion.img 
         src={src} 
         alt={alt}
         initial={{ scale: 1.3 }}
         whileInView={{ scale: 1 }}
         transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
         viewport={{ once: true }}
       />
       <div className="image-placeholder" style={{display:'none'}}><Camera size={40} color="#333" style={{marginBottom:'20px'}} />Photo Not Found</div>
    </div>
  );
};

const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVisible(latest > 0.15); 
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 90 }}
        >
           <button 
             onClick={scrollToTop} 
             className="scroll-top-btn"
           >
             <ArrowUp size={24} />
           </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const MagneticButton = ({ children, link }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.a
      href={link}
      target="_blank" 
      rel="noopener noreferrer"
      ref={ref}
      className="magnetic-btn"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  );
};

// --- UPDATED PROJECT CARD ---
const ProjectCard = ({ project, index, t }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]); // Reduced tilt for classier look
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} className={`project-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'}`} style={{ marginBottom: '140px' }}>
      
      {/* 3D CARD WRAPPER */}
      <motion.a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-visual-wrapper"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div className="project-card-3d" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          <div className="project-image-inner" style={{ transform: "translateZ(0px)" }}>
             {/* Image with zoom effect */}
             {project.img ? (
               <img src={project.img} alt={project.title} className="project-img-cover" />
             ) : (
               <div className="project-gradient-bg" style={{ background: `linear-gradient(135deg, var(--c-bg) 0%, ${project.color}20 100%)` }}></div>
             )}
             
             {/* Subtle overlay darkening on hover */}
             <div className="project-hover-overlay"></div>

             {/* BADGE - Fixed Top Left (Premium Glass Look) */}
             <div className="project-badge-container">
                 <div className="project-glass-badge">
                   <span className="dot-indicator"></span>
                   {project.category.split(' · ')[0]}
                 </div>
             </div>

             {/* CENTER BUTTON - Reveals on Hover */}
             <div className="project-center-btn">
                 <div className="view-case-circle">
                    <span className="view-text">VIEW</span>
                    <ArrowUpRight size={18} className="view-arrow"/>
                 </div>
             </div>

          </div>
        </motion.div>
      </motion.a>

      {/* TEXT DETAILS */}
      <div className="project-details">
        <div className="project-number-bg">{project.id}</div>
        <FadeUp>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {index === 0 && <><span>UI Design</span><span>Real Estate</span><span>Web</span></>}
            {index === 1 && <><span>Landing Page</span><span>Conversion</span><span>Sales</span></>}
            {index === 2 && <><span>Mobile App</span><span>Social</span><span>Dark Mode</span></>}
          </div>
          <div style={{ marginTop: '40px' }}>
            <MagneticButton link={project.link}>
              <span className="btn-text">{t.btnCase}</span>
              <div className="btn-icon"><ArrowUpRight size={20} /></div>
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

const ToolsCarousel = () => {
  return (
    <div className="marquee-container group">
      <div className="marquee-track">
        {[...tools, ...tools, ...tools, ...tools].map((tool, i) => (
          <span key={i} className="tool-item">
            {tool} <span className="separator">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const EmailCopyButton = ({ email, t }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="email-container" onClick={handleCopy}>
      {copied && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="copy-feedback">
          {t.copied} <Check size={14} style={{marginLeft: 5, verticalAlign: 'middle'}}/>
        </motion.div>
      )}
      <div className="email-display">{email}</div>
      <div style={{marginTop: '15px', fontSize: '0.8rem', color: 'var(--c-dim)', textTransform: 'uppercase', letterSpacing: '2px'}}>
        {copied ? t.copied : t.copy}
      </div>
    </div>
  );
};

const PremiumFAQ = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-premium-wrapper">
      {items.map((item, i) => (
        <motion.div 
           key={i} 
           className={`faq-premium-item ${openIndex === i ? 'active' : ''}`}
           onClick={() => toggle(i)}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: i * 0.1 }}
        >
          <div className="faq-header">
             <div className="faq-index">0{i + 1}</div>
             <h3 className="faq-question">{item.q}</h3>
             <div className="faq-icon-wrapper">
                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
             </div>
          </div>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="faq-body"
              >
                <div className="faq-answer-text">
                   {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- MODIFIED NAVBAR (WITH THEME & LANGUAGE TOGGLE) ---
const Navbar = ({ toggleTheme, theme, toggleLanguage, language, t }) => {
    const [activeTab, setActiveTab] = useState("hero");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const scrollTimeoutRef = useRef(null);
   
    useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious() || 0;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setHidden(false);
      }, 600);
    });
   
    useEffect(() => {
      const handleScroll = () => {
        const sections = ['hero', 'about', 'services', 'work', 'faq', 'contact'];
        let current = 'hero';
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              current = section;
            }
          }
        });
        setActiveTab(current);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
   
    const navLinks = [
      { id: 'about', label: t.about },
      { id: 'services', label: t.services },
      { id: 'work', label: t.work },
      { id: 'faq', label: t.faq },
    ];
   
    return (
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="navbar-fixed-wrapper"
      >
        <nav className="navbar-capsule">
          <a href="#hero" className="nav-logo-compact" onClick={() => setActiveTab('hero')}>
            <div className="logo-dot"></div>
            <span className="logo-text">Thales</span>
          </a>
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className={`nav-link-item ${activeTab === link.id ? 'active' : ''}`}
                onClick={() => setActiveTab(link.id)}
              >
                {activeTab === link.id && (
                  <motion.div 
                    layoutId="active-pill" 
                    layout
                    className="active-pill-bg" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="nav-link-text">{link.label}</span>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* LANGUAGE TOGGLE BUTTON */}
              <button onClick={toggleLanguage} className="lang-toggle-btn" aria-label="Toggle Language">
                <span style={{ fontWeight: language === 'en' ? 700 : 400 }}>EN</span>
                <span style={{ opacity: 0.4 }}>/</span>
                <span style={{ fontWeight: language === 'pt' ? 700 : 400 }}>PT</span>
              </button>

              {/* THEME TOGGLE BUTTON */}
              <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
                 {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="nav-cta-wrapper">
                    <a href="#contact" className="nav-cta-btn">
                      <span>{t.cta}</span>
                      <div className="glow-effect"></div>
                    </a>
              </div>
          </div>

          <button 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 15 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="mobile-menu-container"
              >
                <div className="mobile-menu-inner">
                  {navLinks.map((link) => (
                    <a 
                      key={link.id} 
                      href={`#${link.id}`} 
                      className="mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label} <ArrowUpRight size={14} style={{opacity: 0.5}}/>
                    </a>
                  ))}
                  <a href="#contact" className="mobile-link" style={{color: 'var(--c-accent)', fontWeight: 'bold'}} onClick={() => setIsMobileMenuOpen(false)}>
                      {t.cta} <ArrowUpRight size={14} color="var(--c-accent)"/>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    );
  };

// --- APP COMPONENT ---

function App() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   
  // States for Theme and Language
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Load Saved Preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const savedLang = localStorage.getItem('portfolio-lang') || 'en';
    
    setTheme(savedTheme);
    setLanguage(savedLang);
    document.body.className = savedTheme === 'light' ? 'light-mode' : '';
  }, []);

  // Theme Toggle Logic
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.body.className = newTheme === 'light' ? 'light-mode' : '';
  };

  // Language Toggle Logic
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'pt' : 'en';
    setLanguage(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  // Get current translations based on state
  const content = TRANSLATIONS[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        const next = prev + 1;
        if (next % 20 === 0 && next < 100) setPhraseIndex(p => Math.min(p + 1, loadingPhrases.length - 1));
        if (next > 100) { clearInterval(timer); setTimeout(() => setLoading(false), 800); return 100; }
        return next;
      });
    }, 25);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const columnVariants = {
    initial: { y: 0 },
    exit: (i) => ({ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 } })
  };

  const processIcons = [ <Search size={32} />, <Zap size={32} />, <PenTool size={32} />, <Rocket size={32} /> ];

  return (
    <>
      <div className="desktop-cursor"><SmartCursor /></div>
      <AnimatePresence mode="wait">
        {loading && (
          <div className="loader-container">
             <div className="loader-columns">
               {[...Array(5)].map((_, i) => (
                   <motion.div key={i} className="loader-column" variants={columnVariants} initial="initial" exit="exit" custom={i} />
               ))}
             </div>
             <motion.div className="loader-content" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}>
                <div className="loader-top-row"><span>Thales Sossella</span><span>Portfolio ©2026</span></div>
                <div className="loader-center">
                    <h1 className="loader-counter-big">{counter}</h1>
                    <div className="loader-phrase">{loadingPhrases[phraseIndex]}</div>
                </div>
                <div className="loader-bottom-row">
                    <div className="loader-progress-track">
                        <motion.div className="loader-progress-fill" animate={{ width: `${counter}%` }} />
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="main-content-wrapper">
          <TerrainBackground /> 
           
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none', 
              zIndex: 1, 
              background: theme === 'light' 
                ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.5), transparent 40%)`
                : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)` 
            }} 
          />
           
          <motion.div className="progress-bar" style={{ scaleX }} />

          <Navbar 
            toggleTheme={toggleTheme} 
            theme={theme} 
            toggleLanguage={toggleLanguage} 
            language={language}
            t={content.nav}
          />

          <main>
            <section id="hero" className="hero-section container">
              <div className="hero-content">
                <div>
                  <MaskText delay={0.5}>
                    <span className="label-editorial">
                      <span className="dot-accent"></span>{content.hero.role}
                    </span>
                  </MaskText>
                  <h1 className="display-text">
                    <MaskText delay={0.6}>{content.hero.titlePart1}</MaskText>
                    <MaskText delay={0.7}>{content.hero.titlePart2} <span className="italic">{content.hero.titlePart2Italic}</span></MaskText>
                    <MaskText delay={0.8}><span className="outline">{content.hero.titlePart3}</span></MaskText>
                  </h1>
                </div>
                <motion.div className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                  <p>{content.hero.desc}</p>
                  <a href="#work" className="btn-editorial">{content.hero.btn}</a>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2 }} style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>{content.hero.scroll}</span>
              </motion.div>
            </section>

            <section id="about" className="section container">
              <div className="about-grid">
                  <FadeUp>
                    <div style={{ position: 'sticky', top: '150px' }}>
                      <MaskText>
                        <span className="label-editorial"><span className="dot-accent"></span>{content.about.label}</span>
                      </MaskText>
                      <MaskText>
                        <h2 className="title-editorial">{content.about.title}<br/>Thales<span style={{color:'var(--c-accent)'}}>.</span></h2>
                      </MaskText>
                      <div style={{marginBottom: '30px'}}>
                        <span className="skill-pill">UI Design</span><span className="skill-pill">UX Research</span>
                        <span className="skill-pill">Interaction</span><span className="skill-pill">Strategy</span>
                      </div>
                      
                      <ImageReveal src="/fotoportfolio.jpg" alt="Thales Sossella" />
                      
                    </div>
                  </FadeUp>
                  <div>
                    <FadeUp delay={0.2}><blockquote className="quote">"{content.about.quote}"</blockquote></FadeUp>
                    <FadeUp delay={0.3}>
                        <h3 className="section-subtitle"><Users size={20} color="var(--c-accent)"/> {content.about.section1Title}</h3>
                        <p style={{ marginBottom: '40px' }}>{content.about.section1Desc}</p>
                    </FadeUp>
                    <FadeUp delay={0.4}>
                        <h3 className="section-subtitle"><Layout size={20} color="var(--c-accent)"/> {content.about.section2Title}</h3>
                        <p>{content.about.section2Desc}</p>
                    </FadeUp>
                    <FadeUp delay={0.5}>
                        <div className="glass-card">
                           <div><h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--c-text)' }}>1+</h3><span className="label" style={{marginBottom:0, fontSize: '0.7rem'}}>{content.about.stats.exp}</span></div>
                           <div><h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--c-text)' }}>30+</h3><span className="label" style={{marginBottom:0, fontSize: '0.7rem'}}>{content.about.stats.screens}</span></div>
                           <div><h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--c-text)' }}>100%</h3><span className="label" style={{marginBottom:0, fontSize: '0.7rem'}}>{content.about.stats.focus}</span></div>
                        </div>
                    </FadeUp>
                    <FadeUp delay={0.6}><a href="/Thales_Sossella_UXUI_Junior_2026.pdf" download className="btn-editorial" style={{marginTop: '40px'}}><Download size={18} style={{marginRight: '10px', verticalAlign: 'middle'}}/>{content.nav.download}</a></FadeUp>
                  </div>
              </div>

              <div id="services" style={{ marginTop: '180px', marginBottom: '100px' }}>
                  <FadeUp>
                      <span className="label-editorial"><span className="dot-accent"></span>{content.services.label}</span>
                      <MaskText>
                        <h3 className="title-editorial">{content.services.title}<span style={{color:'var(--c-accent)'}}>.</span></h3>
                      </MaskText>
                      <div className="services-list">
                         {content.services.list.map((service) => (
                            <div key={service.id} className="service-item">
                              <div style={{display:'flex', alignItems:'baseline'}}>
                                 <span className="service-number">{service.id}</span>
                                 <h4 className="service-title">{service.title}</h4>
                              </div>
                              <p className="service-desc">{service.desc}</p>
                              <ArrowUpRight size={24} color="var(--c-text)" />
                            </div>
                         ))}
                      </div>
                  </FadeUp>
              </div>

              <div className="full-width-breakout">
                  <FadeUp delay={0.7}>
                      <div className="stack-label">{content.services.stackLabel}</div>
                      <ToolsCarousel />
                  </FadeUp>
              </div>
            </section>

            <section id="work" className="section container">
               <FadeUp>
                 <span className="label-editorial"><span className="dot-accent"></span>{content.projects.label}</span>
                 <MaskText>
                   <h2 className="title-editorial">{content.projects.title}<span style={{color:'var(--c-accent)'}}>.</span></h2>
                 </MaskText>
               </FadeUp>
               <div style={{ display: 'flex', flexDirection: 'column', marginTop: '60px' }}>
                 {content.projects.list.map((project, index) => <ProjectCard key={project.id} project={project} index={index} t={content.projects} />)}
               </div>
               <FadeUp delay={0.2}>
                   <div className="view-more-container">
                      <p>{content.projects.viewMore}</p>
                      <MagneticButton link="https://www.behance.net/thalessossellaa">
                          <span className="btn-text">{content.projects.btnBehance}</span>
                          <div className="btn-icon"><ArrowUpRight size={20} /></div>
                      </MagneticButton>
                   </div>
               </FadeUp>
            </section>

            <section className="section container" style={{ position: 'relative', overflow: 'hidden' }}>
              <FadeUp>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '60px' }}>
                  <MaskText>
                    <h2 className="title-editorial">{content.process.title} <span className="italic" style={{ color: 'var(--c-accent)' }}>{content.process.titleItalic}</span></h2>
                  </MaskText>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--c-accent), transparent)', opacity: 0.3 }}></div>
                </div>
              </FadeUp>
              <div className="process-grid-modern">
                {content.process.steps.map((step, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.02 }} className="process-step-card">
                    <div className="step-number">0{idx + 1}</div>
                    <div className="step-content">
                      <div className="step-icon-wrapper">{processIcons[idx]}</div>
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-description">{step.desc}</p>
                      <ul className="step-tags">
                         {step.tags.map((tag, tIdx) => <li key={tIdx}>{tag}</li>)}
                      </ul>
                    </div>
                    <div className="card-glow" />
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="faq" className="section container">
                <FadeUp>
                  <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                      <span className="label-editorial" style={{justifyContent:'center'}}><span className="dot-accent"></span>{content.faq.label}</span>
                      <MaskText>
                        <h2 className="title-editorial">{content.faq.title} <br/><span className="italic" style={{color:'var(--c-text)'}}>{content.faq.titleItalic}</span></h2>
                      </MaskText>
                  </div>
                  <PremiumFAQ items={content.faq.items} />
                </FadeUp>
            </section>

            <section id="contact" className="contact-section container">
                <FadeUp>
                  <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}><span className="label" style={{color: 'var(--c-dim)', border: '1px solid var(--c-border)', padding: '5px 15px', borderRadius: '20px'}}>{content.contact.label}</span></div>
                  <MaskText>
                    <h2 className="big-cta-text">{content.contact.title}<br />{content.contact.titleBreak}</h2>
                  </MaskText>
                  <div style={{ textAlign: 'center', margin: '60px 0', position: 'relative' }}><EmailCopyButton email="tsossellac@gmail.com" t={content.contact} /></div>
                  <div className="footer-grid">
                    <div className="footer-col">
                        <h4>{content.contact.location}</h4>
                        <p style={{marginBottom: 0}}>Curitiba, Brazil</p>
                        <p style={{fontSize: '0.8rem', color: 'var(--c-dim)'}}>Local time: {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div className="footer-col">
                        <h4>{content.contact.socials}</h4>
                        <div className="social-list">
                            <a href="https://www.linkedin.com/in/thalessossella-uxuidesigner/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn <ArrowUpRight size={14}/></a>
                            <a href="https://www.behance.net/thalessossellaa" target="_blank" rel="noopener noreferrer" className="social-link">Behance <ArrowUpRight size={14}/></a>
                            <a href="https://www.instagram.com/sossellagallery/?utm_source=qr&igsh=MmFpOHJrNWJ6NTd6" target="_blank" rel="noopener noreferrer" className="social-link">Instagram <ArrowUpRight size={14}/></a>
                        </div>
                    </div>
                    <div className="footer-col"><h4>Credits</h4><p style={{fontSize: '0.85rem', whiteSpace: 'pre-line'}}>{content.contact.credits}</p></div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '-20px', left: '0', width: '100%', fontSize: '12vw', fontWeight: 'bold', color: 'rgba(255,255,255,0.01)', textAlign: 'center', pointerEvents: 'none', lineHeight: 0.8, zIndex: 0 }}>SOSSELLA</div>
                </FadeUp>
            </section>
            
            <ScrollToTop />
          </main>
        </div>
      )}
    </>
  );
}

export default App;