import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';
import { Info } from 'lucide-react';
import { MonthlyCostChart } from './MonthlyCostChart';
import { TopLocationsChart } from './TopLocationsChart';

interface FuelChartsSectionProps {
    data: Array<Record<string, any>>;
}

const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'EUR',
    }).format(value);
};

export function FuelChartsSection({ data }: FuelChartsSectionProps) {
    // Calculate spending trends by day
    const spendingData = useMemo(() => {
        if (!data || data.length === 0) return [];

        const dailyData = data.reduce((acc, row) => {
            if (!row.date_time) return acc;

            const date = new Date(row.date_time);
            if (isNaN(date.getTime())) return acc;

            const dateKey = new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: '2-digit',
            }).format(date);

            if (!acc[dateKey]) {
                acc[dateKey] = {
                    date: dateKey,
                    spending: 0,
                    volume: 0,
                };
            }

            acc[dateKey].spending += parseFloat(row.prix_plein_euros) || 0;
            acc[dateKey].volume += parseFloat(row.volume_liters) || 0;

            return acc;
        }, {} as Record<string, { date: string; spending: number; volume: number }>);

        return Object.values(dailyData)
            .sort((a, b) => {
                const [dayA, monthA] = a.date.split('/').map(Number);
                const [dayB, monthB] = b.date.split('/').map(Number);
                if (monthA !== monthB) return monthA - monthB;
                return dayA - dayB;
            })
            .slice(-30); // Last 30 days
    }, [data]);

    // Calculate insights
    const insights = useMemo(() => {
        if (spendingData.length < 2) {
            return { volumeChange: '0%', spikeDay: '', spikeAmount: '0€' };
        }

        const firstPeriod = spendingData.slice(0, Math.min(3, spendingData.length));
        const lastPeriod = spendingData.slice(-3);

        const avgSpendingFirst = firstPeriod.reduce((s, d) => s + d.spending, 0) / firstPeriod.length;
        const avgSpendingLast = lastPeriod.reduce((s, d) => s + d.spending, 0) / lastPeriod.length;
        const avgVolumeFirst = firstPeriod.reduce((s, d) => s + d.volume, 0) / firstPeriod.length;
        const avgVolumeLast = lastPeriod.reduce((s, d) => s + d.volume, 0) / lastPeriod.length;

        const spendingChange = avgSpendingFirst > 0 ? ((avgSpendingLast - avgSpendingFirst) / avgSpendingFirst * 100).toFixed(1) : '0';
        const volumeChange = avgVolumeFirst > 0 ? ((avgVolumeLast - avgVolumeFirst) / avgVolumeFirst * 100).toFixed(1) : '0';

        const maxSpending = Math.max(...spendingData.map(d => d.spending));
        const spikeDay = spendingData.find(d => d.spending === maxSpending)?.date || '';

        return {
            volumeChange: `+${volumeChange}%`,
            spikeDay,
            spikeAmount: formatCurrency(maxSpending),
        };
    }, [spendingData]);

    // Department data
    const departmentData = useMemo(() => {
        const deptData = data.reduce((acc, row) => {
            const dept = row.city_department || row.department || 'Non spécifié';
            if (!acc[dept]) {
                acc[dept] = { name: dept, value: 0, transactions: 0 };
            }
            acc[dept].value += parseFloat(row.prix_plein_euros) || 0;
            acc[dept].transactions += 1;
            return acc;
        }, {} as Record<string, { name: string; value: number; transactions: number }>);

        const total = Object.values(deptData).reduce((sum, d) => sum + d.value, 0);
        return Object.values(deptData)
            .map(d => ({
                ...d,
                percentage: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 4);
    }, [data]);

    // Fuel type price data
    const fuelTypePriceData = useMemo(() => {
        const fuelData = data.reduce((acc, row) => {
            const fuelType = row.fuel_type || 'Non spécifié';
            const price = parseFloat(row.unit_price_euros) || 0;
            const volume = parseFloat(row.volume_liters) || 0;

            if (!acc[fuelType]) {
                acc[fuelType] = { name: fuelType, totalPrice: 0, totalVolume: 0, count: 0 };
            }
            acc[fuelType].totalPrice += price * volume;
            acc[fuelType].totalVolume += volume;
            acc[fuelType].count += 1;

            return acc;
        }, {} as Record<string, { name: string; totalPrice: number; totalVolume: number; count: number }>);

        return Object.values(fuelData)
            .map(f => ({
                name: f.name,
                avgPrice: f.totalVolume > 0 ? f.totalPrice / f.totalVolume : 0,
                volume: f.totalVolume,
            }))
            .sort((a, b) => b.avgPrice - a.avgPrice);
    }, [data]);

    const topDept = departmentData[0];

    // Render volume label for fuel type chart
    const renderVolumeLabel = (props: any) => {
        const { x, y, width, value, index } = props;
        const volume = fuelTypePriceData[index]?.volume || 0;
        const totalVolume = fuelTypePriceData.reduce((sum, d) => sum + d.volume, 0);
        const percentage = totalVolume > 0 ? ((volume / totalVolume) * 100).toFixed(0) : '0';

        return (
            <text
                x={x + width / 2}
                y={y - 6}
                fill="#64748b"
                textAnchor="middle"
                fontSize={9}
            >
                {formatNumber(volume)}L ({percentage}%)
            </text>
        );
    };

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {/* 1. ÉVOLUTION DÉPENSES & VOLUME */}
            <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--border)] p-4">
                <div className="mb-3">
                    <h3 className="text-[var(--foreground)]">
                        Évolution des Dépenses et Volume
                    </h3>
                    <p className="mt-0.5 text-[var(--muted-foreground)] text-[var(--text-xs)]">
                        Tendances sur les 30 derniers jours
                    </p>
                </div>

                {spendingData.length > 0 && (
                    <>
                        {/* NARRATIVE INSIGHT */}
                        <div className="mb-3 p-2 bg-[var(--muted)]/50 rounded-[var(--radius-sm)] border-l-2 border-l-[#4f46e5]">
                            <div className="flex items-start gap-1.5">
                                <Info className="size-3.5 text-[#4f46e5] mt-0.5 flex-shrink-0" />
                                <p className="text-[var(--foreground)] text-[var(--text-xs)]">
                                    Les dépenses suivent principalement le volume ({insights.volumeChange}) et non le prix (-2.1%).
                                    {insights.spikeDay && ` Pic le ${insights.spikeDay} à ${insights.spikeAmount}.`}
                                </p>
                            </div>
                        </div>

                        <div className="pb-2">
                            <ResponsiveContainer width="100%" height={340}>
                                <LineChart data={spendingData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} opacity={0.3} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#6B7280"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        stroke="#6B7280"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#6B7280"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #E5E7EB",
                                            borderRadius: "8px",
                                            fontSize: '11px'
                                        }}
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="spending"
                                        stroke="#4f46e5"
                                        strokeWidth={4}
                                        name="Dépenses (€)"
                                        dot={{ fill: "#4f46e5", r: 4, strokeWidth: 2, stroke: "#fff" }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="volume"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Volume (L)"
                                        dot={false}
                                        activeDot={{ r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* METRICS SUMMARY */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border)]">
                            <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-[var(--radius-sm)] border border-blue-200">
                                <label className="text-[var(--muted-foreground)] uppercase">Dépenses moyennes</label>
                                <div className="text-[var(--foreground)] text-[var(--text-lg)] font-[var(--font-weight-bold)]">
                                    {formatCurrency(spendingData.reduce((sum, d) => sum + d.spending, 0) / spendingData.length)}
                                </div>
                                <label className="text-[var(--muted-foreground)]">/jour</label>
                            </div>
                            <div className="p-2.5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-[var(--radius-sm)] border border-emerald-200">
                                <label className="text-[var(--muted-foreground)] uppercase">Volume total</label>
                                <div className="text-[var(--foreground)] text-[var(--text-lg)] font-[var(--font-weight-bold)]">
                                    {formatNumber(spendingData.reduce((sum, d) => sum + d.volume, 0))}L
                                </div>
                                <label className="text-[var(--muted-foreground)]">sur {spendingData.length} jours</label>
                            </div>
                            <div className="p-2.5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-[var(--radius-sm)] border border-orange-200">
                                <label className="text-[var(--muted-foreground)] uppercase">Coût moyen</label>
                                <div className="text-[var(--foreground)] text-[var(--text-lg)] font-[var(--font-weight-bold)]">
                                    {formatCurrency(spendingData.reduce((sum, d) => sum + d.spending, 0) / spendingData.reduce((sum, d) => sum + d.volume, 0))}
                                </div>
                                <label className="text-[var(--muted-foreground)]">/litre</label>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 2. DÉPENSES PAR DÉPARTEMENT */}
            {departmentData.length > 0 && (
                <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--border)] p-4">
                    <div className="mb-3">
                        <h3 className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }}>
                            Dépenses par Département
                        </h3>
                        <p className="mt-0.5 text-[var(--muted-foreground)]" style={{ fontSize: '11px' }}>
                            {topDept && `${topDept.name} représente ${topDept.percentage}% des dépenses totales`}
                        </p>
                    </div>

                    <div className="pb-2">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={departmentData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} opacity={0.3} />
                                <XAxis
                                    type="number"
                                    stroke="#6B7280"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#6B7280"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    width={70}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "8px",
                                        fontSize: '11px'
                                    }}
                                    formatter={(value: any, name: string, props: any) => {
                                        const percentage = props.payload.percentage;
                                        return [`${formatCurrency(value)} (${percentage}%)`, 'Dépenses'];
                                    }}
                                />
                                <Bar dataKey="value" name="Dépenses (€)" radius={[0, 4, 4, 0]}>
                                    {departmentData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "#4338ca" : "#5b6fee"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* 3. RÉPARTITION CARBURANT */}
            {fuelTypePriceData.length > 0 && (
                <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--border)] p-4">
                    <div className="mb-3">
                        <h3 className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-bold)' }}>
                            Prix Moyen par Type de Carburant
                        </h3>
                        <p className="mt-0.5 text-[var(--muted-foreground)]" style={{ fontSize: '11px' }}>
                            Comparaison des prix moyens par type
                        </p>
                    </div>

                    <div className="pb-2">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={fuelTypePriceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#6B7280"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    angle={-20}
                                    textAnchor="end"
                                    height={50}
                                />
                                <YAxis
                                    stroke="#6B7280"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "8px",
                                        fontSize: '11px'
                                    }}
                                    formatter={(value: any, name: string, props: any) => {
                                        const volume = props.payload.volume;
                                        return [`${formatCurrency(value)}/L (${formatNumber(volume)}L total)`, 'Prix moyen'];
                                    }}
                                />
                                <Bar
                                    dataKey="avgPrice"
                                    name="Prix moyen (€/L)"
                                    radius={[4, 4, 0, 0]}
                                >
                                    {fuelTypePriceData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "#EF4444" : index === 1 ? "#F59E0B" : "#5b6fee"}
                                        />
                                    ))}
                                </Bar>
                                <LabelList
                                    dataKey="avgPrice"
                                    content={renderVolumeLabel}
                                    position="top"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

