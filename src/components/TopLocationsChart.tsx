import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TopLocationsChartProps {
  data: Array<Record<string, any>>;
  topN?: number;
}

interface LocationDataPoint {
  location: string;
  cost: number;
  volume: number;
}

// Single color with opacity variation for hierarchy
const BASE_COLOR = '#4F46E5';
const getColorWithOpacity = (index: number, total: number) => {
  // Top 3 get darker, rest get progressively lighter
  if (index < 3) {
    return BASE_COLOR; // Full opacity for top 3
  }
  const opacity = Math.max(0.4, 1 - (index / total) * 0.6);
  return `${BASE_COLOR}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

export function TopLocationsChart({ data, topN = 10 }: TopLocationsChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by location (city_department or city)
    const locationData = data.reduce((acc, row) => {
      let location = '';
      if (row.city_department) {
        location = row.city_department;
      } else if (row.city) {
        location = row.city;
      } else if (row.department) {
        location = row.department;
      } else {
        location = 'Non spécifié';
      }

      if (!acc[location]) {
        acc[location] = {
          location,
          cost: 0,
          volume: 0,
        };
      }

      acc[location].cost += parseFloat(row.prix_plein_euros) || 0;
      acc[location].volume += parseFloat(row.volume_liters) || 0;

      return acc;
    }, {} as Record<string, LocationDataPoint>);

    // Convert to array, sort by cost, and take top N
    const result = Object.values(locationData)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, topN)
      .map(item => ({
        ...item,
        cost: parseFloat(item.cost.toFixed(2)),
        volume: parseFloat(item.volume.toFixed(2)),
      }));

    return result;
  }, [data, topN]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as LocationDataPoint;
      return (
        <div
          className="bg-white border border-neutral-200 rounded-[8px] p-[12px] shadow-lg"
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '14px',
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: '4px' }}>
            {data.location}
          </p>
          <p style={{ color: '#6B7280' }}>
            Coût: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(data.cost)}
          </p>
          <p style={{ color: '#6B7280' }}>
            Volume: {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.volume)} L
          </p>
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
          Aucune donnée de localisation disponible
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          type="number"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k €`}
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
            fill: '#6B7280',
          }}
        />
        <YAxis
          type="category"
          dataKey="location"
          width={140}
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '12px',
            fill: '#030712',
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorWithOpacity(index, chartData.length)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

