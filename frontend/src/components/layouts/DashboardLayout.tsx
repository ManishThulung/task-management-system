import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../pages/ErrorFallback";
import useAuth from "../../hooks/useAuth";

function DashboardLayout() {
  const { user } = useAuth();

  if (!user?.accessToken) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="min-h-screen flex w-full">
      <Layout>
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

export default DashboardLayout;
