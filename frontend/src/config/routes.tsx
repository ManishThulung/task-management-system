import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AuthLayout from "../components/layouts/AuthLayout";
import Loader from "../components/loader/Loader";
import NotFound from "../pages/NotFound";
import AdminDashboardLayout from "../components/layouts/AdminDashboardLayout";
import Profile from "../pages/profile/Profile";
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const DashboardLayout = lazy(
  () => import("../components/layouts/DashboardLayout")
);
const CompletedPage = lazy(() => import("../pages/Task/CompletedPage"));
const TaskDetailPage = lazy(() => import("../pages/Task/TaskDetailPage"));
const TaskPage = lazy(() => import("../pages/Task/TaskPage"));

const authRoutes: RouteObject = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};

const notFoundRoutes: RouteObject = {
  path: "*",
  element: <NotFound />,
};

const appRoutes: RouteObject = {
  path: "app",
  element: <DashboardLayout />,
  children: [
    {
      path: "me",
      element: (
        <Suspense fallback={<Loader />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "completed",
      element: (
        <Suspense fallback={<Loader />}>
          <CompletedPage />
        </Suspense>
      ),
    },
    {
      path: "tasks",
      element: (
        <Suspense fallback={<Loader />}>
          <TaskPage />
        </Suspense>
      ),
    },
    {
      path: "tasks/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <TaskDetailPage />
        </Suspense>
      ),
    },

    notFoundRoutes,
  ],
};

const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminDashboardLayout />,
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<Loader />}>
          <AdminPage />
        </Suspense>
      ),
    },
    notFoundRoutes,
  ],
};
const routes: RouteObject[] = [
  { path: "/app", element: <Navigate to={`/app/tasks`} /> },

  authRoutes,
  appRoutes,
  adminRoutes,
  notFoundRoutes,
];
export default routes;
