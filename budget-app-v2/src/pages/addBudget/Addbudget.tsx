import { Button, InputField, Loader, PageSection, PostLoginLayout } from "$components";
import { ADD_BUDGET } from "$constants";
import { UseFormInput } from "$hooks";
import { Budget, ITEM_TYPES } from "$interfaces";

import type { AppDispatch, RootState } from "store/store";
import "./addbudget.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { addBudget } from "../../store/expensesReducer";
const AddBudget = () => {
  const [budget, handleBudget] = UseFormInput<Budget>({
    date: new Date().toISOString().split("T")[0],
    budget: null,
  });
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state:RootState)=>state.expense);
  const handleSubmit = useCallback(()=>{
      dispatch(addBudget(budget));
  },[budget]);
  console.log({budget})
  //add validation and disable submit button if budget or date in null
  return (
    <PostLoginLayout title={ADD_BUDGET.TITLE}>
      <>
      {isLoading && <Loader/>}
      <PageSection>
        <div className="budget-form">
          {error && <p className="error">Add Budget Failed</p>}
          <InputField
            label={ADD_BUDGET.INPUTS.DATE.LABEL}
            name={ADD_BUDGET.INPUTS.DATE.NAME}
            type="date"
            value={budget.date}
            onChangeHandler={handleBudget}
          />
          <InputField
            label={ADD_BUDGET.INPUTS.AMOUNT.LABEL}
            name={ADD_BUDGET.INPUTS.AMOUNT.NAME}
            type="number"
            value={budget.budget}
            onChangeHandler={handleBudget}
          />
          <Button
            name={ADD_BUDGET.BUTTON}
            type={ITEM_TYPES.PRIMARY}
            onClick={handleSubmit}
          />
        </div>
      </PageSection>
      </>
    </PostLoginLayout>
  );
};

export default AddBudget;
