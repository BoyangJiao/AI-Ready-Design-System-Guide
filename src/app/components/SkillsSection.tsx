import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  BookOpen,
  Code,
  Figma,
  MessageSquare,
  ArrowRight,
  Zap,
  Brain,
  Shield,
  FileJson,
  Lightbulb,
} from "lucide-react";

const skillCategories = [
  {
    id: "what",
    label: "什么是 Skills",
    icon: Lightbulb,
    content: {
      title: "Skills：AI 的设计系统「说明书」",
      desc: "Skills 是一种结构化的指令文档（通常是 .md 或 .json 文件），它告诉 AI 编程工具如何正确使用你的设计系统。可以理解为你为 AI 编写的「组件使用手册」。",
      points: [
        "定义组件的使用规范、属性和约束条件",
        "包含代码模板和最佳实践示例",
        "指导 AI 生成符合设计系统规范的代码",
        "避免 AI「创造性发挥」导致的样式不一致",
      ],
      example: `# Button Component Skill

## Usage Rules
- Always use design token colors
- Never hardcode color values
- Support variants: primary, secondary, ghost
- Always include aria-label for icon-only buttons

## Code Template
\`\`\`tsx
<Button 
  variant="primary"
  size="md"
  onClick={handler}
>
  {children}
</Button>
\`\`\`

## Constraints
- Max 3 words for button text
- Always pair with loading state`,
    },
  },
  {
    id: "mcp",
    label: "MCP 协议",
    icon: FileJson,
    content: {
      title: "MCP：连接设计与 AI 的桥梁",
      desc: "MCP（Model Context Protocol）是连接 Figma 和 AI 编程工具（如 Cursor、Claude）的标准化协议。它读取你 Figma 文件的结构化数据，并将设计意图忠实地传递给 AI。",
      points: [
        "自动提取 Figma 的组件结构、Auto Layout 和样式信息",
        "将设计规范转化为 AI 可理解的上下文",
        "支持实时同步设计变更到代码环境",
        "结合 Skills 文件实现高精度代码生成",
      ],
      example: `// MCP 数据流示例
{
  "component": "ProductCard",
  "layout": {
    "direction": "vertical",
    "gap": "12px",
    "padding": "16px"
  },
  "variants": [
    { "name": "default", "state": "idle" },
    { "name": "hover", "state": "elevated" }
  ],
  "tokens": {
    "bg": "var(--color-card)",
    "radius": "var(--radius-lg)"
  },
  "skills": ["use-design-tokens", 
    "auto-responsive"]
}`,
    },
  },
  {
    id: "practice",
    label: "实际应用",
    icon: Rocket,
    content: {
      title: "已验证的设计系统实践",
      desc: "Vercel、Shopify、Coinbase、IBM 等团队已经在生产环境中使用 Skills + MCP 的组合来加速设计到代码的转化。",
      points: [
        "Vercel v0：内置 Design System Skills，一键生成符合规范的 UI",
        "Shopify Polaris：通过 Skills 文件确保 AI 遵循 Polaris 设计系统",
        "Coinbase CDS：完整的 Figma 组件库与代码组件精确映射",
        "IBM Carbon：严谨的 Token 层级架构和详尽的组件使用规范",
      ],
      example: `// Vercel v0 + Skills 工作流
// 1. 定义 Design System Skills
// skills/design-system.md

# My Design System

## Color Palette
Use CSS variables from tokens.css
Never use raw hex/rgb values

## Component Library
Import from @company/ui
Available: Button, Card, Input,
  Modal, Badge, Avatar

## Layout Rules  
Mobile-first responsive design
Use CSS Grid for page layouts
Use Flexbox for component layouts
Max content width: 1280px

// 2. AI 自动遵循规范生成代码`,
    },
  },
];

const mcpFlow = [
  {
    step: 1,
    title: "Figma 设计稿",
    desc: "结构化的设计 + Design Tokens",
    icon: Figma,
    accent: "bg-[#C45B3E]",
  },
  {
    step: 2,
    title: "MCP Protocol",
    desc: "提取结构化设计数据",
    icon: FileJson,
    accent: "bg-[#2B4C7E]",
  },
  {
    step: 3,
    title: "Skills 文件",
    desc: "组件规范 + 代码模板",
    icon: BookOpen,
    accent: "bg-[#8B6914]",
  },
  {
    step: 4,
    title: "AI 编程工具",
    desc: "Cursor / Claude / Copilot",
    icon: Brain,
    accent: "bg-[#4A7C59]",
  },
  {
    step: 5,
    title: "高保真代码",
    desc: "符合设计系统规范的输出",
    icon: Code,
    accent: "bg-[#2B4C7E]",
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("what");

  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="py-24 px-6" style={{ backgroundColor: "var(--washi-bg-warm)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] mb-4"
            style={{
              fontWeight: 500,
              backgroundColor: "var(--washi-accent-ochre-light)",
              color: "var(--washi-accent-ochre)",
              border: "1px solid var(--washi-accent-ochre)",
              borderRadius: "var(--washi-radius)",
            }}
          >
            <Rocket size={13} />
            Skills & MCP 新范式
          </div>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-3 font-serif"
            style={{ fontWeight: 700, lineHeight: 1.2, color: "var(--washi-ink)" }}
          >
            从「画图」到「编程」的桥梁
          </h2>
          <p className="text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7, color: "var(--washi-ink-light)" }}>
            2025-2026 年最重要的进展：Skills 文件和 MCP 协议让 AI 不仅能「看到」你的设计，还能「理解」你的设计系统规范。
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <h3
            className="text-[14px] uppercase tracking-wider mb-6"
            style={{ fontWeight: 600, color: "var(--washi-ink-faint)" }}
          >
            完整工作流
          </h3>
          <div
            className="p-6 overflow-x-auto"
            style={{
              backgroundColor: "var(--washi-paper)",
              border: "1px solid var(--washi-border)",
              borderRadius: "var(--washi-radius)",
            }}
          >
            <div className="flex items-center gap-2 min-w-[700px]">
              {mcpFlow.map((step, i) => (
                <div key={step.step} className="flex items-center gap-2 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center ${step.accent}`}
                      style={{ borderRadius: "var(--washi-radius)" }}
                    >
                      <step.icon size={20} className="text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-[12px]" style={{ fontWeight: 600, color: "var(--washi-ink)" }}>
                        {step.title}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: "var(--washi-ink-faint)" }}>
                        {step.desc}
                      </div>
                    </div>
                  </motion.div>
                  {i < mcpFlow.length - 1 && (
                    <ArrowRight size={16} style={{ color: "var(--washi-border-dark)" }} className="shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 mb-6">
            {skillCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className="flex items-center gap-2 px-4 py-2 text-[13px] transition-all"
                style={{
                  fontWeight: activeCategory === id ? 500 : 400,
                  backgroundColor: activeCategory === id ? "var(--washi-accent-ochre-light)" : "var(--washi-bg-warm)",
                  color: activeCategory === id ? "var(--washi-accent-ochre)" : "var(--washi-ink-light)",
                  border: activeCategory === id ? "1px solid var(--washi-accent-ochre)" : "1px solid var(--washi-border)",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Content */}
              <div
                className="p-6"
                style={{
                  backgroundColor: "var(--washi-paper)",
                  border: "1px solid var(--washi-border)",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <h3 className="text-[17px] mb-3 font-serif" style={{ fontWeight: 600, color: "var(--washi-ink)" }}>
                  {current.content.title}
                </h3>
                <p className="text-[13px] mb-5" style={{ lineHeight: 1.7, color: "var(--washi-ink-light)" }}>
                  {current.content.desc}
                </p>
                <div className="space-y-2.5">
                  {current.content.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div
                        className="w-5 h-5 flex items-center justify-center mt-0.5 shrink-0"
                        style={{
                          backgroundColor: "var(--washi-accent-ochre-light)",
                          borderRadius: "50%",
                        }}
                      >
                        <Zap size={10} style={{ color: "var(--washi-accent-ochre)" }} />
                      </div>
                      <span className="text-[13px]" style={{ lineHeight: 1.6, color: "var(--washi-ink-light)" }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code example */}
              <div
                className="p-5 overflow-auto max-h-[420px]"
                style={{
                  backgroundColor: "var(--washi-code-bg)",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--washi-accent-vermillion)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--washi-accent-ochre)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--washi-accent-bamboo)" }} />
                  <span className="ml-2 text-[11px]" style={{ color: "var(--washi-code-comment)" }}>
                    {activeCategory === "what" ? "skills/button.md" : activeCategory === "mcp" ? "mcp-output.json" : "skills/design-system.md"}
                  </span>
                </div>
                <pre
                  className="text-[12px] whitespace-pre-wrap font-mono"
                  style={{ lineHeight: 1.7, color: "var(--washi-code-text)" }}
                >
                  {current.content.example}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
