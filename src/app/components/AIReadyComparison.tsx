import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Code, CheckCircle2, XCircle, ArrowRightLeft, Sparkles } from "lucide-react";

type Mode = "non_ready" | "ai_ready";

export function AIReadyComparison() {
  const [mode, setMode] = useState<Mode>("non_ready");

  return (
    <section id="comparison" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[12px] mb-4" style={{ fontWeight: 500 }}>
            <ArrowRightLeft size={13} />
            交互式对比
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            AI 视角：两种设计系统的代码产出差异
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            切换下方模式，观察同一个卡片组件在「非 AI-Ready」和「AI-Ready」两种设计系统下，
            AI 生成代码的质量差异。
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setMode("non_ready")}
              className={`px-6 py-2.5 rounded-xl text-[14px] transition-all flex items-center gap-2 ${
                mode === "non_ready" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontWeight: mode === "non_ready" ? 600 : 400 }}
            >
              <XCircle size={14} className={mode === "non_ready" ? "text-red-500" : ""} />
              非 AI-Ready 设计系统
            </button>
            <button
              onClick={() => setMode("ai_ready")}
              className={`px-6 py-2.5 rounded-xl text-[14px] transition-all flex items-center gap-2 ${
                mode === "ai_ready" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontWeight: mode === "ai_ready" ? 600 : 400 }}
            >
              <Sparkles size={14} />
              使用 AI-Ready 设计系统
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Visual Representation */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200/60 rounded-3xl p-8 min-h-[360px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[11px] text-gray-400 font-mono">
                浏览器渲染效果
              </div>
              
              <AnimatePresence mode="wait">
                {mode === "non_ready" ? (
                  <motion.div
                    key="non-ready-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[300px] bg-white rounded-xl shadow-xl p-5 border border-gray-100 relative"
                  >
                    {/* Chaotic card: misaligned, wrong colors, inconsistent spacing */}
                    <div className="space-y-0">
                      {/* Avatar row - misaligned */}
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 bg-[#E5E7EB]" style={{ borderRadius: "4px" }} />
                        <div className="mt-2">
                          <div className="h-3 w-20 bg-[#9CA3AF] rounded-sm" />
                          <div className="h-2 w-10 bg-[#D1D5DB] rounded-sm mt-3" />
                        </div>
                      </div>

                      {/* Image area - wrong proportions, gap issues */}
                      <div
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB]"
                        style={{ height: "85px", marginLeft: "-8px", width: "calc(100% + 8px)", marginTop: "20px" }}
                      />

                      {/* Text content - chaotic spacing, arbitrary colors */}
                      <div style={{ marginTop: "6px", paddingLeft: "3px" }}>
                        <div className="h-3.5 w-[70%] bg-[#374151] rounded-sm" />
                      </div>
                      <div style={{ marginTop: "14px", paddingLeft: "3px" }}>
                        <div className="h-2.5 w-[90%] bg-[#D1D5DB] rounded-sm" />
                        <div className="h-2.5 w-[55%] bg-[#D1D5DB] rounded-sm" style={{ marginTop: "8px" }} />
                      </div>

                      {/* Price + Button row - misaligned */}
                      <div className="flex items-end mt-5" style={{ gap: "4px" }}>
                        <div
                          className="text-[14px] text-[#059669]"
                          style={{ fontWeight: 700, marginBottom: "3px" }}
                        >
                          ¥199
                        </div>
                        <div
                          className="text-[10px] text-[#e74c3c] line-through"
                          style={{ marginBottom: "5px", marginLeft: "2px" }}
                        >
                          ¥299
                        </div>
                        <div className="flex-1" />
                        <div
                          className="bg-[#6B21A8] text-white text-[10px] px-3 py-1"
                          style={{
                            borderRadius: "2px",
                            fontWeight: 500,
                            marginRight: "-4px",
                          }}
                        >
                          Buy Now
                        </div>
                      </div>

                      {/* Random extra tag - content drift */}
                      <div
                        className="absolute text-[9px] bg-[#FCD34D] text-[#92400E] px-1.5 py-0.5"
                        style={{
                          top: "35px",
                          right: "-2px",
                          transform: "rotate(3deg)",
                          borderRadius: "1px",
                        }}
                      >
                        HOT
                      </div>
                    </div>

                    {/* Error labels */}
                    <div className="absolute -top-2 -right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-[9px] border border-red-200" style={{ fontWeight: 700 }}>
                      尺寸不统一
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-red-100 text-red-600 px-2 py-1 rounded text-[9px] border border-red-200" style={{ fontWeight: 700 }}>
                      颜色随意使用
                    </div>
                    <div className="absolute top-[45%] -left-3 bg-red-100 text-red-600 px-2 py-1 rounded text-[9px] border border-red-200" style={{ fontWeight: 700 }}>
                      内容漂移
                    </div>
                    <div className="absolute bottom-[35%] -right-3 bg-red-100 text-red-600 px-2 py-1 rounded text-[9px] border border-red-200" style={{ fontWeight: 700 }}>
                      布局错乱
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[300px] bg-white rounded-xl shadow-2xl border border-blue-100 relative"
                  >
                    {/* Well-structured card with Auto Layout simulation */}
                    <div className="flex flex-col" style={{ gap: "0" }}>
                      {/* Avatar header */}
                      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600" />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="h-3.5 w-24 bg-gray-900 rounded" />
                          <div className="h-2.5 w-16 bg-gray-400 rounded" />
                        </div>
                      </div>

                      {/* Image */}
                      <div className="mx-5 h-[100px] bg-blue-50 rounded-lg flex items-center justify-center border border-dashed border-blue-200">
                        <span className="text-[10px] text-blue-400 font-mono">16:9 · Fill Container</span>
                      </div>

                      {/* Content */}
                      <div className="px-5 pt-3 pb-2 flex flex-col gap-2">
                        <div className="h-3.5 w-[70%] bg-gray-900 rounded" />
                        <div className="h-2.5 w-[90%] bg-gray-300 rounded" />
                        <div className="h-2.5 w-[55%] bg-gray-300 rounded" />
                      </div>

                      {/* Footer */}
                      <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[14px] text-blue-600" style={{ fontWeight: 700 }}>¥199</span>
                          <span className="text-[10px] text-gray-400 line-through">¥299</span>
                        </div>
                        <div className="bg-blue-600 text-white text-[11px] px-4 py-2 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200" style={{ fontWeight: 500 }}>
                          Add to Cart
                        </div>
                      </div>
                    </div>

                    {/* Annotation overlays */}
                    <div className="absolute -top-3 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-[9px] shadow-lg" style={{ fontWeight: 500 }}>
                      Auto Layout: Vertical
                    </div>
                    <div className="absolute top-1/2 -left-4 bg-indigo-600 text-white px-2 py-1 rounded-full text-[9px] shadow-lg" style={{ fontWeight: 500 }}>
                      --color-primary
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 min-h-[220px]">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={16} className={mode === "non_ready" ? "text-gray-500" : "text-blue-400"} />
                <span className="text-[12px] text-gray-400 font-medium">AI 解析过程</span>
              </div>
              <div className="font-mono text-[13px] leading-relaxed">
                {mode === "non_ready" ? (
                  <div className="text-gray-400 space-y-2">
                    <p className="text-red-400"># Warning: No design tokens found.</p>
                    <p>{"Found <div> at (120, 450). No semantic name."}</p>
                    <p>{"Color #6B21A8 — is this brand purple? Or accent?"}</p>
                    <p>{"Element at x:3, y:35 — negative margin? Overlap?"}</p>
                    <p>{"No layout constraints. Using position: absolute."}</p>
                    <p className="text-yellow-500">{"// Cannot determine intent. Guessing..."}</p>
                  </div>
                ) : (
                  <div className="text-blue-100 space-y-2">
                    <p className="text-emerald-400"># Design System detected. Parsing...</p>
                    <p>{"Token: 'brand-primary' → var(--color-primary-600)"}</p>
                    <p>{"Layout: Vertical Stack (Gap: 12px, Pad: 20px)"}</p>
                    <p>{"Component: ProductCard → matching React component"}</p>
                    <p>{"Props: { variant: 'default', showBadge: false }"}</p>
                    <p className="text-blue-400">{"// Intent confirmed → generating clean code."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-4">
            {mode === "non_ready" ? (
              <>
                <CompareItem 
                  icon={XCircle}
                  title="颜色随意使用"
                  desc={"混用十六进制色值（#6B21A8、#059669、#e74c3c），不同页面对\u201C主色\u201D的理解不一致。AI 无法判断哪个是品牌色。"}
                  status="error"
                />
                <CompareItem 
                  icon={XCircle}
                  title="布局缺乏约束"
                  desc="元素靠手动拖拽定位，间距随意（6px、14px、20px 混用）。AI 只能生成 position: absolute 硬编码坐标。"
                  status="error"
                />
                <CompareItem 
                  icon={XCircle}
                  title="尺寸与间距不统一"
                  desc="同类型元素大小不一（圆角 2px vs 4px，按钮高度随意），没有统一的 spacing scale。AI 每次生成不同的数值。"
                  status="error"
                />
                <CompareItem 
                  icon={XCircle}
                  title="图层命名无语义"
                  desc="'Frame 2394'、'矩形 5' 对 AI 毫无意义。它无法区分这是一个 ProductCard 还是一个 Header。"
                  status="error"
                />
              </>
            ) : (
              <>
                <CompareItem 
                  icon={CheckCircle2}
                  title="语义化 Token 体系"
                  desc="所有颜色通过 --color-primary、--color-success 等语义化变量引用。AI 理解设计意图，自动适配深色模式。"
                  status="success"
                />
                <CompareItem 
                  icon={CheckCircle2}
                  title="结构化布局 (Auto Layout)"
                  desc="所有容器使用 Auto Layout，间距遵循 4px 的 spacing scale。AI 生成原生 Flexbox 代码，自动响应式。"
                  status="success"
                />
                <CompareItem 
                  icon={CheckCircle2}
                  title="一致的设计规范"
                  desc="圆角、间距、字号均来自统一的 Token 系统。AI 生成的每个组件都自动遵循相同的视觉规范。"
                  status="success"
                />
                <CompareItem 
                  icon={CheckCircle2}
                  title="组件化 + 语义命名"
                  desc="ProductCard 组件有明确的属性（variant、showBadge），AI 直接调用已有组件库而非重新编写。"
                  status="success"
                />
              </>
            )}

            <div className={`mt-8 p-6 rounded-2xl border ${mode === "non_ready" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
              <h4 className="text-[14px] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
                {mode === "non_ready" ? <XCircle size={16} className="text-red-500" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
                最终代码质量 (AI Output)
              </h4>
              <p className="text-[13px] text-gray-600" style={{ lineHeight: 1.7 }}>
                {mode === "non_ready" 
                  ? "结果：代码充斥 position: absolute、硬编码色值和 magic number。每个页面的相同组件样式都不一致，窗口缩放后布局直接崩溃，需要大量人工修复。" 
                  : "结果：代码完全符合设计系统规范，使用语义化变量和 Flexbox 布局。组件可复用、样式可维护，生产可用度达 90% 以上。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareItem({ icon: Icon, title, desc, status }: { icon: any, title: string, desc: string, status: "error" | "success" }) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors">
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${status === "success" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-[15px] text-gray-900 mb-1" style={{ fontWeight: 700 }}>{title}</h3>
        <p className="text-[13px] text-gray-500" style={{ lineHeight: 1.7 }}>{desc}</p>
      </div>
    </div>
  );
}