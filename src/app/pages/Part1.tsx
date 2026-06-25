import { useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Workflow,
  Trophy,
  Rocket,
  Music,
  ArrowRightLeft,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Navigation, type NavSection } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { MindsetSection } from "../components/MindsetSection";
import { DesignSystemProtocol } from "../components/DesignSystemProtocol";
import { AIReadyComparison } from "../components/AIReadyComparison";
import { AIReadyLevels } from "../components/AIReadyLevels";
import { LayerSection } from "../components/LayerSection";
import { AutoLayoutSection } from "../components/AutoLayoutSection";
import { ComponentsSection } from "../components/ComponentsSection";
import { TokensSection } from "../components/TokensSection";
import { SkillsSection } from "../components/SkillsSection";
import { WorkflowSection } from "../components/WorkflowSection";
import { BestPracticesSection } from "../components/BestPracticesSection";
import { Part2Teaser } from "../components/Part2Teaser";

const sections: NavSection[] = [
  { id: "hero", label: "概览", icon: Sparkles },
  { id: "mindset", label: "核心理念", icon: BookOpen },
  { id: "protocol", label: "设计系统即协议", icon: Music },
  { id: "comparison", label: "交互式对比", icon: ArrowRightLeft },
  { id: "levels", label: "AI-Ready 层级", icon: Layers },
  { id: "layers", label: "图层与结构", icon: Layers },
  { id: "autolayout", label: "Auto Layout", icon: Workflow },
  { id: "components", label: "组件与变体", icon: Layers },
  { id: "tokens", label: "Design Tokens", icon: Sparkles },
  { id: "skills", label: "Knowledge Base & MCP", icon: Rocket },
  { id: "workflow", label: "工作流实战", icon: Workflow },
  { id: "bestpractices", label: "最佳实践", icon: Trophy },
  { id: "part2teaser", label: "下一站 · Part 2", icon: ExternalLink },
];

export function Part1() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navigation sections={sections} part={1} />
      <main className="lg:ml-64">
        <HeroSection />
        <MindsetSection />
        <DesignSystemProtocol />
        <AIReadyComparison />
        <AIReadyLevels />
        <LayerSection />
        <AutoLayoutSection />
        <ComponentsSection />
        <TokensSection />
        <SkillsSection />
        <WorkflowSection />
        <BestPracticesSection />
        <Part2Teaser />
      </main>
    </div>
  );
}
