import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { addTaskSchema } from "../../schema/task.schema";
import { ModalWrapper } from "../../styles/ModalWrapper";
import { Task, TaskFormData } from "../../types/task.types";
import FormField from "../forms/FormField";
import { useEffect } from "react";

interface PageProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  data: Task | null;
}

function FormModal({ isModalOpen, setIsModalOpen, data }: PageProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(addTaskSchema),
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.accessToken}`,
  };

  const mutation = useMutation({
    mutationFn: (inputData: TaskFormData) => {
      if (data?._id) {
        return api.put(`/task/${data?._id}`, inputData, { headers });
      } else {
        return api.post("/task", inputData, { headers });
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

  const onSubmit = async (data: TaskFormData) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        title: data?.title ?? "",
        description: data?.description ?? "",
        isCompleted: data?.isCompleted ?? "",
      });
    }
  }, [data, reset]);
  return (
    <ModalWrapper
      title={data ? "Update Task" : "Create Task"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      className="w-[800px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
        <FormField
          type="text"
          placeholder="Title"
          name={"title"}
          register={register}
          error={errors.title}
        />
        <FormField
          type="textarea"
          placeholder="Description"
          name="description"
          register={register}
          error={errors.description}
        />
        <FormField
          type="checkbox"
          placeholder="Is the task completed?"
          name="isCompleted"
          register={register}
          error={errors.isCompleted}
        />

        <div className="mt-10">
          <button
            type="submit"
            className="w-full py-2.5 px-4 text-lg font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default FormModal;
