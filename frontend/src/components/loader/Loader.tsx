import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="flex items-center h-screen w-full justify-center">
      <Spin size="large" />
    </div>
  );
}
