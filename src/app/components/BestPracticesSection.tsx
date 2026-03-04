import { useState } from "react";
import { motion } from "motion/react";
import {
  Trophy,
  ExternalLink,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

const companies = [
  {
    name: "Vercel / v0",
    product: "v0 Design Systems",
    desc: "v0 内置 Design System Skills，根据用户描述生成符合设计规范的 React + Tailwind 代码。",
    practices: [
      "内置 shadcn/ui 组件库作为默认 Design System",
      "Skills 文件定义了严格的 Tailwind CSS 使用规范",
      "支持自定义 Design Tokens 覆盖默认样式",
      "AI 自动处理响应式断点和暗色模式",
    ],
    color: "from-gray-800 to-gray-900",
    textColor: "text-white",
    link: "https://v0.app/docs/design-systems",
    linkLabel: "v0 Design Systems Docs",
  },
  {
    name: "Shopify",
    product: "Polaris Design System",
    desc: "Polaris 拥有完整的 Token 体系、严格的组件规范和丰富的文档，是 AI 生成生产级代码的标杆。",
    practices: [
      "Polaris 组件有完整的 Skills 文档供 AI 参考",
      "Design Tokens 通过 Style Dictionary 管理和同步",
      "AI 生成代码自动应用 Polaris 的无障碍标准 (WCAG)",
      "多主题支持通过 Token 层实现设计一致性",
    ],
    color: "from-green-600 to-emerald-700",
    textColor: "text-white",
    link: "https://polaris.shopify.com/",
    linkLabel: "Polaris Design System",
  },
  {
    name: "Coinbase",
    product: "Coinbase Design System (CDS)",
    desc: "Coinbase Design System 提供了一套完整的、跨平台的组件库和设计规范，支持 Web 和移动端的一致性体验。",
    practices: [
      "完整的 Figma 组件库与代码组件一一对应",
      "语义化 Token 体系覆盖颜色、排版、间距",
      "组件属性（Variant/Boolean/String）精确映射 React Props",
      "严格的无障碍标准和多主题支持",
    ],
    color: "from-blue-600 to-indigo-700",
    textColor: "text-white",
    link: "https://cds.coinbase.com/",
    linkLabel: "Coinbase Design System",
  },
  {
    name: "IBM",
    product: "Carbon Design System",
    desc: "Carbon 是 IBM 的开源设计系统，以其严谨的 Token 架构和完善的组件规范著称，被广泛用于企业级产品。",
    practices: [
      "完整的 Design Token 层级（Global → Alias → Component）",
      "React/Web Components 双技术栈支持",
      "详尽的组件使用指南和代码规范文档",
      "成熟的主题化和无障碍支持体系",
    ],
    color: "from-gray-700 to-gray-900",
    textColor: "text-white",
    link: "https://carbondesignsystem.com/",
    linkLabel: "Carbon Design System",
  },
];

const keyTakeaways = [
  {
    number: "01",
    title: "设计即代码",
    desc: "将设计稿从静态视觉升级为结构化的开发蓝图，让每一个设计决策都能被 AI 精确转译。",
  },
  {
    number: "02",
    title: "Token 即语言",
    desc: "Design Tokens 是设计师和 AI 之间的共同语言，确保样式系统的一致性和可维护性。",
  },
  {
    number: "03",
    title: "Skills 即规范",
    desc: "Skills 文件是 AI 的行为准则，定义了组件如何使用、代码如何组织、样式如何应用。",
  },
  {
    number: "04",
    title: "协作即进化",
    desc: "设计师、AI 工具和开发者的三方协作，正在重新定义产品开发的效率边界。",
  },
];

export function BestPracticesSection() {
  const [activeCompany, setActiveCompany] = useState(0);

  return (
    <section id="bestpractices" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Trophy size={13} />
            最佳实践
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            支撑 AI Design-to-Code 的设计系统实践
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-4" style={{ lineHeight: 1.7 }}>这些公司的设计系统已经在生产环境中验证了 AI-Ready 设计系统的价值——通过精心构建的设计系统规范，让 AI 能够生成生产级别的高保真代码。</p>
          
        </motion.div>

        {/* Company cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {companies.map((company, i) => (
              <button
                key={company.name}
                onClick={() => setActiveCompany(i)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all whitespace-nowrap ${
                  activeCompany === i
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
                style={{ fontWeight: activeCompany === i ? 500 : 400 }}
              >
                {company.name}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCompany}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${companies[activeCompany].color} rounded-2xl p-8 ${companies[activeCompany].textColor}`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[24px] mb-1" style={{ fontWeight: 700 }}>
                  {companies[activeCompany].name}
                </div>
                <div className="text-[14px] opacity-70">
                  {companies[activeCompany].product}
                </div>
              </div>
              <Star size={24} className="opacity-50" />
            </div>
            <p className="text-[14px] opacity-80 mb-6" style={{ lineHeight: 1.7 }}>
              {companies[activeCompany].desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {companies[activeCompany].practices.map((practice, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <CheckCircle size={14} className="mt-0.5 shrink-0 opacity-70" />
                  <span className="text-[12px] opacity-90" style={{ lineHeight: 1.5 }}>
                    {practice}
                  </span>
                </div>
              ))}
            </div>
            {/* Link */}
            <a
              href={companies[activeCompany].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl px-5 py-3 transition-all"
            >
              <ExternalLink size={14} className="opacity-80" />
              <span className="text-[13px] opacity-90" style={{ fontWeight: 500 }}>
                {companies[activeCompany].linkLabel}
              </span>
              <ArrowRight size={14} className="opacity-60" />
            </a>
          </motion.div>
        </motion.div>

        {/* Key takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            核心要点
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keyTakeaways.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200/60 rounded-2xl p-6 hover:shadow-lg hover:border-violet-200/60 transition-all duration-300"
              >
                <div className="text-[32px] bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-3" style={{ fontWeight: 800 }}>
                  {item.number}
                </div>
                <h4 className="text-[15px] mb-2" style={{ fontWeight: 600 }}>
                  {item.title}
                </h4>
                <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA / Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 border border-violet-200/40 rounded-3xl p-10"
        >
          <Sparkles size={28} className="text-violet-400 mx-auto mb-4" />
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, lineHeight: 1.3 }}>
            交付一份"会说话"的设计稿
          </h3>
          <p className="text-[14px] text-gray-500 max-w-xl mx-auto mb-8" style={{ lineHeight: 1.7 }}>
            通过语义化命名、Auto Layout、Design Tokens 和 Skills 文件，让你的设计稿成为 AI 能够精确理解和高保真还原的开发蓝图。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["语义化命名", "Auto Layout", "Design Tokens", "组件变体", "Skills 文件", "MCP 协议"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-white/80 text-violet-600 px-4 py-2 rounded-full text-[13px] border border-violet-200/50"
                  style={{ fontWeight: 500 }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <div className="mt-8 text-[12px] text-gray-400">
            2026 · AI-Ready Design System Guide
          </div>
        </motion.div>
      </div>
    </section>
  );
}