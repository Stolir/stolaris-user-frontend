import { useCallback, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Outlet, useLoaderData } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";
import { getUser } from "./lib/serverRequests";

function AppContent() {
  const { login, logout, loading, setLoading, user } = useAuth();
  useEffect(() => {
    let ignored = false;
    (async () => {
      const user = await getUser();
      if (ignored) return;
      if (user) {
        login(user);
      } else {
        logout();
      }
    })();
    return () => (ignored = true);
  }, [login, logout]);

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
