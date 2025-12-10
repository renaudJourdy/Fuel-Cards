import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

interface ConsumptionChartProps {
  data: Array<Record<string, any>>;
  onVehicleClick?: (licensePlate: string) => void;
}

interface ChartDataPoint {
  license_plate: string;
  percentDiff: number;
  consumption_average: number;
  consumption_real: number;
}

export function ConsumptionChart({ data, onVehicleClick }: ConsumptionChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group by vehicle and calculate averages
    const vehicleData = data.reduce((acc, row) => {
      const plate = row.license_plate;
      if (!plate) return acc;

      if (!acc[plate]) {
        acc[plate] = {
          license_plate: plate,
          consumption_average: parseFloat(row.consumption_average) || 0,
          consumption_real: [],
        };
      }
      const realConsumption = parseFloat(row.consumption_real);
      if (!isNaN(realConsumption)) {
        acc[plate].consumption_real.push(realConsumption);
      }
      return acc;
    }, {} as Record<string, { license_plate: string; consumption_average: number; consumption_real: number[] }>);

    // Calculate average real consumption and percentage difference
    const result: ChartDataPoint[] = Object.values(vehicleData)
      .map((vehicle) => {
        if (
          vehicle.consumption_real.length === 0 ||
          vehicle.consumption_average === 0 ||
          isNaN(vehicle.consumption_average)
        ) {
          return null;
        }

        const avgReal =
          vehicle.consumption_real.reduce((a, b) => a + b, 0) / vehicle.consumption_real.length;
        
        if (isNaN(avgReal) || !isFinite(avgReal)) {
          return null;
        }

        const percentDiff =
          ((avgReal - vehicle.consumption_average) / vehicle.consumption_average) * 100;

        if (isNaN(percentDiff) || !isFinite(percentDiff)) {
          return null;
        }

        return {
          license_plate: vehicle.license_plate,
          percentDiff: percentDiff,
          consumption_average: vehicle.consumption_average,
          consumption_real: avgReal,
        };
      })
      .filter((item): item is ChartDataPoint => item !== null)
      .sort((a, b) => b.percentDiff - a.percentDiff); // Sort by percentDiff descending (worst first)

    return result;
  }, [data]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div
          className="bg-white border border-neutral-200 rounded-[8px] p-[12px] shadow-lg"
          style={{
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '14px',
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: '4px' }}>
            {data.license_plate}
          </p>
          <p style={{ color: '#6B7280' }}>
            Moyenne Véhicule: {data.consumption_average.toFixed(2)} L/100km
          </p>
          <p style={{ color: '#6B7280' }}>
            Consommation Période: {data.consumption_real.toFixed(2)} L/100km
          </p>
          <p
            style={{
              fontWeight: 500,
              color:
                data.percentDiff >= 10
                  ? '#7F1D1D'
                  : data.percentDiff > 0
                  ? '#713F12'
                  : '#14532D',
            }}
          >
            {data.percentDiff >= 0 ? '+' : ''}
            {data.percentDiff.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Get color for each bar based on percentage difference
  const getBarColor = (percentDiff: number): string => {
    if (percentDiff >= 10) {
      return '#FEE2E2'; // Red background
    } else if (percentDiff > 0) {
      return '#FEF9C3'; // Yellow background
    } else {
      return '#DCFCE7'; // Green background
    }
  };

  // Get text color for each bar
  const getTextColor = (percentDiff: number): string => {
    if (percentDiff >= 10) {
      return '#7F1D1D'; // Dark red
    } else if (percentDiff > 0) {
      return '#713F12'; // Dark yellow
    } else {
      return '#14532D'; // Dark green
    }
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div
          style={{
            color: 'var(--text-secondary, #6B7280)',
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: '16px',
          }}
        >
          Aucune donnée de consommation disponible
        </div>
      </div>
    );
  }

  // Calculate domain for symmetric display
  const maxAbsValue = Math.max(
    ...chartData.map((d) => Math.abs(d.percentDiff)),
    10
  );
  const domain = [-maxAbsValue * 1.1, maxAbsValue * 1.1];

  // Calculate minimum width for the chart (50px per vehicle for more compact display)
  const minChartWidth = Math.max(600, chartData.length * 50);

  return (
    <div className="w-full">
      <div className="overflow-x-auto custom-scrollbar" style={{ width: '100%' }}>
        <div style={{ minWidth: `${minChartWidth}px`, width: '100%' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                type="category"
                dataKey="license_plate"
                angle={-45}
                textAnchor="end"
                height={80}
                style={{
                  fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                  fontSize: '12px',
                  fill: '#030712',
                }}
              />
              <YAxis
                type="number"
                domain={domain}
                tickFormatter={(value) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`}
                style={{
                  fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                  fontSize: '12px',
                  fill: '#6B7280',
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#9CA3AF" strokeWidth={2} strokeDasharray="3 3" />
              <ReferenceLine y={10} stroke="#DC2626" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.5} />
              <ReferenceLine y={-10} stroke="#16A34A" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.5} />
              <Bar
                dataKey="percentDiff"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                onClick={(data: any) => {
                  if (onVehicleClick && data && data.license_plate) {
                    onVehicleClick(data.license_plate);
                  }
                }}
                style={{ cursor: onVehicleClick ? 'pointer' : 'default' }}
                label={({ percentDiff, x, width, y }: any) => {
                  if (!percentDiff || percentDiff === undefined || isNaN(percentDiff)) return null;
                  if (Math.abs(percentDiff) < 0.5) return null; // Don't show label for very small values
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 8}
                      fill={getTextColor(percentDiff)}
                      fontSize={11}
                      fontFamily="var(--font-family-sans-serif, 'Readex Pro')"
                      fontWeight={500}
                      textAnchor="middle"
                    >
                      {percentDiff >= 0 ? '+' : ''}
                      {percentDiff.toFixed(1)}%
                    </text>
                  );
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.percentDiff)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

