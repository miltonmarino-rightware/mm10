import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatProvider } from "@/hooks/useChatContext";
import { AppShell } from "@/components/layout/AppShell";
import ChatPage from "@/pages/ChatPage";
import SettingsPage from "@/pages/SettingsPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <ChatPage />
              </AppShell>
            }
          />
          <Route
            path="/settings"
            element={
              <AppShell>
                <SettingsPage />
              </AppShell>
            }
          />
          <Route
            path="/about"
            element={
              <AppShell>
                <AboutPage />
              </AppShell>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
