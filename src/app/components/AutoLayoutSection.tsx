import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown, Maximize2, MinusSquare, AlignCenter, MoveHorizontal, MoveVertical, X, Check } from "lucide-react";

const layoutExamples = [
  {
    id: "button",
    label: "按钮",
    desc: "最小的 Auto Layout 单元",
    direction: "horizontal" as const,
    gap: 8,
    paddingX: 16,
    paddingY: 10,
    children: [
      { text: "Cart", sizing: "hug" },
      { text: "Add to Cart", sizing: "hug" },
    ],
  },
  {
    id: "card",
    label: "卡片",
    desc: "垂直方向的 Auto Layout",
    direction: "vertical" as const,
    gap: 12,
    paddingX: 16,
    paddingY: 16,
    children: [
      { text: "Product Image", sizing: "fill" },
      { text: "Product Title", sizing: "fill" },
      { text: "¥ 199.00", sizing: "hug" },
      { text: "Add to Cart", sizing: "fill" },
    ],
  },
  {
    id: "nav",
    label: "导航栏",
    desc: "水平方向 + Space Between",
    direction: "horizontal" as const,
    gap: 0,
    paddingX: 24,
    paddingY: 12,
    spaceBetween: true,
    children: [
      { text: "Logo", sizing: "hug" },
      { text: "Menu Items", sizing: "fill" },
      { text: "CTA", sizing: "hug" },
    ],
  },
];

const responsiveDemo = [
  { width: "100%", label: "Desktop (1440px)" },
  { width: "70%", label: "Tablet (768px)" },
  { width: "45%", label: "Mobile (375px)" },
];

export function AutoLayoutSection() {
  const [activeExample, setActiveExample] = useState(0);
  const [responsiveIndex, setResponsiveIndex] = useState(0);

  const example = layoutExamples[activeExample];

  return (
    <section id="autolayout" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ochre/10 text-ochre text-[12px] mb-4 font-sans" style={{ fontWeight: 500 }}>
            <Maximize2 size={13} />
            Auto Layout
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Auto Layout = AI 的布局指令
          </h2>
          <p className="text-ink-muted text-[15px] max-w-2xl mb-12 font-sans" style={{ lineHeight: 1.8 }}>
            Auto Layout 是向 AI 传达布局意图的最强工具。它的每一项设置都直接对应 CSS 属性，是实现响应式设计的关键。
          </p>
        </motion.div>

        {/* Mapping diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-6 font-sans" style={{ fontWeight: 600 }}>
            Figma → CSS 属性映射
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { figma: "方向 (↓→)", css: "flex-direction", icon: MoveHorizontal, desc: "row / column" },
              { figma: "间距 (Gap)", css: "gap", icon: MoveVertical, desc: "gap: 12px" },
              { figma: "内边距", css: "padding", icon: MinusSquare, desc: "padding: 16px" },
              { figma: "对齐方式", css: "align / justify", icon: AlignCenter, desc: "center / between" },
            ].map((item) => (
              <div
                key={item.css}
                className="bg-washi-warm border border-border rounded-md p-4 hover:border-ochre/30 transition-colors"
              >
                <item.icon size={18} className="text-ochre mb-3" />
                <div className="text-[11px] text-stone mb-1 font-sans" style={{ fontWeight: 500 }}>
                  FIGMA
                </div>
                <div className="text-[13px] mb-3 text-ink-primary font-sans" style={{ fontWeight: 600 }}>
                  {item.figma}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <ArrowDown size={12} className="text-ochre/40" />
                </div>
                <div className="text-[11px] text-ochre mb-1 font-sans" style={{ fontWeight: 500 }}>
                  CSS
                </div>
                <div className="text-[12px] text-ochre bg-ochre/5 px-2 py-1 rounded-sm font-mono">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive layout builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-6 font-sans" style={{ fontWeight: 600 }}>
            交互式示例
          </h3>

          <div className="flex gap-2 mb-6">
            {layoutExamples.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setActiveExample(i)}
                className={`px-4 py-2 rounded-md text-[13px] transition-all font-sans ${
                  activeExample === i
                    ? "bg-ochre/10 text-ochre"
                    : "bg-secondary text-ink-muted hover:bg-muted"
                }`}
                style={{ fontWeight: activeExample === i ? 500 : 400 }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual */}
            <div className="bg-washi-warm border border-ochre/20 rounded-md p-6">
              <div className="text-[12px] text-stone mb-4 font-sans" style={{ fontWeight: 500 }}>
                {example.desc}
              </div>
              <div
                className={`border-2 border-dashed border-ochre/30 rounded-md p-4 flex ${
                  example.direction === "vertical" ? "flex-col" : "flex-row"
                } ${(example as any).spaceBetween ? "justify-between" : ""} items-center`}
                style={{
                  gap: `${example.gap}px`,
                  padding: `${example.paddingY}px ${example.paddingX}px`,
                }}
              >
                {example.children.map((child, i) => (
                  <motion.div
                    key={`${activeExample}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-ochre/10 text-ochre rounded-md px-4 py-2.5 text-[13px] text-center font-sans ${
                      child.sizing === "fill" ? "flex-1 w-full" : ""
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {child.text}
                    <div className="text-[10px] text-ochre/60 mt-0.5">
                      {child.sizing === "fill" ? "Fill" : "Hug"}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-[11px] bg-secondary text-ink-muted px-2 py-1 rounded-sm font-mono">
                  gap: {example.gap}px
                </span>
                <span className="text-[11px] bg-secondary text-ink-muted px-2 py-1 rounded-sm font-mono">
                  padding: {example.paddingY}px {example.paddingX}px
                </span>
                <span className="text-[11px] bg-secondary text-ink-muted px-2 py-1 rounded-sm font-mono">
                  direction: {example.direction}
                </span>
              </div>
            </div>

            {/* Code output */}
            <div className="bg-ink-primary rounded-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-vermillion/60" />
                <div className="w-3 h-3 rounded-full bg-ochre/60" />
                <div className="w-3 h-3 rounded-full bg-bamboo/60" />
                <span className="ml-2 text-[11px] text-stone/60 font-sans">CSS Output</span>
              </div>
              <pre className="text-[12px] font-mono" style={{ lineHeight: 1.8 }}>
                <code>
                  <span className="text-indigo-light">{"display"}</span>
                  <span className="text-stone/50">{": "}</span>
                  <span className="text-ochre-light">{"flex"}</span>
                  <span className="text-stone/50">{";"}</span>{"\n"}
                  <span className="text-indigo-light">{"flex-direction"}</span>
                  <span className="text-stone/50">{": "}</span>
                  <span className="text-ochre-light">{example.direction === "vertical" ? "column" : "row"}</span>
                  <span className="text-stone/50">{";"}</span>{"\n"}
                  <span className="text-indigo-light">{"gap"}</span>
                  <span className="text-stone/50">{": "}</span>
                  <span className="text-bamboo-light">{`${example.gap}px`}</span>
                  <span className="text-stone/50">{";"}</span>{"\n"}
                  <span className="text-indigo-light">{"padding"}</span>
                  <span className="text-stone/50">{": "}</span>
                  <span className="text-bamboo-light">{`${example.paddingY}px ${example.paddingX}px`}</span>
                  <span className="text-stone/50">{";"}</span>{"\n"}
                  <span className="text-indigo-light">{"align-items"}</span>
                  <span className="text-stone/50">{": "}</span>
                  <span className="text-ochre-light">{"center"}</span>
                  <span className="text-stone/50">{";"}</span>{"\n"}
                  {(example as any).spaceBetween && (
                    <>
                      <span className="text-indigo-light">{"justify-content"}</span>
                      <span className="text-stone/50">{": "}</span>
                      <span className="text-ochre-light">{"space-between"}</span>
                      <span className="text-stone/50">{";"}</span>{"\n"}
                    </>
                  )}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Resize comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans" style={{ fontWeight: 600 }}>
            窗口缩放对比
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            同一个卡片组件，在浏览器窗口尺寸变化时，有 Auto Layout 和没有 Auto Layout 的代码表现截然不同
          </p>

          <div className="flex gap-2 mb-6">
            {responsiveDemo.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setResponsiveIndex(i)}
                className={`px-4 py-2 rounded-md text-[13px] transition-all font-sans ${
                  responsiveIndex === i
                    ? "bg-ochre/10 text-ochre"
                    : "bg-secondary text-ink-muted"
                }`}
                style={{ fontWeight: responsiveIndex === i ? 500 : 400 }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* No Auto Layout */}
            <div className="bg-washi-warm border border-vermillion/20 rounded-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <X size={14} className="text-vermillion" />
                <span className="text-[13px] text-vermillion font-sans" style={{ fontWeight: 600 }}>
                  无 Auto Layout（position: absolute）
                </span>
              </div>
              <div className="bg-washi-cream rounded-md p-4 flex justify-center overflow-hidden" style={{ minHeight: "200px" }}>
                <motion.div
                  animate={{ width: responsiveDemo[responsiveIndex].width }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="border-2 border-dashed border-vermillion/30 rounded-md relative"
                  style={{ minHeight: "180px" }}
                >
                  <div
                    className="bg-indigo/10 rounded-md text-[11px] text-indigo flex items-center justify-center font-sans"
                    style={{
                      fontWeight: 500,
                      position: "absolute",
                      left: "12px",
                      top: "12px",
                      right: "12px",
                      height: "32px",
                    }}
                  >
                    Header
                  </div>
                  <div
                    className="bg-ochre/10 rounded-md text-[10px] text-ochre flex items-center justify-center font-sans"
                    style={{
                      fontWeight: 500,
                      position: "absolute",
                      left: "12px",
                      top: "52px",
                      width: "90px",
                      height: "80px",
                    }}
                  >
                    Sidebar
                  </div>
                  <div
                    className="bg-bamboo/10 rounded-md text-[10px] text-bamboo flex items-center justify-center overflow-hidden font-sans"
                    style={{
                      fontWeight: 500,
                      position: "absolute",
                      left: "110px",
                      top: "52px",
                      width: "180px",
                      height: "80px",
                    }}
                  >
                    Content (fixed 180px)
                  </div>
                  <div
                    className="bg-stone/10 rounded-md text-[10px] text-stone flex items-center justify-center font-sans"
                    style={{
                      fontWeight: 500,
                      position: "absolute",
                      left: "12px",
                      bottom: "12px",
                      width: "280px",
                      height: "28px",
                    }}
                  >
                    Footer (fixed 280px)
                  </div>
                </motion.div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[10px] bg-vermillion/5 text-vermillion px-2 py-1 rounded-sm font-mono">
                  position: absolute
                </span>
                <span className="text-[10px] bg-vermillion/5 text-vermillion px-2 py-1 rounded-sm font-mono">
                  width: 180px (固定)
                </span>
              </div>
              <p className="text-[11px] text-vermillion/70 mt-3 font-sans" style={{ lineHeight: 1.5 }}>
                {responsiveIndex === 0 
                  ? "桌面端看起来勉强正常，但内容区固定宽度已经有隐患" 
                  : responsiveIndex === 1 
                  ? "Content 溢出容器右侧，Footer 超出边界"
                  : "布局完全崩溃——Content 和 Footer 溢出不可见，Sidebar 占满整个宽度"}
              </p>
            </div>

            {/* With Auto Layout */}
            <div className="bg-washi-warm border border-bamboo/20 rounded-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <Check size={14} className="text-bamboo" />
                <span className="text-[13px] text-bamboo font-sans" style={{ fontWeight: 600 }}>
                  使用 Auto Layout（Flexbox）
                </span>
              </div>
              <div className="bg-washi-cream rounded-md p-4 flex justify-center" style={{ minHeight: "200px" }}>
                <motion.div
                  animate={{ width: responsiveDemo[responsiveIndex].width }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="border-2 border-dashed border-bamboo/30 rounded-md p-3 flex flex-col gap-2"
                >
                  <div className="bg-indigo/10 rounded-md px-3 py-2 text-[11px] text-indigo text-center font-sans" style={{ fontWeight: 500 }}>
                    Header <span className="text-indigo/60">(Fill)</span>
                  </div>
                  <div className={`flex gap-2 ${responsiveIndex === 2 ? "flex-col" : "flex-row"}`}>
                    <div
                      className={`bg-ochre/10 rounded-md px-3 py-6 text-[10px] text-ochre text-center font-sans ${
                        responsiveIndex === 2 ? "" : "shrink-0"
                      }`}
                      style={{
                        fontWeight: 500,
                        width: responsiveIndex === 2 ? "100%" : "90px",
                      }}
                    >
                      Sidebar
                      <span className="text-ochre/60 block">
                        {responsiveIndex === 2 ? "(Fill)" : "(Fixed 90px)"}
                      </span>
                    </div>
                    <div className="bg-bamboo/10 rounded-md px-3 py-6 text-[10px] text-bamboo text-center flex-1 font-sans" style={{ fontWeight: 500 }}>
                      Content <span className="text-bamboo/60">(Fill)</span>
                    </div>
                  </div>
                  <div className="bg-stone/10 rounded-md px-3 py-2 text-[10px] text-stone text-center font-sans" style={{ fontWeight: 500 }}>
                    Footer <span className="text-stone/60">(Fill)</span>
                  </div>
                </motion.div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[10px] bg-bamboo/5 text-bamboo px-2 py-1 rounded-sm font-mono">
                  display: flex
                </span>
                <span className="text-[10px] bg-bamboo/5 text-bamboo px-2 py-1 rounded-sm font-mono">
                  flex: 1 (自适应)
                </span>
              </div>
              <p className="text-[11px] text-bamboo/70 mt-3 font-sans" style={{ lineHeight: 1.5 }}>
                {responsiveIndex === 0 
                  ? "所有元素按 Flex 规则自动排列，Content 自适应剩余空间" 
                  : responsiveIndex === 1 
                  ? "完美适配——Content 自动收缩，Sidebar 保持固定宽度"
                  : "自动切换为垂直布局，Sidebar 变为全宽，内容依然完整"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
