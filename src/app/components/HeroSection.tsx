import { motion } from "motion/react";
import { Sparkles, ArrowDown, Figma, Code, Cpu, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Washi paper background - subtle warm tones */}
      <div className="absolute inset-0 bg-washi-cream" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-indigo/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-ochre/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo/10 text-indigo text-[13px] mb-8 font-sans" style={{ fontWeight: 500 }}>
            <Sparkles size={14} />
            2026 · Design System x AI 新范式
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 text-ink-primary font-serif"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            构建 AI-Ready 的
            <br />
            设计系统
          </h1>

          <p className="text-ink-muted text-[17px] max-w-2xl mx-auto mb-12 font-sans" style={{ lineHeight: 1.8 }}>
            从"视觉稿"进化为"结构化的开发蓝图"。
            <br />
            让 AI 精准理解设计意图，实现高保真代码生成。
          </p>
        </motion.div>

        {/* Animated flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16"
        >
          {[
            { icon: Figma, label: "Design System", color: "bg-ochre" },
            { icon: Zap, label: "AI Skills", color: "bg-indigo" },
            { icon: Cpu, label: "MCP Protocol", color: "bg-bamboo" },
            { icon: Code, label: "Code Output", color: "bg-ink-secondary" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md ${item.color} flex items-center justify-center shadow-sm`}
                >
                  <item.icon size={24} className="text-washi-cream" />
                </div>
                <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>
                  {item.label}
                </span>
              </motion.div>
              {i < 3 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className="hidden sm:block"
                >
                  <div className="w-12 h-[1px] bg-stone/40 rounded-full" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Key metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "85%+", label: "代码还原度提升" },
            { value: "3x", label: "开发效率倍增" },
            { value: "60%", label: "减少沟通成本" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-washi-warm border border-border rounded-md p-5"
            >
              <div className="text-2xl text-indigo font-serif" style={{ fontWeight: 700 }}>
                {stat.value}
              </div>
              <div className="text-[13px] text-ink-muted mt-1 font-sans">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <button
            onClick={() => document.getElementById("mindset")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-[13px] text-stone hover:text-indigo transition-colors font-sans"
          >
            开始探索
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
