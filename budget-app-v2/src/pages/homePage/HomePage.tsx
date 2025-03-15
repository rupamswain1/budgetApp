import { H2, Loader, PageSection, PostLoginLayout } from '$components';
import { useSelector, useDispatch } from 'react-redux';
import AddBudget from '../addBudget/Addbudget';
import './hompage.scss';
import type { RootState,AppDispatch } from 'store/store';
import { useLayoutEffect } from 'react';
import { getBudget, getExpenses } from '../../store/expensesReducer';
import { ITEM_TYPES } from '$interfaces';
import './hompage.scss';
const HomePage = () => {
  const { isLoading, error, budget, remainingBudget } = useSelector(
    (state: RootState) => state.expense
  );
  const dispatch = useDispatch<AppDispatch>();
  // useLayoutEffect(() => {
  //   dispatch(getBudget());
  //   dispatch(getExpenses())
  // },[]);
  //TODO:
  //3. prepare data for the expense donut chart
  //4. prepare data for a line chart showing daily spend
  //5. create a section for expenses added todat
  //6. create a section for last 10 expenses
  return (
    <>
      {isLoading && <Loader/>}
      {budget ? (
        <PostLoginLayout title="Your Expenses at a Glance">
          <PageSection>
            <>
            <section className='home_remainingContainer'>
              <H2 text="Remaining Amount" type={ITEM_TYPES.PRIMARY}/>
            </section>
            <div className='home_toadysExpense'>
              <p>Today's Update</p>
            </div>
            <div className='home_topten'>
              <p>Top 10 expenses</p>
            </div>
            </>
          </PageSection>
        </PostLoginLayout>
      ) : (
        <AddBudget />
      )}
    </>
  );
};

export default HomePage;
