import { useCallback, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Outlet } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";
import { getUser } from "./lib/serverRequests";

function AppContent() {
  const { login, logout, loading } = useAuth();

  const checkSessionValidity = useCallback(async () => {
    const userData = await getUser();
    if (userData) {
      login(userData);
    } else {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    checkSessionValidity();
    document.addEventListener("visibilitychange", checkSessionValidity);
    return () =>
      document.removeEventListener("visibilitychange", checkSessionValidity);
  }, [checkSessionValidity]);

  if (loading) return <LoadingSpinner />;

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <div className="pageContainer">
        <Navbar />
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
