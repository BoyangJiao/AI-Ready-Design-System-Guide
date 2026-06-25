import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

export type NavSection = { id: string; label: string; icon: LucideIcon };

interface NavigationProps {
  sections: NavSection[];
  /** Which part this nav belongs to — drives the Part 1 / Part 2 switcher. */
  part: 1 | 2;
  subtitle?: string;
}

const partMeta = {
  1: { label: "AI-Ready DS", subtitle: "Part 1 · 理解与实践", to: "/" },
  2: { label: "Generative UI", subtitle: "Part 2 · 范式演进", to: "/part-2" },
} as const;

export function Navigation({ sections, part, subtitle }: NavigationProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. At the very bottom -> last section is active
      if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActive(sections[sections.length - 1]?.id ?? "");
        return;
      }

      // 2. Find the active section based on the top 30% of the viewport
      const targetY = window.innerHeight * 0.3;
      let currentActive = "";
      let minDistance = Infinity;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        if (rect.top <= targetY && rect.bottom >= targetY) {
          currentActive = id;
          break;
        }

        const distance = Math.abs(rect.top - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          currentActive = id;
        }
      }

      if (currentActive) {
        setActive((prev) => (currentActive !== prev ? currentActive : prev));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const isDark = part === 2;

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
      <nav
        className={`hidden lg:flex fixed left-0 top-0 h-screen w-64 backdrop-blur-xl border-r flex-col z-40 ${
          isDark ? "bg-[#0a0f1d]/90 border-white/10" : "bg-white/80 border-gray-200/60"
        }`}
      >
        <div className={`p-6 border-b ${isDark ? "border-white/10" : "border-gray-100"}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className={`text-[15px] tracking-tight ${isDark ? "text-white" : ""}`} style={{ fontWeight: 600 }}>
              {partMeta[part].label}
            </span>
          </div>
          <p className={`text-[12px] mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {subtitle ?? partMeta[part].subtitle}
          </p>
        </div>

        {/* Part switcher */}
        <PartSwitcher part={part} isDark={isDark} />

        <div className="flex-1 overflow-y-auto py-4 px-3">
          {sections.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] mb-1 transition-all duration-200 text-left ${
                  isActive
                    ? isDark
                      ? "bg-blue-500/15 text-blue-300"
                      : "bg-violet-50 text-violet-700"
                    : isDark
                    ? "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                style={{ fontWeight: isActive ? 500 : 400 }}
              >
                <Icon
                  size={16}
                  className={
                    isActive
                      ? isDark
                        ? "text-blue-400"
                        : "text-violet-500"
                      : "text-gray-400"
                  }
                />
                {label}
                {isActive && (
                  <ChevronRight size={14} className={`ml-auto ${isDark ? "text-blue-400" : "text-violet-400"}`} />
                )}
              </button>
            );
          })}
        </div>
        <div className={`p-4 border-t ${isDark ? "border-white/10" : "border-gray-100"}`}>
          <div className={`text-[11px] text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            2026 · AI-Ready Design System Handbook
          </div>
          <div className={`text-[10px] text-center mt-1 ${isDark ? "text-gray-600" : "text-gray-300"}`}>
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
              className={`fixed left-0 top-0 h-screen w-72 shadow-2xl z-50 lg:hidden flex flex-col ${
                isDark ? "bg-[#0a0f1d]" : "bg-white"
              }`}
            >
              <div className={`p-6 border-b flex items-center justify-between ${isDark ? "border-white/10" : "border-gray-100"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className={`text-[15px] tracking-tight ${isDark ? "text-white" : ""}`} style={{ fontWeight: 600 }}>
                    {partMeta[part].label}
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <PartSwitcher part={part} isDark={isDark} onNavigate={() => setMobileOpen(false)} />

              <div className="flex-1 overflow-y-auto py-4 px-3">
                {sections.map(({ id, label, icon: Icon }) => {
                  const isActive = active === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] mb-1 transition-all duration-200 text-left ${
                        isActive
                          ? isDark
                            ? "bg-blue-500/15 text-blue-300"
                            : "bg-violet-50 text-violet-700"
                          : isDark
                          ? "text-gray-400 hover:bg-white/5"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={{ fontWeight: isActive ? 500 : 400 }}
                    >
                      <Icon size={16} className={isActive ? (isDark ? "text-blue-400" : "text-violet-500") : "text-gray-400"} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function PartSwitcher({ part, isDark, onNavigate }: { part: 1 | 2; isDark: boolean; onNavigate?: () => void }) {
  const tabs = [1, 2] as const;
  return (
    <div className="px-3 pt-4">
      <div className={`grid grid-cols-2 gap-1 p-1 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
        {tabs.map((p) => {
          const isCurrent = p === part;
          return (
            <Link
              key={p}
              to={partMeta[p].to}
              onClick={onNavigate}
              className={`text-center px-2 py-1.5 rounded-lg text-[12px] transition-all ${
                isCurrent
                  ? isDark
                    ? "bg-blue-500/20 text-blue-200"
                    : "bg-white text-violet-700 shadow-sm"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontWeight: isCurrent ? 600 : 400 }}
            >
              Part {p}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
