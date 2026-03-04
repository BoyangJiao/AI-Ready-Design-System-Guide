import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  ChevronRight,
  Check,
  AlertTriangle,
  Eye,
  Code,
  Figma,
  Cpu,
} from "lucide-react";

const workflowSteps = [
  {
    step: 1,
    title: "设计阶段准备",
    icon: Figma,
    accentColor: "var(--washi-accent-vermillion)",
    tasks: [
      "语义化命名所有图层和组件",
      "全面应用 Auto Layout",
      "建立 Design Tokens（颜色、字体、间距）",
      "创建组件变体（Default/Hover/Disabled 等）",
      "标记需要导出的图片资源",
      "清理不必要的嵌套和隐藏图层",
    ],
    tips: "使用 Builder.io 或 Locofy.ai 插件预检设计稿，提前发现问题。",
  },
  {
    step: 2,
    title: "编写 Skills 文件",
    icon: Code,
    accentColor: "var(--washi-accent-ochre)",
    tasks: [
      "定义组件使用规范（属性、约束）",
      "提供代码模板和示例",
      "指定 Design Tokens 使用规则",
      "声明响应式布局策略",
      "列出可用的组件库和工具链",
      "编写常见模式的最佳实践",
    ],
    tips: "Skills 文件放在项目根目录的 /skills 文件夹中，AI 工具会自动读取。",
  },
  {
    step: 3,
    title: "MCP 连接配置",
    icon: Cpu,
    accentColor: "var(--washi-accent-indigo)",
    tasks: [
      "安装并配置 Figma MCP 插件",
      "在 Cursor/Claude 中启用 MCP 协议",
      "测试 Figma 文件的数据提取",
      "验证组件结构的正确传递",
      "确认 Design Tokens 的正确映射",
      "配置自动同步更新机制",
    ],
    tips: "确保 Figma 文件权限设置正确，MCP 需要读取权限才能提取设计数据。",
  },
  {
    step: 4,
    title: "AI 代码生成",
    icon: Code,
    accentColor: "var(--washi-accent-bamboo)",
    tasks: [
      "选择目标组件或页面",
      "通过 MCP 将设计数据传递给 AI",
      "AI 结合 Skills 文件生成代码",
      "审查生成的代码质量",
      "迭代优化不满意的部分",
      "集成到项目代码库中",
    ],
    tips: "初次使用时先从小组件开始，逐步扩大到复杂页面，持续优化 Skills 文件。",
  },
];

const qualityChecks = [
  {
    category: "设计稿检查",
    icon: Eye,
    items: [
      { label: "所有图层使用语义化命名", priority: "high" },
      { label: "100% Auto Layout 覆盖率", priority: "high" },
      { label: "Design Tokens 已建立并命名一致", priority: "high" },
      { label: "组件变体完整（至少 3 种状态）", priority: "medium" },
      { label: "图层结构扁平化（嵌套不超过 5 层）", priority: "medium" },
      { label: "导出资源已标记", priority: "low" },
    ],
  },
  {
    category: "代码质量检查",
    icon: Code,
    items: [
      { label: "组件名与 Figma 命名一致", priority: "high" },
      { label: "使用 Design Token 变量而非硬编码", priority: "high" },
      { label: "响应式布局正确实现", priority: "high" },
      { label: "状态变体有对应的样式处理", priority: "medium" },
      { label: "无冗余的 DOM 嵌套", priority: "medium" },
      { label: "SVG 图标已优化", priority: "low" },
    ],
  },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newSet = new Set(completedSteps);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setCompletedSteps(newSet);
  };

  return (
    <section id="workflow" className="py-24 px-6">
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
              backgroundColor: "var(--washi-accent-bamboo-light)",
              color: "var(--washi-accent-bamboo)",
              border: "1px solid var(--washi-accent-bamboo)",
              borderRadius: "var(--washi-radius)",
            }}
          >
            <Play size={13} />
            工作流实战
          </div>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-3 font-serif"
            style={{ fontWeight: 700, lineHeight: 1.2, color: "var(--washi-ink)" }}
          >
            Figma → MCP → AI 编程工具
          </h2>
          <p className="text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7, color: "var(--washi-ink-light)" }}>
            完整的 4 步工作流程，从设计阶段准备到最终的 AI 代码生成。每一步都有详细的操作清单和最佳实践。
          </p>
        </motion.div>

        {/* Step timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          {/* Step selector */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {workflowSteps.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(i)}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] transition-all whitespace-nowrap"
                style={{
                  fontWeight: activeStep === i ? 500 : 400,
                  backgroundColor: activeStep === i ? "var(--washi-paper)" : "transparent",
                  color: activeStep === i ? "var(--washi-ink)" : "var(--washi-ink-light)",
                  border: activeStep === i ? "1px solid var(--washi-border-dark)" : "1px solid transparent",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px]"
                  style={{
                    fontWeight: 600,
                    backgroundColor: completedSteps.has(i)
                      ? "var(--washi-accent-bamboo)"
                      : activeStep === i
                      ? "var(--washi-ink)"
                      : "var(--washi-border-dark)",
                    color: "var(--washi-paper)",
                  }}
                >
                  {completedSteps.has(i) ? <Check size={12} /> : step.step}
                </div>
                {step.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
              style={{
                backgroundColor: "var(--washi-paper)",
                border: "1px solid var(--washi-border)",
                borderRadius: "var(--washi-radius)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[18px] mb-1 font-serif" style={{ fontWeight: 600, color: "var(--washi-ink)" }}>
                    Step {workflowSteps[activeStep].step}: {workflowSteps[activeStep].title}
                  </h3>
                  <div className="text-[13px]" style={{ color: "var(--washi-ink-faint)" }}>
                    {workflowSteps[activeStep].tasks.length} 项任务
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(activeStep)}
                  className="px-4 py-2 text-[13px] transition-all"
                  style={{
                    fontWeight: 500,
                    backgroundColor: completedSteps.has(activeStep) ? "var(--washi-accent-bamboo-light)" : "var(--washi-bg-warm)",
                    color: completedSteps.has(activeStep) ? "var(--washi-accent-bamboo)" : "var(--washi-ink-light)",
                    border: completedSteps.has(activeStep) ? "1px solid var(--washi-accent-bamboo)" : "1px solid var(--washi-border)",
                    borderRadius: "var(--washi-radius)",
                  }}
                >
                  {completedSteps.has(activeStep) ? "已完成" : "标记完成"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {workflowSteps[activeStep].tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 px-4 py-3"
                    style={{
                      backgroundColor: "var(--washi-bg-warm)",
                      borderRadius: "var(--washi-radius)",
                    }}
                  >
                    <ChevronRight size={14} style={{ color: "var(--washi-ink-faint)" }} className="mt-0.5 shrink-0" />
                    <span className="text-[13px]" style={{ lineHeight: 1.5, color: "var(--washi-ink-light)" }}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="p-4 flex items-start gap-3"
                style={{
                  backgroundColor: "var(--washi-accent-ochre-light)",
                  border: "1px solid var(--washi-accent-ochre)",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <AlertTriangle size={16} style={{ color: "var(--washi-accent-ochre)" }} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-[12px] mb-1" style={{ fontWeight: 600, color: "var(--washi-accent-ochre)" }}>
                    Pro Tip
                  </div>
                  <p className="text-[13px]" style={{ lineHeight: 1.6, color: "var(--washi-ink-light)" }}>
                    {workflowSteps[activeStep].tips}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Quality checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <h3
            className="text-[14px] uppercase tracking-wider mb-6"
            style={{ fontWeight: 600, color: "var(--washi-ink-faint)" }}
          >
            质量检查清单
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityChecks.map((check) => (
              <div
                key={check.category}
                className="p-5"
                style={{
                  backgroundColor: "var(--washi-paper)",
                  border: "1px solid var(--washi-border)",
                  borderRadius: "var(--washi-radius)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <check.icon size={16} style={{ color: "var(--washi-ink-faint)" }} />
                  <h4 className="text-[14px] font-serif" style={{ fontWeight: 600, color: "var(--washi-ink)" }}>
                    {check.category}
                  </h4>
                </div>
                <div className="space-y-2">
                  {check.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 py-1.5"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            item.priority === "high"
                              ? "var(--washi-accent-vermillion)"
                              : item.priority === "medium"
                              ? "var(--washi-accent-ochre)"
                              : "var(--washi-border-dark)",
                        }}
                      />
                      <span className="text-[12px]" style={{ color: "var(--washi-ink-light)" }}>
                        {item.label}
                      </span>
                      <span
                        className="ml-auto text-[10px] px-1.5 py-0.5"
                        style={{
                          fontWeight: 500,
                          borderRadius: "var(--washi-radius)",
                          backgroundColor:
                            item.priority === "high"
                              ? "var(--washi-accent-vermillion-light)"
                              : item.priority === "medium"
                              ? "var(--washi-accent-ochre-light)"
                              : "var(--washi-bg-warm)",
                          color:
                            item.priority === "high"
                              ? "var(--washi-accent-vermillion)"
                              : item.priority === "medium"
                              ? "var(--washi-accent-ochre)"
                              : "var(--washi-ink-faint)",
                        }}
                      >
                        {item.priority === "high" ? "必须" : item.priority === "medium" ? "建议" : "可选"}
                      </span>
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
