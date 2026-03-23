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
    color: "violet",
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
    title: "构建 Knowledge Base 与 Skills",
    icon: Code,
    color: "amber",
    tasks: [
      "定义组件使用规范（属性、约束）",
      "提供代码模板和示例",
      "指定 Design Tokens 使用规则",
      "声明响应式布局策略",
      "列出可用的组件库和工具链",
      "编写常见模式的最佳实践",
    ],
    tips: "Knowledge Base (What) 与 Skills (How) 文件夹协同工作，AI 工具会自动读取。",
  },
  {
    step: 3,
    title: "MCP 连接配置",
    icon: Cpu,
    color: "indigo",
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
    color: "emerald",
    tasks: [
      "选择目标组件或页面",
      "通过 MCP 将设计数据传递给 AI",
      "AI 结合 Knowledge Base 与 Skills 生成代码",
      "审查生成的代码质量",
      "迭代优化不满意的部分",
      "集成到项目代码库中",
    ],
    tips: "初次使用时先从小组件开始，逐步扩大到复杂页面，持续优化 Knowledge Base 与 Skills。",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Play size={13} />
            工作流实战
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Figma → MCP → AI 编程工具
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] transition-all whitespace-nowrap ${
                  activeStep === i
                    ? `bg-${step.color}-100 text-${step.color}-700`
                    : "bg-gray-100 text-gray-500"
                }`}
                style={{ fontWeight: activeStep === i ? 500 : 400 }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                    completedSteps.has(i)
                      ? "bg-emerald-500 text-white"
                      : activeStep === i
                      ? "bg-gray-800 text-white"
                      : "bg-gray-300 text-white"
                  }`}
                  style={{ fontWeight: 600 }}
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
              className="bg-white border border-gray-200/60 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[18px] mb-1" style={{ fontWeight: 600 }}>
                    Step {workflowSteps[activeStep].step}: {workflowSteps[activeStep].title}
                  </h3>
                  <div className="text-[13px] text-gray-400">
                    {workflowSteps[activeStep].tasks.length} 项任务
                  </div>
                </div>
                <button
                  onClick={() => toggleStep(activeStep)}
                  className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                    completedSteps.has(activeStep)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {completedSteps.has(activeStep) ? "✓ 已完成" : "标记完成"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {workflowSteps[activeStep].tasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <ChevronRight size={14} className="text-gray-400 mt-0.5 shrink-0" />
                    <span className="text-[13px] text-gray-600" style={{ lineHeight: 1.5 }}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[12px] text-amber-600 mb-1" style={{ fontWeight: 600 }}>
                    Pro Tip
                  </div>
                  <p className="text-[13px] text-amber-700/70" style={{ lineHeight: 1.6 }}>
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
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            质量检查清单
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityChecks.map((check) => (
              <div
                key={check.category}
                className="bg-white border border-gray-200/60 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <check.icon size={16} className="text-gray-400" />
                  <h4 className="text-[14px]" style={{ fontWeight: 600 }}>
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
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.priority === "high"
                            ? "bg-red-400"
                            : item.priority === "medium"
                            ? "bg-amber-400"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-[12px] text-gray-600">
                        {item.label}
                      </span>
                      <span
                        className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                          item.priority === "high"
                            ? "bg-red-50 text-red-500"
                            : item.priority === "medium"
                            ? "bg-amber-50 text-amber-500"
                            : "bg-gray-50 text-gray-400"
                        }`}
                        style={{ fontWeight: 500 }}
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
