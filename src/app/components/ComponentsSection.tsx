import { useState } from "react";
import { motion } from "motion/react";
import { Puzzle, Check, X } from "lucide-react";

const variantStates = [
  { name: "Default", bg: "bg-violet-600", text: "text-white", cursor: "cursor-pointer" },
  { name: "Hover", bg: "bg-violet-700", text: "text-white", cursor: "cursor-pointer" },
  { name: "Active", bg: "bg-violet-800", text: "text-white", cursor: "cursor-pointer" },
  { name: "Disabled", bg: "bg-gray-200", text: "text-gray-400", cursor: "cursor-not-allowed" },
  { name: "Loading", bg: "bg-violet-500", text: "text-white", cursor: "cursor-wait" },
];

const componentChecklist = [
  { item: "所有按钮使用组件 (Component)", done: true },
  { item: "输入框有 Default / Focus / Error / Disabled 变体", done: true },
  { item: "图标统一使用 SVG 组件", done: true },
  { item: "卡片组件支持不同内容变体", done: true },
  { item: "弹窗/Modal 使用 Overlay + Content 结构", done: false },
  { item: "导航菜单有 Active/Inactive 状态变体", done: false },
  { item: "表单字段组合为 FormField 组件", done: false },
];

export function ComponentsSection() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(
    new Set(componentChecklist.map((c, i) => (c.done ? i : -1)).filter((i) => i >= 0))
  );

  const toggleCheck = (index: number) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setCheckedItems(newSet);
  };

  const progress = Math.round((checkedItems.size / componentChecklist.length) * 100);

  return (
    <section id="components" className="py-24 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <Puzzle size={13} />
            组件与变体
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            万物皆组件，状态即变体
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mb-12" style={{ lineHeight: 1.7 }}>
            将所有可复用的 UI 元素创建为 Figma 组件，并使用变体来管理不同的交互状态。AI 能识别变体并生成对应的状态代码。
          </p>
        </motion.div>

        {/* Variant demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-6" style={{ fontWeight: 600 }}>
            按钮组件变体示例
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200/60 rounded-2xl p-6">
              <div className="text-[12px] text-gray-400 mb-4" style={{ fontWeight: 500 }}>
                Figma 变体面板
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {variantStates.map((v, i) => (
                  <button
                    key={v.name}
                    onClick={() => setActiveVariant(i)}
                    className={`px-4 py-2 rounded-lg text-[13px] transition-all border-2 ${
                      activeVariant === i
                        ? "border-violet-400 bg-violet-50"
                        : "border-transparent bg-gray-50"
                    }`}
                    style={{ fontWeight: activeVariant === i ? 500 : 400 }}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              {/* Preview */}
              <div className="flex justify-center p-8 bg-gray-50 rounded-xl">
                <motion.div
                  key={activeVariant}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${variantStates[activeVariant].bg} ${variantStates[activeVariant].text} ${variantStates[activeVariant].cursor} px-8 py-3 rounded-xl text-[14px] inline-flex items-center gap-2 shadow-sm`}
                  style={{ fontWeight: 500 }}
                >
                  {activeVariant === 4 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  )}
                  {activeVariant === 4 ? "Loading..." : "Add to Cart"}
                </motion.div>
              </div>
            </div>

            {/* Generated code */}
            <div className="bg-gray-900 rounded-2xl p-5 overflow-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-[11px] text-gray-500">Generated React Component</span>
              </div>
              <pre
                className="text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
              >
                <code>
                  <span className="text-violet-400">{"interface"}</span>
                  <span className="text-emerald-300">{" ButtonProps "}</span>
                  <span className="text-gray-500">{"{"}</span>{"\n"}
                  <span className="text-blue-300">{"  variant"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-amber-300">{"'default' | 'hover'"}</span>{"\n"}
                  <span className="text-gray-500">{"    "}</span>
                  <span className="text-amber-300">{"| 'active' | 'disabled'"}</span>{"\n"}
                  <span className="text-gray-500">{"    "}</span>
                  <span className="text-amber-300">{"| 'loading'"}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-blue-300">{"  children"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-emerald-300">{"React.ReactNode"}</span>
                  <span className="text-gray-500">{";"}</span>{"\n"}
                  <span className="text-gray-500">{"}"}</span>{"\n\n"}
                  <span className="text-gray-600">{"// AI 根据变体自动生成"}</span>{"\n"}
                  <span className="text-gray-600">{"// 状态样式映射 ✨"}</span>{"\n"}
                  <span className="text-violet-400">{"const"}</span>
                  <span className="text-blue-300">{" variantStyles "}</span>
                  <span className="text-gray-500">{"= {"}</span>{"\n"}
                  <span className="text-amber-300">{"  default"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-emerald-300">{"'bg-violet-600'"}</span>
                  <span className="text-gray-500">{","}</span>{"\n"}
                  <span className="text-amber-300">{"  hover"}</span>
                  <span className="text-gray-500">{":   "}</span>
                  <span className="text-emerald-300">{"'bg-violet-700'"}</span>
                  <span className="text-gray-500">{","}</span>{"\n"}
                  <span className="text-amber-300">{"  disabled"}</span>
                  <span className="text-gray-500">{": "}</span>
                  <span className="text-emerald-300">{"'bg-gray-200'"}</span>
                  <span className="text-gray-500">{","}</span>{"\n"}
                  <span className="text-gray-500">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Interactive checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-[14px] text-gray-400 uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>
            组件化自检清单
          </h3>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
            <span className="text-[13px] text-gray-500" style={{ fontWeight: 500 }}>
              {progress}%
            </span>
          </div>
          <div className="bg-white border border-gray-200/60 rounded-2xl divide-y divide-gray-100">
            {componentChecklist.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    checkedItems.has(i)
                      ? "bg-violet-500 text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {checkedItems.has(i) && <Check size={12} />}
                </div>
                <span
                  className={`text-[13px] transition-all ${
                    checkedItems.has(i) ? "text-gray-400 line-through" : "text-gray-700"
                  }`}
                >
                  {item.item}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
