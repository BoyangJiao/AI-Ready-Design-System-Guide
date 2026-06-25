import { motion } from "motion/react";
import { Database, ShieldCheck, Blocks, Palette, ArrowRight, Music, Sparkles } from "lucide-react";

/**
 * 幕 3 · 题眼:设计系统是生成式 UI 的基础设施
 * 把弧线收回 Part 1——你的组件库 = registry,你的 tokens/规范 = 护栏。
 * 这是「抬高 DS 重视度」的高潮段。
 */

const mappings = [
  {
    icon: Blocks,
    p1: "组件库 + 变体",
    p2: "Declarative UI 的组件 Registry",
    desc: "AI 能挑选、组装的那套「积木」,正是你在 Part 1 封装好的组件与属性。registry 的质量,直接决定生成界面的上限。",
  },
  {
    icon: Palette,
    p1: "Design Tokens + 规范",
    p2: "Generative UI 的护栏 (Guardrails)",
    desc: "当 AI 自由生成时,token 与规范就是「不可逾越的边界」——保证再自由的生成也始终在品牌与体验之内。",
  },
  {
    icon: ShieldCheck,
    p1: "语义化结构 + Knowledge Base",
    p2: "Agent 可读的「意图层」",
    desc: "语义命名、约束、Knowledge Base(What)与 Skills(How),让 Agent 直接读懂设计意图。",
  },
];

export function DSAsInfrastructure() {
  return (
    <section id="infrastructure" className="py-24 px-6 bg-[#0a0f1d] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-blue-600/8 rounded-full blur-[130px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-[12px] mb-5" style={{ fontWeight: 600 }}>
            <Database size={13} className="text-blue-300" />
            <span className="text-blue-200 tracking-wide">THE PAYOFF</span>
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight mb-6 text-white" style={{ fontWeight: 800, lineHeight: 1.2 }}>
            设计系统不会消亡,<br />它会变成生成式 UI 的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">基础设施</span>
          </h2>
          <p className="text-gray-400 text-[16px] max-w-3xl mx-auto" style={{ lineHeight: 1.85 }}>
            <span className="text-gray-200">你给模型的自由越多，你就越需要投资规范。而规范就是你的设计系统。</span>
          </p>
        </motion.div>

        {/* Part 1 → Part 2 mapping */}
        <div className="space-y-4 mb-16">
          {mappings.map((m, i) => (
            <motion.div
              key={m.p2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <m.icon size={22} className="text-white" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1">
                  <div className="sm:w-[30%]">
                    <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Part 1 · 你打磨的</div>
                    <div className="text-[15px] text-gray-200" style={{ fontWeight: 600 }}>{m.p1}</div>
                  </div>
                  <ArrowRight size={18} className="text-blue-400 shrink-0 hidden sm:block" />
                  <div className="sm:w-[35%]">
                    <div className="text-[11px] text-blue-400/70 uppercase tracking-wide mb-1">Part 2 · 它变成</div>
                    <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>{m.p2}</div>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-gray-400 mt-4 sm:pl-[68px]" style={{ lineHeight: 1.7 }}>{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Callback to the "score" metaphor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-1 shadow-2xl shadow-blue-900/20"
        >
          <div className="bg-[#0a0f1d] rounded-[22px] p-8 md:p-12 flex flex-col items-center text-center">
            <Music className="text-blue-400 mb-5" size={30} />
            <p className="text-2xl md:text-3xl text-white leading-snug max-w-3xl" style={{ fontWeight: 700, textWrap: "balance" }}>
              你今天打磨的那份<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">「乐谱」</span>,
              正是明天 Generative UI 的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">底层引擎</span>。
            </p>
            <p className="text-gray-400 text-[14px] mt-5 max-w-2xl" style={{ lineHeight: 1.8 }}>
              所以,投资设计系统从来没有像今天这样重要——它是组织在生成式时代的核心资产。
            </p>
            <div className="inline-flex items-center gap-2 mt-6 text-[12px] text-blue-300">
              <Sparkles size={14} />
              这,就是我们今天最该被记住的一句话
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
