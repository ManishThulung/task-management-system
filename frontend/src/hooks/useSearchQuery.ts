import { useState } from "react";

export const useSearchQuery = () => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e, "e");
    const target = e.target as HTMLFormElement;
    const { form } = Object.fromEntries(new FormData(target));
    setQuery(form.toString());
  };

  return {
    query,
    handleSubmit,
  };
};
