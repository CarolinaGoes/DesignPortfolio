import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./lib/hooks/use-theme";
import { Switch, Route } from "wouter";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Route>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
