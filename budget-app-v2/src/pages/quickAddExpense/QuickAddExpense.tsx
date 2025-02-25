import "./quickAddExpense.style.scss";
import { AddExpenses, Modal } from "$components";
import { useCallback, useState } from "react";

const QuickAddExpenses = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(()=>{
    setShowQuickAdd(true)
  },[])

  return (
    <>
      <AddExpenses customClass="login-add-expense" onClick={showModal}/>
      <Modal isDisplayed={showQuickAdd} onClose={onClose}>
        <h1>hiiiii broo</h1>
      </Modal>
    </>
  );
};

export default QuickAddExpenses;
