import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormData } from "../../types/form.types";
import FormField from "../forms/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegistrationSchema } from "../../schema/register.schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const notify = (message: string) => toast.error(message);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserRegistrationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return api.post("/auth/register", data);
    },
    onSuccess: (data) => {
      setUser(data?.data);
      reset();
      navigate("/app/tasks");
    },
    onError: (error: any) => {
      notify(error.response.data.message);
    },
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-gray-50  text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">
            Register your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
            <FormField
              type="name"
              placeholder="Name"
              name="name"
              register={register}
              error={errors.name}
            />
            <FormField
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />
            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />

            <div className="mt-10">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-lg font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Register
              </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
