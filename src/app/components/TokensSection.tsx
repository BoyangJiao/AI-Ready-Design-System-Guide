import { useState } from "react";
import { motion } from "motion/react";
import { Palette, Type, Square } from "lucide-react";

const colorTokens = [
  { name: "color-primary", value: "#2B4C6F", desc: "品牌主色（靛蓝）" },
  { name: "color-primary-light", value: "#3D6A94", desc: "主色浅色" },
  { name: "color-accent", value: "#C4784A", desc: "强调色（赭石）" },
  { name: "color-success", value: "#5B7E5E", desc: "成功态（竹青）" },
  { name: "color-warning", value: "#C4784A", desc: "警告态（赭石）" },
  { name: "color-error", value: "#B44D4D", desc: "错误态（朱砂）" },
  { name: "color-text-primary", value: "#2C2C2C", desc: "主文字（墨色）" },
  { name: "color-text-secondary", value: "#6B6560", desc: "次要文字" },
  { name: "color-bg-primary", value: "#F5F0E8", desc: "主背景（和纸）" },
  { name: "color-bg-secondary", value: "#FAF7F2", desc: "次要背景（宣纸）" },
];

const textTokens = [
  { name: "font-display", size: "48px", weight: "700", lineHeight: "1.1" },
  { name: "font-heading-h1", size: "36px", weight: "700", lineHeight: "1.2" },
  { name: "font-heading-h2", size: "28px", weight: "600", lineHeight: "1.3" },
  { name: "font-heading-h3", size: "22px", weight: "600", lineHeight: "1.4" },
  { name: "font-body-lg", size: "18px", weight: "400", lineHeight: "1.8" },
  { name: "font-body-regular", size: "16px", weight: "400", lineHeight: "1.8" },
  { name: "font-body-sm", size: "14px", weight: "400", lineHeight: "1.6" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-ochre/10 text-ochre text-[12px] mb-4 font-sans" style={{ fontWeight: 500 }}>
            <Palette size={13} />
            Design Tokens
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            设计令牌 = AI 的样式词典
          </h2>
          <p className="text-ink-muted text-[15px] max-w-2xl mb-12 font-sans" style={{ lineHeight: 1.8 }}>
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
          <div className="bg-washi-warm border border-border rounded-md p-6">
            <h3 className="text-[14px] mb-4 text-ink-primary font-serif" style={{ fontWeight: 600 }}>
              Token 从设计到代码的流转
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {[
                { label: "Figma Styles", desc: "颜色/文字样式", color: "bg-ochre/10 text-ochre border-ochre/20" },
                { label: "Design Tokens", desc: "JSON/YAML 格式", color: "bg-indigo/10 text-indigo border-indigo/20" },
                { label: "CSS Variables", desc: "--color-primary", color: "bg-bamboo/10 text-bamboo border-bamboo/20" },
                { label: "Tailwind Config", desc: "theme.extend", color: "bg-stone/10 text-stone border-stone/20" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`${step.color} border rounded-md px-4 py-3 text-center min-w-[130px] font-sans`}>
                    <div className="text-[13px]" style={{ fontWeight: 600 }}>{step.label}</div>
                    <div className="text-[11px] opacity-70 mt-0.5">{step.desc}</div>
                  </div>
                  {i < 3 && (
                    <span className="text-stone/40 hidden sm:block">→</span>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] transition-all font-sans ${
                  activeTab === key
                    ? "bg-ochre/10 text-ochre"
                    : "bg-secondary text-ink-muted"
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
            <div className="bg-washi-warm border border-border rounded-md p-5 max-h-[420px] overflow-y-auto">
              {activeTab === "colors" &&
                colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
                  >
                    <div
                      className="w-8 h-8 rounded-md border border-border shadow-sm shrink-0"
                      style={{ backgroundColor: token.value }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-ink-secondary truncate font-mono" style={{ fontWeight: 500 }}>
                        {token.name}
                      </div>
                      <div className="text-[11px] text-stone font-sans">{token.desc}</div>
                    </div>
                    <div className="text-[11px] text-stone shrink-0 font-mono">
                      {token.value}
                    </div>
                  </div>
                ))}

              {activeTab === "typography" &&
                textTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-ink-secondary truncate font-mono" style={{ fontWeight: 500 }}>
                        {token.name}
                      </div>
                      <div
                        className="text-ink-primary mt-1 truncate font-serif"
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
                      <div className="text-[11px] text-stone font-mono">
                        {token.size} / {token.weight}
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "spacing" &&
                spacingTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
                  >
                    <div
                      className="bg-ochre/30 rounded-sm shrink-0"
                      style={{ width: parseInt(token.value), height: "20px", minWidth: "4px" }}
                    />
                    <div className="text-[12px] text-ink-secondary flex-1 font-mono" style={{ fontWeight: 500 }}>
                      {token.name}
                    </div>
                    <div className="text-[11px] text-stone font-mono">
                      {token.value}
                    </div>
                  </div>
                ))}
            </div>

            {/* Code output */}
            <div className="bg-ink-primary rounded-md p-5 overflow-auto max-h-[420px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-vermillion/60" />
                <div className="w-3 h-3 rounded-full bg-ochre/60" />
                <div className="w-3 h-3 rounded-full bg-bamboo/60" />
                <span className="ml-2 text-[11px] text-stone/60 font-sans">
                  {activeTab === "colors"
                    ? "tokens.css"
                    : activeTab === "typography"
                    ? "typography.css"
                    : "spacing.css"}
                </span>
              </div>
              <pre className="text-[12px] font-mono" style={{ lineHeight: 1.8 }}>
                {activeTab === "colors" && (
                  <code>
                    <span className="text-stone/50">{":root {"}</span>{"\n"}
                    {colorTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-indigo-light">{"  --"}{t.name}</span>
                        <span className="text-stone/50">{": "}</span>
                        <span className="text-ochre-light">{t.value}</span>
                        <span className="text-stone/50">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-stone/50">{"}"}</span>
                  </code>
                )}
                {activeTab === "typography" && (
                  <code>
                    <span className="text-stone/50">{":root {"}</span>{"\n"}
                    {textTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-indigo-light">{"  --"}{t.name}-size</span>
                        <span className="text-stone/50">{": "}</span>
                        <span className="text-bamboo-light">{t.size}</span>
                        <span className="text-stone/50">{";"}</span>{"\n"}
                        <span className="text-indigo-light">{"  --"}{t.name}-weight</span>
                        <span className="text-stone/50">{": "}</span>
                        <span className="text-bamboo-light">{t.weight}</span>
                        <span className="text-stone/50">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-stone/50">{"}"}</span>
                  </code>
                )}
                {activeTab === "spacing" && (
                  <code>
                    <span className="text-stone/50">{":root {"}</span>{"\n"}
                    {spacingTokens.map((t) => (
                      <span key={t.name}>
                        <span className="text-indigo-light">{"  --"}{t.name}</span>
                        <span className="text-stone/50">{": "}</span>
                        <span className="text-bamboo-light">{t.value}</span>
                        <span className="text-stone/50">{";"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-stone/50">{"}"}</span>
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
