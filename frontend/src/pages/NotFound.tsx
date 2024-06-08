import { Result } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link
        className="bg-blue-600 border rounded-md text-white py-3 px-4 text-lg font-medium"
        to="/app"
      >
        Back Home
      </Link>
    }
  />
);

export default NotFound;
