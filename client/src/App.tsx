// client/src/App.tsx

import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast";
import { AccessibilityProvider } from '@/lib/hooks/use-accessibility';
import { ThemeProvider } from '@/lib/hooks/use-theme';

import Home from "./pages/home";
import NotFound from "./pages/not-found";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccessibilityProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AccessibilityProvider>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}