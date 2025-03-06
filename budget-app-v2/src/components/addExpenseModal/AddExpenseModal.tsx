import { Modal, AddExpensesComponent, ExpenseSummary } from "$components";
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
  //add state here to track the page i.e add or summary or login
  //add can also act as edit if an expense id is available
  //if user is not logged in then show login
  return (
    <Modal isDisplayed={displayAddModal} onClose={onCloseModal}>
      {newExpenses.length > 0 ? (
        <ExpenseSummary expenses={newExpenses} />
      ) : (
        <AddExpensesComponent />
      )}
    </Modal>
  );
};

export default AddExpensesModal;
