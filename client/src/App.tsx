// client/src/App.tsx

import { Switch, Route } from "wouter"; // ✅ 1. Importa os componentes de rota
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";


import Home from "./pages/home";
import NotFound from "./pages/not-found";


const queryClient = new QueryClient();

export default function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      
      <Switch>
        <Route path="/" component={Home} />
        
        <Route component={NotFound} />
      </Switch>

      <Toaster />

    </QueryClientProvider>
  );
}