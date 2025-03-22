import { Card, Dropdown, PieChart } from '$components';
import { useCallback, useMemo, useState } from 'react';
import './breakupChaer.style.scss';
import { Expenses } from '$interfaces';
const optionsMap = {
  'Item Name': 'itemName',
  'Paid By': 'paidBy',
  Category: 'category',
  'Payment Method': 'paymentMethod',
};
type optionsEnum = (typeof optionsMap)[keyof typeof optionsMap];
const BreakupChart = ({ data }: { data: Expenses[] }) => {
  const optionsObj = useMemo(() => optionsMap, []);
  const [groupBy, setGroupBy] = useState<optionsEnum>(optionsMap['Item Name']);
  const handleSetGroupBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(optionsMap[e.target.value as keyof typeof optionsMap]);
  };

  const groupByData = useCallback(
    (expenses: Expenses[], fieldName: optionsEnum) => {
      console.log({ fieldName });
      const groupedData: {
        id: optionsEnum;
        value: number;
        label: optionsEnum;
        color: string;
      }[] = [];

      expenses.forEach((expense) => {
        const expGroupInArr = groupedData.find(
          (group) =>
            group.label === String(expense[fieldName as keyof Expenses]) // Ensure `fieldName` is converted to a string
        );

        if (!expGroupInArr) {
          groupedData.push({
            id: String(expense[fieldName as keyof Expenses] ?? ''),
            value: expense.price ?? 0,
            label: String(expense[fieldName as keyof Expenses]),
            color: getRandomRgbColor(),
          });
        } else {
          expGroupInArr.value += expense.price ?? 0;
        }
      });

      return groupedData;
    },
    [groupBy]
  );
  function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <Card
      title="Catergory Breakup"
      headerComponent={
        <Dropdown
          name="Group By"
          label="groupBy"
          options={Object.keys(optionsObj)}
          value={
            Object.keys(optionsMap).find(
              (k) => optionsMap[k as keyof typeof optionsMap] === groupBy
            ) ?? ''
          }
          onChangeHandler={handleSetGroupBy}
        />
      }
    >
      <>
        {data && data.length > 0 && (
          <PieChart
            data={groupByData(data, groupBy)}
            margin={{ top: 30, right: 40, bottom: 50, left: 40 }}
          />
        )}
      </>
    </Card>
  );
};
export default BreakupChart;
