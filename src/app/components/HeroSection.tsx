import { motion } from "motion/react";
import { Sparkles, ArrowDown, Figma, Code, Cpu, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-[13px] mb-8" style={{ fontWeight: 500 }}>
            <Sparkles size={14} />
            2026 · Design System × AI 新范式
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-violet-800 to-indigo-700 bg-clip-text text-transparent"
            style={{ fontWeight: 700, lineHeight: 1.15 }}
          >
            构建 AI-Ready 的
            <br />
            设计系统
          </h1>

          <p className="text-gray-500 text-[17px] max-w-2xl mx-auto mb-12" style={{ lineHeight: 1.7 }}>
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
            { icon: Figma, label: "Design System", color: "from-pink-500 to-red-500" },
            { icon: Zap, label: "AI Skills", color: "from-amber-500 to-orange-500" },
            { icon: Cpu, label: "MCP Protocol", color: "from-violet-500 to-indigo-500" },
            { icon: Code, label: "Code Output", color: "from-emerald-500 to-teal-500" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                >
                  <item.icon size={24} className="text-white" />
                </div>
                <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
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
                  <div className="w-12 h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
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
            { value: "高保真", label: "代码更贴近设计意图" },
            { value: "可维护", label: "Token 驱动 · 系统化产出" },
            { value: "少返工", label: "减少设计-开发的来回沟通" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-5"
            >
              <div className="text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                {stat.value}
              </div>
              <div className="text-[13px] text-gray-500 mt-1">{stat.label}</div>
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
            className="inline-flex items-center gap-2 text-[13px] text-gray-400 hover:text-violet-500 transition-colors"
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
