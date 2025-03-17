import "./quickAddExpense.style.scss";
import { AddExpensesModal } from "$components";
import React, { useCallback, useState } from "react";

const QuickAddExpenses = ({children}:{children:JSX.Element}) => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(() => {
    setShowQuickAdd(true);
  }, []);
  return (
    <>
      {React.cloneElement(children, {onClick:showModal})}
      {/* <AddExpenses customClass="login-add-expense" onClick={showModal} /> */}
      <AddExpensesModal
        displayAddModal={showQuickAdd}
        onCloseModal={onClose}
      />
    </>
  );
};

export default QuickAddExpenses;
