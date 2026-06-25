import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUp, ArrowRight } from "lucide-react";

/**
 * 幕 6 · 结语 (Closing)
 * 只留一句核心价值,其余内容由演讲者口述。
 */
export function DesignerPlaybook() {
  return (
    <section id="playbook" className="py-32 px-6 bg-[#0a0f1d] border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] mb-8" style={{ fontWeight: 600 }}>
            <span className="text-gray-300 tracking-wide">结语 · THE TAKEAWAY</span>
          </div>

          <p className="text-gray-400 text-[15px] sm:text-[17px] mb-6" style={{ lineHeight: 1.7 }}>
            Generative UI 时代下,设计师的核心价值:
          </p>

          <h2 className="text-3xl sm:text-5xl tracking-tight text-white" style={{ fontWeight: 800, lineHeight: 1.3, textWrap: "balance" }}>
            为产品界面创造
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              约束、品位与信任
            </span>
          </h2>
        </motion.div>

        {/* Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[13px] hover:bg-white/10 transition-all"
          >
            <ArrowUp size={15} />
            回到顶部
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[13px] hover:bg-white/10 transition-all"
          >
            返回 Part 1 · 理解与实践
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
