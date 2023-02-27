import { useState } from "react";

const useForm = <T extends Object>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};

export default useForm;
