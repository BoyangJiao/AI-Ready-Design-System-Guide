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

/* --- 三大支柱数据 --- */
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
    color: "indigo",
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
    color: "ochre",
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
    color: "bamboo",
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
    color: "stone",
  },
];

/* Color mapping for pillars */
const pillarColorMap: Record<string, { bg: string; border: string; text: string; light: string; badge: string }> = {
  indigo: { bg: "bg-indigo/5", border: "border-indigo/20", text: "text-indigo", light: "text-indigo-light", badge: "bg-indigo/10" },
  ochre: { bg: "bg-ochre/5", border: "border-ochre/20", text: "text-ochre", light: "text-ochre-light", badge: "bg-ochre/10" },
  bamboo: { bg: "bg-bamboo/5", border: "border-bamboo/20", text: "text-bamboo", light: "text-bamboo-light", badge: "bg-bamboo/10" },
  stone: { bg: "bg-stone/5", border: "border-stone/20", text: "text-stone", light: "text-stone", badge: "bg-stone/10" },
};

/* --- 成熟度评估数据 --- */
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
      "所有颜色使用 Figma 的颜色样式（Color Styles）",
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

/* --- 成熟度等级 --- */
function getMaturityLevel(score: number, total: number) {
  const pct = score / total;
  if (pct >= 0.9) return { label: "AI-Ready", color: "bamboo", desc: "你的设计系统已经是一份精美的交响乐总谱——AI 可以精准演奏" };
  if (pct >= 0.65) return { label: "进阶中", color: "indigo", desc: "你的乐谱基本成形，但部分段落还需要补充标注" };
  if (pct >= 0.35) return { label: "起步中", color: "ochre", desc: "你有了一些旋律片段，但还缺少完整的编排和记谱" };
  return { label: "待启动", color: "vermillion", desc: "你的设计还是\"口头哼唱\"——AI 只能靠猜来演奏" };
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
    <section id="protocol" className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo/10 text-indigo text-[12px] mb-4 font-sans"
            style={{ fontWeight: 500 }}
          >
            <Music size={13} />
            设计系统即协议
          </div>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            AI-Ready 设计系统 = 一份精确的乐谱
          </h2>
          <p
            className="text-ink-muted text-[15px] max-w-2xl mb-6 font-sans"
            style={{ lineHeight: 1.8 }}
          >
            在一个交响乐团中，作曲家通过乐谱将音乐意图传达给每一位演奏家。
            乐谱不是音乐本身，但它是让音乐被精确、一致地演绎的唯一途径。
          </p>
          <p
            className="text-ink-muted text-[15px] max-w-2xl mb-16 font-sans"
            style={{ lineHeight: 1.8 }}
          >
            <span style={{ fontWeight: 600 }} className="text-ink-primary">
              AI-Ready 的设计系统就是你的「乐谱」
            </span>
            ——它将你的设计意图结构化、符号化、标准化，让 AI 这位"演奏家"能够精准还原每一个设计决策，而不是靠猜来即兴演奏。
          </p>
        </motion.div>

        {/* Metaphor visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-washi-warm border border-border rounded-md p-6 sm:p-10">
            <h3
              className="text-[14px] text-stone uppercase tracking-wider mb-8 font-sans"
              style={{ fontWeight: 600 }}
            >
              核心类比
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Composer */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-md bg-ochre flex items-center justify-center shadow-sm mb-4">
                  <Figma size={28} className="text-washi-cream" />
                </div>
                <div className="text-[16px] mb-1 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
                  设计师
                </div>
                <div className="text-[13px] text-ink-muted font-sans">= 作曲家</div>
                <p className="text-[12px] text-stone mt-2 font-sans" style={{ lineHeight: 1.6 }}>
                  创造设计意图、视觉语言和交互逻辑
                </p>
              </div>

              {/* Score = DS */}
              <div className="text-center relative">
                <div className="hidden sm:block absolute top-8 -left-3 text-stone/40">
                  <ArrowRight size={20} />
                </div>
                <div className="hidden sm:block absolute top-8 -right-3 text-stone/40">
                  <ArrowRight size={20} />
                </div>
                <div className="w-16 h-16 mx-auto rounded-md bg-indigo flex items-center justify-center shadow-sm mb-4 ring-4 ring-indigo/10">
                  <Music size={28} className="text-washi-cream" />
                </div>
                <div className="text-[16px] mb-1 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
                  AI-Ready 设计系统
                </div>
                <div className="text-[13px] text-indigo font-sans" style={{ fontWeight: 500 }}>
                  = 乐谱（唯一桥梁）
                </div>
                <p className="text-[12px] text-stone mt-2 font-sans" style={{ lineHeight: 1.6 }}>
                  将设计意图编码为结构化、可解析的"符号体系"
                </p>
              </div>

              {/* Performer = AI */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-md bg-bamboo flex items-center justify-center shadow-sm mb-4">
                  <Cpu size={28} className="text-washi-cream" />
                </div>
                <div className="text-[16px] mb-1 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
                  AI 工具
                </div>
                <div className="text-[13px] text-ink-muted font-sans">= 演奏家</div>
                <p className="text-[12px] text-stone mt-2 font-sans" style={{ lineHeight: 1.6 }}>
                  根据"乐谱"精准生成符合设计意图的代码
                </p>
              </div>
            </div>

            {/* Without vs With */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="bg-washi-cream border border-vermillion/20 rounded-md p-5">
                <div className="flex items-center gap-2 mb-3">
                  <X size={14} className="text-vermillion" />
                  <span className="text-[13px] text-vermillion font-sans" style={{ fontWeight: 600 }}>
                    没有乐谱
                  </span>
                </div>
                <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>
                  演奏家只能凭"听"来猜旋律。节奏可能跑偏，和弦可能错误，每次演奏都不一样。
                </p>
                <div
                  className="mt-3 text-[12px] text-vermillion/70 bg-vermillion/5 rounded-sm px-3 py-2 font-mono"
                >
                  AI 看到的：一堆像素坐标和十六进制色值
                </div>
              </div>
              <div className="bg-washi-cream border border-bamboo/20 rounded-md p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Check size={14} className="text-bamboo" />
                  <span className="text-[13px] text-bamboo font-sans" style={{ fontWeight: 600 }}>
                    有精确的乐谱
                  </span>
                </div>
                <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>
                  每个音符、节拍、力度都被精确标注。任何演奏家都能忠实还原作曲家的创作意图。
                </p>
                <div
                  className="mt-3 text-[12px] text-bamboo/70 bg-bamboo/5 rounded-sm px-3 py-2 font-mono"
                >
                  AI 看到的：语义化组件 + Token 体系 + 布局约束
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 四大支柱 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans"
            style={{ fontWeight: 600 }}
          >
            乐谱的四大组成部分
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            一份完整的 AI-Ready "乐谱"由四个核心元素组成，缺一不可
          </p>

          {/* Pillar selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const c = pillarColorMap[p.color];
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] transition-all border font-sans ${
                    activePillar === i
                      ? `${c.badge} ${c.text} ${c.border}`
                      : "bg-secondary text-ink-muted border-transparent hover:bg-muted"
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
                const c = pillarColorMap[p.color];

                return (
                  <div className={`${c.bg} ${c.border} border rounded-md p-6 sm:p-8`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-md ${c.badge} flex items-center justify-center shrink-0`}>
                        <p.icon size={22} className={c.light} />
                      </div>
                      <div>
                        <h4 className="text-[18px] mb-1 text-ink-primary font-serif" style={{ fontWeight: 700 }}>
                          {p.title}
                          <span className="text-[13px] text-stone ml-2 font-sans" style={{ fontWeight: 400 }}>
                            {p.subtitle}
                          </span>
                        </h4>
                        <p className="text-[14px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>
                          {p.designDesc}
                        </p>
                      </div>
                    </div>

                    {/* Metaphor callout */}
                    <div className={`${c.badge} ${c.border} border rounded-md px-5 py-4 mb-6`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Music size={14} className={c.light} />
                        <span className={`text-[12px] ${c.text} font-sans`} style={{ fontWeight: 600 }}>
                          乐谱类比：{p.metaphor}
                        </span>
                      </div>
                      <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.6 }}>
                        {p.metaphorDesc}
                      </p>
                    </div>

                    {/* Without vs With */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-washi-warm border border-vermillion/15 rounded-md p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <X size={13} className="text-vermillion" />
                          <span className="text-[12px] text-vermillion font-sans" style={{ fontWeight: 600 }}>
                            缺失时
                          </span>
                        </div>
                        <p className="text-[12px] text-ink-muted font-mono" style={{ lineHeight: 1.7 }}>
                          {p.without}
                        </p>
                      </div>
                      <div className="bg-washi-warm border border-bamboo/15 rounded-md p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Check size={13} className="text-bamboo" />
                          <span className="text-[12px] text-bamboo font-sans" style={{ fontWeight: 600 }}>
                            具备时
                          </span>
                        </div>
                        <p className="text-[12px] text-ink-muted font-mono" style={{ lineHeight: 1.7 }}>
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

        {/* Bridge Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans"
            style={{ fontWeight: 600 }}
          >
            全景视图
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            AI-Ready 设计系统是连接设计意图和高保真代码之间的唯一桥梁
          </p>

          <div className="bg-ink-primary rounded-md p-6 sm:p-8 overflow-x-auto">
            <div className="flex items-stretch gap-3 min-w-[680px]">
              {/* Figma side */}
              <div className="flex-1 bg-ochre/15 border border-ochre/20 rounded-md p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Figma size={16} className="text-ochre-light" />
                  <span className="text-[12px] text-ochre-light font-sans" style={{ fontWeight: 600 }}>
                    设计端
                  </span>
                </div>
                <div className="space-y-2 flex-1">
                  {["设计意图", "视觉语言", "交互逻辑", "品牌调性"].map((item) => (
                    <div
                      key={item}
                      className="text-[11px] text-ochre-light/70 bg-ochre/10 rounded-sm px-2.5 py-1.5 font-sans"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ArrowRight size={18} className="text-stone/40" />
              </div>

              {/* Design System Bridge */}
              <div className="flex-[1.4] bg-indigo/15 border-2 border-indigo/25 rounded-md p-4 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo text-washi-cream text-[10px] px-3 py-1 rounded-md font-sans" style={{ fontWeight: 600 }}>
                  THE BRIDGE
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <Music size={16} className="text-indigo-light" />
                  <span className="text-[12px] text-indigo-light font-sans" style={{ fontWeight: 600 }}>
                    AI-Ready 设计系统
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {pillars.map((p) => (
                    <div
                      key={p.id}
                      className="text-[10px] text-indigo-light/80 bg-indigo/10 rounded-sm px-2 py-1.5 flex items-center gap-1.5 font-sans"
                    >
                      <p.icon size={10} className="text-indigo-light shrink-0" />
                      {p.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ArrowRight size={18} className="text-stone/40" />
              </div>

              {/* AI side */}
              <div className="flex-1 bg-bamboo/15 border border-bamboo/20 rounded-md p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Code size={16} className="text-bamboo-light" />
                  <span className="text-[12px] text-bamboo-light font-sans" style={{ fontWeight: 600 }}>
                    代码端
                  </span>
                </div>
                <div className="space-y-2 flex-1">
                  {["语义化 HTML", "Token 驱动样式", "响应式布局", "组件化代码"].map((item) => (
                    <div
                      key={item}
                      className="text-[11px] text-bamboo-light/70 bg-bamboo/10 rounded-sm px-2.5 py-1.5 font-sans"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[12px] text-stone/60 font-sans" style={{ lineHeight: 1.6 }}>
                没有中间这座"桥"，AI 只能看到像素和坐标，而不是你的设计意图
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI-Ready 成熟度评估 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <h3
            className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans"
            style={{ fontWeight: 600 }}
          >
            AI-Ready 成熟度自评
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            勾选你的设计系统已经具备的能力，看看你的"乐谱"完成度
          </p>

          {/* Score display */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    pct >= 90
                      ? "bg-bamboo"
                      : pct >= 65
                      ? "bg-indigo"
                      : pct >= 35
                      ? "bg-ochre"
                      : "bg-vermillion"
                  }`}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>
              <span className="text-[14px] text-ink-primary shrink-0 font-serif" style={{ fontWeight: 600 }}>
                {pct}%
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-md text-[13px] font-sans ${
                pct >= 90
                  ? "bg-bamboo/10 text-bamboo"
                  : pct >= 65
                  ? "bg-indigo/10 text-indigo"
                  : pct >= 35
                  ? "bg-ochre/10 text-ochre"
                  : "bg-vermillion/10 text-vermillion"
              }`}
              style={{ fontWeight: 600 }}
            >
              {maturity.label}
            </div>
          </div>

          <p className="text-[13px] text-ink-muted mb-6 font-sans" style={{ lineHeight: 1.6 }}>
            {maturity.desc}
          </p>

          {/* Checklist grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maturityItems.map((cat) => (
              <div
                key={cat.category}
                className="bg-washi-warm border border-border rounded-md p-5"
              >
                <h4 className="text-[14px] mb-4 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
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
                        className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-washi-cream transition-colors text-left"
                      >
                        <div
                          className={`w-5 h-5 rounded-sm flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                            checked
                              ? "bg-indigo text-washi-cream"
                              : "border-2 border-stone/40"
                          }`}
                        >
                          {checked && <Check size={12} />}
                        </div>
                        <span
                          className={`text-[13px] transition-all font-sans ${
                            checked ? "text-stone line-through" : "text-ink-secondary"
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
