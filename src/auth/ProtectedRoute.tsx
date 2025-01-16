import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 2000); // Set a timeout of 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading && !loadingTimeout) {
    return <div>Loading...</div>; // Show a loading state for 5 seconds
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  // Redirect to "/" if not authenticated
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
