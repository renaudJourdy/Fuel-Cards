import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FuelTypeChartProps {
  data: Array<Record<string, any>>;
}

interface FuelTypeDataPoint {
  name: string;
  value: number;
  percentage: number;
}

// Harmonious color palette for fuel types
const COLORS = ['#4F46E5', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#EF4444', '#F59E0B', '#EAB308'];

export function FuelTypeChart({ data }: FuelTypeChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by fuel type
    const fuelTypeData = data.reduce((acc, row) => {
      const fuelType = row.fuel_type || 'Non spécifié';
      if (!acc[fuelType]) {
        acc[fuelType] = 0;
      }
      acc[fuelType] += parseFloat(row.volume_liters) || 0;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(fuelTypeData).reduce((sum, val) => sum + val, 0);

    const result: FuelTypeDataPoint[] = Object.entries(fuelTypeData)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
        percentage: total > 0 ? (value / total) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return result;
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          className="bg-white border border-neutral-200 rounded-[8px] p-[12px] shadow-lg"
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '14px',
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: '4px' }}>
            {data.payload.name}
          </p>
          <p style={{ color: '#6B7280' }}>
            Volume: {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.payload.value)} L
          </p>
          <p style={{ color: '#6B7280' }}>
            {data.payload.percentage.toFixed(1)}% du total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show label for slices < 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontFamily="var(--font-family-sans-serif, 'Readex Pro')"
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
          Aucune donnée de type de carburant disponible
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={CustomLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

