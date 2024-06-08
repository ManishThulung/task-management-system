import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type FormData = {
  name: string;
  email: string;
  password: string;
};

export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
};
