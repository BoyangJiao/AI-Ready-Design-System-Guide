import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Blocks, Wand2, ShieldCheck, Zap, Clock, User } from "lucide-react";

/**
 * 幕 1 · UI 的三个世代 (Part 2 核心 / spine)
 * Static → Declarative → Generative,沿「可靠性 ↔ 灵活性」光谱展开。
 * 对标 Part 1 的 AIReadyComparison 交互风格。
 */

type Gen = "static" | "declarative" | "generative";

const generations: Record<
  Gen,
  {
    icon: typeof Lock;
    label: string;
    en: string;
    accent: string; // tailwind color stem
    decides: string;
    when: string;
    builder: string;
    desc: string;
    examples: string[];
    pros: string[];
    cons: string[];
    reliability: number; // 0-100
    flexibility: number; // 0-100
    code: string;
  }
> = {
  static: {
    icon: Lock,
    label: "静态 UI",
    en: "Static UI",
    accent: "emerald",
    decides: "设计师",
    when: "构建时 (build-time)",
    builder: "设计师手工设计每一个界面与状态",
    desc: "组件与界面预先建好,AI 最多只填参数(文案、数值)。这是我们当下的世界——也是关键路径最可靠的选择。",
    examples: ["天气卡片只换城市与温度", "固定格式的报表 / 折线图", "支付、合规等关键流程"],
    pros: ["最高可靠性与可访问性", "品牌与体验完全可控", "易于测试与回归"],
    cons: ["所有界面必须提前穷举", "无法适配个体差异", "迭代成本高、响应慢"],
    reliability: 95,
    flexibility: 20,
    code: `// AI 只能触发预建好的组件
showCard({
  type: "WeatherCard",
  city: "Shanghai",
  temp: 24
})`,
  },
  declarative: {
    icon: Blocks,
    label: "声明式 UI",
    en: "Declarative UI",
    accent: "blue",
    decides: "AI 在设计师定义的边界内挑选 + 组装",
    when: "配置时 (config-time)",
    builder: "设计师维护「组件 registry」,AI 负责编排",
    desc: "AI 从一个预先审核过的组件库(registry)里挑选、组合,用有限积木拼出近乎无限的界面。安全与灵活的平衡点,也是当下生产可用的主力形态。",
    examples: ["对话式助手动态拼装回答界面", "可混搭的仪表盘", "AI 按意图组合 Card / Chart / Table"],
    pros: ["在约束内保持一致与品牌安全", "灵活度大幅提升", "今天就能落地生产"],
    cons: ["需要前期设计并维护 registry", "组合爆炸需要规则约束", "对设计系统质量高度依赖"],
    reliability: 70,
    flexibility: 65,
    code: `// AI 返回结构化的 UI 描述
{ layout: "stack", children: [
  { component: "LineChart", data: "..." },
  { component: "TableCard", rows: "..." }
]}  // 前端用 registry 渲染`,
  },
  generative: {
    icon: Wand2,
    label: "生成式 UI",
    en: "Generative UI",
    accent: "purple",
    decides: "AI 实时为「当前这个人」生成界面",
    when: "运行时 (run-time)",
    builder: "设计师定义目标、约束与护栏,AI 现场生成",
    desc: "界面由 AI 在运行时、为每个用户的目标与上下文实时生成。为每个个体定制一套界面——Jarvis 式的未来。",
    examples: ["按单个用户目标实时拼装的界面", "AI 直接产出 HTML/CSS 原型", "千人千面的自适应体验"],
    pros: ["极致个性化与速度", "按个体目标优化", "创意与适应性最大化"],
    cons: ["可靠性 / 一致性 / 可访问性难控", "安全与品牌风险", "目前更适合原型与 build-time"],
    reliability: 35,
    flexibility: 95,
    code: `// AI 运行时直接生成界面
prompt: "为高净值用户生成基金认购流"
→ <section> …AI 现场产出的界面… </section>
// 自由度最高,也最需要护栏`,
  },
};

const order: Gen[] = ["static", "declarative", "generative"];

const accentMap: Record<string, { text: string; bg: string; border: string; dot: string; grad: string }> = {
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400", grad: "from-emerald-500 to-teal-500" },
  blue: { text: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400", grad: "from-blue-500 to-indigo-500" },
  purple: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400", grad: "from-purple-500 to-fuchsia-500" },
};

export function UIParadigmShift() {
  const [active, setActive] = useState<Gen>("static");
  const g = generations[active];
  const c = accentMap[g.accent];

  return (
    <section id="paradigm" className="py-24 px-6 bg-[#0a0f1d] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-[12px] mb-4" style={{ fontWeight: 600 }}>
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent tracking-wide">THE SPECTRUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4 text-white" style={{ fontWeight: 800, lineHeight: 1.2 }}>
            UI 的三个世代
          </h2>
          <p className="text-gray-400 text-[15px] max-w-2xl mx-auto" style={{ lineHeight: 1.8 }}>
            这是一条<span className="text-gray-200">可靠性 ↔ 灵活性</span>的光谱。
            <span className="text-blue-300">光谱的哪一边更亮，取决于业务背景、产品类型和组织协同方式。</span>
          </p>
        </motion.div>

        {/* Spectrum bar */}
        <div className="relative mb-10 px-2">
          <div className="h-[2px] bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded-full" />
          <div className="flex justify-between mt-3 text-[11px] text-gray-500 font-mono">
            <span className="text-emerald-400">← 更可靠 / 更可控</span>
            <span className="text-purple-400">更灵活 / 更个性化 →</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
          {order.map((key) => {
            const item = generations[key];
            const ic = accentMap[item.accent];
            const isActive = active === key;
            const Icon = item.icon;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-2xl border transition-all ${
                  isActive ? `${ic.bg} ${ic.border}` : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.grad} flex items-center justify-center ${isActive ? "" : "opacity-60"}`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="text-center">
                  <div className={`text-[13px] ${isActive ? "text-white" : "text-gray-400"}`} style={{ fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">{item.en}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Left: narrative */}
            <div className={`rounded-3xl border ${c.border} ${c.bg} p-7`}>
              <p className="text-[14px] text-gray-200 mb-6" style={{ lineHeight: 1.8 }}>{g.desc}</p>

              <div className="space-y-3 mb-6">
                <MetaRow icon={User} label="谁决定界面" value={g.decides} accent={c} />
                <MetaRow icon={Clock} label="决定发生在" value={g.when} accent={c} />
                <MetaRow icon={Blocks} label="谁来构建" value={g.builder} accent={c} />
              </div>

              {/* reliability / flexibility meters */}
              <div className="space-y-3">
                <Meter label="可靠性 / 可控" value={g.reliability} icon={ShieldCheck} accent="emerald" />
                <Meter label="灵活 / 个性化" value={g.flexibility} icon={Zap} accent="purple" />
              </div>
            </div>

            {/* Right: examples + code */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-[12px] text-gray-400 uppercase tracking-wider mb-4" style={{ fontWeight: 600 }}>典型场景</div>
                <div className="space-y-2">
                  {g.examples.map((ex) => (
                    <div key={ex} className={`text-[13px] text-gray-300 ${c.bg} rounded-lg px-3 py-2 border ${c.border}`}>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-black/40 border border-white/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-[11px] text-gray-500 font-mono">{g.en.toLowerCase().replace(" ", "-")}.ts</span>
                </div>
                <pre className="text-[12px] text-gray-300 whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}>
                  {g.code}
                </pre>
              </div>

              {/* pros / cons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                  <div className="text-[12px] text-emerald-300 mb-2" style={{ fontWeight: 600 }}>优势</div>
                  <ul className="space-y-1.5">
                    {g.pros.map((p) => (
                      <li key={p} className="text-[12px] text-gray-400" style={{ lineHeight: 1.5 }}>· {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-4">
                  <div className="text-[12px] text-red-300 mb-2" style={{ fontWeight: 600 }}>代价</div>
                  <ul className="space-y-1.5">
                    {g.cons.map((p) => (
                      <li key={p} className="text-[12px] text-gray-400" style={{ lineHeight: 1.5 }}>· {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Our judgment — Declarative is likely the destination, not a transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-9"
        >
          <p className="text-[17px] sm:text-[19px] text-white mb-3" style={{ fontWeight: 700, lineHeight: 1.55, textWrap: "balance" }}>
            <span className="text-blue-300">对大多数产品，Declarative 往往就够了。</span>
          </p>
          <p className="text-[13.5px] text-gray-400" style={{ lineHeight: 1.8 }}>
            生成发生在边缘,稳定守在核心。
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-gray-400 bg-black/30 rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-emerald-300">落点:</span>
            Static 起步 · Declarative 承载主力 · Generative 留给可控实验
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetaRow({ icon: Icon, label, value, accent }: { icon: typeof User; label: string; value: string; accent: { text: string } }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={15} className={`${accent.text} mt-0.5 shrink-0`} />
      <div>
        <div className="text-[11px] text-gray-500 uppercase tracking-wide">{label}</div>
        <div className="text-[13px] text-gray-200" style={{ lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  );
}

function Meter({ label, value, icon: Icon, accent }: { label: string; value: number; icon: typeof Zap; accent: "emerald" | "purple" }) {
  const grad = accent === "emerald" ? "from-emerald-400 to-teal-400" : "from-purple-400 to-fuchsia-400";
  const text = accent === "emerald" ? "text-emerald-300" : "text-purple-300";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <Icon size={13} className={text} />
          {label}
        </span>
        <span className={`text-[12px] font-mono ${text}`}>{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${grad}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
