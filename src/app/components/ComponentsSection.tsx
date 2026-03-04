import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Puzzle,
  Check,
  X,
  ArrowRight,
  ToggleLeft,
  Type,
  Layers,
  List,
  ChevronDown,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";

/* ─── 四种属性类型数据 ─── */
type PropTypeId = "variant" | "boolean" | "string" | "instance";

interface PropType {
  id: PropTypeId;
  icon: typeof List;
  label: string;
  figmaName: string;
  figmaDesc: string;
  reactType: string;
  reactDesc: string;
  color: string;
  examples: {
    figmaProp: string;
    figmaValues: string;
    reactProp: string;
    reactCode: string;
  }[];
}

const propTypes: PropType[] = [
  {
    id: "variant",
    icon: List,
    label: "Variant",
    figmaName: "变体属性",
    figmaDesc:
      "定义组件的一组互斥选项。在 Figma 中表现为下拉菜单，一次只能选中一个值。适用于样式风格、尺寸等级等。",
    reactType: "Union Type",
    reactDesc: "映射为 TypeScript 联合类型（字符串字面量联合），表示一组互斥的可选值。",
    color: "violet",
    examples: [
      {
        figmaProp: "Style",
        figmaValues: "Primary | Secondary | Ghost | Danger",
        reactProp: 'variant: "primary" | "secondary" | "ghost" | "danger"',
        reactCode: '<Button variant="primary">提交</Button>',
      },
      {
        figmaProp: "Size",
        figmaValues: "Small | Medium | Large",
        reactProp: 'size: "sm" | "md" | "lg"',
        reactCode: '<Button size="lg">大按钮</Button>',
      },
      {
        figmaProp: "State",
        figmaValues: "Default | Hover | Active",
        reactProp: 'state: "default" | "hover" | "active"',
        reactCode: "// 通常由交互行为自动控制\n// 而非手动传入",
      },
    ],
  },
  {
    id: "boolean",
    icon: ToggleLeft,
    label: "Boolean",
    figmaName: "布尔属性",
    figmaDesc:
      "控制组件内某个元素的显示/隐藏，或某个状态的开/关。在 Figma 中表现为开关（Toggle）。",
    reactType: "boolean",
    reactDesc:
      "直接映射为 React 的 boolean 类型 props。通常用于控制可选功能、状态标记等。",
    color: "blue",
    examples: [
      {
        figmaProp: "Show Icon",
        figmaValues: "True ↔ False（显示/隐藏左侧图标）",
        reactProp: "showIcon?: boolean",
        reactCode: "<Button showIcon>带图标</Button>",
      },
      {
        figmaProp: "Disabled",
        figmaValues: "True ↔ False（禁用态开关）",
        reactProp: "disabled?: boolean",
        reactCode: "<Button disabled>不可点击</Button>",
      },
      {
        figmaProp: "Loading",
        figmaValues: "True ↔ False（加载态开关）",
        reactProp: "loading?: boolean",
        reactCode: "<Button loading>提交中...</Button>",
      },
    ],
  },
  {
    id: "string",
    icon: Type,
    label: "Text / String",
    figmaName: "文本属性",
    figmaDesc:
      "允许使用者直接编辑组件内的文本内容。在 Figma 中表现为可输入的文本框，无需进入组件内部修改。",
    reactType: "string",
    reactDesc:
      "映射为 string 类型 props。用于传入可自定义的文案内容，如按钮文字、标签、占位符等。",
    color: "emerald",
    examples: [
      {
        figmaProp: "Label",
        figmaValues: '"Add to Cart"（可自由编辑）',
        reactProp: "label: string",
        reactCode: '<Button label="添加购物车" />',
      },
      {
        figmaProp: "Helper Text",
        figmaValues: '"请输入有效的邮箱地址"',
        reactProp: "helperText?: string",
        reactCode: '<Input helperText="必填项" />',
      },
      {
        figmaProp: "Placeholder",
        figmaValues: '"Search..."',
        reactProp: "placeholder?: string",
        reactCode: '<Input placeholder="搜索..." />',
      },
    ],
  },
  {
    id: "instance",
    icon: Layers,
    label: "Instance Swap",
    figmaName: "实例替换属性",
    figmaDesc:
      "允许将组件内的某个子组件替换为另一个组件实例。在 Figma 中表现为组件选择器（Instance Swap），常用于图标插槽。",
    reactType: "ReactNode / Component",
    reactDesc:
      "映射为 React 的插槽模式——使用 ReactNode（children / render prop）或直接传入组件引用。",
    color: "amber",
    examples: [
      {
        figmaProp: "Left Icon",
        figmaValues: "IconSearch ↔ IconCart ↔ IconStar（可替换）",
        reactProp: "leftIcon?: React.ReactNode",
        reactCode: "<Button leftIcon={<Search />}>搜索</Button>",
      },
      {
        figmaProp: "Right Element",
        figmaValues: "Badge ↔ Avatar ↔ Tag（可替换）",
        reactProp: "rightSlot?: React.ReactNode",
        reactCode: "<ListItem rightSlot={<Badge>New</Badge>} />",
      },
      {
        figmaProp: "Thumbnail",
        figmaValues: "ImageA ↔ ImageB ↔ Placeholder",
        reactProp: "thumbnail?: React.ReactNode",
        reactCode: "<Card thumbnail={<img src={url} />} />",
      },
    ],
  },
];

/* ─── 交互式 Button 组件配置器 ─── */
const buttonVariants = ["Primary", "Secondary", "Ghost", "Danger"] as const;
const buttonSizes = ["Small", "Medium", "Large"] as const;

const variantStyles: Record<string, string> = {
  Primary: "bg-violet-600 text-white",
  Secondary: "bg-white text-violet-700 border-2 border-violet-200",
  Ghost: "bg-transparent text-violet-600 hover:bg-violet-50",
  Danger: "bg-red-500 text-white",
};

const sizeStyles: Record<string, string> = {
  Small: "px-3 py-1.5 text-[12px]",
  Medium: "px-5 py-2.5 text-[14px]",
  Large: "px-8 py-3.5 text-[16px]",
};

/* ─── Component ─── */
export function ComponentsSection() {
  const [activePropType, setActivePropType] = useState<PropTypeId>("variant");

  // Interactive button configurator state
  const [btnVariant, setBtnVariant] = useState<string>("Primary");
  const [btnSize, setBtnSize] = useState<string>("Medium");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnShowIcon, setBtnShowIcon] = useState(true);
  const [btnLabel, setBtnLabel] = useState("Add to Cart");

  const currentPropType = propTypes.find((p) => p.id === activePropType)!;

  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; light: string }> = {
    violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100", light: "text-violet-500" },
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100", light: "text-blue-500" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100", light: "text-emerald-500" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100", light: "text-amber-500" },
  };

  return (
    <section id="components" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[12px] mb-4"
            style={{ fontWeight: 500 }}
          >
            <Puzzle size={13} />
            组件与变体
          </div>
          <h2
            className="text-3xl sm:text-4xl tracking-tight mb-3"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Figma 属性 → React Props API
          </h2>
          <p
            className="text-gray-500 text-[15px] max-w-2xl mb-16"
            style={{ lineHeight: 1.7 }}
          >
            一个 AI-Ready 的组件，其 Figma 属性面板就是 React Props 接口的"可视化编辑器"。
            Figma 的四种属性类型——Variant、Boolean、String、Instance Swap——精确对应 React 组件的类型系统。
          </p>
        </motion.div>

        {/* ─── 属性类型映射详解 ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            四种属性类型详解
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">
            点击每种属性类型，查看它在 Figma 和 React 中的精确对应关系
          </p>

          {/* Type selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {propTypes.map((pt) => {
              const Icon = pt.icon;
              const c = colorMap[pt.color];
              return (
                <button
                  key={pt.id}
                  onClick={() => setActivePropType(pt.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] transition-all border ${activePropType === pt.id
                      ? `${c.bg} ${c.text} ${c.border}`
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  style={{ fontWeight: activePropType === pt.id ? 600 : 400 }}
                >
                  <Icon size={15} />
                  {pt.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePropType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const pt = currentPropType;
                const c = colorMap[pt.color];

                return (
                  <div className="space-y-4">
                    {/* Overview card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Figma side */}
                      <div className={`${c.bg}/60 ${c.border} border rounded-2xl p-6`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                            <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>F</span>
                          </div>
                          <span className="text-[12px] text-gray-400" style={{ fontWeight: 600 }}>
                            FIGMA
                          </span>
                        </div>
                        <h4 className="text-[16px] mb-2" style={{ fontWeight: 700 }}>
                          {pt.figmaName}
                          <span className={`text-[12px] ml-2 ${c.light}`} style={{ fontWeight: 500 }}>
                            {pt.label}
                          </span>
                        </h4>
                        <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>
                          {pt.figmaDesc}
                        </p>
                      </div>

                      {/* React side */}
                      <div className="bg-gray-900 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                            <span className="text-[10px] text-white" style={{ fontWeight: 700 }}>R</span>
                          </div>
                          <span className="text-[12px] text-gray-500" style={{ fontWeight: 600 }}>
                            REACT
                          </span>
                        </div>
                        <h4 className="text-[16px] text-white mb-2" style={{ fontWeight: 700 }}>
                          {pt.reactType}
                        </h4>
                        <p className="text-[13px] text-gray-400" style={{ lineHeight: 1.7 }}>
                          {pt.reactDesc}
                        </p>
                      </div>
                    </div>

                    {/* Examples mapping */}
                    <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden">
                      <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200/60 px-5 py-3">
                        <div className="col-span-3 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                          FIGMA 属性
                        </div>
                        <div className="col-span-4 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                          FIGMA 值
                        </div>
                        <div className="col-span-5 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                          REACT PROP
                        </div>
                      </div>
                      {pt.examples.map((ex, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-12 px-5 py-4 items-start ${i < pt.examples.length - 1 ? "border-b border-gray-100" : ""
                            }`}
                        >
                          <div className="col-span-3">
                            <span
                              className={`text-[12px] ${c.text} ${c.badge} px-2 py-1 rounded`}
                              style={{ fontWeight: 600 }}
                            >
                              {ex.figmaProp}
                            </span>
                          </div>
                          <div className="col-span-4">
                            <span
                              className="text-[12px] text-gray-600"
                              style={{ lineHeight: 1.6 }}
                            >
                              {ex.figmaValues}
                            </span>
                          </div>
                          <div className="col-span-5">
                            <code
                              className="text-[11px] text-gray-700 bg-gray-50 px-2 py-1 rounded block"
                              style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}
                            >
                              {ex.reactProp}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Code example */}
                    <div className="bg-gray-900 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="ml-2 text-[11px] text-gray-500">
                          Usage Example — {pt.label}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {pt.examples.map((ex, i) => (
                          <pre
                            key={i}
                            className="text-[12px]"
                            style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
                          >
                            <code>
                              <span className="text-gray-500">{"// "}{ex.figmaProp}</span>{"\n"}
                              <span className="text-blue-300">{ex.reactCode}</span>
                            </code>
                          </pre>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ─── 交互式组件配置器 ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-2"
            style={{ fontWeight: 600 }}
          >
            交互式演示
          </h3>
          <p className="text-[13px] text-gray-400 mb-8">
            像在 Figma 中一样配置 Button 组件的属性，实时查看对应的 React 代码
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Figma Property Panel Simulation */}
            <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200/60 px-5 py-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <span className="text-[8px] text-white" style={{ fontWeight: 700 }}>F</span>
                </div>
                <span className="text-[12px] text-gray-500" style={{ fontWeight: 600 }}>
                  Figma Properties Panel — Button
                </span>
              </div>
              <div className="p-5 space-y-5">
                {/* Variant: Style */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <List size={13} className="text-violet-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      Variant
                    </span>
                    <span className="text-[11px] text-violet-500 bg-violet-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Style
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buttonVariants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setBtnVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] transition-all border ${btnVariant === v
                            ? "bg-violet-100 text-violet-700 border-violet-300"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                          }`}
                        style={{ fontWeight: btnVariant === v ? 600 : 400 }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variant: Size */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <List size={13} className="text-violet-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      Variant
                    </span>
                    <span className="text-[11px] text-violet-500 bg-violet-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Size
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buttonSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setBtnSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] transition-all border ${btnSize === s
                            ? "bg-violet-100 text-violet-700 border-violet-300"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                          }`}
                        style={{ fontWeight: btnSize === s ? 600 : 400 }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boolean: Disabled */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ToggleLeft size={13} className="text-blue-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      Boolean
                    </span>
                    <span className="text-[11px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Disabled
                    </span>
                  </div>
                  <button
                    onClick={() => setBtnDisabled(!btnDisabled)}
                    className={`w-10 h-6 rounded-full transition-all relative ${btnDisabled ? "bg-blue-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${btnDisabled ? "left-5" : "left-1"
                        }`}
                    />
                  </button>
                </div>

                {/* Boolean: Loading */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ToggleLeft size={13} className="text-blue-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      Boolean
                    </span>
                    <span className="text-[11px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Loading
                    </span>
                  </div>
                  <button
                    onClick={() => setBtnLoading(!btnLoading)}
                    className={`w-10 h-6 rounded-full transition-all relative ${btnLoading ? "bg-blue-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${btnLoading ? "left-5" : "left-1"
                        }`}
                    />
                  </button>
                </div>

                {/* Boolean: Show Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ToggleLeft size={13} className="text-blue-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      Boolean
                    </span>
                    <span className="text-[11px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Show Icon
                    </span>
                  </div>
                  <button
                    onClick={() => setBtnShowIcon(!btnShowIcon)}
                    className={`w-10 h-6 rounded-full transition-all relative ${btnShowIcon ? "bg-blue-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${btnShowIcon ? "left-5" : "left-1"
                        }`}
                    />
                  </button>
                </div>

                {/* String: Label */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Type size={13} className="text-emerald-500" />
                    <span className="text-[12px] text-gray-500" style={{ fontWeight: 500 }}>
                      String
                    </span>
                    <span className="text-[11px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                      Label
                    </span>
                  </div>
                  <input
                    type="text"
                    value={btnLabel}
                    onChange={(e) => setBtnLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>

                {/* Preview */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-[11px] text-gray-400 mb-3" style={{ fontWeight: 500 }}>
                    PREVIEW
                  </div>
                  <div className="flex justify-center p-6 bg-gray-50 rounded-xl">
                    <motion.button
                      key={`${btnVariant}-${btnSize}-${btnDisabled}-${btnLoading}-${btnShowIcon}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: btnDisabled ? 0.4 : 1 }}
                      className={`${btnDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : variantStyles[btnVariant]} ${sizeStyles[btnSize]} rounded-xl inline-flex items-center gap-2 transition-all ${btnLoading ? "cursor-wait" : ""}`}
                      style={{ fontWeight: 500 }}
                      disabled={btnDisabled}
                    >
                      {btnLoading && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
                        />
                      )}
                      {btnShowIcon && !btnLoading && <ShoppingCart size={16} />}
                      {btnLabel || "Button"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated React Code */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-gray-800/50 border-b border-gray-700/50 px-5 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-[11px] text-gray-500">
                  Generated React Code
                </span>
              </div>
              <div className="p-5 flex-1 overflow-auto">
                {/* Interface */}
                <pre
                  className="text-[12px] mb-6"
                  style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
                >
                  <code>
                    <span className="text-gray-500">{"// AI 根据 Figma 属性面板"}</span>{"\n"}
                    <span className="text-gray-500">{"// 自动生成的类型定义 ✨"}</span>{"\n\n"}
                    <span className="text-violet-400">{"interface"}</span>
                    <span className="text-emerald-300">{" ButtonProps "}</span>
                    <span className="text-gray-500">{"{"}</span>{"\n"}

                    <span className="text-gray-500">{"  "}</span>
                    <span className="text-gray-600">{"// Variant 属性"}</span>{"\n"}
                    <span className="text-blue-300">{"  variant"}</span>
                    <span className="text-gray-500">{": "}</span>
                    <span className="text-amber-300">{"'primary' | 'secondary'"}</span>{"\n"}
                    <span className="text-amber-300">{"    | 'ghost' | 'danger'"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n"}
                    <span className="text-blue-300">{"  size"}</span>
                    <span className="text-gray-500">{": "}</span>
                    <span className="text-amber-300">{"'sm' | 'md' | 'lg'"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n\n"}

                    <span className="text-gray-500">{"  "}</span>
                    <span className="text-gray-600">{"// Boolean 属性"}</span>{"\n"}
                    <span className="text-blue-300">{"  disabled"}</span>
                    <span className="text-gray-500">{"?: "}</span>
                    <span className="text-emerald-300">{"boolean"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n"}
                    <span className="text-blue-300">{"  loading"}</span>
                    <span className="text-gray-500">{"?: "}</span>
                    <span className="text-emerald-300">{"boolean"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n"}
                    <span className="text-blue-300">{"  showIcon"}</span>
                    <span className="text-gray-500">{"?: "}</span>
                    <span className="text-emerald-300">{"boolean"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n\n"}

                    <span className="text-gray-500">{"  "}</span>
                    <span className="text-gray-600">{"// String 属性"}</span>{"\n"}
                    <span className="text-blue-300">{"  label"}</span>
                    <span className="text-gray-500">{": "}</span>
                    <span className="text-emerald-300">{"string"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n\n"}

                    <span className="text-gray-500">{"  "}</span>
                    <span className="text-gray-600">{"// Instance Swap 属性"}</span>{"\n"}
                    <span className="text-blue-300">{"  leftIcon"}</span>
                    <span className="text-gray-500">{"?: "}</span>
                    <span className="text-emerald-300">{"React.ReactNode"}</span>
                    <span className="text-gray-500">{";"}</span>{"\n"}
                    <span className="text-gray-500">{"}"}</span>
                  </code>
                </pre>

                {/* Usage */}
                <pre
                  className="text-[12px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
                >
                  <code>
                    <span className="text-gray-500">{"// 当前配置对应的代码"}</span>{"\n"}
                    <span className="text-gray-500">{"<"}</span>
                    <span className="text-emerald-300">{"Button"}</span>{"\n"}
                    <span className="text-blue-300">{"  variant"}</span>
                    <span className="text-gray-500">{"="}</span>
                    <span className="text-amber-300">{`"${btnVariant.toLowerCase()}"`}</span>{"\n"}
                    <span className="text-blue-300">{"  size"}</span>
                    <span className="text-gray-500">{"="}</span>
                    <span className="text-amber-300">{`"${btnSize === "Small" ? "sm" : btnSize === "Medium" ? "md" : "lg"}"`}</span>{"\n"}
                    {btnDisabled && (
                      <>
                        <span className="text-blue-300">{"  disabled"}</span>{"\n"}
                      </>
                    )}
                    {btnLoading && (
                      <>
                        <span className="text-blue-300">{"  loading"}</span>{"\n"}
                      </>
                    )}
                    {btnShowIcon && (
                      <>
                        <span className="text-blue-300">{"  leftIcon"}</span>
                        <span className="text-gray-500">{"={"}</span>
                        <span className="text-gray-500">{"<"}</span>
                        <span className="text-emerald-300">{"ShoppingCart"}</span>
                        <span className="text-gray-500">{" />"}</span>
                        <span className="text-gray-500">{"}"}</span>{"\n"}
                      </>
                    )}
                    <span className="text-gray-500">{">"}</span>{"\n"}
                    <span className="text-white">{"  "}{btnLabel || "Button"}</span>{"\n"}
                    <span className="text-gray-500">{"</"}</span>
                    <span className="text-emerald-300">{"Button"}</span>
                    <span className="text-gray-500">{">"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── 总结映射表 ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3
            className="text-[14px] text-gray-400 uppercase tracking-wider mb-6"
            style={{ fontWeight: 600 }}
          >
            速查对照表
          </h3>
          <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200/60 px-5 py-3">
              <div className="col-span-3 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                FIGMA 属性类型
              </div>
              <div className="col-span-3 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                FIGMA 表现形式
              </div>
              <div className="col-span-3 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                REACT TYPE
              </div>
              <div className="col-span-3 text-[11px] text-gray-400" style={{ fontWeight: 600 }}>
                命名建议
              </div>
            </div>
            {/* Rows */}
            {[
              {
                type: "Variant",
                figma: "下拉选择（互斥选项）",
                react: "Union Type 联合类型",
                naming: "style / size / state",
                color: "violet",
              },
              {
                type: "Boolean",
                figma: "开关 Toggle（显隐/开关）",
                react: "boolean",
                naming: "disabled / loading / showX",
                color: "blue",
              },
              {
                type: "String",
                figma: "文本输入框",
                react: "string",
                naming: "label / title / helperText",
                color: "emerald",
              },
              {
                type: "Instance Swap",
                figma: "组件替换选择器",
                react: "ReactNode / ComponentType",
                naming: "icon / leftSlot / thumbnail",
                color: "amber",
              },
            ].map((row, i) => (
              <div
                key={row.type}
                className={`grid grid-cols-12 px-5 py-4 items-center ${i < 3 ? "border-b border-gray-100" : ""
                  }`}
              >
                <div className="col-span-3">
                  <span
                    className={`text-[12px] bg-${row.color}-100 text-${row.color}-700 px-2.5 py-1 rounded`}
                    style={{ fontWeight: 600 }}
                  >
                    {row.type}
                  </span>
                </div>
                <div className="col-span-3 text-[12px] text-gray-600">
                  {row.figma}
                </div>
                <div className="col-span-3">
                  <code
                    className="text-[11px] text-gray-700 bg-gray-50 px-2 py-1 rounded"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {row.react}
                  </code>
                </div>
                <div className="col-span-3">
                  <code
                    className="text-[11px] text-gray-500"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {row.naming}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Key insight */}
          <div className="mt-6 bg-violet-50 border border-violet-200/50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                <Star size={16} className="text-violet-500" />
              </div>
              <div>
                <h4 className="text-[14px] text-violet-800 mb-2" style={{ fontWeight: 600 }}>
                  核心洞察
                </h4>
                <p className="text-[13px] text-violet-600/80" style={{ lineHeight: 1.7 }}>
                  当你在 Figma 中添加一个 Component Property 时，你实际上就是在定义 React 组件的 Props 接口。
                  <span style={{ fontWeight: 600 }}> Figma 属性面板 = React Props 的可视化编辑器</span>。
                  保持两端的命名一致性（如 Figma 的 "Disabled" → React 的 "disabled"），AI 就能实现零误差的属性映射。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}