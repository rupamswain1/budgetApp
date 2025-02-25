import "./quickAddExpense.style.scss";
import { AddExpenses, H1, Modal } from "$components";
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
        <div>
            <H1 text="Add Expense" type="primary"/>
            {/* below field shoul be displayed when there is not expense already added */}
            {/* date field */}
            {/* Item name */}
            {/* price */}
            {/* caregory - this will be a dropdown */}
            {/* payment method will be dropdown with cash, upi or credit card */}
            {/* paid by */}
            {/* Add Button */}
            
            {/* once a expense is added display a table, with all data and total at bottom, give option to edit and delete */}
            {/* Add more - button */}
            {/* Next button */}

            {/* login page with prev and submit button */}
            
        </div>
      </Modal>
    </>
  );
};

export default QuickAddExpenses;
