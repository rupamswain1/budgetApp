import "./quickAddExpense.style.scss";
import { AddExpenses, AddExpensesModal } from "$components";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const QuickAddExpenses = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);
  const newExpenses = useSelector(
    (state: RootState) => state.expense.newExpenses
  );
  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(() => {
    setShowQuickAdd(true);
  }, []);

  console.log("QuickAddExpense", newExpenses.length);
  return (
    <>
      <AddExpenses customClass="login-add-expense" onClick={showModal} />
      <AddExpensesModal
        displayAddModal={showQuickAdd}
        onCloseModal={onClose}
      />
    </>
  );
};

export default QuickAddExpenses;
