import { useState } from "react";
import { motion } from "motion/react";
import { Brain, Eye, Code, ArrowRight, Check, X, Lightbulb } from "lucide-react";

const mindsetShifts = [
  {
    before: "视觉艺术家",
    after: "产品架构师",
    beforeDesc: "专注于像素级的视觉完美，手动拖拽元素到精确位置",
    afterDesc: "用结构化思维设计，每个图层都是未来代码模块的蓝图",
    icon: Brain,
  },
  {
    before: "静态设计稿",
    after: "开发蓝图",
    beforeDesc: "交付固定尺寸的视觉效果图，标注样式参数",
    afterDesc: "交付包含布局意图、组件逻辑和响应式规则的动态蓝图",
    icon: Eye,
  },
  {
    before: "视觉优先",
    after: "语义优先",
    beforeDesc: "图层命名为 Frame 123、矩形 5，分组随意",
    afterDesc: "语义化命名如 Card-Header、Button-Primary，逻辑化分组",
    icon: Code,
  },
];

const principles = [
  {
    title: "结构即意图",
    desc: "AI 依赖清晰的结构理解设计。每一个分组和嵌套都应有明确的逻辑目的，混乱的图层会让 AI 产生歧义。",
    color: "violet",
  },
  {
    title: "约束即指令",
    desc: "Auto Layout 的间距、对齐、填充设置就是给 AI 的指令。它们直接转化为 CSS 的 flexbox、gap、padding 属性。",
    color: "indigo",
  },
  {
    title: "一致即效率",
    desc: "统一的 Design Tokens、组件变体和命名规范，让 AI 能生成系统化、可维护的代码，而非零散的样式堆砌。",
    color: "blue",
  },
  {
    title: "意图 > 完美",
    desc: "一个使用了 Auto Layout 的设计稿，即使视觉上有偏差，其代码质量也远高于手动拖拽的像素级完美设计稿。",
    color: "emerald",
  },
];

export function MindsetSection() {
  const [activeShift, setActiveShift] = useState(0);

  return (
    <section id="mindset" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Lightbulb size={13} />
            核心理念
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            像开发者一样思考
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
            AI 不像人类开发者能够"脑补"设计中的模糊之处。它依赖清晰、有逻辑的结构和明确的指令。设计师需要完成从"视觉艺术家"到"产品架构师"的角色升级。
          </p>
        </motion.div>

        {/* Mindset shift cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            思维转变
          </h3>

          {/* Tab selector */}
          <div className="flex gap-2 mb-6">
            {mindsetShifts.map((shift, i) => (
              <button
                key={i}
                onClick={() => setActiveShift(i)}
                className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
                  activeShift === i
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-150"
                }`}
                style={{ fontWeight: activeShift === i ? 500 : 400 }}
              >
                {shift.before} → {shift.after}
              </button>
            ))}
          </div>

          {/* Active comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50/60 border border-red-200/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X size={14} className="text-red-500" />
                </div>
                <span className="text-[14px] text-red-600" style={{ fontWeight: 600 }}>
                  传统方式：{mindsetShifts[activeShift].before}
                </span>
              </div>
              <p className="text-[14px] text-red-700/70" style={{ lineHeight: 1.7 }}>
                {mindsetShifts[activeShift].beforeDesc}
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check size={14} className="text-emerald-500" />
                </div>
                <span className="text-[14px] text-emerald-600" style={{ fontWeight: 600 }}>
                  AI-Ready：{mindsetShifts[activeShift].after}
                </span>
              </div>
              <p className="text-[14px] text-emerald-700/70" style={{ lineHeight: 1.7 }}>
                {mindsetShifts[activeShift].afterDesc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Four principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            四大原则
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-white border border-gray-200/60 rounded-2xl p-6 hover:shadow-lg hover:border-violet-200/60 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-${p.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </span>
                </div>
                <h4 className="text-[15px] mb-2" style={{ fontWeight: 600 }}>
                  {p.title}
                </h4>
                <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
