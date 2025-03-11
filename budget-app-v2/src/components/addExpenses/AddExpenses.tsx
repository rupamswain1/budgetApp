import { useDispatch } from "react-redux";
import { addNewExpense } from "../../store/expensesReducer";
import type { AppDispatch } from "store/store";
import { ADD_EXPENSES, EXPENSES_CATEGORY, PAYMENT_METHOD } from "$constants";
import { Button, Dropdown, H1, InputField } from "$components";
import { NewExpense, ITEM_TYPES, screenNames } from "$interfaces";
import { UseFormInput } from "$hooks";
import { useCallback, useEffect, useMemo, useState, useId } from "react";
import "./addExpenses.style.scss";

interface AddExpensesProps{
  handleNext:(screenName:screenNames)=>void,
  selectedExpense:NewExpense|null
}

const AddExpenses:React.FC<AddExpensesProps> = ({handleNext, selectedExpense}) => {
  console.log("AddExpenses");
  const id = useId();
  const [expense, handleExpenseInput] = UseFormInput<NewExpense>(selectedExpense ?? {
    id: id,
    date: new Date().toISOString().split("T")[0],
    item: "",
    price: null,
    category: EXPENSES_CATEGORY.FOOD,
    paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
  });
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const options = useMemo(() => {
    return Object.values(EXPENSES_CATEGORY);
  }, []);

  const paymentOptions = useMemo(() => {
    return Object.values(PAYMENT_METHOD);
  }, []);

  useEffect(() => {
    if (
      expense.date &&
      expense.item &&
      expense.item.length > 1 &&
      expense.price &&
      expense.price > 0 &&
      expense.category &&
      expense.paymentMethod
    ) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [
    expense.date,
    expense.item,
    expense.price,
    expense.category,
    expense.paymentMethod,
  ]);

  const handleSubmit = useCallback(() => {
    dispatch(addNewExpense(expense));
    handleNext(screenNames.SUMMARY);
  }, [expense]);
  console.log({ expense });

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
        value={expense.item}
      />
      <InputField
        label={ADD_EXPENSES.PRICE.LABEL}
        name={ADD_EXPENSES.PRICE.NAME}
        type="number"
        onChangeHandler={handleExpenseInput}
        value={expense.price}
      />
      <Dropdown
        options={options}
        label={ADD_EXPENSES.CATEGORY.LABEL}
        name={ADD_EXPENSES.CATEGORY.NAME}
        onChangeHandler={handleExpenseInput}
        value={expense.category}
      />
      <Dropdown
        options={paymentOptions}
        label={ADD_EXPENSES.PAYMENT_METHOD.LABEL}
        name={ADD_EXPENSES.PAYMENT_METHOD.NAME}
        onChangeHandler={handleExpenseInput}
        value={expense.paymentMethod}
      />
      {/* Add Button */}
      <Button
        name={ADD_EXPENSES.ADD_EXPENSES.NAME}
        type={ITEM_TYPES.PRIMARY}
        onClick={handleSubmit}
        className="expense-btn"
        isEnabled={enableSubmit}
      />
    </div>
  );
};

export default AddExpenses;
