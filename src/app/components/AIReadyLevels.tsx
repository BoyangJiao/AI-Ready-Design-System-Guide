import { motion } from "motion/react";
import { Layers, Cuboid, Workflow, ArrowRight, CheckCircle2, Server, Smartphone, Code2 } from "lucide-react";

export function AIReadyLevels() {
  return (
    <section id="levels" className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Layers size={13} />
            进阶演进
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            AI-Ready 的两个进化层级
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            即使做到了 AI-Ready，系统在实际应用中也存在深度的差异。
            从单纯的"视觉验证"到深度的"生产交付"，设计系统需要经历质的飞跃。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Connector Arrow (Desktop Only) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-gray-100 text-gray-400">
            <ArrowRight size={20} />
          </div>

          {/* Level 1: Surface Level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Smartphone size={120} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cuboid size={24} />
              </div>
              <div>
                <div className="text-[13px] text-blue-500 font-bold mb-1">Level 1</div>
                <h3 className="text-[20px] font-bold text-gray-900">表面层 (Surface Level)</h3>
              </div>
            </div>

            <p className="text-[14px] text-gray-500 mb-8" style={{ lineHeight: 1.7 }}>
              AI 能够生成符合规范的设计稿和演示原型。代码主要用于前端展示和对客交互，尚未与生产库和后端服务深度打通。
            </p>

            <div className="space-y-4">
              <FeatureItem title="UI 快速生成" desc="通过 Prompt 快速生成符合品牌调性的静态页面或组件原型。" />
              <FeatureItem title="交互演示" desc="生成带有基础交互（如 Hover、弹窗）的网页，用于汇报或概念验证。" />
              <FeatureItem title="代码作为草稿" desc="生成的代码属于丢弃型（Throwaway Code），通常需要开发人员重写才能上线。" />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-[12px] text-gray-400 font-medium mb-3 uppercase tracking-wider">核心价值</div>
              <div className="flex gap-2 text-[13px] font-medium text-gray-700">
                <span className="bg-gray-100 px-3 py-1 rounded-lg">极速迭代</span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg">概念验证</span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg">客户沟通</span>
              </div>
            </div>
          </motion.div>

          {/* Level 2: Engineering Level */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-3xl p-8 border border-indigo-800 shadow-xl relative overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Server size={120} className="text-indigo-300" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
                <Workflow size={24} />
              </div>
              <div>
                <div className="text-[13px] text-indigo-400 font-bold mb-1">Level 2</div>
                <h3 className="text-[20px] font-bold text-white">工程层 (Engineering Level)</h3>
              </div>
            </div>

            <p className="text-[14px] text-indigo-100/80 mb-8 relative z-10" style={{ lineHeight: 1.7 }}>
              真正的「设计即代码」。AI 生成的代码与企业的前端组件库、后端类型定义和 API 接口深度绑定，Prompt 到交付一步到位。
            </p>

            <div className="space-y-4 relative z-10">
              <FeatureItemDark title="组件一对一映射" desc="AI 直调内部封装好的高阶 React/Vue 组件，而非原生 HTML 标签。" />
              <FeatureItemDark title="业务逻辑注入" desc="自动连接后端 API，生成包含数据拉取、状态管理、错误处理的真实业务模块。" />
              <FeatureItemDark title="生产级标准" desc="代码符合团队 Lint 规范、无访问性缺陷，可直接提 PR 进入生产分支。" />
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-800 relative z-10">
              <div className="text-[12px] text-indigo-300/60 font-medium mb-3 uppercase tracking-wider">核心价值</div>
              <div className="flex flex-wrap gap-2 text-[13px] font-medium text-indigo-100">
                <span className="bg-indigo-800/50 px-3 py-1 rounded-lg border border-indigo-700/50 flex items-center gap-1.5"><Code2 size={14}/> 生产交付</span>
                <span className="bg-indigo-800/50 px-3 py-1 rounded-lg border border-indigo-700/50">统一真实数据源</span>
                <span className="bg-indigo-800/50 px-3 py-1 rounded-lg border border-indigo-700/50">消除重构成本</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">
        <CheckCircle2 size={16} className="text-blue-500" />
      </div>
      <div>
        <div className="text-[13px] font-bold text-gray-900 mb-0.5">{title}</div>
        <div className="text-[13px] text-gray-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function FeatureItemDark({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">
        <CheckCircle2 size={16} className="text-indigo-400" />
      </div>
      <div>
        <div className="text-[13px] font-bold text-white mb-0.5">{title}</div>
        <div className="text-[13px] text-indigo-200/70 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}
