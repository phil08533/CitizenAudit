import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/formatters'
import type { BudgetYear } from '../../types'

interface Props {
  data: BudgetYear[]
  color?: string
}

export function BudgetHistoryChart({ data, color = '#3b82f6' }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'rgb(148 163 184)' }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={v => formatCurrency(v, true)}
          tick={{ fontSize: 11, fill: 'rgb(148 163 184)' }}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(Number(value), true), 'Budget']}
          contentStyle={{
            backgroundColor: 'rgb(17 24 39)',
            border: '1px solid rgb(55 65 81)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px',
          }}
        />
        <Area type="monotone" dataKey="amount" stroke={color} strokeWidth={2} fill="url(#areaGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
