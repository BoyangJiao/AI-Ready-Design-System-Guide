import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Network, Sparkles } from "lucide-react";

export function Part2Teaser() {
  return (
    <section id="part2teaser" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#0a0f1d] p-10 sm:p-14"
        >
          {/* ambient glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] translate-y-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-[12px] mb-6" style={{ fontWeight: 600 }}>
              <Network size={14} className="text-blue-400" />
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent tracking-wide">
                CONTINUE · PART 2
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl tracking-tight mb-5 text-white" style={{ fontWeight: 800, lineHeight: 1.2 }}>
              你已经学会了如何打磨「乐谱」。<br />
              但这份乐谱,正在开启 UI 设计的下一个世代。
            </h2>

            <p className="text-gray-400 text-[15px] max-w-2xl mb-10" style={{ lineHeight: 1.8 }}>
              Part 1 是「How」——如何把设计系统做成 AI 能精准演奏的乐谱。
              Part 2 是「Where」——当 UI 从 <span className="text-gray-200">Static</span> 走向{" "}
              <span className="text-blue-300">Declarative</span>,再走向{" "}
              <span className="text-purple-300">Generative</span>,
              你今天打磨的设计系统,会变成生成式 UI 时代的引擎与护栏。
            </p>

            <Link
              to="/part-2"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[14px] shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all"
              style={{ fontWeight: 600 }}
            >
              <Sparkles size={16} />
              进入 Part 2 · 范式演进
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
