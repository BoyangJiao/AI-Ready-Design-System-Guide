import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Layers,
  Palette,
  LayoutGrid,
  Puzzle,
  ArrowRight,
  Check,
  Minus,
  X,
  Sparkles,
  Eye,
  Code,
  Figma,
  Cpu,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

/* ─── 三大支柱数据 ─── */
const pillars = [
  {
    id: "semantic",
    icon: Layers,
    title: "语义化结构",
    subtitle: "Semantic Structure",
    metaphor: "音符 (Notes)",
    metaphorDesc: "每个音符都有明确的名字和含义——C4、D#5，而不是\"第三个声音\"",
    designDesc:
      "每个图层、组件都有语义化命名（Button-Primary, Card-Header），而非 Frame 123。AI 通过名字理解设计意图。",
    without: "Frame 1 → <div>、矩形 5 → <div>，AI 只看到一堆无意义的嵌套盒子",
    withDS: "Button-Primary → <Button variant='primary'>，AI 直接匹配组件库",
    color: "violet",
  },
  {
    id: "layout",
    icon: LayoutGrid,
    title: "约束化布局",
    subtitle: "Constraint-based Layout",
    metaphor: "节拍与节奏 (Rhythm)",
    metaphorDesc: "4/4 拍、120 BPM——节奏规则确保演奏家精准把控时间和空间",
    designDesc:
      "Auto Layout 定义了元素间的空间关系——方向、间距、对齐、填充。这些直接转化为 CSS Flexbox 属性。",
    without: "元素靠手动拖拽定位 → position: absolute; left: 127px; top: 344px",
    withDS: "Auto Layout 约束 → display: flex; gap: 16px; padding: 20px",
    color: "indigo",
  },
  {
    id: "tokens",
    icon: Palette,
    title: "令牌化样式",
    subtitle: "Tokenized Styling",
    metaphor: "调号与力度 (Key & Dynamics)",
    metaphorDesc: "C 大调、forte（强）——统一的符号体系让任何演奏家表达一致的情感",
    designDesc:
      "Design Tokens 将颜色、字体、间距抽象为语义化变量。就像 Pantone 色卡统一了全球的色彩语言。",
    without: "硬编码 #6D28D9 → AI 不知道这是品牌主色还是随机紫色",
    withDS: "var(--color-primary) → AI 理解这是主色，自动适配深色模式",
    color: "amber",
  },
  {
    id: "components",
    icon: Puzzle,
    title: "组件化架构",
    subtitle: "Component Architecture",
    metaphor: "乐章与编排 (Movements)",
    metaphorDesc: "交响曲由多个乐章组成，每个乐章有明确的主题和变奏——对应组件的四种属性类型：Variant（变奏）、Boolean（开关）、String（歌词）、Instance（独奏乐器）",
    designDesc:
      "AI-Ready 的设计系统天然是组件化的。关键在于组件的属性封装——Figma 中的 Variant、Boolean、String、Instance 四种属性类型，精确映射为 React 组件的 Props API。",
    without: "每个按钮都是独立的矩形+文字 → AI 为每个按钮重新编写样式",
    withDS: "Button 组件 (variant + disabled + label + icon) → AI 直接映射为类型安全的 React Props",
    color: "emerald",
  },
];

/* ─── 成熟度评估数据 ─── */
const maturityItems = [
  {
    category: "语义化结构",
    items: [
      "所有图层使用英文语义化命名（如 Card-Header）",
      "组件命名遵循统一规范（如 Button/Primary/Large）",
      "图层嵌套结构反映了组件的 DOM 层级",
    ],
  },
  {
    category: "约束化布局",
    items: [
      "90%+ 的 Frame 使用了 Auto Layout",
      "使用 Fill / Hug 而非固定尺寸来控制响应式",
      "间距和内边距使用统一的 spacing 变量",
    ],
  },
  {
    category: "令牌化样式",
    items: [
      "所有颜色使用 Figma 变量（Variables）",
      "字体使用统一的文字样式（Text Styles）",
      "建立了 Design Tokens 并导出为 JSON/CSS 变量",
    ],
  },
  {
    category: "组件化架构",
    items: [
      "所有可复用元素已封装为 Figma Component",
      "组件包含完整的变体（Default/Hover/Disabled 等）",
      "组件属性（Component Properties）定义了可配置项",
    ],
  },
];

/* ─── 成熟度等级 ─── */
function getMaturityLevel(score: number, total: number) {
  const pct = score / total;
  if (pct >= 0.9) return { label: "AI-Ready", emoji: "🎼", color: "emerald", desc: "你的设计系统已经是一份精美的交响乐总谱——AI 可以精准演奏" };
  if (pct >= 0.65) return { label: "进阶中", emoji: "🎵", color: "blue", desc: "你的乐谱基本成形，但部分段落还需要补充标注" };
  if (pct >= 0.35) return { label: "起步中", emoji: "🎶", color: "amber", desc: "你有了一些旋律片段，但还缺少完整的编排和记谱" };
  return { label: "待启动", emoji: "🔇", color: "red", desc: "你的设计还是\"口头哼唱\"——AI 只能靠猜来演奏" };
}

export function DesignSystemProtocol() {
  const [activePillar, setActivePillar] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const totalItems = maturityItems.reduce((sum, cat) => sum + cat.items.length, 0);
  const maturity = getMaturityLevel(checkedItems.size, totalItems);
  const pct = Math.round((checkedItems.size / totalItems) * 100);

  const toggleItem = (key: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setCheckedItems(newSet);
  };

  return (
    <section id="protocol" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* ───────── Header ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[12px] mb-4"
            style={{ fontWeight: 500 }}
          >
            <Music size={13} />
            设计系统即协议
          </div>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-3"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            AI-Ready 设计系统 = 一份精确的乐谱
          </h2>
          <p
            className="text-gray-500 text-[15px] max-w-2xl mb-6"
            style={{ lineHeight: 1.7 }}
          >
            在一个交响乐团中，作曲家通过乐谱将音乐意图传达给每一位演奏家。
            乐谱不是音乐本身，但它是让音乐被精确、一致地演绎的唯一途径。
          </p>
          <p
            className="text-gray-500 text-[15px] max-w-2xl mb-16"
            style={{ lineHeight: 1.7 }}
          >
            <span style={{ fontWeight: 600 }} className="text-gray-700">
              AI-Ready 的设计系统就是你的「乐谱」
            </span>
            ——它将你的设计意图结构化、符号化、标准化，让 AI 这位"演奏家"能够精准还原每一个设计决策，而不是靠猜来即兴演奏。
          </p>
        </motion.div>

        {/* ───────── Metaphor visual ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-violet-50 via-indigo-50/50 to-purple-50 border border-violet-200/40 rounded-3xl p-6 sm:p-10">
            <h3
              className="text-[14px] text-gray-400 uppercase tracking-wider mb-8"
              style={{ fontWeight: 600 }}
            >
              核心类比
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Composer */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg mb-4">
                  <Figma size={28} className="text-white" />
                </div>
                <div className="text-[16px] mb-1" style={{ fontWeight: 600 }}>
                  设计师
                </div>
                <div className="text-[13px] text-gray-500">= 作曲家</div>
                <p className="text-[12px] text-gray-400 mt-2" style={{ lineHeight: 1.6 }}>
                  创造设计意图、视觉语言和交互逻辑
                </p>
              </div>

              {/* Score = DS */}
              <div className="text-center relative">
                {/* Connecting arrows on desktop */}
                <div className="hidden sm:block absolute top-8 -left-3 text-violet-300">
                  <ArrowRight size={20} />
                </div>
                <div className="hidden sm:block absolute top-8 -right-3 text-violet-300">
                  <ArrowRight size={20} />
                </div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 mb-4 ring-4 ring-violet-100">
                  <Music size={28} className="text-white" />
                </div>
                <div className="text-[16px] mb-1" style={{ fontWeight: 600 }}>
                  AI-Ready 设计系统
                </div>
                <div className="text-[13px] text-violet-500" style={{ fontWeight: 500 }}>
                  = 乐谱（唯一桥梁）
                </div>
                <p className="text-[12px] text-gray-400 mt-2" style={{ lineHeight: 1.6 }}>
                  将设计意图编码为结构化、可解析的"符号体系"
                </p>
              </div>

              {/* Performer = AI */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg mb-4">
                  <Cpu size={28} className="text-white" />
                </div>
                <div className="text-[16px] mb-1" style={{ fontWeight: 600 }}>
                  AI 工具
                </div>
                <div className="text-[13px] text-gray-500">= 演奏家</div>
                <p className="text-[12px] text-gray-400 mt-2" style={{ lineHeight: 1.6 }}>
                  根据"乐谱"精准生成符合设计意图的代码
                </p>
              </div>
            </div>

            {/* Without vs With */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="bg-white/80 border border-red-200/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <X size={14} className="text-red-500" />
                  <span className="text-[13px] text-red-600" style={{ fontWeight: 600 }}>
                    没有乐谱
                  </span>
                </div>
                <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>
                  演奏家只能凭"听"来猜旋律。节奏可能跑偏，和弦可能错误，每次演奏都不一样。
                </p>
                <div
                  className="mt-3 text-[12px] text-red-500/70 bg-red-50 rounded-lg px-3 py-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  AI 看到的：一堆像素坐标和十六进制色值
                </div>
              </div>
              <div className="bg-white/80 border border-emerald-200/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-[13px] text-emerald-600" style={{ fontWeight: 600 }}>
                    有精确的乐谱
                  </span>
                </div>
                <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>
                  每个音符、节拍、力度都被精确标注。任何演奏家都能忠实还原作曲家的创作意图。
                </p>
                <div
                  className="mt-3 text-[12px] text-emerald-500/70 bg-emerald-50 rounded-lg px-3 py-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  AI 看到的：语义化组件 + Token 体系 + 布局约束
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───────── 四大支柱 ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            乐谱的四大组成部分
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">
            一份完整的 AI-Ready "乐谱"由四个核心元素组成，缺一不可
          </p>

          {/* Pillar selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] transition-all border ${activePillar === i
                      ? `bg-${p.color}-50 text-${p.color}-700 border-${p.color}-200`
                      : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                    }`}
                  style={{ fontWeight: activePillar === i ? 600 : 400 }}
                >
                  <Icon size={15} />
                  {p.title}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const p = pillars[activePillar];
                const colorMap: Record<string, { bg: string; border: string; text: string; light: string; badge: string }> = {
                  violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", light: "text-violet-500", badge: "bg-violet-100" },
                  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", light: "text-indigo-500", badge: "bg-indigo-100" },
                  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", light: "text-amber-500", badge: "bg-amber-100" },
                  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", light: "text-emerald-500", badge: "bg-emerald-100" },
                };
                const c = colorMap[p.color];

                return (
                  <div className={`${c.bg}/60 ${c.border} border rounded-2xl p-6 sm:p-8`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${c.badge} flex items-center justify-center shrink-0`}>
                        <p.icon size={22} className={c.light} />
                      </div>
                      <div>
                        <h4 className="text-[18px] mb-1" style={{ fontWeight: 700 }}>
                          {p.title}
                          <span className="text-[13px] text-gray-400 ml-2" style={{ fontWeight: 400 }}>
                            {p.subtitle}
                          </span>
                        </h4>
                        <p className="text-[14px] text-gray-500" style={{ lineHeight: 1.7 }}>
                          {p.designDesc}
                        </p>
                      </div>
                    </div>

                    {/* Metaphor callout */}
                    <div className={`${c.badge}/60 ${c.border} border rounded-xl px-5 py-4 mb-6`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Music size={14} className={c.light} />
                        <span className={`text-[12px] ${c.text}`} style={{ fontWeight: 600 }}>
                          乐谱类比：{p.metaphor}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-600" style={{ lineHeight: 1.6 }}>
                        {p.metaphorDesc}
                      </p>
                    </div>

                    {/* Without vs With */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-red-100 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <X size={13} className="text-red-400" />
                          <span className="text-[12px] text-red-500" style={{ fontWeight: 600 }}>
                            缺失时
                          </span>
                        </div>
                        <p
                          className="text-[12px] text-gray-500"
                          style={{ lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {p.without}
                        </p>
                      </div>
                      <div className="bg-white border border-emerald-100 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-[12px] text-emerald-500" style={{ fontWeight: 600 }}>
                            具备时
                          </span>
                        </div>
                        <p
                          className="text-[12px] text-gray-500"
                          style={{ lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {p.withDS}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ───────── Bridge Visualization ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            全景视图
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">
            AI-Ready 设计系统是连接设计意图和高保真代码之间的唯一桥梁
          </p>

          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <div className="flex items-stretch gap-3 min-w-[680px]">
              {/* Figma side */}
              <div className="flex-1 bg-gradient-to-b from-pink-500/20 to-pink-500/5 border border-pink-500/20 rounded-xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Figma size={16} className="text-pink-400" />
                  <span className="text-[12px] text-pink-300" style={{ fontWeight: 600 }}>
                    设计端
                  </span>
                </div>
                <div className="space-y-2 flex-1">
                  {["设计意图", "视觉语言", "交互逻辑", "品牌调性"].map((item) => (
                    <div
                      key={item}
                      className="text-[11px] text-pink-200/70 bg-pink-500/10 rounded px-2.5 py-1.5"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ArrowRight size={18} className="text-gray-600" />
              </div>

              {/* Design System Bridge */}
              <div className="flex-[1.4] bg-gradient-to-b from-violet-500/25 to-indigo-500/10 border-2 border-violet-500/30 rounded-xl p-4 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-[10px] px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                  THE BRIDGE
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <Music size={16} className="text-violet-400" />
                  <span className="text-[12px] text-violet-300" style={{ fontWeight: 600 }}>
                    AI-Ready 设计系统
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {pillars.map((p) => (
                    <div
                      key={p.id}
                      className="text-[10px] text-violet-200/80 bg-violet-500/10 rounded px-2 py-1.5 flex items-center gap-1.5"
                    >
                      <p.icon size={10} className="text-violet-400 shrink-0" />
                      {p.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ArrowRight size={18} className="text-gray-600" />
              </div>

              {/* AI side */}
              <div className="flex-1 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Code size={16} className="text-emerald-400" />
                  <span className="text-[12px] text-emerald-300" style={{ fontWeight: 600 }}>
                    代码端
                  </span>
                </div>
                <div className="space-y-2 flex-1">
                  {["语义化 HTML", "Token 驱动样式", "响应式布局", "组件化代码"].map((item) => (
                    <div
                      key={item}
                      className="text-[11px] text-emerald-200/70 bg-emerald-500/10 rounded px-2.5 py-1.5"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[12px] text-gray-500" style={{ lineHeight: 1.6 }}>
                没有中间这座"桥"，AI 只能看到像素和坐标，而不是你的设计意图
              </p>
            </div>
          </div>
        </motion.div>

        {/* ───────── AI-Ready 成熟度评估 ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            AI-Ready 成熟度自评
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">
            勾选你的设计系统已经具备的能力，看看你的"乐谱"完成度
          </p>

          {/* Score display */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${pct >= 90
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : pct >= 65
                        ? "bg-gradient-to-r from-blue-400 to-blue-500"
                        : pct >= 35
                          ? "bg-gradient-to-r from-amber-400 to-amber-500"
                          : "bg-gradient-to-r from-red-400 to-red-500"
                    }`}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>
              <span className="text-[14px] text-gray-700 shrink-0" style={{ fontWeight: 600 }}>
                {pct}%
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-xl text-[13px] ${pct >= 90
                  ? "bg-emerald-100 text-emerald-700"
                  : pct >= 65
                    ? "bg-blue-100 text-blue-700"
                    : pct >= 35
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              style={{ fontWeight: 600 }}
            >
              {maturity.emoji} {maturity.label}
            </div>
          </div>

          <p className="text-[13px] text-gray-500 mb-6" style={{ lineHeight: 1.6 }}>
            {maturity.desc}
          </p>

          {/* Checklist grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maturityItems.map((cat) => (
              <div
                key={cat.category}
                className="bg-white border border-gray-200/60 rounded-2xl p-5"
              >
                <h4 className="text-[14px] mb-4" style={{ fontWeight: 600 }}>
                  {cat.category}
                </h4>
                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const key = `${cat.category}-${item}`;
                    const checked = checkedItems.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all mt-0.5 shrink-0 ${checked
                              ? "bg-violet-500 text-white"
                              : "border-2 border-gray-300"
                            }`}
                        >
                          {checked && <Check size={12} />}
                        </div>
                        <span
                          className={`text-[13px] transition-all ${checked ? "text-gray-400 line-through" : "text-gray-700"
                            }`}
                          style={{ lineHeight: 1.5 }}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}