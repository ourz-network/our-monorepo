import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";

const DetailedPie = (props) => {
  const chartData = props.chartData;
  // console.log(`DetailedPie - chartData\n`, chartData);
  const secondaryBool = props.secondaryBool;
  // https://recharts.org/en-US/examples/TwoLevelPieChart
  // https://recharts.org/en-US/examples/CustomActiveShapePieChart
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={6} textAnchor="middle" fill={"#FFFFFF"}>
          1Ξ
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle - 2}
          endAngle={endAngle + 2}
          innerRadius={outerRadius + 5}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#FFFFFF"
        >{`${
          payload.name.length <= 14
            ? payload.name
            : payload.name.substring(0, payload.name.indexOf(" ") + 7)
        }`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#B2B2B2"
        >
          {`${percent.toFixed(6)}Ξ`}
        </text>
      </g>
    );
  };
  const [chartState, setChartState] = useState({
    activeIndex: 0,
  });
  const onPieEnter = (_, index) => {
    setChartState({
      activeIndex: index,
    });
  };
  //Visual Component
  const COLORS = [
    "#FFDAC1",
    "#E2F0CB",
    "#B5EAD7",
    "#C7CEEA",
    "#D9C5F7",
    "#FF9AA2",
    "#FFB7B2",
  ];
  const renderPieChart = (
    <ResponsiveContainer width={"100%"} aspect={1}>
      <PieChart>
        <Pie
          activeIndex={chartState.activeIndex}
          activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={55}
          fill="#8884d8"
          dataKey="shares"
          onMouseEnter={onPieEnter}
          startAngle={!secondaryBool ? 0 : 180}
          endAngle={!secondaryBool ? 360 : -180}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  return renderPieChart;
};

export default DetailedPie;
