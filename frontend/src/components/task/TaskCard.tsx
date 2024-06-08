import { Card, Dropdown, DropdownItem } from "flowbite-react";
import { FC, useState } from "react";
import DeleteModal from "../modals/DeleteModal";
import { Task } from "../../types/task.types";
import FormModal from "../modals/FormModal";
import { Link } from "react-router-dom";

interface IProps {
  data: Task;
}

export const TaskCard: FC<IProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [operation, setOperation] = useState<string>("");
  return (
    <>
      <Card className="!bg-slate-300">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <DropdownItem
              className={`hover:!bg-slate-200 ${
                data?.isCompleted && "cursor-not-allowed"
              }`}
              onClick={() => {
                setOperation("Complete");
                setIsModalOpen(true);
              }}
              disabled={data?.isCompleted}
            >
              <span className="block px-4 py-2 text-sm text-gray-700 ">
                {data.isCompleted ? "Already Completed" : "Mark as Complete"}
              </span>
            </DropdownItem>

            <DropdownItem
              className="hover:!bg-slate-200"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <span className="block px-4 py-2 text-sm text-gray-700 ">
                Edit
              </span>
            </DropdownItem>
            <DropdownItem
              className="hover:!bg-slate-200"
              onClick={() => {
                setOperation("Delete");
                setIsModalOpen(true);
              }}
            >
              <span className="block px-4 py-2 text-sm text-red-600 ">
                Delete
              </span>
            </DropdownItem>
          </Dropdown>
        </div>
        <Link to={`${data?._id}`}>
          <div className="flex flex-col items-center pb-8 p-5">
            <h5 className="mb-1 text-xl font-medium text-gray-900 ">
              {data.title}
            </h5>
            <p className="text-sm text-gray-700">{data.description}</p>
          </div>
        </Link>
      </Card>
      {isModalOpen && (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          operation={operation}
          data={data}
        />
      )}
      {isOpen && (
        <FormModal
          isModalOpen={isOpen}
          setIsModalOpen={setIsOpen}
          data={data}
        />
      )}
    </>
  );
};
