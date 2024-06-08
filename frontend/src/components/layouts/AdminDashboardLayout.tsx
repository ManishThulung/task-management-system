import { Layout } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ErrorFallback } from "../../pages/ErrorFallback";
import AdminNavbar from "../admin/navbar/AdminNavbar";

function AdminDashboardLayout() {
  const { user } = useAuth();

  if (!user?.accessToken && user?.user?.role != "Admin") {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="min-h-screen flex w-full">
      <Layout>
        <AdminNavbar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="mt-20">
            <Outlet />
          </div>
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

export default AdminDashboardLayout;
