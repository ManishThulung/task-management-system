import { FieldValues } from "react-hook-form";
import { FormFieldProps } from "../../types/form.types";

const FormField = <T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
}: FormFieldProps<T>) => (
  <>
    {type == "checkbox" ? (
      <div className="flex gap-4">
        <label htmlFor={name} className="text-sm font-medium text-gray-800 ">
          {placeholder}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="text-sm px-4 py-3 rounded outline-none border-2 "
        />
      </div>
    ) : type == "textarea" ? (
      <>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 "
        >
          {placeholder}
        </label>
        <textarea
          rows={4}
          cols={50}
          placeholder={placeholder}
          {...register(name)}
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 "
        />
      </>
    ) : (
      <>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-800 "
        >
          {placeholder}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="w-full text-sm px-4 py-3 rounded outline-none border-2 "
        />
      </>
    )}

    {error && <span className="text-red-600">{error.message}</span>}
  </>
);
export default FormField;
