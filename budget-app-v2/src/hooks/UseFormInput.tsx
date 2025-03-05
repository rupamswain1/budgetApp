import { useCallback, useState } from "react";

const UseFormInput = <T,>(
  initialState: T
): [
  T,
  (
    handleFormInput: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
] => {
  const [formState, setFormState] = useState<T>(initialState);
  const handleFormInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormState((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  return [formState, handleFormInput];
};
export default UseFormInput;
