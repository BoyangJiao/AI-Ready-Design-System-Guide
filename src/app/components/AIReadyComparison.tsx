import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Code, CheckCircle2, XCircle, ArrowRightLeft, Sparkles } from "lucide-react";

type Mode = "non_ready" | "ai_ready";

export function AIReadyComparison() {
  const [mode, setMode] = useState<Mode>("non_ready");

  return (
    <section id="comparison" className="py-24 px-6 bg-washi-warm overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo/10 text-indigo text-[12px] mb-4 font-sans" style={{ fontWeight: 500 }}>
            <ArrowRightLeft size={13} />
            交互式对比
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight mb-3 text-ink-primary font-serif" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            AI 视角：两种设计系统的代码产出差异
          </h2>
          <p className="text-ink-muted text-[15px] max-w-2xl mx-auto font-sans" style={{ lineHeight: 1.8 }}>
            切换下方模式，观察同一个卡片组件在「非 AI-Ready」和「AI-Ready」两种设计系统下，
            AI 生成代码的质量差异。
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary p-1.5 rounded-md flex gap-1">
            <button
              onClick={() => setMode("non_ready")}
              className={`px-6 py-2.5 rounded-md text-[14px] transition-all flex items-center gap-2 font-sans ${
                mode === "non_ready" ? "bg-washi-warm text-ink-primary shadow-sm" : "text-ink-muted hover:text-ink-primary"
              }`}
              style={{ fontWeight: mode === "non_ready" ? 600 : 400 }}
            >
              <XCircle size={14} className={mode === "non_ready" ? "text-vermillion" : ""} />
              非 AI-Ready 设计系统
            </button>
            <button
              onClick={() => setMode("ai_ready")}
              className={`px-6 py-2.5 rounded-md text-[14px] transition-all flex items-center gap-2 font-sans ${
                mode === "ai_ready" ? "bg-indigo text-washi-cream shadow-sm" : "text-ink-muted hover:text-ink-primary"
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
            <div className="bg-washi-cream border border-border rounded-md p-8 min-h-[360px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[11px] text-stone font-mono">
                浏览器渲染效果
              </div>
              
              <AnimatePresence mode="wait">
                {mode === "non_ready" ? (
                  <motion.div
                    key="non-ready-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[300px] bg-washi-warm rounded-md shadow-lg p-5 border border-border relative"
                  >
                    {/* Chaotic card */}
                    <div className="space-y-0">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 bg-muted" style={{ borderRadius: "2px" }} />
                        <div className="mt-2">
                          <div className="h-3 w-20 bg-stone rounded-sm" />
                          <div className="h-2 w-10 bg-muted rounded-sm mt-3" />
                        </div>
                      </div>

                      <div
                        className="w-full bg-washi-cream border border-border"
                        style={{ height: "85px", marginLeft: "-8px", width: "calc(100% + 8px)", marginTop: "20px" }}
                      />

                      <div style={{ marginTop: "6px", paddingLeft: "3px" }}>
                        <div className="h-3.5 w-[70%] bg-ink-primary rounded-sm" />
                      </div>
                      <div style={{ marginTop: "14px", paddingLeft: "3px" }}>
                        <div className="h-2.5 w-[90%] bg-muted rounded-sm" />
                        <div className="h-2.5 w-[55%] bg-muted rounded-sm" style={{ marginTop: "8px" }} />
                      </div>

                      <div className="flex items-end mt-5" style={{ gap: "4px" }}>
                        <div
                          className="text-[14px] text-bamboo"
                          style={{ fontWeight: 700, marginBottom: "3px" }}
                        >
                          ¥199
                        </div>
                        <div
                          className="text-[10px] text-vermillion line-through"
                          style={{ marginBottom: "5px", marginLeft: "2px" }}
                        >
                          ¥299
                        </div>
                        <div className="flex-1" />
                        <div
                          className="bg-indigo text-washi-cream text-[10px] px-3 py-1"
                          style={{
                            borderRadius: "2px",
                            fontWeight: 500,
                            marginRight: "-4px",
                          }}
                        >
                          Buy Now
                        </div>
                      </div>

                      <div
                        className="absolute text-[9px] bg-ochre-light text-ink-primary px-1.5 py-0.5"
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
                    <div className="absolute -top-2 -right-2 bg-vermillion/10 text-vermillion px-2 py-1 rounded-sm text-[9px] border border-vermillion/20" style={{ fontWeight: 700 }}>
                      尺寸不统一
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-vermillion/10 text-vermillion px-2 py-1 rounded-sm text-[9px] border border-vermillion/20" style={{ fontWeight: 700 }}>
                      颜色随意使用
                    </div>
                    <div className="absolute top-[45%] -left-3 bg-vermillion/10 text-vermillion px-2 py-1 rounded-sm text-[9px] border border-vermillion/20" style={{ fontWeight: 700 }}>
                      内容漂移
                    </div>
                    <div className="absolute bottom-[35%] -right-3 bg-vermillion/10 text-vermillion px-2 py-1 rounded-sm text-[9px] border border-vermillion/20" style={{ fontWeight: 700 }}>
                      布局错乱
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-viz"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-[300px] bg-washi-warm rounded-md shadow-lg border border-indigo/20 relative"
                  >
                    <div className="flex flex-col" style={{ gap: "0" }}>
                      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo" />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="h-3.5 w-24 bg-ink-primary rounded-sm" />
                          <div className="h-2.5 w-16 bg-stone rounded-sm" />
                        </div>
                      </div>

                      <div className="mx-5 h-[100px] bg-indigo/5 rounded-sm flex items-center justify-center border border-dashed border-indigo/20">
                        <span className="text-[10px] text-indigo/60 font-mono">16:9 · Fill Container</span>
                      </div>

                      <div className="px-5 pt-3 pb-2 flex flex-col gap-2">
                        <div className="h-3.5 w-[70%] bg-ink-primary rounded-sm" />
                        <div className="h-2.5 w-[90%] bg-muted rounded-sm" />
                        <div className="h-2.5 w-[55%] bg-muted rounded-sm" />
                      </div>

                      <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[14px] text-indigo" style={{ fontWeight: 700 }}>¥199</span>
                          <span className="text-[10px] text-stone line-through">¥299</span>
                        </div>
                        <div className="bg-indigo text-washi-cream text-[11px] px-4 py-2 rounded-md flex items-center justify-center shadow-sm" style={{ fontWeight: 500 }}>
                          Add to Cart
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-3 right-2 bg-indigo text-washi-cream px-2 py-1 rounded-md text-[9px] shadow-sm" style={{ fontWeight: 500 }}>
                      Auto Layout: Vertical
                    </div>
                    <div className="absolute top-1/2 -left-4 bg-ochre text-washi-cream px-2 py-1 rounded-md text-[9px] shadow-sm" style={{ fontWeight: 500 }}>
                      --color-primary
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-ink-primary rounded-md p-6 min-h-[220px]">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={16} className={mode === "non_ready" ? "text-stone" : "text-indigo-light"} />
                <span className="text-[12px] text-stone font-medium font-sans">AI 解析过程</span>
              </div>
              <div className="font-mono text-[13px] leading-relaxed">
                {mode === "non_ready" ? (
                  <div className="text-stone space-y-2">
                    <p className="text-vermillion"># Warning: No design tokens found.</p>
                    <p>{"Found <div> at (120, 450). No semantic name."}</p>
                    <p>{"Color #6B21A8 — is this brand purple? Or accent?"}</p>
                    <p>{"Element at x:3, y:35 — negative margin? Overlap?"}</p>
                    <p>{"No layout constraints. Using position: absolute."}</p>
                    <p className="text-ochre">{"// Cannot determine intent. Guessing..."}</p>
                  </div>
                ) : (
                  <div className="text-washi-cream/80 space-y-2">
                    <p className="text-bamboo-light"># Design System detected. Parsing...</p>
                    <p>{"Token: 'brand-primary' → var(--color-primary-600)"}</p>
                    <p>{"Layout: Vertical Stack (Gap: 12px, Pad: 20px)"}</p>
                    <p>{"Component: ProductCard → matching React component"}</p>
                    <p>{"Props: { variant: 'default', showBadge: false }"}</p>
                    <p className="text-indigo-light">{"// Intent confirmed → generating clean code."}</p>
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

            <div className={`mt-8 p-6 rounded-md border ${mode === "non_ready" ? "bg-vermillion/5 border-vermillion/20" : "bg-bamboo/5 border-bamboo/20"}`}>
              <h4 className="text-[14px] mb-2 flex items-center gap-2 font-serif text-ink-primary" style={{ fontWeight: 700 }}>
                {mode === "non_ready" ? <XCircle size={16} className="text-vermillion" /> : <CheckCircle2 size={16} className="text-bamboo" />}
                最终代码质量 (AI Output)
              </h4>
              <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>
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
    <div className="flex gap-4 p-5 rounded-md bg-washi-warm border border-border hover:border-indigo/20 transition-colors">
      <div className={`shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${status === "success" ? "bg-bamboo/10 text-bamboo" : "bg-vermillion/10 text-vermillion"}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-[15px] text-ink-primary mb-1 font-serif" style={{ fontWeight: 700 }}>{title}</h3>
        <p className="text-[13px] text-ink-muted font-sans" style={{ lineHeight: 1.8 }}>{desc}</p>
      </div>
    </div>
  );
}
