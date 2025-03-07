
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { LanguageSwitcher } from "../language-switcher";
import { UserProfile } from "../user-profile";
import { useAuth } from "@/context/auth-context";

export default function Layout() {
  const { user, loading } = useAuth();

  // If loading, don't redirect yet
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
          <div className="container-wide py-6">
            <div className="flex justify-end mb-4 gap-2">
              <UserProfile />
              <LanguageSwitcher />
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
