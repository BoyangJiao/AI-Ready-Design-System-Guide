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
      { threshold: 0.1, rootMargin: "-100px 0px -60% 0px" }
    );

    const handleScroll = () => {
      // If at bottom of page, always focus bestpractices
      if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActive("bestpractices");
      }
    };

    window.addEventListener("scroll", handleScroll);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
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
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-2.5 shadow-lg"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/60 flex-col z-40">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-[15px] tracking-tight" style={{ fontWeight: 600 }}>
              AI-Ready DS
            </span>
          </div>
          <p className="text-[12px] text-gray-500 mt-2">
            设计系统教学指南
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] mb-1 transition-all duration-200 text-left ${active === id
                ? "bg-violet-50 text-violet-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              style={{ fontWeight: active === id ? 500 : 400 }}
            >
              <Icon size={16} className={active === id ? "text-violet-500" : "text-gray-400"} />
              {label}
              {active === id && (
                <ChevronRight size={14} className="ml-auto text-violet-400" />
              )}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="text-[11px] text-gray-400 text-center">2026 · AI-Ready Design System Handbook</div>
          <div className="text-[10px] text-gray-300 text-center mt-1">
            © Boyang Jiao All Rights Reserved
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="text-[15px] tracking-tight" style={{ fontWeight: 600 }}>
                    AI-Ready DS
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] mb-1 transition-all duration-200 text-left ${active === id
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                    style={{ fontWeight: active === id ? 500 : 400 }}
                  >
                    <Icon size={16} className={active === id ? "text-violet-500" : "text-gray-400"} />
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