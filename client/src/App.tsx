// client/src/App.tsx

import { Switch, Route } from "wouter"; // ✅ 1. Importa os componentes de rota
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Importe suas páginas
import Home from "./pages/home";
import NotFound from "./pages/not-found";

// Cria a instância do QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    // O QueryClientProvider deve envolver toda a aplicação que usará o React Query
    <QueryClientProvider client={queryClient}>
      
      {/* O Switch decide qual rota/página renderizar com base na URL */}
      <Switch>
        {/* Rota para a página inicial */}
        <Route path="/" component={Home} />
        
        {/* Rota "catch-all": se nenhuma outra rota combinar, mostra a página de não encontrado */}
        <Route component={NotFound} />
      </Switch>

      {/* O Toaster para exibir notificações */}
      <Toaster />

    </QueryClientProvider>
  );
}