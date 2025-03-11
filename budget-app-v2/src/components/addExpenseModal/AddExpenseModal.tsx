import {
  Modal,
  AddExpensesComponent,
  ExpenseSummary,
  LoginSection,
} from "$components";
import { useAuthValidation } from "$hooks";
import { NewExpense, screenNames } from "$interfaces";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import {addExpenses} from "../../store/expensesReducer";

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

  const dispatch = useDispatch<AppDispatch>();

  const { isUserLoggedIn } = useAuthValidation();

  const handleNext = useCallback((screenName: screenNames) => {
    setScreen(screenName);
    setSelectedExpense(null);
  }, []);
  const handleEdit = useCallback(
    (screenName: screenNames, expense: NewExpense | null) => {
      console.log({ isUserLoggedIn });
      if (isUserLoggedIn && screenName === screenNames.LOGIN) {
        submitExpenses();
        setScreen(screenNames.ADD);
      } else {
        setScreen(screenName);
        setSelectedExpense(expense);
      }
    },
    []
  );
  const submitExpenses = useCallback(() => {
    console.log("submit expenses");
    dispatch(addExpenses())
    closeModalProcess();
  },[]);
  const closeModalProcess = useCallback(() => {
    onCloseModal();
    if (newExpenses?.length > 0) {
      setScreen(screenNames.SUMMARY);
    } else {
      setScreen(screenNames.ADD);
    }
    setSelectedExpense(null);
  },[]);
  //TODO: add a funtion here such that if user is logged in, it will submit from expense summary and if user not logged in then submit once login is detected
  return (
    <Modal isDisplayed={displayAddModal} onClose={closeModalProcess}>
      {screen === screenNames.SUMMARY ? (
        <ExpenseSummary expenses={newExpenses} handleExpenseEdit={handleEdit} />
      ) : screen === screenNames.LOGIN ? (
        <LoginSection authCallback={submitExpenses} />
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
