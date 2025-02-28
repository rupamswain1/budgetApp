import { ADD_EXPENSES, EXPENSES_CATEGORY } from "$constants";
import { Button, Dropdown, H1, InputField } from "$components";
import { ITEM_TYPES } from "$interfaces";
import { useMemo } from "react";
import './addExpenses.style.scss';

const AddExpenses:React.FC = () =>{
 console.log("AddExpenses")   
 const options = useMemo(() => {
  return Object.values(EXPENSES_CATEGORY);
}, []);
 return <div className="expense-container">
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
}

export default AddExpenses;