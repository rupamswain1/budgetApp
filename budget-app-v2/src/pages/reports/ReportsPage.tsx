
import { Card, PageSection, PostLoginLayout, Dropdown } from "$components"
import { useSelector } from "react-redux"
import './reports.style.scss'
import { RootState } from "store/store"
import { Expenses } from "$interfaces"
import { useCallback} from "react"
const ReportsPage = () =>{

    const {expenses}=useSelector((state:RootState)=>state.expense)

    const groupBy = useCallback((expenses: Expenses[], fieldName: keyof Expenses)=>{
        const groupedData: { id: keyof Expenses; value: number; label: string }[] = [];
      
        expenses.forEach((expense) => {
          const expGroupInArr = groupedData.find(
            (group) => group.label === String(expense[fieldName]) // Ensure `fieldName` is converted to a string
          );
      
          if (!expGroupInArr) {
            groupedData.push({
              id: fieldName, 
              value: expense.price ?? 0,
              label: String(expense[fieldName]),
            });
          } else {
            expGroupInArr.value += expense.price ?? 0;
          }
        });
      
        return groupedData;
    },[])

    return <PostLoginLayout title="Reports">
        <PageSection>
            <div className="reports-charts">
                <Card title="Catergory Breakup">
                    <>
                        <Dropdown name="Group By" label="groupBy" options={["A","B"]} value=""/>
                    </>
                    
                </Card>
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