import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { MindsetSection } from "./components/MindsetSection";
import { DesignSystemProtocol } from "./components/DesignSystemProtocol";
import { AIReadyComparison } from "./components/AIReadyComparison";
import { AIReadyLevels } from "./components/AIReadyLevels";
import { AgenticFuture } from "./components/AgenticFuture";
import { LayerSection } from "./components/LayerSection";
import { AutoLayoutSection } from "./components/AutoLayoutSection";
import { ComponentsSection } from "./components/ComponentsSection";
import { TokensSection } from "./components/TokensSection";
import { SkillsSection } from "./components/SkillsSection";
import { WorkflowSection } from "./components/WorkflowSection";
import { BestPracticesSection } from "./components/BestPracticesSection";
import { Analytics } from "@vercel/analytics/react";
export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navigation />
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
        <AgenticFuture />
      </main>
      <Analytics />
    </div>
  );
}