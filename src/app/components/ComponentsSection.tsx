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

/* --- 四种属性类型数据 --- */
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
    color: "indigo",
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
        figmaValues: "Default | Hover | Active | Disabled",
        reactProp: 'state: "default" | "hover" | "active" | "disabled"',
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
    color: "ochre",
    examples: [
      {
        figmaProp: "Show Icon",
        figmaValues: "True / False（显示/隐藏左侧图标）",
        reactProp: "showIcon?: boolean",
        reactCode: "<Button showIcon>带图标</Button>",
      },
      {
        figmaProp: "Disabled",
        figmaValues: "True / False（禁用态开关）",
        reactProp: "disabled?: boolean",
        reactCode: "<Button disabled>不可点击</Button>",
      },
      {
        figmaProp: "Loading",
        figmaValues: "True / False（加载态开关）",
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
    color: "bamboo",
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
    color: "stone",
    examples: [
      {
        figmaProp: "Left Icon",
        figmaValues: "IconSearch / IconCart / IconStar（可替换）",
        reactProp: "leftIcon?: React.ReactNode",
        reactCode: "<Button leftIcon={<Search />}>搜索</Button>",
      },
      {
        figmaProp: "Right Element",
        figmaValues: "Badge / Avatar / Tag（可替换）",
        reactProp: "rightSlot?: React.ReactNode",
        reactCode: "<ListItem rightSlot={<Badge>New</Badge>} />",
      },
      {
        figmaProp: "Thumbnail",
        figmaValues: "ImageA / ImageB / Placeholder",
        reactProp: "thumbnail?: React.ReactNode",
        reactCode: "<Card thumbnail={<img src={url} />} />",
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; light: string }> = {
  indigo: { bg: "bg-indigo/5", border: "border-indigo/20", text: "text-indigo", badge: "bg-indigo/10", light: "text-indigo-light" },
  ochre: { bg: "bg-ochre/5", border: "border-ochre/20", text: "text-ochre", badge: "bg-ochre/10", light: "text-ochre-light" },
  bamboo: { bg: "bg-bamboo/5", border: "border-bamboo/20", text: "text-bamboo", badge: "bg-bamboo/10", light: "text-bamboo-light" },
  stone: { bg: "bg-stone/5", border: "border-stone/20", text: "text-stone", badge: "bg-stone/10", light: "text-stone" },
};

/* --- Interactive Button --- */
const buttonVariants = ["Primary", "Secondary", "Ghost", "Danger"] as const;
const buttonSizes = ["Small", "Medium", "Large"] as const;

const variantStyles: Record<string, string> = {
  Primary: "bg-indigo text-washi-cream",
  Secondary: "bg-washi-warm text-indigo border-2 border-indigo/20",
  Ghost: "bg-transparent text-indigo hover:bg-indigo/5",
  Danger: "bg-vermillion text-washi-cream",
};

const sizeStyles: Record<string, string> = {
  Small: "px-3 py-1.5 text-[12px]",
  Medium: "px-5 py-2.5 text-[14px]",
  Large: "px-8 py-3.5 text-[16px]",
};

export function ComponentsSection() {
  const [activePropType, setActivePropType] = useState<PropTypeId>("variant");
  const [btnVariant, setBtnVariant] = useState<string>("Primary");
  const [btnSize, setBtnSize] = useState<string>("Medium");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnShowIcon, setBtnShowIcon] = useState(true);
  const [btnLabel, setBtnLabel] = useState("Add to Cart");

  const currentPropType = propTypes.find((p) => p.id === activePropType)!;

  return (
    <section id="components" className="py-24 px-6 bg-washi-warm">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo/10 text-indigo text-[12px] mb-4 font-sans" style={{ fontWeight: 500 }}>
            <Puzzle size={13} />
            组件与变体
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Figma 属性 → React Props API
          </h2>
          <p className="text-ink-muted text-[15px] max-w-2xl mb-16 font-sans" style={{ lineHeight: 1.8 }}>
            一个 AI-Ready 的组件，其 Figma 属性面板就是 React Props 接口的"可视化编辑器"。
            Figma 的四种属性类型——Variant、Boolean、String、Instance Swap——精确对应 React 组件的类型系统。
          </p>
        </motion.div>

        {/* 属性类型映射详解 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans" style={{ fontWeight: 600 }}>
            四种属性类型详解
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            点击每种属性类型，查看它在 Figma 和 React 中的精确对应关系
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {propTypes.map((pt) => {
              const Icon = pt.icon;
              const c = colorMap[pt.color];
              return (
                <button
                  key={pt.id}
                  onClick={() => setActivePropType(pt.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] transition-all border font-sans ${
                    activePropType === pt.id
                      ? `${c.bg} ${c.text} ${c.border}`
                      : "bg-washi-cream text-ink-muted border-border hover:bg-secondary"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`${c.bg} ${c.border} border rounded-md p-6`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-sm bg-ochre flex items-center justify-center">
                            <span className="text-[10px] text-washi-cream" style={{ fontWeight: 700 }}>F</span>
                          </div>
                          <span className="text-[12px] text-stone font-sans" style={{ fontWeight: 600 }}>FIGMA</span>
                        </div>
                        <h4 className="text-[16px] mb-2 text-ink-primary font-serif" style={{ fontWeight: 700 }}>
                          {pt.figmaName}
                          <span className={`text-[12px] ml-2 ${c.light} font-sans`} style={{ fontWeight: 500 }}>{pt.label}</span>
                        </h4>
                        <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>{pt.figmaDesc}</p>
                      </div>

                      <div className="bg-ink-primary rounded-md p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-sm bg-indigo flex items-center justify-center">
                            <span className="text-[10px] text-washi-cream" style={{ fontWeight: 700 }}>R</span>
                          </div>
                          <span className="text-[12px] text-stone/60 font-sans" style={{ fontWeight: 600 }}>REACT</span>
                        </div>
                        <h4 className="text-[16px] text-washi-cream mb-2 font-serif" style={{ fontWeight: 700 }}>{pt.reactType}</h4>
                        <p className="text-[13px] text-stone font-sans" style={{ lineHeight: 1.8 }}>{pt.reactDesc}</p>
                      </div>
                    </div>

                    {/* Examples mapping */}
                    <div className="bg-washi-cream border border-border rounded-md overflow-hidden">
                      <div className="grid grid-cols-12 bg-secondary border-b border-border px-5 py-3">
                        <div className="col-span-3 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>FIGMA 属性</div>
                        <div className="col-span-4 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>FIGMA 值</div>
                        <div className="col-span-5 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>REACT PROP</div>
                      </div>
                      {pt.examples.map((ex, i) => (
                        <div key={i} className={`grid grid-cols-12 px-5 py-4 items-start ${i < pt.examples.length - 1 ? "border-b border-border" : ""}`}>
                          <div className="col-span-3">
                            <span className={`text-[12px] ${c.text} ${c.badge} px-2 py-1 rounded-sm font-sans`} style={{ fontWeight: 600 }}>{ex.figmaProp}</span>
                          </div>
                          <div className="col-span-4">
                            <span className="text-[12px] text-ink-muted font-sans" style={{ lineHeight: 1.6 }}>{ex.figmaValues}</span>
                          </div>
                          <div className="col-span-5">
                            <code className="text-[11px] text-ink-secondary bg-secondary px-2 py-1 rounded-sm block font-mono" style={{ lineHeight: 1.6 }}>{ex.reactProp}</code>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-ink-primary rounded-md p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-vermillion/60" />
                        <div className="w-3 h-3 rounded-full bg-ochre/60" />
                        <div className="w-3 h-3 rounded-full bg-bamboo/60" />
                        <span className="ml-2 text-[11px] text-stone/60 font-sans">Usage Example — {pt.label}</span>
                      </div>
                      <div className="space-y-2">
                        {pt.examples.map((ex, i) => (
                          <pre key={i} className="text-[12px] font-mono" style={{ lineHeight: 1.8 }}>
                            <code>
                              <span className="text-stone/50">{"// "}{ex.figmaProp}</span>{"\n"}
                              <span className="text-indigo-light">{ex.reactCode}</span>
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

        {/* 交互式组件配置器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-2 font-sans" style={{ fontWeight: 600 }}>
            交互式演示
          </h3>
          <p className="text-[13px] text-stone mb-8 font-sans">
            像在 Figma 中一样配置 Button 组件的属性，实时查看对应的 React 代码
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Figma Panel */}
            <div className="bg-washi-cream border border-border rounded-md overflow-hidden">
              <div className="bg-secondary border-b border-border px-5 py-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-ochre flex items-center justify-center">
                  <span className="text-[8px] text-washi-cream" style={{ fontWeight: 700 }}>F</span>
                </div>
                <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 600 }}>
                  Figma Properties Panel — Button
                </span>
              </div>
              <div className="p-5 space-y-5">
                {/* Variant: Style */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <List size={13} className="text-indigo" />
                    <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>Variant</span>
                    <span className="text-[11px] text-indigo bg-indigo/10 px-1.5 py-0.5 rounded-sm font-sans" style={{ fontWeight: 500 }}>Style</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buttonVariants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setBtnVariant(v)}
                        className={`px-3 py-1.5 rounded-md text-[12px] transition-all border font-sans ${
                          btnVariant === v
                            ? "bg-indigo/10 text-indigo border-indigo/30"
                            : "bg-secondary text-ink-muted border-border hover:bg-muted"
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
                    <List size={13} className="text-indigo" />
                    <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>Variant</span>
                    <span className="text-[11px] text-indigo bg-indigo/10 px-1.5 py-0.5 rounded-sm font-sans" style={{ fontWeight: 500 }}>Size</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buttonSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setBtnSize(s)}
                        className={`px-3 py-1.5 rounded-md text-[12px] transition-all border font-sans ${
                          btnSize === s
                            ? "bg-indigo/10 text-indigo border-indigo/30"
                            : "bg-secondary text-ink-muted border-border hover:bg-muted"
                        }`}
                        style={{ fontWeight: btnSize === s ? 600 : 400 }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Boolean toggles */}
                {[
                  { label: "Disabled", value: btnDisabled, setter: setBtnDisabled },
                  { label: "Loading", value: btnLoading, setter: setBtnLoading },
                  { label: "Show Icon", value: btnShowIcon, setter: setBtnShowIcon },
                ].map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ToggleLeft size={13} className="text-ochre" />
                      <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>Boolean</span>
                      <span className="text-[11px] text-ochre bg-ochre/10 px-1.5 py-0.5 rounded-sm font-sans" style={{ fontWeight: 500 }}>{toggle.label}</span>
                    </div>
                    <button
                      onClick={() => toggle.setter(!toggle.value)}
                      className={`w-10 h-6 rounded-full transition-all relative ${toggle.value ? "bg-indigo" : "bg-stone/30"}`}
                    >
                      <div className={`w-4 h-4 bg-washi-cream rounded-full absolute top-1 transition-all shadow-sm ${toggle.value ? "left-5" : "left-1"}`} />
                    </button>
                  </div>
                ))}

                {/* String: Label */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Type size={13} className="text-bamboo" />
                    <span className="text-[12px] text-ink-muted font-sans" style={{ fontWeight: 500 }}>String</span>
                    <span className="text-[11px] text-bamboo bg-bamboo/10 px-1.5 py-0.5 rounded-sm font-sans" style={{ fontWeight: 500 }}>Label</span>
                  </div>
                  <input
                    type="text"
                    value={btnLabel}
                    onChange={(e) => setBtnLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border text-[13px] text-ink-primary bg-washi-warm focus:outline-none focus:border-indigo/40 focus:ring-2 focus:ring-indigo/10 transition-all font-sans"
                  />
                </div>

                {/* Preview */}
                <div className="pt-4 border-t border-border">
                  <div className="text-[11px] text-stone mb-3 font-sans" style={{ fontWeight: 500 }}>PREVIEW</div>
                  <div className="flex justify-center p-6 bg-washi-warm rounded-md">
                    <motion.button
                      key={`${btnVariant}-${btnSize}-${btnDisabled}-${btnLoading}-${btnShowIcon}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: btnDisabled ? 0.4 : 1 }}
                      className={`${btnDisabled ? "bg-stone/30 text-stone cursor-not-allowed" : variantStyles[btnVariant]} ${sizeStyles[btnSize]} rounded-md inline-flex items-center gap-2 transition-all font-sans ${btnLoading ? "cursor-wait" : ""}`}
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

            {/* Generated Code */}
            <div className="bg-ink-primary rounded-md overflow-hidden flex flex-col">
              <div className="bg-ink-secondary/30 border-b border-stone/20 px-5 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-vermillion/60" />
                <div className="w-3 h-3 rounded-full bg-ochre/60" />
                <div className="w-3 h-3 rounded-full bg-bamboo/60" />
                <span className="ml-2 text-[11px] text-stone/60 font-sans">Generated React Code</span>
              </div>
              <div className="p-5 flex-1 overflow-auto">
                <pre className="text-[12px] mb-6 font-mono" style={{ lineHeight: 1.8 }}>
                  <code>
                    <span className="text-stone/50">{"// AI 根据 Figma 属性面板"}</span>{"\n"}
                    <span className="text-stone/50">{"// 自动生成的类型定义"}</span>{"\n\n"}
                    <span className="text-ochre-light">{"interface"}</span>
                    <span className="text-bamboo-light">{" ButtonProps "}</span>
                    <span className="text-stone/50">{"{"}</span>{"\n"}
                    <span className="text-stone/50">{"  "}</span>
                    <span className="text-stone/40">{"// Variant 属性"}</span>{"\n"}
                    <span className="text-indigo-light">{"  variant"}</span>
                    <span className="text-stone/50">{": "}</span>
                    <span className="text-ochre-light">{"'primary' | 'secondary'"}</span>{"\n"}
                    <span className="text-ochre-light">{"    | 'ghost' | 'danger'"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n"}
                    <span className="text-indigo-light">{"  size"}</span>
                    <span className="text-stone/50">{": "}</span>
                    <span className="text-ochre-light">{"'sm' | 'md' | 'lg'"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n\n"}
                    <span className="text-stone/50">{"  "}</span>
                    <span className="text-stone/40">{"// Boolean 属性"}</span>{"\n"}
                    <span className="text-indigo-light">{"  disabled"}</span>
                    <span className="text-stone/50">{"?: "}</span>
                    <span className="text-bamboo-light">{"boolean"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n"}
                    <span className="text-indigo-light">{"  loading"}</span>
                    <span className="text-stone/50">{"?: "}</span>
                    <span className="text-bamboo-light">{"boolean"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n"}
                    <span className="text-indigo-light">{"  showIcon"}</span>
                    <span className="text-stone/50">{"?: "}</span>
                    <span className="text-bamboo-light">{"boolean"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n\n"}
                    <span className="text-stone/50">{"  "}</span>
                    <span className="text-stone/40">{"// String 属性"}</span>{"\n"}
                    <span className="text-indigo-light">{"  label"}</span>
                    <span className="text-stone/50">{": "}</span>
                    <span className="text-bamboo-light">{"string"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n\n"}
                    <span className="text-stone/50">{"  "}</span>
                    <span className="text-stone/40">{"// Instance Swap 属性"}</span>{"\n"}
                    <span className="text-indigo-light">{"  leftIcon"}</span>
                    <span className="text-stone/50">{"?: "}</span>
                    <span className="text-bamboo-light">{"React.ReactNode"}</span>
                    <span className="text-stone/50">{";"}</span>{"\n"}
                    <span className="text-stone/50">{"}"}</span>
                  </code>
                </pre>

                <pre className="text-[12px] font-mono" style={{ lineHeight: 1.8 }}>
                  <code>
                    <span className="text-stone/50">{"// 当前配置对应的代码"}</span>{"\n"}
                    <span className="text-stone/50">{"<"}</span>
                    <span className="text-bamboo-light">{"Button"}</span>{"\n"}
                    <span className="text-indigo-light">{"  variant"}</span>
                    <span className="text-stone/50">{"="}</span>
                    <span className="text-ochre-light">{`"${btnVariant.toLowerCase()}"`}</span>{"\n"}
                    <span className="text-indigo-light">{"  size"}</span>
                    <span className="text-stone/50">{"="}</span>
                    <span className="text-ochre-light">{`"${btnSize === "Small" ? "sm" : btnSize === "Medium" ? "md" : "lg"}"`}</span>{"\n"}
                    {btnDisabled && (<><span className="text-indigo-light">{"  disabled"}</span>{"\n"}</>)}
                    {btnLoading && (<><span className="text-indigo-light">{"  loading"}</span>{"\n"}</>)}
                    {btnShowIcon && (
                      <>
                        <span className="text-indigo-light">{"  leftIcon"}</span>
                        <span className="text-stone/50">{"={"}</span>
                        <span className="text-stone/50">{"<"}</span>
                        <span className="text-bamboo-light">{"ShoppingCart"}</span>
                        <span className="text-stone/50">{" />"}</span>
                        <span className="text-stone/50">{"}"}</span>{"\n"}
                      </>
                    )}
                    <span className="text-stone/50">{">"}</span>{"\n"}
                    <span className="text-washi-cream/80">{"  "}{btnLabel || "Button"}</span>{"\n"}
                    <span className="text-stone/50">{"</"}</span>
                    <span className="text-bamboo-light">{"Button"}</span>
                    <span className="text-stone/50">{">"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 速查对照表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[14px] text-stone uppercase tracking-wider mb-6 font-sans" style={{ fontWeight: 600 }}>
            速查对照表
          </h3>
          <div className="bg-washi-cream border border-border rounded-md overflow-hidden">
            <div className="grid grid-cols-12 bg-secondary border-b border-border px-5 py-3">
              <div className="col-span-3 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>FIGMA 属性类型</div>
              <div className="col-span-3 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>FIGMA 表现形式</div>
              <div className="col-span-3 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>REACT TYPE</div>
              <div className="col-span-3 text-[11px] text-stone font-sans" style={{ fontWeight: 600 }}>命名建议</div>
            </div>
            {[
              { type: "Variant", figma: "下拉选择（互斥选项）", react: "Union Type 联合类型", naming: "style / size / state", color: "indigo" },
              { type: "Boolean", figma: "开关 Toggle（显隐/开关）", react: "boolean", naming: "disabled / loading / showX", color: "ochre" },
              { type: "String", figma: "文本输入框", react: "string", naming: "label / title / helperText", color: "bamboo" },
              { type: "Instance Swap", figma: "组件替换选择器", react: "ReactNode / ComponentType", naming: "icon / leftSlot / thumbnail", color: "stone" },
            ].map((row, i) => {
              const c = colorMap[row.color];
              return (
                <div key={row.type} className={`grid grid-cols-12 px-5 py-4 items-center ${i < 3 ? "border-b border-border" : ""}`}>
                  <div className="col-span-3">
                    <span className={`text-[12px] ${c.badge} ${c.text} px-2.5 py-1 rounded-sm font-sans`} style={{ fontWeight: 600 }}>{row.type}</span>
                  </div>
                  <div className="col-span-3 text-[12px] text-ink-muted font-sans">{row.figma}</div>
                  <div className="col-span-3">
                    <code className="text-[11px] text-ink-secondary bg-secondary px-2 py-1 rounded-sm font-mono">{row.react}</code>
                  </div>
                  <div className="col-span-3">
                    <code className="text-[11px] text-stone font-mono">{row.naming}</code>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key insight */}
          <div className="mt-6 bg-indigo/5 border border-indigo/20 rounded-md p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center shrink-0 mt-0.5">
                <Star size={16} className="text-indigo" />
              </div>
              <div>
                <h4 className="text-[14px] text-indigo mb-2 font-serif" style={{ fontWeight: 600 }}>
                  核心洞察
                </h4>
                <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>
                  当你在 Figma 中添加一个 Component Property 时，你实际上就是在定义 React 组件的 Props 接口。
                  <span style={{ fontWeight: 600 }} className="text-ink-primary"> Figma 属性面板 = React Props 的可视化编辑器</span>。
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
