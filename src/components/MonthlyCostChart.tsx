import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyCostChartProps {
  data: Array<Record<string, any>>;
}

interface MonthlyDataPoint {
  month: string;
  cost: number;
  volume: number;
}

export function MonthlyCostChart({ data }: MonthlyCostChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by month
    const monthlyData = data.reduce((acc, row) => {
      if (!row.date_time) return acc;
      
      const date = new Date(row.date_time);
      if (isNaN(date.getTime())) return acc;

      const monthKey = new Intl.DateTimeFormat('fr-FR', {
        month: 'short',
        year: 'numeric'
      }).format(date);

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          cost: 0,
          volume: 0,
        };
      }

      acc[monthKey].cost += parseFloat(row.prix_plein_euros) || 0;
      acc[monthKey].volume += parseFloat(row.volume_liters) || 0;

      return acc;
    }, {} as Record<string, MonthlyDataPoint>);

    // Convert to array and sort by date
    const result = Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

    return result;
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white border border-neutral-200 rounded-[8px] p-[12px] shadow-lg"
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '14px',
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: '8px' }}>
            {payload[0].payload.month}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, marginBottom: '4px' }}>
              {entry.name}: {entry.name === 'Coût' 
                ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(entry.value)
                : `${new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(entry.value)} L`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div
          style={{
            color: 'var(--text-secondary, #6B7280)',
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '16px',
          }}
        >
          Aucune donnée disponible pour l'analyse temporelle
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="month"
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
            fill: '#6B7280',
          }}
        />
        <YAxis
          yAxisId="cost"
          orientation="left"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k €`}
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
            fill: '#6B7280',
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
          }}
        />
        <Line
          yAxisId="cost"
          type="monotone"
          dataKey="cost"
          stroke="#4F46E5"
          strokeWidth={2}
          name="Coût"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}


