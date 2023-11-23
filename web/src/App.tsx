import { QueryClientProvider } from "@tanstack/react-query";

import "@/plugins/i18n";

import Router from "@/routes/Router";
import queryClient from "@/queryClient";
import { ThemeProvider } from "@/plugins/ui/UiProvider";

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
