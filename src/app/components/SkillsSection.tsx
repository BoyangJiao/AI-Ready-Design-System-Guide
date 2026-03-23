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
    label: "Knowledge Base 与 Skills",
    icon: Lightbulb,
    content: {
      title: "Knowledge Base 与 Skills：AI 的设计系统「说明书」",
      desc: "Knowledge Base 是设计系统的本体，负责定义「What」；而 Skills 是执行的工作流，解决「How」。它们相互配合指导 AI 编程工具正确使用规范。",
      points: [
        "Knowledge Base (What): 包含设计系统的全集定义规范 (如 tokens, layout)",
        "Skills (How): 定义具体组件如何渲染与工作流约束",
        "指导 AI 生成符合全局设计系统规范的高保真代码",
        "避免 AI「创造性发挥」导致的样式与逻辑不一致",
      ],
      example: `# Knowledge Base (What)
/knowledge-base
  ├── design-tokens.md
  ├── layout.md
  ├── component-spec.md
  └── assets-copy.md

# Button Component Skill (How)
## Usage Rules
- Always use design-tokens.md for colors
- Never hardcode hex/rgb values
- Check component-spec.md for variants

## Code Template
\`\`\`tsx
<Button variant="primary">
  {children}
</Button>
\`\`\`
`,
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
        "结合 Knowledge Base 与 Skills 实现高精度代码生成",
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
        "Vercel v0：内置体系，一键生成符合设计规范的 UI",
        "Shopify Polaris：将知识库(What)与技能(How)解耦指导 AI",
        "Coinbase CDS：完整的 Figma 组件库与代码组件精确映射",
        "IBM Carbon：严谨的 Token 层级架构和详尽的组件使用规范",
      ],
      example: `// 生产级工作流
// 1. 定义 Design System Knowledge Base (What)
// knowledge-base/design-tokens.md
# Color Palette
Use CSS variables from tokens.css
Never use raw hex/rgb values

// 2. 编写执行 Skills (How)
// skills/component-workflow.md
# Component Rules
Import from @company/ui
Available: Button, Card, Input
Max content width: 1280px

// 3. AI 自动遵循系统生成代码 ✨`,
    },
  },
];

const mcpFlow = [
  {
    step: 1,
    title: "Figma 设计稿",
    desc: "结构化的设计 + Design Tokens",
    icon: Figma,
    color: "from-pink-500 to-red-500",
  },
  {
    step: 2,
    title: "MCP Protocol",
    desc: "提取结构化设计数据",
    icon: FileJson,
    color: "from-violet-500 to-indigo-500",
  },
  {
    step: 3,
    title: "Knowledge Base 与 Skills",
    desc: "设计系统知识库 + 技能工作流",
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
  },
  {
    step: 4,
    title: "AI 编程工具",
    desc: "Cursor / Claude / Copilot",
    icon: Brain,
    color: "from-emerald-500 to-teal-500",
  },
  {
    step: 5,
    title: "高保真代码",
    desc: "符合设计系统规范的输出",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("what");

  const current = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Rocket size={13} />
            Knowledge Base & MCP 新范式
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            从「画图」到「编程」的桥梁
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
            2025-2026 年最重要的进展：Knowledge Base 与 Skills 让 AI 不仅能「看到」你的设计，更能深刻理解「What」和「How」。
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
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            完整工作流
          </h3>
          <div className="bg-white border border-gray-200/60 rounded-2xl p-6 overflow-x-auto">
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
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md`}
                    >
                      <step.icon size={20} className="text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-[12px]" style={{ fontWeight: 600 }}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {step.desc}
                      </div>
                    </div>
                  </motion.div>
                  {i < mcpFlow.length - 1 && (
                    <ArrowRight size={16} className="text-gray-300 shrink-0" />
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all ${
                  activeCategory === id
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-500"
                }`}
                style={{ fontWeight: activeCategory === id ? 500 : 400 }}
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
              <div className="bg-white border border-gray-200/60 rounded-2xl p-6">
                <h3 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>
                  {current.content.title}
                </h3>
                <p className="text-[13px] text-gray-500 mb-5" style={{ lineHeight: 1.7 }}>
                  {current.content.desc}
                </p>
                <div className="space-y-2.5">
                  {current.content.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 shrink-0">
                        <Zap size={10} className="text-orange-500" />
                      </div>
                      <span className="text-[13px] text-gray-600" style={{ lineHeight: 1.6 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code example */}
              <div className="bg-gray-900 rounded-2xl p-5 overflow-auto max-h-[420px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-[11px] text-gray-500">
                    {activeCategory === "what" ? "knowledge-base & skills" : activeCategory === "mcp" ? "mcp-output.json" : "workflow"}
                  </span>
                </div>
                <pre
                  className="text-[12px] text-gray-300 whitespace-pre-wrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}
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