import { memo } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default memo(AuthLayout);
