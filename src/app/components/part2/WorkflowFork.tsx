import { motion } from "motion/react";
import {
  GitFork,
  PenTool,
  Wand2,
  Link2,
  FileText,
  ShieldCheck,
  Target,
  Building2,
  Users,
  Gauge,
} from "lucide-react";

/**
 * 幕 4.5 · 设计师的两种工作形态 (The Fork)
 * 从「愿景」过渡到「实操」的桥。一根拨盘的两端 + 中间的混合态。
 * 两端底下是同一套设计系统:设计驱动走 CodeConnect,意图驱动走 spec/guidance 护栏。
 */

// 把你推向某一端的决策轴
const axes = [
  { icon: Gauge, label: "关键性", left: "高 · 受监管", right: "低 · 探索性" },
  { icon: ShieldCheck, label: "品牌敏感度", left: "高", right: "可容忍变化" },
  { icon: Building2, label: "组织 / 流程", left: "传统开发流", right: "Agentic 流" },
  { icon: Users, label: "目标客群", left: "核心产品", right: "内部 / 长尾" },
];

const designLed = {
  icon: PenTool,
  tag: "设计稿驱动",
  sub: "Figma 出稿 · 传统/静态 UI 工作流",
  accent: "emerald",
  rows: [
    { k: "何时用", v: "受监管、高关键性、品牌敏感的核心产品" },
    { k: "DS 的角色", v: "通过CodeConnect 让AI 读到真实业务组件代码" },
  ],
  actionIcon: Link2,
  actionTitle: "关键动作：Code Connect 建联",
  actions: [
    "基础通用组件与业务组件全覆盖",
    "维护「设计 ↔ 代码」对齐:组件命名、变体、变量(Variables)一一对应",
    "配合前端 SDD + harness,把生成约束到产品代码与后端接口规范",
  ],
  tools: ["Figma", "Agentic IDE", "Codex", "Claude Code"],
};

const intentLed = {
  icon: Wand2,
  tag: "意图驱动 · Intent-led",
  sub: "无设计稿 · 界面全由意图生成",
  accent: "purple",
  rows: [
    { k: "何时用", v: "探索、内部工具、早期概念、长尾场景" },
    { k: "DS 的角色", v: "唯一的约束源——DS 质量 ≈ 产出质量" },
  ],
  actionIcon: FileText,
  actionTitle: "关键动作：三层软性约束",
  actions: [
    "① 组件 spec:每个组件的用法、边界与 props,让 AI 不乱发挥",
    "② 业务场景 guidance:某类场景该用哪些 pattern、避免哪些反例",
    "③ 设计 pattern guidance:业务中验证过的设计范式,沉淀成可复用规则",
  ],
  tools: ["Agentic IDE", "Codex", "Claude Code", "+ 意图"],
};

const accentMap: Record<string, { text: string; bg: string; border: string; grad: string }> = {
  emerald: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", grad: "from-emerald-500 to-teal-500" },
  purple: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30", grad: "from-purple-500 to-fuchsia-500" },
};

export function WorkflowFork() {
  return (
    <section id="workflowfork" className="py-24 px-6 bg-[#0a0f1d] border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] mb-4" style={{ fontWeight: 600 }}>
            <GitFork size={13} className="text-blue-300" />
            <span className="text-gray-300 tracking-wide">THE FORK · 工作形态分叉</span>
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-4 text-white" style={{ fontWeight: 800, lineHeight: 1.2 }}>
            设计师的两种工作形态
          </h2>
          <p className="text-gray-400 text-[15px]" style={{ lineHeight: 1.8 }}>
            这是一根拨盘的两端——中间还有一大坨「混合态」。
            同一个人,会因产品不同而在两端之间来回滑。
          </p>
        </motion.div>

        {/* Dial */}
        <div className="mb-10">
          <div className="relative h-[2px] bg-gradient-to-r from-emerald-500/50 via-blue-500/40 to-purple-500/50 rounded-full">
            <span className="absolute left-0 -top-1.5 w-3 h-3 rounded-full bg-emerald-400 -translate-x-1/2" />
            <span className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-blue-300 -translate-x-1/2" />
            <span className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-purple-400 translate-x-1/2" />
          </div>
          <div className="flex justify-between mt-3 text-[11px] font-mono">
            <span className="text-emerald-400">设计稿驱动</span>
            <span className="text-blue-300/80">混合态:生成优先 → 回 Figma 精修 → CodeConnect 落码</span>
            <span className="text-purple-400">意图驱动</span>
          </div>
        </div>

        {/* Decision axes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {axes.map((a) => (
            <div key={a.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <a.icon size={13} className="text-gray-400" />
                <span className="text-[12px] text-gray-300" style={{ fontWeight: 600 }}>{a.label}</span>
              </div>
              <div className="flex items-center justify-between text-[10.5px] text-gray-500">
                <span className="text-emerald-300/80">{a.left}</span>
                <span className="text-purple-300/80">{a.right}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-gray-500 mb-12 -mt-8 flex items-center gap-1.5">
          <Target size={12} /> 上面这几条轴,决定你这次任务该滑向哪一端。
        </p>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {[designLed, intentLed].map((col) => {
            const c = accentMap[col.accent];
            const Icon = col.icon;
            const Act = col.actionIcon;
            return (
              <motion.div
                key={col.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-3xl border ${c.border} ${c.bg} p-7 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[15px] text-white" style={{ fontWeight: 700 }}>{col.tag}</div>
                    <div className="text-[11.5px] text-gray-400">{col.sub}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {col.rows.map((r) => (
                    <div key={r.k} className="flex gap-3">
                      <span className={`text-[11px] ${c.text} font-mono mt-0.5 shrink-0 w-[64px]`}>{r.k}</span>
                      <span className="text-[13px] text-gray-300" style={{ lineHeight: 1.6 }}>{r.v}</span>
                    </div>
                  ))}
                </div>

                {/* Hands-on actions (merged from the playbook) */}
                <div className="rounded-2xl bg-black/30 border border-white/10 p-5 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Act size={15} className={c.text} />
                    <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>{col.actionTitle}</span>
                  </div>
                  <ul className="space-y-2">
                    {col.actions.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-[12.5px] text-gray-400" style={{ lineHeight: 1.6 }}>
                        <span className={`${c.text} mt-0.5 shrink-0`}>·</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {col.tools.map((t) => (
                    <span key={t} className={`text-[11px] ${c.text} ${c.bg} border ${c.border} rounded-full px-2.5 py-1`}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Unifying band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/5 via-white/5 to-purple-500/5 p-7 text-center"
        >
          <p className="text-[17px] sm:text-[19px] text-white" style={{ fontWeight: 700, lineHeight: 1.6, textWrap: "balance" }}>
            两种形态,<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-purple-300">同一套设计系统。</span>
          </p>
          <p className="text-[13px] text-gray-400 mt-3" style={{ lineHeight: 1.8 }}>
            设计驱动走 CodeConnect,意图驱动走 spec / guidance 护栏——所以无论产品落在拨盘哪一端,
            <span className="text-gray-200">「把设计系统做好」都是唯一的无悔投资。</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
