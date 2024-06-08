import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Loader from "../components/loader/Loader";

function AppRouter() {
  const Routes = useRoutes(routes);
  return <React.Suspense fallback={<Loader />}>{Routes}</React.Suspense>;
}

export default AppRouter;
