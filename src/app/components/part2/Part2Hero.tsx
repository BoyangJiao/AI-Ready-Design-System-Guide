import { motion } from "motion/react";
import { ArrowDown, Code2, Brain, Cpu } from "lucide-react";
import karpathyPost from "../../../assets/karpathy-post.png";

/**
 * 幕 0 · 范式跃迁 (Part 2 Hero)
 * 用 Karpathy "Software is changing again" 把观众从「实操」切换到「范式」。
 * 顶层框架:我们仍处在静态 UI 时代的末期。
 */
export function Part2Hero() {
  return (
    <section id="part2hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-[#0a0f1d]" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-[12px] mb-8" style={{ fontWeight: 600 }}>
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent tracking-widest">
              PART 2 · THE NEXT PARADIGM
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 text-white" style={{ fontWeight: 800, lineHeight: 1.15 }}>
            软件正在<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">再一次</span>被重写
          </h1>

          <p className="text-gray-400 text-[16px] sm:text-[18px] max-w-2xl mx-auto mb-4" style={{ lineHeight: 1.8 }}>
            我们仍处在「静态 UI」时代——必须先设计、再开发,为「平均用户」交付一套固定界面。
          </p>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto mb-14" style={{ lineHeight: 1.8 }}>
            但 UI 正沿着一条清晰的光谱演进:<span className="text-gray-300">Static → Declarative → Generative</span>。
            这一章,我们看清这条演进线,以及设计师在其中的位置。
          </p>
        </motion.div>

        {/* Software 1.0 / 2.0 / 3.0 — Karpathy framing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { icon: Code2, tag: "Software 1.0", desc: "人写代码 · 显式指令", color: "from-gray-500 to-gray-600" },
            { icon: Brain, tag: "Software 2.0", desc: "神经网络 · 权重即程序", color: "from-indigo-500 to-blue-600" },
            { icon: Cpu, tag: "Software 3.0", desc: "Prompt 即程序 · 自然语言驱动", color: "from-blue-500 to-purple-600" },
          ].map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left backdrop-blur-sm"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon size={20} className="text-white" />
              </div>
              <div className="text-[13px] text-white font-mono mb-1">{s.tag}</div>
              <div className="text-[12px] text-gray-400" style={{ lineHeight: 1.6 }}>{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Karpathy's own post — the primary artifact */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="max-w-[420px] mx-auto mb-16"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 shadow-2xl shadow-black/50">
            <img
              src={karpathyPost}
              alt="Andrej Karpathy 关于 GUI 将「按需生成」的推文(2025.05)"
              className="w-full rounded-xl"
              loading="lazy"
            />
          </div>
          <figcaption className="text-[12px] text-gray-500 mt-3 text-left" style={{ lineHeight: 1.7 }}>
            <span className="text-gray-400">Andrej Karpathy · 2025.05</span> ——
            他预测 GUI 将「按需生成、为你即时重配」,并亲口判断:
            <span className="text-blue-300">「我猜会是混合的,React 组件作为主要骨架。」</span>
            这正是我们说的:生成在边缘,稳定守核心。
          </figcaption>
        </motion.figure>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={() => document.getElementById("paradigm")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-[13px] text-gray-500 hover:text-blue-400 transition-colors"
        >
          看清这条演进线
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
