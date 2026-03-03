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
    frame: "bg-blue-100 text-blue-600",
    component: "bg-violet-100 text-violet-600",
    text: "bg-emerald-100 text-emerald-600",
    rect: "bg-gray-100 text-gray-500",
    image: "bg-amber-100 text-amber-600",
    group: "bg-gray-100 text-gray-500",
  };

  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
      style={{ paddingLeft: `${indent * 20 + 8}px` }}
    >
      {indent > 0 && (
        <ChevronRight size={12} className="text-gray-300 -ml-4" />
      )}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded ${typeColors[type] || typeColors.frame}`}
        style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {type === "component" ? "◆" : type === "text" ? "T" : type === "image" ? "▣" : "□"}
      </span>
      <span
        className={`text-[13px] ${isGood ? "text-gray-700" : "text-gray-400"}`}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
      >
        {name}
      </span>
    </div>
  );
}

export function LayerSection() {
  const [showGood, setShowGood] = useState(false);

  return (
    <section id="layers" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Layers size={13} />
            图层与结构
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            语义化命名与逻辑化分组
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
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
            <h3 className="text-[14px] text-gray-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
              图层结构对比
            </h3>
            <button
              onClick={() => setShowGood(!showGood)}
              className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                showGood
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
              style={{ fontWeight: 500 }}
            >
              {showGood ? "✓ AI-Ready 结构" : "✗ 传统结构"} — 点击切换
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Layer tree panel */}
            <div
              className={`rounded-2xl border p-4 transition-all duration-500 ${
                showGood
                  ? "bg-white border-emerald-200/60"
                  : "bg-white border-red-200/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    showGood ? "bg-emerald-100" : "bg-red-100"
                  }`}
                >
                  {showGood ? (
                    <Check size={12} className="text-emerald-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                </div>
                <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
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
            <div className="bg-gray-900 rounded-2xl p-5 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-[11px] text-gray-500">生成的代码</span>
              </div>
              <pre
                className="text-[12px] overflow-x-auto"
                style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
              >
                {showGood ? (
                  <code>
                    <span className="text-violet-400">{"<Card-Product>"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"<Card-Header>"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-amber-300">{"<Product-Image />"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-violet-400">{"<Badge-Sale />"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"</Card-Header>"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"<Card-Body>"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-emerald-400">{"<Product-Title />"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-emerald-400">{"<Product-Price />"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-violet-400">{"<Rating-Stars />"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"</Card-Body>"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"<Card-Footer>"}</span>{"\n"}
                    <span className="text-gray-500">    </span>
                    <span className="text-violet-400">{"<Button-AddToCart />"}</span>{"\n"}
                    <span className="text-gray-500">  </span>
                    <span className="text-blue-400">{"</Card-Footer>"}</span>{"\n"}
                    <span className="text-violet-400">{"</Card-Product>"}</span>
                  </code>
                ) : (
                  <code>
                    <span className="text-gray-500">{"<div>"}</span>{"\n"}
                    <span className="text-gray-500">  {"<div>"}</span>
                    <span className="text-gray-600"> {"/* 矩形 5 */"}</span>{"\n"}
                    <span className="text-gray-500">  {"<div>"}</span>
                    <span className="text-gray-600"> {"/* Group 3 */"}</span>{"\n"}
                    <span className="text-gray-500">    {"<span>"}</span>
                    <span className="text-gray-600">{"..."}</span>
                    <span className="text-gray-500">{"</span>"}</span>{"\n"}
                    <span className="text-gray-500">    {"<div>"}</span>
                    <span className="text-gray-600"> {"/* Frame 24 */"}</span>{"\n"}
                    <span className="text-gray-500">      {"<div>"}</span>
                    <span className="text-gray-600"> {"/* 矩形 7 */"}</span>{"\n"}
                    <span className="text-gray-500">      {"<span>"}</span>
                    <span className="text-gray-600">{"..."}</span>
                    <span className="text-gray-500">{"</span>"}</span>{"\n"}
                    <span className="text-gray-500">    {"</div>"}</span>{"\n"}
                    <span className="text-gray-500">  {"</div>"}</span>{"\n"}
                    <span className="text-gray-500">  {"<div>"}</span>
                    <span className="text-gray-600"> {"/* 矩形 12 */"}</span>{"\n"}
                    <span className="text-gray-500">    {"<div>"}</span>
                    <span className="text-gray-600"> {"/* Frame 99 */"}</span>{"\n"}
                    <span className="text-gray-500">{"</div>"}</span>
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
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            命名规范速查
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {namingRules.map((rule) => (
              <div
                key={rule.category}
                className="bg-white border border-gray-200/60 rounded-2xl p-5"
              >
                <h4 className="text-[14px] mb-4" style={{ fontWeight: 600 }}>
                  {rule.category}
                </h4>
                <div className="space-y-2 mb-4">
                  {rule.good.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 text-[12px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <Check size={12} /> {name}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {rule.bad.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 text-[12px] text-red-500 bg-red-50 px-3 py-1.5 rounded-lg"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
