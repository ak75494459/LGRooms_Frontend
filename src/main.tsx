import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Auth0ProviderWithNavigate from "./auth/auth0ProviderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors/>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
