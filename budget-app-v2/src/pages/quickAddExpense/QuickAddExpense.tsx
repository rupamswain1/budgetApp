import "./quickAddExpense.style.scss";
import { ADD_EXPENSES, EXPENSES_CATEGORY } from "$constants";
import {
  AddExpenses,
  H1,
  InputField,
  Modal,
  Dropdown,
  Button,
} from "$components";
import { useCallback, useMemo, useState } from "react";
import { ITEM_TYPES } from "$interfaces";

const QuickAddExpenses = () => {
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(true);

  const onClose = useCallback(() => {
    setShowQuickAdd(!setShowQuickAdd);
  }, []);

  const showModal = useCallback(() => {
    setShowQuickAdd(true);
  }, []);

  const options = useMemo(() => {
    return Object.values(EXPENSES_CATEGORY);
  }, []);
  console.log("QuickAddExpense");
  return (
    <>
      <AddExpenses customClass="login-add-expense" onClick={showModal} />
      <Modal isDisplayed={showQuickAdd} onClose={onClose}>
        <div className="expense-container">
          <H1 text="Add Expense" type="primary" className="expense-header" />
          <InputField
            label={ADD_EXPENSES.DATE.NAME}
            name={ADD_EXPENSES.DATE.NAME}
            type="date"
          />
          <InputField
            label={ADD_EXPENSES.ITEM.NAME}
            name={ADD_EXPENSES.ITEM.NAME}
            type="text"
          />
          <InputField
            label={ADD_EXPENSES.PRICE.NAME}
            name={ADD_EXPENSES.PRICE.NAME}
            type="number"
          />
          <Dropdown
            options={options}
            label={ADD_EXPENSES.CATEGORY.NAME}
            name={ADD_EXPENSES.CATEGORY.NAME}
          />
          <Dropdown
            options={options}
            label={ADD_EXPENSES.PAYMENT_METHOD.NAME}
            name={ADD_EXPENSES.PAYMENT_METHOD.NAME}
          />
          {/* Add Button */}
          <Button
            name={ADD_EXPENSES.ADD_EXPENSES.NAME}
            type={ITEM_TYPES.PRIMARY}
            onClick={() => {}}
            className="expense-btn"
          />
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
