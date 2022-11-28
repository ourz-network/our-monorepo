/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  PieProps,
} from 'recharts'
import { useState } from 'react'
import type {
  RecipientDetailsFragment,
  RecipientShortFragment,
} from 'our-hooks/dist/graph-queries/ourz-graph-types'

const COLORS = [
  '#FFDAC1',
  '#E2F0CB',
  '#B5EAD7',
  '#C7CEEA',
  '#D9C5F7',
  '#FF9AA2',
  '#FFB7B2',
]

const SplitPie = ({
  recipients,
  secondarySale,
}: {
  recipients: RecipientShortFragment[]
  secondarySale: boolean
}): JSX.Element => {
  const [chartState, setChartState] = useState({
    activeIndex: 0,
  })

  const onPieEnter = (_: any, index: number) => {
    setChartState({
      activeIndex: index,
    })
  }

  const renderActiveShape = (
    props: PieProps & { payload: RecipientDetailsFragment; percent: number }
  ) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      minAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
    } = props
    const sin = Math.sin(-RADIAN * (minAngle!))
    const cos = Math.cos(-RADIAN * (minAngle!))
    const sx = Number(cx) + (Number(outerRadius) + 10) * cos
    const sy = Number(cy) + (Number(outerRadius) + 10) * sin
    const mx = Number(cx) + (Number(outerRadius) + 30) * cos
    const my = Number(cy) + (Number(outerRadius) + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text
          x={cx as number}
          y={cy as number}
          dy={6 as number}
          textAnchor='middle'
          fill='#FFFFFF'
        >
          1Ξ
        </text>
        <Sector
          cx={cx as number}
          cy={cy as number}
          innerRadius={innerRadius as number}
          outerRadius={outerRadius as number}
          startAngle={startAngle!}
          endAngle={endAngle!}
          fill={fill!}
        />
        <Sector
          cx={cx as number}
          cy={cy as number}
          startAngle={(startAngle!) - 2}
          endAngle={(endAngle!) + 2}
          innerRadius={(outerRadius as number) + 5}
          outerRadius={(outerRadius as number) + 10}
          fill={fill!}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill='none'
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill='#FFFFFF'
        >{`${
          payload.name.length <= 14
            ? (payload.name as string)
            : (payload.name.substring(
                0,
                Number(payload.name.indexOf(' ')) + 7
              ) as string)
        }`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill='#B2B2B2'
        >
          {`${percent.toFixed(6) as string}Ξ`}
        </text>
      </g>
    )
  }

  // Visual Component
  const renderPieChart = (
    <ResponsiveContainer width='100%' aspect={1}>
      <PieChart>
        <Pie
          activeIndex={chartState.activeIndex}
          activeShape={renderActiveShape}
          data={recipients}
          cx='50%'
          cy='50%'
          innerRadius={30}
          outerRadius={55}
          fill='#8884d8'
          dataKey='shares'
          onMouseEnter={onPieEnter}
          startAngle={!secondarySale ? 0 : 180}
          endAngle={!secondarySale ? 360 : -180}
        >
          {recipients.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )

  return renderPieChart
}

export default SplitPie
