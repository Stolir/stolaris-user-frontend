import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Outlet, useLoaderData } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";

function AppContent() {
  const data = useLoaderData();
  const { login, loading, setLoading, user } = useAuth();
  useEffect(() => {
    if (data.user) {
      login(data.user);
    } else {
      setLoading(false);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
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
