import { useState } from "react";
import { motion } from "motion/react";
import { Palette, Type, Square } from "lucide-react";

const colorTokens = [
  { name: "color-primary", value: "#6D28D9", desc: "品牌主色" },
  { name: "color-primary-light", value: "#8B5CF6", desc: "主色浅色" },
  { name: "color-secondary", value: "#0EA5E9", desc: "辅助色" },
  { name: "color-success", value: "#10B981", desc: "成功态" },
  { name: "color-warning", value: "#F59E0B", desc: "警告态" },
  { name: "color-error", value: "#EF4444", desc: "错误态" },
  { name: "color-text-primary", value: "#111827", desc: "主文字" },
  { name: "color-text-secondary", value: "#6B7280", desc: "次要文字" },
  { name: "color-bg-primary", value: "#FFFFFF", desc: "主背景" },
  { name: "color-bg-secondary", value: "#F9FAFB", desc: "次要背景" },
];

const textTokens = [
  { name: "font-display", size: "48px", weight: "700", lineHeight: "1.1" },
  { name: "font-heading-h1", size: "36px", weight: "700", lineHeight: "1.2" },
  { name: "font-heading-h2", size: "28px", weight: "600", lineHeight: "1.3" },
  { name: "font-heading-h3", size: "22px", weight: "600", lineHeight: "1.4" },
  { name: "font-body-lg", size: "18px", weight: "400", lineHeight: "1.7" },
  { name: "font-body-regular", size: "16px", weight: "400", lineHeight: "1.7" },
  { name: "font-body-sm", size: "14px", weight: "400", lineHeight: "1.5" },
  { name: "font-caption", size: "12px", weight: "500", lineHeight: "1.4" },
];

const spacingTokens = [
  { name: "space-1", value: "4px" },
  { name: "space-2", value: "8px" },
  { name: "space-3", value: "12px" },
  { name: "space-4", value: "16px" },
  { name: "space-6", value: "24px" },
  { name: "space-8", value: "32px" },
  { name: "space-10", value: "40px" },
  { name: "space-12", value: "48px" },
];

type TabType = "colors" | "typography" | "spacing";

export function TokensSection() {
  const [activeTab, setActiveTab] = useState<TabType>("colors");

  return (
    <section id="tokens" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Palette size={13} />
            Design Tokens
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            设计令牌 = AI 的样式词典
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
            在 AI 眼中，零散的颜色值和字号只是独立的样式。建立统一的 Design Tokens，让 AI 生成系统化、可维护的代码，而非硬编码的数值。
          </p>
        </motion.div>

        {/* Token flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6">
            <h3 className="text-[14px] mb-4" style={{ fontWeight: 600 }}>
              Token 从设计到代码的流转
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {[
                { label: "Figma Styles", desc: "颜色/文字样式", color: "bg-pink-100 text-pink-700 border-pink-200" },
                { label: "Design Tokens", desc: "JSON/YAML 格式", color: "bg-amber-100 text-amber-700 border-amber-200" },
                { label: "CSS Variables", desc: "--color-primary", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
                { label: "Tailwind Config", desc: "theme.extend", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`${step.color} border rounded-xl px-4 py-3 text-center min-w-[130px]`}>
                    <div className="text-[13px]" style={{ fontWeight: 600 }}>{step.label}</div>
                    <div className="text-[11px] opacity-70 mt-0.5">{step.desc}</div>
                  </div>
                  {i < 3 && (
                    <span className="text-gray-300 hidden sm:block">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-6">
            {([
              { key: "colors", label: "颜色令牌", icon: Palette },
              { key: "typography", label: "字体令牌", icon: Type },
              { key: "spacing", label: "间距令牌", icon: Square },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all ${
                  activeTab === key
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"
                }`}
                style={{ fontWeight: activeTab === key ? 500 : 400 }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Token list */}
            <div className="bg-white border border-gray-200/60 rounded-2xl p-5 max-h-[420px] overflow-y-auto">
              {activeTab === "colors" &&
                colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm shrink-0"
                      style={{ backgroundColor: token.value }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[12px] text-gray-700 truncate"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
                      >
                        {token.name}
                      </div>
                      <div className="text-[11px] text-gray-400">{token.desc}</div>
                    </div>
                    <div
                      className="text-[11px] text-gray-400 shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {token.value}
                    </div>
                  </div>
                ))}

              {activeTab === "typography" &&
                textTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[12px] text-gray-700 truncate"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
                      >
                        {token.name}
                      </div>
                      <div
                        className="text-gray-800 mt-1 truncate"
                        style={{
                          fontSize: Math.min(parseInt(token.size), 28) + "px",
                          fontWeight: parseInt(token.weight),
                          lineHeight: token.lineHeight,
                        }}
                      >
                        设计系统
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {token.size} / {token.weight}
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "spacing" &&
                spacingTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className="bg-amber-200 rounded-sm shrink-0"
                      style={{ width: parseInt(token.value), height: "20px", minWidth: "4px" }}
                    />
                    <div
                      className="text-[12px] text-gray-700 flex-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
                    >
                      {token.name}
                    </div>
                    <div
                      className="text-[11px] text-gray-400"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {token.value}
                    </div>
                  </div>
                ))}
            </div>

            {/* Code output */}
            <div className="bg-gray-900 rounded-2xl p-5 overflow-auto max-h-[420px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-[11px] text-gray-500">
                  {activeTab === "colors"
                    ? "tokens.css"
                    : activeTab === "typography"
                    ? "typography.css"
                    : "spacing.css"}
                </span>
              </div>
              <pre
                className="text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
              >
                {activeTab === "colors" && (
                  <code>
                    <span className="text-gray-500">{":root {"}</span>{"\n"}
                    {colorTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-blue-300">{"  --"}{t.name}</span>
                        <span className="text-gray-500">{": "}</span>
                        <span className="text-amber-300">{t.value}</span>
                        <span className="text-gray-500">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-gray-500">{"}"}</span>
                  </code>
                )}
                {activeTab === "typography" && (
                  <code>
                    <span className="text-gray-500">{":root {"}</span>{"\n"}
                    {textTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-blue-300">{"  --"}{t.name}-size</span>
                        <span className="text-gray-500">{": "}</span>
                        <span className="text-emerald-300">{t.size}</span>
                        <span className="text-gray-500">{";"}</span>{"\n"}
                        <span className="text-blue-300">{"  --"}{t.name}-weight</span>
                        <span className="text-gray-500">{": "}</span>
                        <span className="text-emerald-300">{t.weight}</span>
                        <span className="text-gray-500">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-gray-500">{"}"}</span>
                  </code>
                )}
                {activeTab === "spacing" && (
                  <code>
                    <span className="text-gray-500">{":root {"}</span>{"\n"}
                    {spacingTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-blue-300">{"  --"}{t.name}</span>
                        <span className="text-gray-500">{": "}</span>
                        <span className="text-emerald-300">{t.value}</span>
                        <span className="text-gray-500">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-gray-500">{"}"}</span>
                  </code>
                )}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
