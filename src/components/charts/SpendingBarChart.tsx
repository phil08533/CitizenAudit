import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { formatCurrency } from '../../utils/formatters'
import type { TaxAllocation } from '../../types'

interface Props {
  allocations: TaxAllocation[]
  compact?: boolean
}

export function SpendingBarChart({ allocations, compact = false }: Props) {
  const sorted = [...allocations].sort((a, b) => b.amount - a.amount)

  return (
    <ResponsiveContainer width="100%" height={compact ? 240 : 380}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 0, right: 20, left: compact ? 100 : 130, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={v => formatCurrency(v, true)}
          tick={{ fontSize: 11, fill: 'rgb(148 163 184)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: compact ? 10 : 12, fill: 'rgb(100 116 139)' }}
          width={compact ? 95 : 125}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(Number(value)), 'Your contribution']}
          contentStyle={{
            backgroundColor: 'rgb(17 24 39)',
            border: '1px solid rgb(55 65 81)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px',
          }}
        />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
          {sorted.map((entry, index) => (
            <Cell key={`bar-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
