import {
  Modal,
  AddExpensesComponent,
  ExpenseSummary,
  LoginSection,
  Loader,
} from "$components";
import { useAuthValidation } from "$hooks";
import { NewExpense, screenNames } from "$interfaces";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { addExpenses } from "../../store/expensesReducer";
import { loginUser } from "../../store/authReducer";

const AddExpensesModal = ({
  displayAddModal,
  onCloseModal,
}: {
  displayAddModal: boolean;
  onCloseModal: () => void;
}): JSX.Element => {
  const { newExpenses, isLoading, error } = useSelector(
    (state: RootState) => state.expense
  );

  const [screen, setScreen] = useState<screenNames>(
    newExpenses.length > 0 ? screenNames.SUMMARY : screenNames.ADD
  );
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
      } else {
        setScreen(screenName);
        setSelectedExpense(expense);
      }
    },
    []
  );
  const submitExpenses = useCallback(() => {
    console.log("submit expenses");
    setScreen(screenNames.SUMMARY);
    dispatch(addExpenses());
  }, []);
  const submitExpensesWithLogin = useCallback(
    async (data: { userName: string; password: string }) => {
      console.log("submit expenses");
      const loginResult = await dispatch(
        loginUser({
          userName: data.userName,
          password: data.password,
        })
      );
      setScreen(screenNames.SUMMARY);
      if (loginUser.fulfilled.match(loginResult)) {
        await dispatch(addExpenses());
      }
    },
    []
  );
  //below useEffect will close the modal after the submit add expense is successful
  useEffect(() => {
    console.log({ isLoading, error });
    if (!isLoading && !error) {
      console.log("close modal");
      setScreen(screenNames.ADD);
      closeModalProcess();
    }
  }, [isLoading, error]);
  const closeModalProcess = useCallback(() => {
    onCloseModal();
    if (newExpenses?.length > 0) {
      setScreen(screenNames.SUMMARY);
    } else {
      setScreen(screenNames.ADD);
    }
    setSelectedExpense(null);
  }, []);

  return (
    <Modal isDisplayed={displayAddModal} onClose={closeModalProcess}>
      {isLoading && <Loader />}
      {screen === screenNames.SUMMARY ? (
        <ExpenseSummary
          expenses={newExpenses}
          handleExpenseEdit={handleEdit}
          showError={error}
        />
      ) : screen === screenNames.LOGIN ? (
        <LoginSection customLogin={submitExpensesWithLogin} />
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
