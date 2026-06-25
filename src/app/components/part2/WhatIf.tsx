import { motion } from "motion/react";
import { CircleHelp, Image, FileText, Code2, AlertTriangle, CheckCircle2, ShieldCheck, Zap, Coins } from "lucide-react";

/**
 * 幕 5 · What if — 解答两种工作形态下的常见疑惑
 */

const designLedCompare = {
  question: "设计稿驱动：没有 Code Connect，会怎样？",
  context:
    "很多人问：既然已经有 Figma 设计稿，直接让模型读截图、图层结构、节点树或导出的 JSON，不也能生成代码吗？这和 Code Connect 到底有什么差别？",
  without: {
    label: "纯视觉 / 结构识别",
    sub: "截图 · 图层 · 节点 · JSON",
    accent: "amber",
    points: [
      "模型在「猜」组件——把设计稿还原成一堆 div + 样式，无法映射真实业务组件",
      "变体、状态、Props 全靠推断，交互与可访问性容易遗漏",
      "生成代码与产品仓库脱节，几乎无法直接合入，维护成本极高",
      "设计稿一改，生成结果就漂移，难以建立稳定的「设计 ↔ 代码」对齐",
    ],
  },
  with: {
    label: "Code Connect 建联",
    sub: "设计稿 → 真实业务组件代码",
    accent: "emerald",
    points: [
      "模型直接引用已建联的真实组件，沿用已有实现",
      "Props、变体、约束来自代码本身，生成结果可编译、可合入",
      "设计系统变更沿 Code Connect 同步，对齐关系可维护",
      "从「像素还原」升级为「语义映射」——AI 读的是组件语义与实现",
    ],
  },
};

const intentLedCompare = {
  question: "意图驱动：只有软性约束、没有代码硬约束，会怎样？",
  context:
    "意图驱动的关键动作是三层软性约束——其下还有一个硬性约束：组件代码与设计系统规范代码，本身就是「唯一真实来源」。软性约束在没有设计稿时降低幻觉；代码让输出真正能落地。",
  without: {
    label: "仅三层软性约束",
    sub: "Spec · Guidance · Pattern",
    accent: "amber",
    points: [
      "约束停留在「文档层」——模型仍可能发明不存在的组件与样式",
      "输出看似合理，却无法映射到真实代码库，合入前需大量人工改写",
      "品牌与体验一致性靠模型「自觉」，漂移风险高、不可审计",
      "适合早期探索与概念验证，但离可上线的产品代码仍有距离",
    ],
  },
  with: {
    label: "代码硬约束 + 软性约束",
    sub: "组件代码 · DS 规范 = 唯一真实来源",
    accent: "purple",
    points: [
      "组件库与规范代码是 ground truth，模型在真实 registry 内挑选与组装",
      "三层软性约束引导「选什么、怎么用」，代码约束「能生成什么」",
      "输出可直接编译合入，幻觉被硬性边界拦住",
      "代码硬约束让软性约束变成可执行的护栏",
    ],
  },
};

const corePoints = [
  {
    icon: ShieldCheck,
    title: "生成的一致性",
    maps: "对应模型幻觉",
    desc: "把模型从「自由发挥」拉回「可选边界」——输出可预期、可审计、可合入。",
    accent: "emerald",
  },
  {
    icon: Zap,
    title: "生成的速度",
    maps: "对应预置的模型工具箱",
    desc: "不必从零猜测与重构，直接调用已有组件、模式与约束，生成路径更短。",
    accent: "blue",
  },
  {
    icon: Coins,
    title: "生成的经济成本",
    maps: "对应模型推理的 token 消耗",
    desc: "上下文越结构化、资产越可复用，模型需要推理的内容越少，成本越可控。",
    accent: "purple",
  },
];

const pointAccentMap: Record<string, { text: string; bg: string; border: string; grad: string }> = {
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", grad: "from-emerald-500 to-teal-500" },
  blue: { text: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30", grad: "from-blue-500 to-indigo-500" },
  purple: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30", grad: "from-purple-500 to-fuchsia-500" },
};

const accentMap: Record<string, { text: string; bg: string; border: string; icon: string }> = {
  amber: { text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/25", icon: "text-amber-400" },
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "text-emerald-400" },
  purple: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "text-purple-400" },
};

function CompareBlock({
  data,
  icon: Icon,
  delay = 0,
}: {
  data: typeof designLedCompare;
  icon: typeof Image;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
          <Icon size={17} className="text-blue-300" />
        </div>
        <div>
          <h3 className="text-[17px] sm:text-[19px] text-white mb-2" style={{ fontWeight: 700, lineHeight: 1.45 }}>
            {data.question}
          </h3>
          <p className="text-[13.5px] text-gray-400" style={{ lineHeight: 1.8 }}>
            {data.context}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {[data.without, data.with].map((side) => {
          const c = accentMap[side.accent];
          const isPositive = side.accent !== "amber";
          const SideIcon = isPositive ? CheckCircle2 : AlertTriangle;
          return (
            <div key={side.label} className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
              <div className="flex items-center gap-2 mb-1">
                <SideIcon size={14} className={c.icon} />
                <span className={`text-[14px] text-white`} style={{ fontWeight: 600 }}>
                  {side.label}
                </span>
              </div>
              <div className={`text-[11px] ${c.text} font-mono mb-4`}>{side.sub}</div>
              <ul className="space-y-2.5">
                {side.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[12.5px] text-gray-400" style={{ lineHeight: 1.65 }}>
                    <span className={`${c.text} mt-0.5 shrink-0`}>·</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function WhatIf() {
  return (
    <section id="whatif" className="py-24 px-6 bg-[#0a0f1d] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/5 rounded-full blur-[130px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] mb-4" style={{ fontWeight: 600 }}>
            <CircleHelp size={13} className="text-blue-300" />
            <span className="text-gray-300 tracking-wide">WHAT IF · 常见疑惑</span>
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4 text-white" style={{ fontWeight: 800, lineHeight: 1.2 }}>
            What if
          </h2>
          <p className="text-gray-400 text-[15px]" style={{ lineHeight: 1.8 }}>
            两种工作形态讲清楚了，但实操里总有些「那如果……」的追问。
            这里把两个最高频的疑惑摊开——看清差异，才知道该投什么。
          </p>
        </motion.div>

        <div className="space-y-8">
          <CompareBlock data={designLedCompare} icon={Image} />
          <CompareBlock data={intentLedCompare} icon={Code2} delay={0.1} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 flex items-start gap-3"
        >
          <FileText size={15} className="text-blue-300 mt-0.5 shrink-0" />
          <p className="text-[13px] text-gray-400" style={{ lineHeight: 1.75 }}>
            <span className="text-gray-200" style={{ fontWeight: 600 }}>一句话收束：</span>
            设计稿驱动里，Code Connect 把「看图猜代码」变成「按图找组件」；
            意图驱动里，代码硬约束把「文档建议」变成「可执行边界」——
            <span className="text-blue-200">两种形态，殊途同归：设计系统必须是机器可读、可落地的。</span>
          </p>
        </motion.div>

        {/* 三个核心要点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <p className="text-[13px] text-gray-500 font-mono mb-5 tracking-wide">无论 Code Connect 还是系统性组件代码，解决的核心问题可归为三点</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {corePoints.map((pt, i) => {
              const c = pointAccentMap[pt.accent];
              const PtIcon = pt.icon;
              return (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-5`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-4`}>
                    <PtIcon size={17} className="text-white" />
                  </div>
                  <div className="text-[15px] text-white mb-1" style={{ fontWeight: 700 }}>{pt.title}</div>
                  <div className={`text-[11px] ${c.text} font-mono mb-3`}>{pt.maps}</div>
                  <p className="text-[12.5px] text-gray-400" style={{ lineHeight: 1.65 }}>{pt.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-[14px] text-gray-400 mt-6" style={{ lineHeight: 1.7 }}>
            <span className="text-white" style={{ fontWeight: 600 }}>Code Connect 和组件代码，让 AI 稳定地、更快地、更低成本地生成可落地的 UI。</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
