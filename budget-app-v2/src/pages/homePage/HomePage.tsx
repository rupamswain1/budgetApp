import { PostLoginLayout } from '$components';
import AddBudget from '../addBudget/Addbudget';
import './hompage.scss';

const HomePage = () =>{
    console.log("HomePage")
    // return <PostLoginLayout title='Add budget'>
    //     {<p>Hiii</p>}
    // </PostLoginLayout>
    return <AddBudget/>
}

export default HomePage;