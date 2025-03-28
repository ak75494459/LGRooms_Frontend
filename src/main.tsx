import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth/auth0ProviderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import ChatProvider from "./Context/ChatProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <ChatProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-left" richColors />
        </ChatProvider>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Router>
);
