
import { Card, PageSection, PostLoginLayout, BreakupChart } from "$components"
import { useSelector } from "react-redux"
import './reports.style.scss'
import { RootState } from "store/store"
const ReportsPage = () =>{

    const {expenses}=useSelector((state:RootState)=>state.expense)
    return <PostLoginLayout title="Reports">
        <PageSection>
            <div className="reports-charts">
                <BreakupChart data={expenses}/>
                <Card title="Daywise Breakup">
                    <p>Cat</p>
                </Card>
                <Card title="Daywise Breakup">
                    <p>Cat</p>
                </Card>
            </div>
        </PageSection>
    </PostLoginLayout>
}

export default ReportsPage