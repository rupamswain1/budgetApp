import "./quickAddExpense.style.scss";
import {
  AddExpenses,
  Modal,
  AddExpensesComponent,
} from "$components";
import { useCallback, useState } from "react";

const QuickAddExpenses = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(() => {
    setShowQuickAdd(true);
  }, []);


  console.log("QuickAddExpense");
  return (
    <>
      <AddExpenses customClass="login-add-expense" onClick={showModal} />
      <Modal isDisplayed={showQuickAdd} onClose={onClose}>
       <AddExpensesComponent/>
      </Modal>
    </>
  );
};

export default QuickAddExpenses;
