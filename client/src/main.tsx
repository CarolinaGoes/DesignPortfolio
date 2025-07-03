import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@/lib/hooks/use-theme";
import { AccessibilityProvider } from "@/lib/hooks/use-accessibility";
import { LanguageProvider } from "@/lib/hooks/use-language";
import "./lib/i18n";

import './index.css';

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AccessibilityProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AccessibilityProvider>
  </ThemeProvider>
);
