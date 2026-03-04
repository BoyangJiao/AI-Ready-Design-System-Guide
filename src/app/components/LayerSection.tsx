import { useState } from "react";
import { motion } from "motion/react";
import { Layers, Check, X, ChevronRight } from "lucide-react";

const badLayers = [
  { name: "Frame 1", indent: 0, type: "frame" },
  { name: "矩形 5", indent: 1, type: "rect" },
  { name: "Group 3", indent: 1, type: "group" },
  { name: "Text 1", indent: 2, type: "text" },
  { name: "Frame 24", indent: 2, type: "frame" },
  { name: "矩形 7", indent: 3, type: "rect" },
  { name: "Text copy", indent: 3, type: "text" },
  { name: "矩形 12", indent: 1, type: "rect" },
  { name: "Frame 99", indent: 2, type: "frame" },
];

const goodLayers = [
  { name: "Card-Product", indent: 0, type: "component" },
  { name: "Card-Header", indent: 1, type: "frame" },
  { name: "Product-Image", indent: 2, type: "image" },
  { name: "Badge-Sale", indent: 2, type: "component" },
  { name: "Card-Body", indent: 1, type: "frame" },
  { name: "Product-Title", indent: 2, type: "text" },
  { name: "Product-Price", indent: 2, type: "text" },
  { name: "Rating-Stars", indent: 2, type: "component" },
  { name: "Card-Footer", indent: 1, type: "frame" },
  { name: "Button-AddToCart", indent: 2, type: "component" },
];

const namingRules = [
  {
    category: "组件",
    good: ["Button-Primary", "Card-Product", "Input-Email"],
    bad: ["Frame 5", "矩形 12", "Group copy"],
  },
  {
    category: "图层",
    good: ["Header-Nav", "Hero-Title", "Footer-Links"],
    bad: ["Frame 123", "层 1", "图层 2"],
  },
  {
    category: "图标",
    good: ["Icon-Search", "Icon-Cart", "Icon-Menu"],
    bad: ["Vector", "Path", "形状"],
  },
];

function LayerTreeItem({
  name,
  indent,
  type,
  isGood,
}: {
  name: string;
  indent: number;
  type: string;
  isGood: boolean;
}) {
  const typeColors: Record<string, string> = {
    frame: "bg-indigo/10 text-indigo",
    component: "bg-ochre/10 text-ochre",
    text: "bg-bamboo/10 text-bamboo",
    rect: "bg-stone/10 text-stone",
    image: "bg-ochre/10 text-ochre",
    group: "bg-stone/10 text-stone",
  };

  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-washi-cream transition-colors"
      style={{ paddingLeft: `${indent * 20 + 8}px` }}
    >
      {indent > 0 && (
        <ChevronRight size={12} className="text-stone/40 -ml-4" />
      )}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-sm font-mono ${typeColors[type] || typeColors.frame}`}
        style={{ fontWeight: 500 }}
      >
        {type === "component" ? "◆" : type === "text" ? "T" : type === "image" ? "▣" : "□"}
      </span>
      <span
        className={`text-[13px] font-mono ${isGood ? "text-ink-secondary" : "text-stone"}`}
        style={{ fontWeight: 400 }}
      >
        {name}
      </span>
    </div>
  );
}

export function LayerSection() {
  const [showGood, setShowGood] = useState(false);

  return (
    <section id="layers" className="py-24 px-6 bg-washi-warm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo/10 text-indigo text-[12px] mb-4 font-sans" style={{ fontWeight: 500 }}>
            <Layers size={13} />
            图层与结构
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            语义化命名与逻辑化分组
          </h2>
          <p className="text-ink-muted text-[15px] max-w-2xl mb-12 font-sans" style={{ lineHeight: 1.8 }}>
            图层命名是最基本也是最重要的一点。它直接影响到生成代码的类名和组件名，是 AI 理解你设计意图的第一步。
          </p>
        </motion.div>

        {/* Interactive comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] text-stone uppercase tracking-wider font-sans" style={{ fontWeight: 600 }}>
              图层结构对比
            </h3>
            <button
              onClick={() => setShowGood(!showGood)}
              className={`px-4 py-2 rounded-md text-[13px] transition-all font-sans ${
                showGood
                  ? "bg-bamboo/10 text-bamboo"
                  : "bg-vermillion/10 text-vermillion"
              }`}
              style={{ fontWeight: 500 }}
            >
              {showGood ? "AI-Ready 结构" : "传统结构"} — 点击切换
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Layer tree panel */}
            <div
              className={`rounded-md border p-4 transition-all duration-500 ${
                showGood
                  ? "bg-washi-cream border-bamboo/20"
                  : "bg-washi-cream border-vermillion/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    showGood ? "bg-bamboo/10" : "bg-vermillion/10"
                  }`}
                >
                  {showGood ? (
                    <Check size={12} className="text-bamboo" />
                  ) : (
                    <X size={12} className="text-vermillion" />
                  )}
                </div>
                <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>
                  {showGood ? "Figma 图层面板 — 优化后" : "Figma 图层面板 — 优化前"}
                </span>
              </div>
              {(showGood ? goodLayers : badLayers).map((layer, i) => (
                <motion.div
                  key={`${showGood}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <LayerTreeItem {...layer} isGood={showGood} />
                </motion.div>
              ))}
            </div>

            {/* Generated code panel */}
            <div className="bg-ink-primary rounded-md p-5 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-vermillion/60" />
                <div className="w-3 h-3 rounded-full bg-ochre/60" />
                <div className="w-3 h-3 rounded-full bg-bamboo/60" />
                <span className="ml-2 text-[11px] text-stone/60 font-sans">生成的代码</span>
              </div>
              <pre
                className="text-[12px] overflow-x-auto font-mono"
                style={{ lineHeight: 1.8 }}
              >
                {showGood ? (
                  <code>
                    <span className="text-ochre-light">{"<Card-Product>"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"<Card-Header>"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-ochre-light">{"<Product-Image />"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-ochre-light">{"<Badge-Sale />"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"</Card-Header>"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"<Card-Body>"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-bamboo-light">{"<Product-Title />"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-bamboo-light">{"<Product-Price />"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-ochre-light">{"<Rating-Stars />"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"</Card-Body>"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"<Card-Footer>"}</span>{"\n"}
                    <span className="text-stone/50">    </span>
                    <span className="text-ochre-light">{"<Button-AddToCart />"}</span>{"\n"}
                    <span className="text-stone/50">  </span>
                    <span className="text-indigo-light">{"</Card-Footer>"}</span>{"\n"}
                    <span className="text-ochre-light">{"</Card-Product>"}</span>
                  </code>
                ) : (
                  <code>
                    <span className="text-stone/50">{"<div>"}</span>{"\n"}
                    <span className="text-stone/50">  {"<div>"}</span>
                    <span className="text-stone/30"> {"/* 矩形 5 */"}</span>{"\n"}
                    <span className="text-stone/50">  {"<div>"}</span>
                    <span className="text-stone/30"> {"/* Group 3 */"}</span>{"\n"}
                    <span className="text-stone/50">    {"<span>"}</span>
                    <span className="text-stone/30">{"..."}</span>
                    <span className="text-stone/50">{"</span>"}</span>{"\n"}
                    <span className="text-stone/50">    {"<div>"}</span>
                    <span className="text-stone/30"> {"/* Frame 24 */"}</span>{"\n"}
                    <span className="text-stone/50">      {"<div>"}</span>
                    <span className="text-stone/30"> {"/* 矩形 7 */"}</span>{"\n"}
                    <span className="text-stone/50">      {"<span>"}</span>
                    <span className="text-stone/30">{"..."}</span>
                    <span className="text-stone/50">{"</span>"}</span>{"\n"}
                    <span className="text-stone/50">    {"</div>"}</span>{"\n"}
                    <span className="text-stone/50">  {"</div>"}</span>{"\n"}
                    <span className="text-stone/50">  {"<div>"}</span>
                    <span className="text-stone/30"> {"/* 矩形 12 */"}</span>{"\n"}
                    <span className="text-stone/50">    {"<div>"}</span>
                    <span className="text-stone/30"> {"/* Frame 99 */"}</span>{"\n"}
                    <span className="text-stone/50">{"</div>"}</span>
                  </code>
                )}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Naming rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-6 font-sans" style={{ fontWeight: 600 }}>
            命名规范速查
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {namingRules.map((rule) => (
              <div
                key={rule.category}
                className="bg-washi-cream border border-border rounded-md p-5"
              >
                <h4 className="text-[14px] mb-4 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
                  {rule.category}
                </h4>
                <div className="space-y-2 mb-4">
                  {rule.good.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 text-[12px] text-bamboo bg-bamboo/5 px-3 py-1.5 rounded-sm font-mono"
                    >
                      <Check size={12} /> {name}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {rule.bad.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 text-[12px] text-vermillion bg-vermillion/5 px-3 py-1.5 rounded-sm font-mono"
                    >
                      <X size={12} /> {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
