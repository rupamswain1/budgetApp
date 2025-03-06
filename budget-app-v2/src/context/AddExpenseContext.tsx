import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type screenType = "add" | "summary" | "login";

interface AddContextType {
  screen: screenType;
  setScreen: Dispatch<SetStateAction<screenType>>;
  expenseId: null | string;
  setExpenseId: Dispatch<SetStateAction<string | null>>;
}

const AddExpenseContext = createContext<AddContextType | null>(null);

const AddExpenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [screen, setScreen] = useState<screenType>("add");
  const [expenseId, setExpenseId] = useState<string | null>(null);
  return (
    <AddExpenseContext.Provider
      value={{ screen, setScreen, expenseId, setExpenseId }}
    >
      {children}
    </AddExpenseContext.Provider>
  );
};

export default AddExpenseProvider;