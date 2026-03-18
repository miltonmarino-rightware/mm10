import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Layouts
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Public pages
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Client pages
import AppDashboard from "@/pages/app/AppDashboard";
import AppChat from "@/pages/app/AppChat";
import AppCourses from "@/pages/app/AppCourses";
import AppTrades from "@/pages/app/AppTrades";
import AppBroadcasts from "@/pages/app/AppBroadcasts";
import AppBookings from "@/pages/app/AppBookings";
import AppGroups from "@/pages/app/AppGroups";
import AppEvents from "@/pages/app/AppEvents";
import AppMuseum from "@/pages/app/AppMuseum";
import AppProfile from "@/pages/app/AppProfile";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminCourses from "@/pages/admin/AdminCourses";
import AdminBroadcasts from "@/pages/admin/AdminBroadcasts";
import AdminTrades from "@/pages/admin/AdminTrades";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminGroups from "@/pages/admin/AdminGroups";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminMuseum from "@/pages/admin/AdminMuseum";
import AppMessages from "@/pages/app/AppMessages";
import AdminMessages from "@/pages/admin/AdminMessages";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/app" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Auth */}
      <Route path="/auth" element={<AuthRoute><AuthLayout /></AuthRoute>}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Client */}
      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<AppDashboard />} />
        <Route path="chat" element={<AppChat />} />
        <Route path="courses" element={<AppCourses />} />
        <Route path="trades" element={<AppTrades />} />
        <Route path="broadcasts" element={<AppBroadcasts />} />
        <Route path="bookings" element={<AppBookings />} />
        <Route path="groups" element={<AppGroups />} />
        <Route path="messages" element={<AppMessages />} />
        <Route path="events" element={<AppEvents />} />
        <Route path="museum" element={<AppMuseum />} />
        <Route path="profile" element={<AppProfile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="broadcasts" element={<AdminBroadcasts />} />
        <Route path="trades" element={<AdminTrades />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="groups" element={<AdminGroups />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="museum" element={<AdminMuseum />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
