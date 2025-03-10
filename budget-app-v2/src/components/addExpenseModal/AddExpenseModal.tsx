import {
  Modal,
  AddExpensesComponent,
  ExpenseSummary,
  LoginSection,
} from "$components";
import { NewExpense, screenNames } from "$interfaces";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const AddExpensesModal = ({
  displayAddModal,
  onCloseModal,
}: {
  displayAddModal: boolean;
  onCloseModal: () => void;
}): JSX.Element => {
  const newExpenses = useSelector(
    (state: RootState) => state.expense.newExpenses
  );
  const [screen, setScreen] = useState<screenNames>(screenNames.ADD);
  const [selectedExpense, setSelectedExpense] = useState<NewExpense | null>(
    null
  );
  //if user is not logged in then show login
  const handleNext = useCallback((screenName: screenNames) => {
    setScreen(screenName);
    setSelectedExpense(null);
  }, []);
  const handleEdit = useCallback(
    (screenName: screenNames, expense: NewExpense | null) => {
      setScreen(screenName);
      setSelectedExpense(expense);
    },
    []
  );
  return (
    <Modal isDisplayed={displayAddModal} onClose={onCloseModal}>
      {screen === screenNames.SUMMARY ? (
        <ExpenseSummary expenses={newExpenses} handleExpenseEdit={handleEdit} />
      ) : screen === screenNames.LOGIN ? (
        <LoginSection />
      ) : (
        <AddExpensesComponent
          handleNext={handleNext}
          selectedExpense={selectedExpense}
        />
      )}
    </Modal>
  );
};

export default AddExpensesModal;
