import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Code, CheckCircle2, XCircle, ArrowRightLeft, Sparkles } from "lucide-react";

type Mode = "traditional" | "ai_ready";

export function AIReadyComparison() {
  const [mode, setMode] = useState<Mode>("ai_ready");

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
            AI 视角：普通设计 vs AI-Ready 设计
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
            切换下方模式，观察 AI 编程工具（如 Cursor）在理解不同质量的设计稿时，其内部逻辑和生成结果的差异。
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setMode("traditional")}
              className={`px-6 py-2.5 rounded-xl text-[14px] transition-all flex items-center gap-2 ${
                mode === "traditional" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontWeight: mode === "traditional" ? 600 : 400 }}
            >
              传统设计交付
            </button>
            <button
              onClick={() => setMode("ai_ready")}
              className={`px-6 py-2.5 rounded-xl text-[14px] transition-all flex items-center gap-2 ${
                mode === "ai_ready" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontWeight: mode === "ai_ready" ? 600 : 400 }}
            >
              <Sparkles size={14} />
              AI-Ready 交付
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Visual Representation */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200/60 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[11px] text-gray-400 font-mono">FIGMA CANVAS PREVIEW</div>
              
              <AnimatePresence mode="wait">
                {mode === "traditional" ? (
                  <motion.div
                    key="trad-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[280px] bg-white rounded-xl shadow-xl p-5 border border-gray-100 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5E7EB]" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 bg-[#E5E7EB] rounded" />
                        <div className="h-3 w-16 bg-[#F3F4F6] rounded" />
                      </div>
                    </div>
                    <div className="h-32 w-full bg-[#F3F4F6] rounded-lg" />
                    <div className="flex justify-end">
                      <div className="h-9 w-24 bg-[#1F2937] rounded-md" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold border border-red-200">
                      NO AUTO LAYOUT
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold border border-red-200">
                      HARDCODED COLORS
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[280px] bg-white rounded-xl shadow-2xl p-5 border border-blue-100 space-y-4 relative"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 bg-gray-900 rounded" />
                        <div className="h-3 w-16 bg-gray-400 rounded" />
                      </div>
                    </div>
                    <div className="h-32 w-full bg-blue-50 rounded-lg flex items-center justify-center border border-dashed border-blue-200">
                      <span className="text-[10px] text-blue-400 font-mono">Aspect Ratio: 16/9</span>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-9 w-24 bg-blue-600 rounded-md shadow-lg shadow-blue-200 flex items-center justify-center">
                        <div className="h-2 w-12 bg-white/30 rounded" />
                      </div>
                    </div>
                    {/* Annotation overlays */}
                    <div className="absolute -top-3 right-0 bg-blue-600 text-white px-2 py-1 rounded-full text-[10px] font-medium shadow-lg">
                      Auto Layout: Hug Content
                    </div>
                    <div className="absolute bottom-1/2 -left-6 bg-indigo-600 text-white px-2 py-1 rounded-full text-[10px] font-medium shadow-lg">
                      Token: --color-primary
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 min-h-[220px]">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={16} className={mode === "traditional" ? "text-gray-500" : "text-blue-400"} />
                <span className="text-[12px] text-gray-400 font-medium">AI Thought Process</span>
              </div>
              <div className="font-mono text-[13px] leading-relaxed">
                {mode === "traditional" ? (
                  <div className="text-gray-400 space-y-2">
                    <p className="text-red-400"># Warning: No design tokens found.</p>
                    <p>{"Scanning... Found rectangle at (120, 450)"}</p>
                    <p>{"Found color #3B82F6. Is this primary blue?"}</p>
                    <p>{"No layout constraints. Estimating padding: 17px?"}</p>
                    <p className="text-yellow-500">{"// Guessing intent... generating messy CSS."}</p>
                  </div>
                ) : (
                  <div className="text-blue-100 space-y-2">
                    <p className="text-emerald-400"># MCP Handshake: Success.</p>
                    <p>{"Reading Tokens... 'brand-primary' mapping to --color-p-600"}</p>
                    <p>{"Layout: Vertical Stack (Gap: 16px, Padding: 20px)"}</p>
                    <p>{"Component Match: Found 'BaseCard' pattern."}</p>
                    <p className="text-blue-400">{"// Semantic intent confirmed. Generating clean code."}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-4">
            {mode === "traditional" ? (
              <>
                <CompareItem 
                  icon={XCircle}
                  title="硬编码数值 (Hardcoding)"
                  desc="AI 只能读取十六进制色值 (#3B82F6) 和像素值 (16px)，无法感知它们在设计系统中的角色。"
                  status="error"
                />
                <CompareItem 
                  icon={XCircle}
                  title="自由布局 (Freeform)"
                  desc="没有 Auto Layout 的设计稿在 AI 眼中只是一堆坐标点。生成的代码充满 position: absolute。"
                  status="error"
                />
                <CompareItem 
                  icon={XCircle}
                  title="无语义图层名"
                  desc="'Frame 2394' 对 AI 毫无意义。它无法区分这是一个 'Card' 还是一个 'Header'。"
                  status="error"
                />
              </>
            ) : (
              <>
                <CompareItem 
                  icon={CheckCircle2}
                  title="语义化 Tokens"
                  desc="AI 直接理解 '--color-action-primary' 的含义。它可以根据上下文自动应用深色模式切换。"
                  status="success"
                />
                <CompareItem 
                  icon={CheckCircle2}
                  title="结构化布局 (Auto Layout)"
                  desc="AI 完美识别 Flexbox 属性。生成的代码原生支持响应式，无需手动调整 Media Queries。"
                  status="success"
                />
                <CompareItem 
                  icon={CheckCircle2}
                  title="组件化思维"
                  desc="命名的图层（如 Button/Primary）触发 AI 调用现有的 React 组件库，而非重新造轮子。"
                  status="success"
                />
              </>
            )}

            <div className={`mt-8 p-6 rounded-2xl border ${mode === "traditional" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
              <h4 className="text-[14px] mb-2 font-bold flex items-center gap-2">
                {mode === "traditional" ? <XCircle size={16} className="text-red-500" /> : <CheckCircle2 size={16} className="text-emerald-500" />}
                最终代码质量 (AI Output)
              </h4>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                {mode === "traditional" 
                  ? "结果：生成的代码包含大量硬编码数值，样式难以维护。AI 容易在对齐和颜色上犯错，需要大量的人工微调。" 
                  : "结果：生成的代码完全符合设计系统规范。直接复用全局变量，布局精准，生产可用度高达 90% 以上。"}
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
        <h3 className="text-[15px] font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
