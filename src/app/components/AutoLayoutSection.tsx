import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown, Maximize2, MinusSquare, AlignCenter, MoveHorizontal, MoveVertical } from "lucide-react";

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
      { text: "🛒", sizing: "hug" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Maximize2 size={13} />
            Auto Layout
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Auto Layout = AI 的布局指令
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
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
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
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
                className="bg-white border border-gray-200/60 rounded-xl p-4 hover:border-indigo-200 transition-colors"
              >
                <item.icon size={18} className="text-indigo-400 mb-3" />
                <div className="text-[11px] text-gray-400 mb-1" style={{ fontWeight: 500 }}>
                  FIGMA
                </div>
                <div className="text-[13px] mb-3" style={{ fontWeight: 600 }}>
                  {item.figma}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <ArrowDown size={12} className="text-indigo-300" />
                </div>
                <div className="text-[11px] text-indigo-500 mb-1" style={{ fontWeight: 500 }}>
                  CSS
                </div>
                <div
                  className="text-[12px] text-indigo-700 bg-indigo-50 px-2 py-1 rounded"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
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
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            交互式示例
          </h3>

          <div className="flex gap-2 mb-6">
            {layoutExamples.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setActiveExample(i)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                  activeExample === i
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-150"
                }`}
                style={{ fontWeight: activeExample === i ? 500 : 400 }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual */}
            <div className="bg-white border border-indigo-200/60 rounded-2xl p-6">
              <div className="text-[12px] text-gray-400 mb-4" style={{ fontWeight: 500 }}>
                {example.desc}
              </div>
              <div
                className={`border-2 border-dashed border-indigo-200 rounded-xl p-4 flex ${
                  example.direction === "vertical" ? "flex-col" : "flex-row"
                } ${example.spaceBetween ? "justify-between" : ""} items-center`}
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
                    className={`bg-indigo-100 text-indigo-700 rounded-lg px-4 py-2.5 text-[13px] text-center ${
                      child.sizing === "fill" ? "flex-1 w-full" : ""
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {child.text}
                    <div className="text-[10px] text-indigo-400 mt-0.5">
                      {child.sizing === "fill" ? "Fill ↔" : "Hug ⊡"}
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Annotations */}
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-1 rounded" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  gap: {example.gap}px
                </span>
                <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-1 rounded" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  padding: {example.paddingY}px {example.paddingX}px
                </span>
                <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-1 rounded" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  direction: {example.direction}
                </span>
              </div>
            </div>

            {/* Code output */}
            <div className="bg-gray-900 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-[11px] text-gray-500">CSS Output</span>
              </div>
              <pre
                className="text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
              >
                <code>
                  <span className="text-blue-300">{"display"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-amber-300">{"flex"}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-blue-300">{"flex-direction"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-amber-300">{example.direction === "vertical" ? "column" : "row"}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-blue-300">{"gap"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-emerald-300">{`${example.gap}px`}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-blue-300">{"padding"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-emerald-300">{`${example.paddingY}px ${example.paddingX}px`}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-blue-300">{"align-items"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-amber-300">{"center"}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  {example.spaceBetween && (
                    <>
                      <span className="text-blue-300">{"justify-content"}</span>
                      <span className="text-gray-500">{": "}</span>
                      <span className="text-amber-300">{"space-between"}</span>
                      <span className="text-gray-500">{";"}</span>{"\n"}
                    </>
                  )}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Responsive demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            Fill vs Fixed = 响应式设计
          </h3>
          <div className="flex gap-2 mb-6">
            {responsiveDemo.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setResponsiveIndex(i)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                  responsiveIndex === i
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-500"
                }`}
                style={{ fontWeight: responsiveIndex === i ? 500 : 400 }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="bg-white border border-gray-200/60 rounded-2xl p-6 flex justify-center">
            <motion.div
              animate={{ width: responsiveDemo[responsiveIndex].width }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="border-2 border-dashed border-indigo-200 rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="bg-indigo-100 rounded-lg px-4 py-3 text-[12px] text-indigo-600 text-center" style={{ fontWeight: 500 }}>
                Header <span className="text-indigo-400">(Fill ↔)</span>
              </div>
              <div className={`flex gap-3 ${responsiveIndex === 2 ? "flex-col" : "flex-row"}`}>
                <div className="bg-violet-100 rounded-lg px-4 py-8 text-[12px] text-violet-600 text-center flex-1" style={{ fontWeight: 500 }}>
                  Sidebar <span className="text-violet-400">{responsiveIndex === 2 ? "(Fill)" : "(Fixed 200px)"}</span>
                </div>
                <div className="bg-emerald-100 rounded-lg px-4 py-8 text-[12px] text-emerald-600 text-center flex-[2]" style={{ fontWeight: 500 }}>
                  Content <span className="text-emerald-400">(Fill ↔)</span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3 text-[12px] text-gray-500 text-center" style={{ fontWeight: 500 }}>
                Footer <span className="text-gray-400">(Fill ↔)</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
