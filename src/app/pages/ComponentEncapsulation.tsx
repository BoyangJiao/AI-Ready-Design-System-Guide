import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Layers3,
  ShieldCheck,
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  AlertTriangle,
  Boxes,
  Check,
  X,
} from "lucide-react";

/**
 * Part 1 二级页 · 组件封装的三个层次
 * 元框架:Figma 封装 = 对「代码组件」的建模,质量 = 同构程度。
 * 三层按「服务谁」往上爬:文件 → 人 + AI → Agent。每层配一个交互演示。
 */

export function ComponentEncapsulation() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-violet-600 transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-[88px] pb-16">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-10 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Layers3 size={13} />
            进阶 · 组件设计稿的封装
          </div>
          <h1 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            组件封装的三个层次
          </h1>
        </motion.div>

        {/* 受益者阶梯 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-[13px] text-gray-400 uppercase tracking-wider mb-4" style={{ fontWeight: 600 }}>
            三层,其实是按「服务谁」往上爬
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { lv: "Lv.1", who: "服务文件", desc: "组件不崩", icon: ShieldCheck, color: "slate" },
              { lv: "Lv.2", who: "服务人 + AI", desc: "好用、可理解", icon: Sparkles, color: "violet" },
              { lv: "Lv.3", who: "服务 Agent", desc: "精确调用", icon: Bot, color: "emerald" },
            ].map((s) => {
              const colors: Record<string, string> = {
                slate: "from-slate-400 to-slate-500",
                violet: "from-violet-500 to-indigo-600",
                emerald: "from-emerald-500 to-teal-500",
              };
              return (
                <div key={s.lv} className="relative rounded-2xl border border-gray-200/70 bg-white p-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[s.color]} flex items-center justify-center shrink-0`}>
                    <s.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 font-mono">{s.lv}</div>
                    <div className="text-[14px] text-gray-900" style={{ fontWeight: 700 }}>{s.who}</div>
                    <div className="text-[12px] text-gray-500">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Tier 1 */}
        <TierBlock
          lv="Lv.1"
          accent="slate"
          title="可用 —— 无 bug 与属性冲突"
          lead="最底线:组件能正常工作,不存在互相打架或未定义的属性组合。冲突的本质是——AI(和人)遇到一个「系统没说清楚该长什么样」的状态。"
          smells={["变体矩阵里出现不可能的组合(组合爆炸产生无效态)", "boolean 与 variant 互相打架(开了 A 又必须关 B)", "暴露了根本不起作用的属性、detached/override 失控"]}
        >
          <ConflictDemo />
        </TierBlock>

        {/* Tier 2 */}
        <TierBlock
          lv="Lv.2"
          accent="violet"
          title="好用 —— 设计合理、布局抗压、状态齐全"
          lead="在可用之上:布局能被任意内容灌进去而不崩,交互状态与插槽覆盖完整。人用着顺手,AI 也读得懂。"
          smells={["几十个 boolean 属性 → 组合地狱、没人会用", "到处固定宽度 → 超长文案直接溢出/截断", "缺 disabled/loading/empty 等状态;没有插槽,无法组合"]}
        >
          <RobustnessDemo />
        </TierBlock>

        {/* Tier 3 */}
        <TierBlock
          lv="Lv.3"
          accent="emerald"
          title="完全映射 —— 封装属性与代码同构"
          lead="顶层:在前两层基础上,Figma 属性与代码 props 形成一份「有意为之、部分」的契约。名字、枚举、类型、默认值都对齐;design-only 的态(如 hover)明确标注不映射。AI 才能快速准确调用。"
          smells={["Figma 写 Style:Primary,代码却是 type:'emphasis-1' —— 假映射", "把 hover/focus 硬塞成代码 prop(其实由 CSS 驱动)", "曾经对齐、后来漂移 → 变成「会说谎的组件」,比没映射更危险"]}
        >
          <MappingDemo />
        </TierBlock>

        {/* Pragmatic closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-amber-200/70 bg-amber-50/60 p-6 mt-4 mb-12"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[14px] text-amber-900/80" style={{ lineHeight: 1.8 }}>
              <span style={{ fontWeight: 600 }}>按需升级:</span>Lv.3 是给「核心、高复用、稳定、可拓展」的组件库准备的,不是给所有东西。
              一次性营销组件、探索期的东西,做到 Lv.1 / Lv.2 就够。把"完全映射"的力气,
              花在<span style={{ fontWeight: 600 }}>复用度 × 稳定性最高</span>的那批组件上。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Tier wrapper ─────────────────────────── */

const accentMap: Record<string, { badge: string; ring: string; grad: string; text: string }> = {
  slate: { badge: "bg-slate-100 text-slate-600", ring: "border-slate-200", grad: "from-slate-400 to-slate-500", text: "text-slate-600" },
  violet: { badge: "bg-violet-100 text-violet-700", ring: "border-violet-200", grad: "from-violet-500 to-indigo-600", text: "text-violet-600" },
  emerald: { badge: "bg-emerald-100 text-emerald-700", ring: "border-emerald-200", grad: "from-emerald-500 to-teal-500", text: "text-emerald-600" },
};

function TierBlock({
  lv,
  accent,
  title,
  lead,
  smells,
  children,
}: {
  lv: string;
  accent: string;
  title: string;
  lead: string;
  smells: string[];
  children: ReactNode;
}) {
  const c = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-[12px] font-mono px-2.5 py-1 rounded-lg ${c.badge}`} style={{ fontWeight: 700 }}>{lv}</span>
        <h2 className="text-2xl sm:text-[28px] tracking-tight text-gray-900" style={{ fontWeight: 700 }}>{title}</h2>
      </div>
      <p className="text-gray-500 text-[14px] mb-4" style={{ lineHeight: 1.8 }}>{lead}</p>

      {/* failure smells */}
      <div className="flex flex-wrap gap-2 mb-6">
        {smells.map((s) => (
          <span key={s} className="inline-flex items-start gap-1.5 text-[12px] text-gray-500 bg-gray-50 border border-gray-200/70 rounded-lg px-3 py-1.5" style={{ lineHeight: 1.5 }}>
            <X size={12} className="text-red-400 mt-0.5 shrink-0" />
            {s}
          </span>
        ))}
      </div>

      {/* interactive demo */}
      <div className={`rounded-3xl border ${c.ring} bg-gradient-to-b from-gray-50/80 to-white p-5 sm:p-7`}>
        <div className="flex items-center gap-2 mb-5">
          <Boxes size={14} className={c.text} />
          <span className="text-[12px] text-gray-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>交互演示</span>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Tier 1 · 属性冲突检测器 ─────────────────────── */

function ConflictDemo() {
  const [variant, setVariant] = useState<"Primary" | "Secondary" | "Ghost">("Primary");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  const conflicts: string[] = [];
  if (disabled && loading) conflicts.push("Disabled 与 Loading 同时为真 —— 禁用态与加载态互斥,AI 不知道该渲染哪种");
  if (iconOnly && !showIcon) conflicts.push("Icon Only 为真但 Show Icon 为假 —— 既不显示文字也不显示图标,组件为空");

  const hasConflict = conflicts.length > 0;

  const variantStyle: Record<string, string> = {
    Primary: "bg-violet-600 text-white",
    Secondary: "bg-white text-violet-700 border-2 border-violet-200",
    Ghost: "bg-transparent text-violet-600",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* controls */}
      <div className="space-y-4">
        <PropRow label="Variant · Style">
          <div className="flex gap-2">
            {(["Primary", "Secondary", "Ghost"] as const).map((v) => (
              <Chip key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</Chip>
            ))}
          </div>
        </PropRow>
        <ToggleRow label="Boolean · Disabled" on={disabled} onClick={() => setDisabled(!disabled)} />
        <ToggleRow label="Boolean · Loading" on={loading} onClick={() => setLoading(!loading)} />
        <ToggleRow label="Boolean · Icon Only" on={iconOnly} onClick={() => setIconOnly(!iconOnly)} />
        <ToggleRow label="Boolean · Show Icon" on={showIcon} onClick={() => setShowIcon(!showIcon)} />
      </div>

      {/* preview + status */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center justify-center p-8 min-h-[140px]">
          {hasConflict ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="px-4 py-2.5 rounded-xl border-2 border-dashed border-red-300 bg-red-50 text-red-400 text-[13px] flex items-center gap-2">
                <AlertTriangle size={15} />
                未定义状态
              </div>
              <span className="text-[11px] text-red-400">AI 只能猜 —— 输出不可预测</span>
            </div>
          ) : (
            <button
              className={`${variantStyle[variant]} ${iconOnly ? "p-3" : "px-5 py-2.5"} rounded-xl inline-flex items-center gap-2 text-[14px]`}
              style={{ fontWeight: 500, opacity: disabled ? 0.4 : 1 }}
            >
              {loading && <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />}
              {showIcon && !loading && <ShoppingCart size={16} />}
              {!iconOnly && (loading ? "提交中…" : "Add to Cart")}
            </button>
          )}
        </div>

        <div className={`rounded-2xl border p-4 ${hasConflict ? "border-red-200 bg-red-50/60" : "border-emerald-200 bg-emerald-50/60"}`}>
          <div className="flex items-center gap-2 mb-2">
            {hasConflict ? <XCircle size={16} className="text-red-500" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
            <span className={`text-[13px] ${hasConflict ? "text-red-600" : "text-emerald-600"}`} style={{ fontWeight: 700 }}>
              {hasConflict ? "✗ 组件不可用" : "✓ 组件可用 —— 无属性冲突"}
            </span>
          </div>
          {hasConflict && (
            <ul className="space-y-1.5 mt-2">
              {conflicts.map((c) => (
                <li key={c} className="text-[12px] text-red-600/80 flex items-start gap-1.5" style={{ lineHeight: 1.6 }}>
                  <span className="mt-0.5">·</span>{c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Tier 2 · 布局抗压 + 状态覆盖 ─────────────────── */

const stressLabels = ["保存", "保存草稿", "保存草稿并继续编辑", "保存草稿并继续编辑当前长文档"];

function RobustnessDemo() {
  const [len, setLen] = useState(1);
  const label = stressLabels[len];

  const allStates = ["Default", "Hover", "Focus", "Disabled", "Loading", "Error"];
  const [covered, setCovered] = useState<Set<string>>(new Set(["Default", "Hover", "Disabled"]));
  const toggle = (s: string) => {
    const next = new Set(covered);
    next.has(s) ? next.delete(s) : next.add(s);
    setCovered(next);
  };

  return (
    <div className="space-y-7">
      {/* Layout robustness */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] text-gray-700" style={{ fontWeight: 600 }}>① 布局抗压:同样的文案,两种封装</span>
          <span className="text-[11px] text-gray-400 font-mono">内容长度</span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          value={len}
          onChange={(e) => setLen(Number(e.target.value))}
          className="w-full accent-violet-600 mb-5 cursor-pointer"
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Fixed width — bad */}
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-4">
            <div className="text-[11px] text-red-500 mb-3 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
              <X size={12} /> 固定宽度 (Fixed)
            </div>
            <div className="flex justify-center">
              <div className="w-[120px] min-w-[120px] max-w-[120px] shrink-0 h-9 bg-violet-600 text-white rounded-lg flex items-center justify-start px-3 overflow-hidden">
                <span className="min-w-0 flex-1 text-[13px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontWeight: 500 }}>{label}</span>
              </div>
            </div>
            <p className="text-[11px] text-red-400 mt-3 text-center">超出即裁切 / 溢出</p>
          </div>
          {/* Auto layout — good */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="text-[11px] text-emerald-600 mb-3 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
              <Check size={12} /> Auto Layout · Hug
            </div>
            <div className="flex justify-center">
              <div className="h-9 bg-violet-600 text-white rounded-lg inline-flex items-center justify-center px-4">
                <span className="text-[13px] whitespace-nowrap" style={{ fontWeight: 500 }}>{label}</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-500 mt-3 text-center">随内容自适应,不崩</p>
          </div>
        </div>
      </div>

      {/* State coverage */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[13px] text-gray-700" style={{ fontWeight: 600 }}>② 状态覆盖:每种态都该有真实实例(点卡片切换「已设计 / 缺失」)</span>
          <span className="text-[12px] text-violet-600 font-mono" style={{ fontWeight: 600 }}>{covered.size}/{allStates.length}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allStates.map((s) => {
            const on = covered.has(s);
            return (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={`group rounded-xl border p-3 flex flex-col gap-2.5 text-left transition-all ${
                  on ? "border-violet-200 bg-white shadow-sm" : "border-dashed border-gray-200 bg-gray-50/50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {on ? <Check size={12} className="text-violet-500 shrink-0" /> : <X size={12} className="text-gray-300 shrink-0" />}
                  <span className={`text-[11px] font-mono ${on ? "text-violet-600" : "text-gray-400"}`} style={{ fontWeight: on ? 600 : 400 }}>{s}</span>
                </div>
                <div className="h-11 flex items-center justify-center w-full">
                  {on ? (
                    <StatePreview state={s} />
                  ) : (
                    <div className="px-3 py-1.5 rounded-lg border-2 border-dashed border-gray-200 text-[11px] text-gray-300">
                      未设计
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[12px] text-gray-400 mt-3" style={{ lineHeight: 1.6 }}>
          {covered.size === allStates.length
            ? "✓ 状态齐全 —— 人和 AI 都能拿到完整的「这个组件在每种情形下长什么样」。"
            : "点亮的态会实时画出组件的样子;留着「未设计」的,就是 AI 落地时只能靠猜的盲区。"}
        </p>
      </div>
    </div>
  );
}

function StatePreview({ state }: { state: string }) {
  const base = "h-8 px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 text-[12px] whitespace-nowrap";
  switch (state) {
    case "Hover":
      return <div className={`${base} bg-violet-700 text-white shadow-md shadow-violet-500/30`} style={{ fontWeight: 500 }}>按钮</div>;
    case "Focus":
      return <div className={`${base} bg-violet-600 text-white ring-2 ring-violet-300 ring-offset-1`} style={{ fontWeight: 500 }}>按钮</div>;
    case "Disabled":
      return <div className={`${base} bg-gray-200 text-gray-400`} style={{ fontWeight: 500 }}>按钮</div>;
    case "Loading":
      return (
        <div className={`${base} bg-violet-600 text-white`} style={{ fontWeight: 500 }}>
          <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          处理中
        </div>
      );
    case "Error":
      return (
        <div className={`${base} bg-white text-red-600 border-2 border-red-300`} style={{ fontWeight: 500 }}>
          <AlertTriangle size={12} />
          出错了
        </div>
      );
    default:
      return <div className={`${base} bg-violet-600 text-white`} style={{ fontWeight: 500 }}>按钮</div>;
  }
}

/* ─────────────────── Tier 3 · 映射 vs 漂移 ─────────────────── */

const mapStatus = {
  ok: { label: "对齐", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  drift: { label: "名字/值漂移", cls: "text-amber-700 bg-amber-50 border-amber-200" },
  type: { label: "类型不符", cls: "text-amber-700 bg-amber-50 border-amber-200" },
  missing: { label: "缺失必填", cls: "text-red-700 bg-red-50 border-red-200" },
  invented: { label: "设计乱加", cls: "text-red-700 bg-red-50 border-red-200" },
  slot: { label: "插槽缺失", cls: "text-red-700 bg-red-50 border-red-200" },
  codeonly: { label: "代码侧补", cls: "text-slate-500 bg-slate-50 border-slate-200" },
  designonly: { label: "design-only", cls: "text-slate-500 bg-slate-50 border-slate-200" },
} as const;
type MapStatus = keyof typeof mapStatus;
type MapRow = { code: string; codeType: string; figma: string; status: MapStatus };

const goodRows: MapRow[] = [
  { code: "variant", codeType: '"primary" | "secondary" | "ghost"', figma: "Variant「variant」= primary", status: "ok" },
  { code: "size", codeType: '"sm" | "md" | "lg"', figma: "Variant「size」= lg", status: "ok" },
  { code: "disabled", codeType: "boolean", figma: "Boolean「disabled」", status: "ok" },
  { code: "leftIcon", codeType: "ReactNode", figma: "Instance Swap「leftIcon」", status: "ok" },
  { code: "onClick", codeType: "() => void", figma: "—", status: "codeonly" },
  { code: "—", codeType: "纯 CSS 态", figma: "State「hover」", status: "designonly" },
];

const badRows: MapRow[] = [
  { code: "variant", codeType: '"primary" | "secondary" | "ghost"', figma: "Variant「Style」= Primary", status: "drift" },
  { code: "size", codeType: '"sm" | "md" | "lg" · 必填', figma: "— 设计没暴露这个属性", status: "missing" },
  { code: "disabled", codeType: "boolean", figma: "Text「\"true\" / \"false\"」", status: "type" },
  { code: "leftIcon", codeType: "ReactNode", figma: "— 没做成插槽", status: "slot" },
  { code: "— 代码没有", codeType: "—", figma: "Variant「Mood」= happy / sad", status: "invented" },
  { code: "onClick", codeType: "() => void", figma: "—", status: "codeonly" },
];

function MappingDemo() {
  const [mode, setMode] = useState<"good" | "bad">("good");
  const good = mode === "good";
  const rows = good ? goodRows : badRows;

  return (
    <div>
      {/* mode switch */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setMode("good")}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${good ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500"}`}
            style={{ fontWeight: good ? 600 : 400 }}
          >
            ✓ 良好封装(同构)
          </button>
          <button
            onClick={() => setMode("bad")}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${!good ? "bg-white text-red-500 shadow-sm" : "text-gray-500"}`}
            style={{ fontWeight: !good ? 600 : 400 }}
          >
            ✗ 糟糕封装
          </button>
        </div>
      </div>

      {/* mapping table: code contract ↔ design encapsulation */}
      <div className="rounded-2xl border border-gray-200/70 bg-white overflow-hidden mb-4">
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200/60 px-4 py-2.5">
          <div className="col-span-5 text-[11px] text-gray-400 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
            <span className="w-3.5 h-3.5 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-[7px] text-white">R</span>
            代码 props 契约(真相)
          </div>
          <div className="col-span-4 text-[11px] text-gray-400 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
            <span className="w-3.5 h-3.5 rounded bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-[7px] text-white">F</span>
            设计稿封装
          </div>
          <div className="col-span-3 text-[11px] text-gray-400 text-right" style={{ fontWeight: 600 }}>状态</div>
        </div>
        {rows.map((r, i) => {
          const st = mapStatus[r.status];
          const codeMuted = r.code.startsWith("—");
          const figmaBad = r.figma.startsWith("—");
          return (
            <div key={i} className={`grid grid-cols-12 px-4 py-3 items-center ${i < rows.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="col-span-5">
                <code className={`text-[12px] font-mono ${codeMuted ? "text-gray-300" : "text-gray-800"}`}>{r.code}</code>
                <div className="text-[10.5px] text-gray-400 font-mono mt-0.5">{r.codeType}</div>
              </div>
              <div className={`col-span-4 text-[12px] ${figmaBad ? "text-red-400" : "text-gray-600"}`} style={{ lineHeight: 1.5 }}>
                {r.figma}
              </div>
              <div className="col-span-3 flex justify-end">
                <span className={`text-[10.5px] border rounded-full px-2 py-0.5 ${st.cls}`} style={{ fontWeight: 600 }}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* generated code */}
      <div className="rounded-2xl bg-gray-900 overflow-hidden mb-4">
        <div className="bg-gray-800/60 border-b border-gray-700/50 px-4 py-2.5 flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-[8px] text-white" style={{ fontWeight: 700 }}>R</span>
          <span className="text-[12px] text-gray-400" style={{ fontWeight: 600 }}>AI 生成的代码</span>
        </div>
        <div className="p-4">
          <pre className="text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.9 }}>
            {good ? (
              <code>
                <span className="text-gray-500">{"// 名字 / 枚举 / 类型 / 必填 都对上 ✨"}</span>{"\n"}
                <span className="text-gray-500">{"<"}</span><span className="text-emerald-300">Button</span>{" "}<span className="text-blue-300">variant</span><span className="text-gray-500">=</span><span className="text-amber-300">"primary"</span>{" "}<span className="text-blue-300">size</span><span className="text-gray-500">=</span><span className="text-amber-300">"lg"</span><span className="text-gray-500">{">"}</span>{"\n"}
                <span className="text-white">{"  Add to Cart"}</span>{"\n"}
                <span className="text-gray-500">{"</"}</span><span className="text-emerald-300">Button</span><span className="text-gray-500">{">"}</span>{"\n"}
                <span className="text-gray-500">{"// onClick 代码侧补;hover 由 CSS 驱动"}</span>
              </code>
            ) : (
              <code>
                <span className="text-red-400">{"// 设计与代码对不上,AI 只能逐个猜 ⚠"}</span>{"\n"}
                <span className="text-gray-500">{"<"}</span><span className="text-emerald-300">Button</span>{"\n"}
                <span className="text-red-300">{"  Style"}</span><span className="text-gray-500">=</span><span className="text-amber-300">"Primary"</span><span className="text-red-400">{"     // ✗ 应为 variant"}</span>{"\n"}
                <span className="text-red-300">{"  disabled"}</span><span className="text-gray-500">=</span><span className="text-amber-300">"true"</span><span className="text-red-400">{"     // ⚠ 字符串,应为 {true}"}</span>{"\n"}
                <span className="text-red-300">{"  Mood"}</span><span className="text-gray-500">=</span><span className="text-amber-300">"happy"</span><span className="text-red-400">{"     // ✗ 代码根本没有此 prop"}</span>{"\n"}
                <span className="text-gray-500">{">"}</span><span className="text-red-400">{"                     // ✗ size 必填却缺失 → AI 瞎填"}</span>{"\n"}
                <span className="text-white">{"  Add to Cart"}</span>{"\n"}
                <span className="text-gray-500">{"</"}</span><span className="text-emerald-300">Button</span><span className="text-gray-500">{">"}</span>
              </code>
            )}
          </pre>
        </div>
      </div>

      {/* verdict */}
      <div className={`rounded-2xl border p-4 flex items-start gap-3 ${good ? "border-emerald-200 bg-emerald-50/60" : "border-red-200 bg-red-50/60"}`}>
        {good ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> : <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />}
        <p className={`text-[13px] ${good ? "text-emerald-700" : "text-red-600"}`} style={{ lineHeight: 1.7 }}>
          {good ? (
            <><span style={{ fontWeight: 700 }}>AI 高置信、零误差调用。</span> 名字/枚举/类型/必填全对齐;hover 这类纯视觉态由 CSS 驱动、onClick 由代码侧补,都明确「不映射」,各司其职。</>
          ) : (
            <><span style={{ fontWeight: 700 }}>不止名字漂移。</span> 设计还<span style={{ fontWeight: 600 }}>乱加了代码没有的 prop(Mood)</span>、<span style={{ fontWeight: 600 }}>漏了必填的 size</span>、把 boolean 写成字符串。AI 只能逐个猜,生成一堆跑不起来的代码——这比"没映射"更危险。</>
          )}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── small UI helpers ─────────────────────────── */

function PropRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200/70 bg-white p-4">
      <div className="text-[11px] text-gray-400 mb-2.5 font-mono">{label}</div>
      {children}
    </div>
  );
}

function ToggleRow({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <div className="rounded-xl border border-gray-200/70 bg-white p-4 flex items-center justify-between">
      <span className="text-[11px] text-gray-400 font-mono">{label}</span>
      <button onClick={onClick} className={`w-10 h-6 rounded-full transition-all relative ${on ? "bg-violet-500" : "bg-gray-300"}`}>
        <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${on ? "left-5" : "left-1"}`} />
      </button>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-[12px] transition-all border ${
        active ? "bg-violet-100 text-violet-700 border-violet-300" : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
      }`}
      style={{ fontWeight: active ? 600 : 400 }}
    >
      {children}
    </button>
  );
}
