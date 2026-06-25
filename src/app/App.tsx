import { HashRouter, Routes, Route } from "react-router";
import { Part1 } from "./pages/Part1";
import { Part2 } from "./pages/Part2";
import { ComponentEncapsulation } from "./pages/ComponentEncapsulation";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Part1 />} />
        <Route path="/part-2" element={<Part2 />} />
        <Route path="/component-encapsulation" element={<ComponentEncapsulation />} />
      </Routes>
      <Analytics />
    </HashRouter>
  );
}
