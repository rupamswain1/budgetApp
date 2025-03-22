import { ResponsivePie } from '@nivo/pie';

interface PieData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

interface PieDataProps {
  data: PieData[];
  margin?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const CenteredMetric = ({
  data,
  centerX,
  centerY,
}: {
  data: PieData[];
  centerX: number;
  centerY: number;
}) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '18px',
        fontWeight: 'bold',
        fill: '#333',
      }}
    >
      Total : {'\u20B9'} {data?.reduce((acc, datum) => (acc += datum.value), 0)}
    </text>
  );
};
const PieChart = ({
  data,
  margin = { top: 20, right: 40, bottom: 50, left: 40 },
}: PieDataProps) => (
  <ResponsivePie
    data={data}
    margin={margin}
    innerRadius={0.75}
    padAngle={2}
    sortByValue={true}
    fit={true}
    activeOuterRadiusOffset={8}
    colors={{
      datum: 'data.color',
    }}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0]],
    }}
    arcLinkLabelsSkipAngle={9}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsOffset={2}
    arcLinkLabelsDiagonalLength={0}
    arcLinkLabelsStraightLength={5}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={15}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['brighter', 2]],
    }}
    arcLinkLabel={(d) => `${d.id}`}
    layers={[
      'arcs',
      'arcLabels',
      'arcLinkLabels',
      'legends',
      (props) => <CenteredMetric {...props} data={data} />,
    ]}
  />
);

export default PieChart;
