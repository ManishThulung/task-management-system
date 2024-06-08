import { Card } from "flowbite-react";
import { FC } from "react";
import { Task } from "../../types/task.types";
import { Link } from "react-router-dom";

interface IProps {
  data: Task;
}

const CompletedCard: FC<IProps> = ({ data }) => {
  return (
    <Link to={`/app/tasks/${data?._id}`}>
      <Card className="!bg-slate-300 px-5 py-8">
        <div className="flex flex-col items-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            {data.title}
          </h5>
          <p className="text-sm text-gray-700">{data.description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default CompletedCard;
