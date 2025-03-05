import "./quickAddExpense.style.scss";
import { AddExpenses, Modal, AddExpensesComponent, ExpenseSummary } from "$components";
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
      <Modal isDisplayed={showQuickAdd} onClose={onClose}>
        {newExpenses.length > 0 ? <ExpenseSummary expenses={newExpenses}/> : <AddExpensesComponent />}
      </Modal>
    </>
  );
};

export default QuickAddExpenses;
