import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { MindsetSection } from "./components/MindsetSection";
import { DesignSystemProtocol } from "./components/DesignSystemProtocol";
import { AIReadyComparison } from "./components/AIReadyComparison";
import { LayerSection } from "./components/LayerSection";
import { AutoLayoutSection } from "./components/AutoLayoutSection";
import { ComponentsSection } from "./components/ComponentsSection";
import { TokensSection } from "./components/TokensSection";
import { SkillsSection } from "./components/SkillsSection";
import { WorkflowSection } from "./components/WorkflowSection";
import { BestPracticesSection } from "./components/BestPracticesSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans washi-texture">
      <Navigation />
      <main className="lg:ml-64">
        <HeroSection />
        <MindsetSection />
        <DesignSystemProtocol />
        <AIReadyComparison />
        <LayerSection />
        <AutoLayoutSection />
        <ComponentsSection />
        <TokensSection />
        <SkillsSection />
        <WorkflowSection />
        <BestPracticesSection />
      </main>
    </div>
  );
}
