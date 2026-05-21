import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts'
import type { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import type { SpendingCategory } from '../../types'

interface Props {
  data: SpendingCategory[]
  compact?: boolean
  onCategoryClick?: (id: string) => void
}

type ActiveShapeProps = PieSectorDataItem & { payload?: SpendingCategory }

function renderActiveShape(props: ActiveShapeProps) {
  const {
    cx = 0, cy = 0,
    innerRadius = 0, outerRadius = 0,
    startAngle = 0, endAngle = 0,
    fill = '#3b82f6',
    payload,
  } = props

  return (
    <g>
      {payload && (
        <>
          <text x={cx} y={cy - 14} textAnchor="middle" fill="#1e293b" fontSize={13} fontWeight={600}>
            {payload.name.length > 18 ? payload.name.slice(0, 16) + '…' : payload.name}
          </text>
          <text x={cx} y={cy + 6} textAnchor="middle" fill="#64748b" fontSize={11}>
            {formatPercent(payload.percentage)}
          </text>
          <text x={cx} y={cy + 22} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={600}>
            {formatCurrency(payload.amount, true)}
          </text>
          <text x={cx} y={cy + 36} textAnchor="middle" fill="#94a3b8" fontSize={9}>
            click to explore
          </text>
        </>
      )}
      <Sector
        cx={cx} cy={cy}
        innerRadius={Number(innerRadius)}
        outerRadius={Number(outerRadius) + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={Number(outerRadius) + 12}
        outerRadius={Number(outerRadius) + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

export function SpendingPieChart({ data, compact = false, onCategoryClick }: Props) {
  return (
    <ResponsiveContainer width="100%" height={compact ? 280 : 380}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={compact ? 55 : 80}
          outerRadius={compact ? 95 : 130}
          dataKey="amount"
          activeShape={renderActiveShape as (props: PieSectorDataItem) => React.ReactElement}
          onClick={(data) => onCategoryClick?.((data as { id?: string }).id ?? '')}
          style={onCategoryClick ? { cursor: 'pointer' } : undefined}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [formatCurrency(Number(value), true), 'Amount']}
          contentStyle={{
            backgroundColor: 'rgb(17 24 39)',
            border: '1px solid rgb(55 65 81)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
