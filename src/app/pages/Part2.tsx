import { useEffect } from "react";
import { Sparkles, GitBranch, Database, Bot, ListChecks, GitFork, CircleHelp } from "lucide-react";
import { Navigation, type NavSection } from "../components/Navigation";
import { Part2Hero } from "../components/part2/Part2Hero";
import { UIParadigmShift } from "../components/part2/UIParadigmShift";
import { DSAsInfrastructure } from "../components/part2/DSAsInfrastructure";
import { AgenticFuture } from "../components/AgenticFuture";
import { WorkflowFork } from "../components/part2/WorkflowFork";
import { WhatIf } from "../components/part2/WhatIf";
import { DesignerPlaybook } from "../components/part2/DesignerPlaybook";

const sections: NavSection[] = [
  { id: "part2hero", label: "范式跃迁", icon: Sparkles },
  { id: "paradigm", label: "UI 的三个世代", icon: GitBranch },
  { id: "infrastructure", label: "DS 是生成式基础设施", icon: Database },
  { id: "agentic", label: "Agentic DS 形态", icon: Bot },
  { id: "workflowfork", label: "两种工作形态", icon: GitFork },
  { id: "whatif", label: "What if", icon: CircleHelp },
  { id: "playbook", label: "结语", icon: ListChecks },
];

export function Part2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1d]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navigation sections={sections} part={2} />
      <main className="lg:ml-64">
        <Part2Hero />
        <UIParadigmShift />
        <DSAsInfrastructure />
        <AgenticFuture />
        <WorkflowFork />
        <WhatIf />
        <DesignerPlaybook />
      </main>
    </div>
  );
}
