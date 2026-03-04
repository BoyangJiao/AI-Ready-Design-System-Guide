import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Sparkles,
  BookOpen,
  Workflow,
  Trophy,
  ChevronRight,
  Menu,
  X,
  Rocket,
  Music,
} from "lucide-react";

const sections = [
  { id: "hero", label: "概览", icon: Sparkles },
  { id: "mindset", label: "核心理念", icon: BookOpen },
  { id: "protocol", label: "设计系统即协议", icon: Music },
  { id: "comparison", label: "交互式对比", icon: Sparkles },
  { id: "layers", label: "图层与结构", icon: Layers },
  { id: "autolayout", label: "Auto Layout", icon: Workflow },
  { id: "components", label: "组件与变体", icon: Layers },
  { id: "tokens", label: "Design Tokens", icon: Sparkles },
  { id: "skills", label: "Skills & MCP", icon: Rocket },
  { id: "workflow", label: "工作流实战", icon: Workflow },
  { id: "bestpractices", label: "最佳实践", icon: Trophy },
];

export function Navigation() {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-washi-warm/95 border border-border rounded-md p-2.5 shadow-sm"
      >
        {mobileOpen ? <X size={20} className="text-ink-primary" /> : <Menu size={20} className="text-ink-primary" />}
      </button>

      {/* Desktop sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-washi-warm/90 border-r border-border flex-col z-40">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-indigo flex items-center justify-center">
              <Sparkles size={16} className="text-washi-cream" />
            </div>
            <span className="text-[15px] tracking-tight font-serif text-ink-primary" style={{ fontWeight: 600 }}>
              AI-Ready DS
            </span>
          </div>
          <p className="text-[12px] text-ink-muted mt-2 font-sans">
            设计系统教学指南
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] mb-1 transition-all duration-200 text-left font-sans ${
                active === id
                  ? "bg-indigo/10 text-indigo"
                  : "text-ink-muted hover:bg-washi-cream hover:text-ink-primary"
              }`}
              style={{ fontWeight: active === id ? 500 : 400 }}
            >
              <Icon size={16} className={active === id ? "text-indigo" : "text-stone"} />
              {label}
              {active === id && (
                <ChevronRight size={14} className="ml-auto text-indigo/60" />
              )}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="text-[11px] text-ink-muted text-center font-sans">2026 · AI-Ready Design System Handbook</div>
          <div className="text-[10px] text-stone/60 text-center mt-1 font-sans">
            &copy; Boyang Jiao All Rights Reserved
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-primary/20 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-screen w-72 bg-washi-warm shadow-lg z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-indigo flex items-center justify-center">
                    <Sparkles size={16} className="text-washi-cream" />
                  </div>
                  <span className="text-[15px] tracking-tight font-serif text-ink-primary" style={{ fontWeight: 600 }}>
                    AI-Ready DS
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-ink-muted" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] mb-1 transition-all duration-200 text-left font-sans ${
                      active === id
                        ? "bg-indigo/10 text-indigo"
                        : "text-ink-muted hover:bg-washi-cream"
                    }`}
                    style={{ fontWeight: active === id ? 500 : 400 }}
                  >
                    <Icon size={16} className={active === id ? "text-indigo" : "text-stone"} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
