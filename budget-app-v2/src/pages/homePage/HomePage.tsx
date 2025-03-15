import { PageSection, PostLoginLayout } from '$components';
import { useSelector } from 'react-redux';
import AddBudget from '../addBudget/Addbudget';
import './hompage.scss';
import type { RootState } from "store/store";
const HomePage = () =>{
    const {isLoading, error, budget, remainingBudget} = useSelector((state:RootState)=>state.expense);
    //TODO:
    //1. fetch the budget for the month, if store budget is not available
    //2. fetch the expenses for the month
    //3. prepare data for the expense donut chart
    //4. prepare data for a line chart showing daily spend
    //5. create a section for expenses added todat
    //6. create a section for last 10 expenses
    return <>{budget?
        <PostLoginLayout title = "Your Expenses at a Glance">
           <PageSection>
            <p>Hiii</p>
           </PageSection>
        </PostLoginLayout>
        :<AddBudget/>}</>
}

export default HomePage;