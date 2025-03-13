import { Button, InputField, PageSection, PostLoginLayout } from "$components";
import { UseFormInput } from "$hooks";
import { Budget, ITEM_TYPES } from "$interfaces";
import "./addbudget.style.scss";
const AddBudget = () => {
  const [budget, handleBudget] = UseFormInput<Budget>({
    date: new Date().toISOString().split("T")[0],
    budget: null,
  });
  return (
    <PostLoginLayout title="Add Your Budget">
      <PageSection>
        <div className="budget-form">
          <InputField label="Date" name="date" type="date" value={budget.date} onChangeHandler={handleBudget}/>
          <InputField label="Amount" name="budget" type="number" value={budget.budget} onChangeHandler={handleBudget}/>
          <Button name="Submit" type={ITEM_TYPES.PRIMARY} onClick={()=>{}}/>
        </div>
      </PageSection>
    </PostLoginLayout>
  );
};

export default AddBudget;
