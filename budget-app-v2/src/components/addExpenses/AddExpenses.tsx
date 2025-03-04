import { ADD_EXPENSES, EXPENSES_CATEGORY, PAYMENT_METHOD } from "$constants";
import { Button, Dropdown, H1, InputField } from "$components";
import { NewExpense } from "$interfaces";
import { ITEM_TYPES } from "$interfaces";
import { useCallback, useMemo, useState } from "react";
import "./addExpenses.style.scss";

const AddExpenses: React.FC = () => {
  console.log("AddExpenses");
  const [expense, setExpense] = useState<NewExpense>({
    id: 0,
    date: new Date(),
    itemName: "",
    price: 0,
    category: EXPENSES_CATEGORY.FOOD,
    paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
  });
  const options = useMemo(() => {
    return Object.values(EXPENSES_CATEGORY);
  }, []);

  const paymentOptions = useMemo(() => {
    return Object.values(PAYMENT_METHOD);
  }, []);

  const handleExpenseInput = useCallback((e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    setExpense((prevValue)=>({...prevValue, [e.target.name]:e.target.value}))
  },[])
  console.log({expense})

  return (
    <div className="expense-container">
      <H1 text="Add Expense" type="primary" className="expense-header" />
      <InputField
        label={ADD_EXPENSES.DATE.LABEL}
        name={ADD_EXPENSES.DATE.NAME}
        type="date"
        onChangeHandler={handleExpenseInput}
        value={expense.date}
      />
      <InputField
        label={ADD_EXPENSES.ITEM.LABEL}
        name={ADD_EXPENSES.ITEM.NAME}
        type="text"
        onChangeHandler={handleExpenseInput}
        value={expense.itemName}
      />
      <InputField
        label={ADD_EXPENSES.PRICE.LABEL}
        name={ADD_EXPENSES.PRICE.NAME}
        type="number"
        onChangeHandler={handleExpenseInput}
        value={expense.itemName}
      />
      <Dropdown
        options={options}
        label={ADD_EXPENSES.CATEGORY.LABEL}
        name={ADD_EXPENSES.CATEGORY.NAME}
        onChangeHandler={handleExpenseInput}
        value={expense.itemName}
      />
      <Dropdown
        options={paymentOptions}
        label={ADD_EXPENSES.PAYMENT_METHOD.LABEL}
        name={ADD_EXPENSES.PAYMENT_METHOD.NAME}
        onChangeHandler={handleExpenseInput}
        value={expense.itemName}
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
  );
};

export default AddExpenses;
