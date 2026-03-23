import { motion } from "motion/react";
import { 
  Network, 
  Sparkles, 
  Workflow, 
  Bot, 
  Zap, 
  ArrowRight, 
  Layers, 
  Trophy,
  ShieldAlert,
  Repeat
} from "lucide-react";

export function AgenticFuture() {
  return (
    <section id="agentic" className="py-24 px-6 bg-[#0a0f1d] border-t border-gray-800 overflow-hidden relative">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      
      {/* Dynamic ambient lights */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 幕 I: 范式跃迁 (The Paradigm Shift) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-[12px] mb-6" style={{ fontWeight: 600 }}>
            <Network size={14} className="text-blue-400" />
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent tracking-wide">
              THE NEXT PARADIGM
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-8 text-white" style={{ fontWeight: 800, lineHeight: 1.15 }}>
            向 Agentic Design System 演进
          </h2>
          <p className="text-gray-400 text-[16px] sm:text-[18px] max-w-3xl mx-auto" style={{ lineHeight: 1.8 }}>
            职能边界正在消融。设计系统的终局，是从「被动的静态资产库」跃升为「主动的 AI 工作流引擎」。
            AI-Ready 是骨架，<span className="text-blue-300 font-semibold">Agentic</span> 才是赋予其自研、自组装与自学习的灵魂。
          </p>
        </motion.div>

        {/* 幕 II: 核心定义对比 (Definition & Shift) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {/* AI-Ready (Current) */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-gray-500" size={24} />
              <h3 className="text-xl font-bold text-gray-300">AI-Ready DS</h3>
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-6">
              被动的高质量语料库。它提供了优秀的语义化 Token、详尽的约束和可直接映射的代码组件。
              <strong className="text-gray-300 font-medium">它是等待 AI 读取的字典。</strong>
            </p>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-[13px] text-gray-500 border border-gray-800">
              <span className="text-blue-500/70">Human:</span> 帮我用这个库画一个 onboarding 界面。
              <br/>
              <span className="text-purple-500/70">AI:</span> 好的，已查阅组件库并生成了代码。
            </div>
          </div>

          {/* Agentic (Future) */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-50" />
            <div className="flex items-center gap-3 mb-4">
              <Bot className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold text-white">Agentic DS (未来)</h3>
            </div>
            <p className="text-indigo-200/80 text-[14px] leading-relaxed mb-6">
              组织级产品蓝图 + AI 工作流引擎。它是一个带有认知能力的协作者，能理解业务目标、动态组装界面，并自我维持。
              <strong className="text-blue-300 font-medium">它是有行动能力的共创者。</strong>
            </p>
            <div className="bg-[#050b14]/50 rounded-xl p-4 font-mono text-[13px] text-gray-300 border border-blue-500/20 shadow-inner">
              <span className="text-blue-400">Human:</span> 我们需要一个面向高净值用户的基金认购流。
              <br/>
              <span className="text-purple-400">Agentic DS:</span> 已根据底层逻辑生成完整的交易流、异常态处理与数据大屏。请检视界面品牌质感并批准部署。
            </div>
          </div>
        </motion.div>

        {/* 幕 III: 核心能力 (Core Capabilities Bento Box) */}
        <div className="mb-24">
          <div className="mb-8 flex items-center gap-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">系统的三大核心超能力</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap} 
              title="自动应对重复工作" 
              desc="不再手工绘制每个状态。给出初步意图，系统自动补全 Happy Path、全套 Edge Cases、线框图直至高保真原型和相关营销资产。"
              delay={0.1}
            />
            <FeatureCard 
              icon={Repeat} 
              title="全域双向对齐 (Bi-directional)" 
              desc="打破设计与开发的单向交付流。AI 生成代码 → 人类在界面精修（或修改代码） → 变更实时同步回设计文件与组件仓库，永远保持一致。"
              delay={0.2}
            />
            <FeatureCard 
              icon={Network} 
              title="唯一的中央真相源" 
              desc="从一个点辐射全组织。由 Agent 维护的不仅是 UI 组件，更是跨越产品界面、官网、邮件模板甚至销售 Deck 的组织级心智模型。"
              delay={0.3}
            />
          </div>
        </div>

        {/* 幕 IV: Agentic 流程上下文 (Agentic Workflow Context) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 border border-gray-800 rounded-3xl p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden mb-24"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-[45%]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-900/30 text-purple-300 text-[11px] mb-4 font-mono border border-purple-500/20">
                <Workflow size={12} /> CONTEXT
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                支撑大流转的基础设施：<br/>
                双钻模型的坍缩
              </h3>
              <p className="text-gray-400 text-[14px] leading-relaxed mb-6">
                Agentic DS 之所以能带来革命，是因为它适配了未来的 <strong>Agentic Product Development Flow</strong>。
                <br/><br/>
                传统的「发现 → 定义 → 开发 → 交付」的线形双钻模型，被压缩成了高度并发的实时循环。
                在这个新循环中，人类不再做苦力，而是专注于提供系统约束、审核逻辑和注入情感价值。
              </p>
              
              <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
                <div className="text-[12px] text-gray-500 font-mono mb-2">GUI 的新使命</div>
                <p className="text-[13px] text-gray-300">
                  当后端逻辑由 AI 瞬间编排完成，前端 GUI 的核心价值从"功能操作面板"退居为——<strong className="text-white">Human-in-the-loop (人类在环) 的最后一公里。</strong> 提供可视化审核、信任锚点与不可替代的情绪连接。
                </p>
              </div>
            </div>

            {/* Workflow Visualization */}
            <div className="md:w-[55%] flex flex-col justify-center space-y-3">
              <WorkflowStep 
                num="01" 
                title="Automate (自动化生成)" 
                desc="多 Agent 并发调用设计资产与代码，生成初步的可交互方案。" 
                color="blue"
              />
              <div className="ml-6 w-[2px] h-4 bg-gray-800"></div>
              
              <WorkflowStep 
                num="02" 
                title="Human Exp. (人类体验层)" 
                desc="系统将冰冷的代码与逻辑渲染为沉浸式界面，供人类感知与代入。" 
                color="purple"
                isActive={true}
              />
              <div className="ml-6 w-[2px] h-4 bg-gray-800"></div>

              <WorkflowStep 
                num="03" 
                title="Review (高阶审查)" 
                desc="人类审查品牌调性、商业风险与边界条件，提供微调指令。" 
                color="indigo"
              />
              <div className="ml-6 w-[2px] h-4 bg-gray-800"></div>

              <WorkflowStep 
                num="04" 
                title="Approve & Iterate (发布即迭代)" 
                desc="一键批准即上线环境。三层迭代循环（秒级AI调整/天级审查/月级战略修正）持续滚动。" 
                color="emerald"
              />
            </div>
          </div>
        </motion.div>

        {/* 幕 V: 终极感悟 (The Ultimate Takeaway) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-blue-900/20 mt-12">
            <div className="bg-[#0a0f1d] rounded-[22px] p-8 md:p-12 relative z-10 flex flex-col items-center text-center">
              <Trophy className="text-blue-400 mb-6" size={32} />
              <h3 className="text-xl text-gray-400 font-medium mb-4 tracking-widest uppercase text-[12px]">The Ultimate Takeaway</h3>
              <p className="text-2xl md:text-3xl text-white font-bold leading-snug max-w-4xl" style={{ textWrap: "balance" }}>
                “未来的设计系统不是组件库，而是<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">组织级的产品蓝图 + AI 工作流引擎。</span><br/><br/>
                目标不是用 AI 取代构建者，而是用 AI 消灭底层重复劳动，把人类的创造力放大到对意图、信任和系统约束的终极掌控上。”
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-gray-800/20 border border-gray-800 rounded-3xl p-6 hover:bg-gray-800/40 hover:border-gray-700 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-900/50 border border-gray-800 flex items-center justify-center mb-5 text-gray-300 shadow-inner">
        <Icon size={22} className="text-blue-400" />
      </div>
      <h4 className="text-[17px] text-gray-100 font-bold mb-3">{title}</h4>
      <p className="text-[13.5px] text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function WorkflowStep({ num, title, desc, color, isActive = false }: { num: string, title: string, desc: string, color: string, isActive?: boolean }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    indigo: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  };
  
  return (
    <div className={`flex items-start gap-4 p-4 rounded-2xl border ${isActive ? colorMap[color] : 'border-gray-800 bg-gray-900/30'} transition-colors`}>
      <div className={`font-mono text-[12px] mt-1 ${isActive ? colorMap[color].split(' ')[0] : 'text-gray-600'}`}>
        {num}
      </div>
      <div>
        <div className={`text-[15px] font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</div>
        <div className={`text-[13px] leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{desc}</div>
      </div>
    </div>
  );
}
