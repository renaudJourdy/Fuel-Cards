import React, { useMemo } from 'react';
import { TrendingUp, Award, AlertTriangle, AlertCircle } from 'lucide-react';

interface FuelInsightsSectionProps {
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

export function FuelInsightsSection({ data }: FuelInsightsSectionProps) {
    // Top consumers by volume
    const topConsumers = useMemo(() => {
        const vehicles = data.reduce((acc, row) => {
            const plate = row.license_plate;
            if (!plate) return acc;

            if (!acc[plate]) {
                acc[plate] = {
                    vehicle: plate,
                    volume: 0,
                    spending: 0,
                    consumption_average: parseFloat(row.consumption_average) || 0,
                    consumption_real: [],
                    city: row.city || row.city_department || 'Non spécifié',
                };
            }

            acc[plate].volume += parseFloat(row.volume_liters) || 0;
            acc[plate].spending += parseFloat(row.prix_plein_euros) || 0;
            const real = parseFloat(row.consumption_real);
            if (!isNaN(real) && real > 0) {
                acc[plate].consumption_real.push(real);
            }

            return acc;
        }, {} as Record<string, any>);

        return Object.values(vehicles)
            .map((v: any) => {
                const avgReal = v.consumption_real.length > 0
                    ? v.consumption_real.reduce((sum: number, val: number) => sum + val, 0) / v.consumption_real.length
                    : 0;
                const deviation = v.consumption_average > 0
                    ? ((avgReal - v.consumption_average) / v.consumption_average) * 100
                    : 0;

                let efficiency = 'Bonne';
                if (deviation > 10) efficiency = 'Faible';
                else if (deviation > 5) efficiency = 'Moyenne';

                return {
                    vehicle: v.vehicle,
                    volume: v.volume,
                    spending: v.spending,
                    efficiency,
                    city: v.city,
                };
            })
            .sort((a: any, b: any) => b.volume - a.volume)
            .slice(0, 5);
    }, [data]);

    // Best performers
    const bestPerformers = useMemo(() => {
        const vehicles = data.reduce((acc, row) => {
            const plate = row.license_plate;
            if (!plate) return acc;

            if (!acc[plate]) {
                acc[plate] = {
                    vehicle: plate,
                    consumption_average: parseFloat(row.consumption_average) || 0,
                    consumption_real: [],
                };
            }

            const real = parseFloat(row.consumption_real);
            if (!isNaN(real) && real > 0) {
                acc[plate].consumption_real.push(real);
            }

            return acc;
        }, {} as Record<string, any>);

        return Object.values(vehicles)
            .map((v: any) => {
                const avgReal = v.consumption_real.length > 0
                    ? v.consumption_real.reduce((sum: number, val: number) => sum + val, 0) / v.consumption_real.length
                    : 0;
                const deviation = v.consumption_average > 0
                    ? ((avgReal - v.consumption_average) / v.consumption_average) * 100
                    : 0;

                return {
                    vehicle: v.vehicle,
                    efficiency: `${deviation >= 0 ? '+' : ''}${formatNumber(deviation)}%`,
                    real: avgReal,
                    theoretical: v.consumption_average,
                };
            })
            .filter((v: any) => Math.abs(parseFloat(v.efficiency)) <= 5)
            .sort((a: any, b: any) => Math.abs(parseFloat(a.efficiency)) - Math.abs(parseFloat(b.efficiency)))
            .slice(0, 3);
    }, [data]);

    // Anomalies
    const anomalies = useMemo(() => {
        const anomaliesList: Array<{
            type: string;
            vehicle: string;
            detail: string;
            date: string;
            severity: 'high' | 'warning' | 'medium';
        }> = [];

        // Check for high prices
        const prices = data.map(row => ({
            vehicle: row.license_plate,
            price: parseFloat(row.unit_price_euros) || 0,
            city: row.city || row.city_department || '',
            date: row.date_time,
        }));

        const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
        const highPrice = prices.find(p => p.price > avgPrice * 1.1);
        if (highPrice) {
            anomaliesList.push({
                type: 'Prix élevé',
                vehicle: highPrice.vehicle,
                detail: `${formatNumber(highPrice.price)}€/L à ${highPrice.city}`,
                date: highPrice.date ? new Date(highPrice.date).toLocaleDateString('fr-FR') : '',
                severity: 'warning',
            });
        }

        // Check for high consumption deviation
        const vehicles = data.reduce((acc, row) => {
            const plate = row.license_plate;
            if (!plate) return acc;

            if (!acc[plate]) {
                acc[plate] = {
                    vehicle: plate,
                    consumption_average: parseFloat(row.consumption_average) || 0,
                    consumption_real: [],
                    date: row.date_time,
                };
            }

            const real = parseFloat(row.consumption_real);
            if (!isNaN(real) && real > 0) {
                acc[plate].consumption_real.push(real);
            }

            return acc;
        }, {} as Record<string, any>);

        const highConsumption = Object.values(vehicles)
            .map((v: any) => {
                const avgReal = v.consumption_real.length > 0
                    ? v.consumption_real.reduce((sum: number, val: number) => sum + val, 0) / v.consumption_real.length
                    : 0;
                const deviation = v.consumption_average > 0
                    ? ((avgReal - v.consumption_average) / v.consumption_average) * 100
                    : 0;
                return { ...v, deviation };
            })
            .find((v: any) => v.deviation > 15);

        if (highConsumption) {
            anomaliesList.push({
                type: 'Surconsommation',
                vehicle: highConsumption.vehicle,
                detail: `+${formatNumber(highConsumption.deviation)}% vs théorique`,
                date: highConsumption.date ? new Date(highConsumption.date).toLocaleDateString('fr-FR') : '',
                severity: 'high',
            });
        }

        // Check for unusual volume
        const volumes = data.map(row => ({
            vehicle: row.license_plate,
            volume: parseFloat(row.volume_liters) || 0,
            date: row.date_time,
        }));

        const avgVolume = volumes.reduce((sum, v) => sum + v.volume, 0) / volumes.length;
        const unusualVolume = volumes.find(v => v.volume > avgVolume * 1.5);
        if (unusualVolume) {
            anomaliesList.push({
                type: 'Volume inhabituel',
                vehicle: unusualVolume.vehicle,
                detail: `${formatNumber(unusualVolume.volume)}L en une transaction`,
                date: unusualVolume.date ? new Date(unusualVolume.date).toLocaleDateString('fr-FR') : '',
                severity: 'medium',
            });
        }

        return anomaliesList.slice(0, 4);
    }, [data]);

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Consommateurs */}
            <div className="overflow-hidden rounded-[28px] bg-muted p-6 transition-all duration-300 hover:shadow-[var(--elevation-sm)]">
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100">
                            <TrendingUp className="size-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-foreground">Top Consommateurs</h3>
                            <p className="text-[var(--text-sm)] text-muted-foreground">Véhicules avec le plus fort volume</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {topConsumers.map((item: any, index: number) => (
                        <div key={item.vehicle} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-[var(--text-sm)] text-white shadow-sm">
                                {index + 1}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[var(--text-sm)] text-foreground">{item.vehicle}</span>
                                    <span
                                        className={`shrink-0 text-[var(--text-xs)] border-0 ${item.efficiency === "Faible"
                                                ? "bg-red-100 text-red-700"
                                                : item.efficiency === "Moyenne"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                            }`}
                                    >
                                        {item.efficiency}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-2 text-[var(--text-xs)] text-muted-foreground">
                                    <span className="truncate">{formatNumber(item.volume)}L</span>
                                    <span className="shrink-0">{formatCurrency(item.spending)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meilleurs Performances */}
            <div className="overflow-hidden rounded-[28px] bg-muted p-6 transition-all duration-300 hover:shadow-[var(--elevation-sm)]">
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100">
                            <Award className="size-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-foreground">Meilleurs Performances</h3>
                            <p className="text-[var(--text-sm)] text-muted-foreground">Efficacité énergétique optimale</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {bestPerformers.map((item: any, index: number) => (
                        <div key={item.vehicle} className="group flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-[var(--text-sm)] text-white shadow-sm">
                                {index + 1}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[var(--text-sm)] text-foreground">{item.vehicle}</span>
                                    <span className="shrink-0 text-[var(--text-xs)] text-emerald-600">{item.efficiency}</span>
                                </div>
                                <div className="truncate text-[var(--text-xs)] text-muted-foreground">
                                    Mesuré: {formatNumber(item.real)} vs Moyenne: {formatNumber(item.theoretical)} L/100km
                                </div>
                            </div>
                        </div>
                    ))}
                    {bestPerformers.length > 0 && (
                        <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-3.5 shadow-sm">
                            <div className="flex items-start gap-2 text-[var(--text-sm)] text-emerald-900">
                                <Award className="size-4 shrink-0 text-emerald-600" />
                                <span>Ces véhicules sont très proches de leur consommation théorique. Excellent!</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Alertes et Anomalies */}
            <div className="overflow-hidden rounded-[28px] bg-muted p-6 transition-all duration-300 hover:shadow-[var(--elevation-sm)]">
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100">
                            <AlertTriangle className="size-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-foreground">Alertes et Anomalies</h3>
                            <p className="text-[var(--text-sm)] text-muted-foreground">Surveillance des incidents</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {anomalies.length > 0 ? (
                        anomalies.map((item, index) => (
                            <div
                                key={index}
                                className={`group flex items-start gap-3 rounded-xl border p-3 transition-all duration-200 ${item.severity === "high"
                                        ? "border-red-200 bg-red-50/50 hover:bg-red-50 hover:shadow-sm"
                                        : item.severity === "warning"
                                            ? "border-orange-200 bg-orange-50/50 hover:bg-orange-50 hover:shadow-sm"
                                            : "border-yellow-200 bg-yellow-50/50 hover:bg-yellow-50 hover:shadow-sm"
                                    }`}
                            >
                                <div
                                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${item.severity === "high"
                                            ? "bg-red-100"
                                            : item.severity === "warning"
                                                ? "bg-orange-100"
                                                : "bg-yellow-100"
                                        }`}
                                >
                                    <AlertCircle
                                        className={`size-4 ${item.severity === "high"
                                                ? "text-red-600"
                                                : item.severity === "warning"
                                                    ? "text-orange-600"
                                                    : "text-yellow-600"
                                            }`}
                                    />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 overflow-hidden">
                                            <div className="truncate text-[var(--text-sm)] text-foreground">{item.type}</div>
                                            <div className="truncate text-[var(--text-xs)] text-muted-foreground">{item.vehicle}</div>
                                        </div>
                                        <span className="shrink-0 text-[var(--text-xs)] text-muted-foreground">{item.date}</span>
                                    </div>
                                    <div className="mt-1 text-[var(--text-xs)] text-foreground">{item.detail}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground p-4" style={{ fontSize: '14px' }}>
                            Aucune anomalie détectée
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

