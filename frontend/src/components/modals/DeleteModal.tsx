import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Task } from "../../types/task.types";

interface PageProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  operation: string;
  data: Task | null;
}

function DeleteModal({
  isModalOpen,
  setIsModalOpen,
  data,
  operation,
}: PageProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.accessToken}`,
  };

  const reqData = {
    title: data?.title,
    description: data?.description,
    isCompleted: true,
  };

  const mutation = useMutation({
    mutationFn: () => {
      if (operation == "Delete") {
        return api.delete(`/task/${data?._id}`, { headers });
      } else {
        return api.put(`/task/${data?._id}`, reqData, { headers });
      }
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["Tasks"] });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    mutation.mutate();
  };
  return (
    <Modal
      title={operation}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      className="w-[800px]"
    >
      {operation == "Delete" ? (
        <p>Are you sure you want to delete this?</p>
      ) : (
        <p>Are you sure you want to mark this as completed?</p>
      )}
    </Modal>
  );
}

export default DeleteModal;
