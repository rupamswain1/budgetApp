import "./quickAddExpense.style.scss";
import { ADD_EXPENSES, EXPENSES_CATEGORY } from '$constants';
import { AddExpenses, H1, InputField, Modal, Dropdown, Button } from "$components";
import { useCallback, useMemo, useState } from "react";
import { ITEM_TYPES } from "$interfaces";

const QuickAddExpenses = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(()=>{
    setShowQuickAdd(true)
  },[])

  const options = useMemo(()=>{
    return Object.values(EXPENSES_CATEGORY)
  },[])
  return (
    <>
      <AddExpenses customClass="login-add-expense" onClick={showModal}/>
      <Modal isDisplayed={showQuickAdd} onClose={onClose}>
        <div className="expense-container">
            <H1 text="Add Expense" type="primary"/>
            {/* below field shoul be displayed when there is not expense already added */}
            {/* date field */}
            <InputField label={ADD_EXPENSES.DATE.NAME} name={ADD_EXPENSES.DATE.NAME}
              type="date"
            />
            {/* Item name */}
            <InputField label={ADD_EXPENSES.ITEM.NAME} name={ADD_EXPENSES.ITEM.NAME}
              type="text"
            />
            {/* price */}
            <InputField label={ADD_EXPENSES.PRICE.NAME} name={ADD_EXPENSES.PRICE.NAME}
              type="number"
            />
            {/* caregory - this will be a dropdown */}
            <Dropdown options={options} label="Category" name={"Category"}/>
            {/* payment method will be dropdown with cash, upi or credit card */}
            {/* paid by */}
            <Dropdown options={options} label="Payment Method" name={"Payment Method"}/>
            {/* Add Button */}
            <Button name="Add Expense" type={ITEM_TYPES.PRIMARY} onClick={()=>{}}/>
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
