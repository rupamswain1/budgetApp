import { PostLoginLayout } from '$components';
import { useSelector } from 'react-redux';
import AddBudget from '../addBudget/Addbudget';
import './hompage.scss';
import type { RootState } from "store/store";
const HomePage = () =>{
    const {isLoading, error, budget, remainingBudget} = useSelector((state:RootState)=>state.expense);
    console.log("HomePage")
    // return <PostLoginLayout title='Add budget'>
    //     {<p>Hiii</p>}
    // </PostLoginLayout>
    return <>{budget?<p>Home</p>:<AddBudget/>}</>
}

export default HomePage;