import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/lib/hooks/use-theme";
import { AccessibilityProvider } from "@/lib/hooks/use-accessibility";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  </ThemeProvider>
);
