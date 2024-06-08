import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../config/axios";
import useAuth from "../../hooks/useAuth";
import { UserLoginSchema } from "../../schema/register.schema";
import { FormData } from "../../types/form.types";
import FormField from "../forms/FormField";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const notify = (message: string) => toast.error(message);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<FormData, "name">>({
    resolver: zodResolver(UserLoginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Omit<FormData, "name">) => {
      return api.post("/auth/login", data);
    },
    onSuccess: (data) => {
      setUser(data?.data);
      reset();
      data?.data?.user?.role === "Admin"
        ? navigate("/admin")
        : navigate("/app/tasks");
    },
    onError: (error: any) => {
      notify(error.response.data.message);
    },
  });

  const onSubmit = async (data: Omit<FormData, "name">) => {
    mutation.mutate(data);
  };
  return (
    <div className="bg-gray-50  text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">
            Log in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
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
                Login
              </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
