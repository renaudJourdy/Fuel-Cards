import React, { useMemo } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Wrench } from 'lucide-react';

interface FuelStatsCardsProps {
    data: Array<Record<string, any>>;
}

// Semantic color helper
const getTrendColor = (trend: "good" | "bad" | "neutral" | "warning") => {
    switch (trend) {
        case "good": return "text-[#10B981]";
        case "bad": return "text-[#DC2626]";
        case "warning": return "text-[#F59E0B]";
        case "neutral": return "text-[#6B7280]";
    }
};

// Helper functions
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

// Hero KPI - Efficiency Deviation
function HeroKPI({ data }: { data: Array<Record<string, any>> }) {
    // Calculate fleet average consumption
    const fleetAverage = useMemo(() => {
        const consumptions = data
            .map(row => parseFloat(row.consumption_average))
            .filter(val => !isNaN(val) && val > 0);
        return consumptions.length > 0
            ? consumptions.reduce((sum, val) => sum + val, 0) / consumptions.length
            : 0;
    }, [data]);

    // Calculate average real consumption
    const averageReal = useMemo(() => {
        const consumptions = data
            .map(row => parseFloat(row.consumption_real))
            .filter(val => !isNaN(val) && val > 0);
        return consumptions.length > 0
            ? consumptions.reduce((sum, val) => sum + val, 0) / consumptions.length
            : 0;
    }, [data]);

    // Calculate deviation percentage
    const deviation = fleetAverage > 0 ? ((averageReal - fleetAverage) / fleetAverage) * 100 : 0;
    const trendDirection = deviation > 0 ? "up" : "down";
    const trendValue = `${deviation >= 0 ? '+' : ''}${deviation.toFixed(1)}pts`;
    const isImproving = deviation <= 0;

    // Calculate wasted cost and liters
    const wastedData = useMemo(() => {
        let wastedLiters = 0;
        let wastedCost = 0;

        data.forEach(row => {
            const avg = parseFloat(row.consumption_average) || 0;
            const real = parseFloat(row.consumption_real) || 0;
            const volume = parseFloat(row.volume_liters) || 0;
            const price = parseFloat(row.unit_price_euros) || 0;

            if (avg > 0 && real > avg) {
                const excessLiters = (real - avg) * (volume / real);
                wastedLiters += excessLiters;
                wastedCost += excessLiters * price;
            }
        });

        return { wastedLiters, wastedCost };
    }, [data]);

    // Calculate standard deviation
    const stdDeviation = useMemo(() => {
        const deviations = data
            .map(row => {
                const avg = parseFloat(row.consumption_average) || 0;
                const real = parseFloat(row.consumption_real) || 0;
                return avg > 0 ? real - avg : 0;
            })
            .filter(d => d !== 0);

        if (deviations.length === 0) return 0;

        const mean = deviations.reduce((sum, d) => sum + d, 0) / deviations.length;
        const variance = deviations.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / deviations.length;
        return Math.sqrt(variance);
    }, [data]);

    // Count vehicles outside normal range (>5% deviation)
    const outOfNorm = useMemo(() => {
        return data.filter(row => {
            const avg = parseFloat(row.consumption_average) || 0;
            const real = parseFloat(row.consumption_real) || 0;
            if (avg === 0) return false;
            const percentDiff = ((real - avg) / avg) * 100;
            return Math.abs(percentDiff) > 5;
        }).length;
    }, [data]);

    // Count anomalies (vehicles with >10% deviation)
    const anomalies = useMemo(() => {
        return data.filter(row => {
            const avg = parseFloat(row.consumption_average) || 0;
            const real = parseFloat(row.consumption_real) || 0;
            if (avg === 0) return false;
            const percentDiff = ((real - avg) / avg) * 100;
            return percentDiff > 10;
        }).length;
    }, [data]);

    // Get top 3 offenders
    const topOffenders = useMemo(() => {
        const vehicles = data.reduce((acc, row) => {
            const plate = row.license_plate;
            if (!plate) return acc;

            if (!acc[plate]) {
                acc[plate] = {
                    license_plate: plate,
                    consumption_average: parseFloat(row.consumption_average) || 0,
                    consumption_real: [],
                    volume: 0,
                };
            }

            const real = parseFloat(row.consumption_real);
            if (!isNaN(real) && real > 0) {
                acc[plate].consumption_real.push(real);
            }
            acc[plate].volume += parseFloat(row.volume_liters) || 0;

            return acc;
        }, {} as Record<string, any>);

        return Object.values(vehicles)
            .map((v: any) => {
                const avgReal = v.consumption_real.length > 0
                    ? v.consumption_real.reduce((sum: number, val: number) => sum + val, 0) / v.consumption_real.length
                    : 0;
                const percentDiff = v.consumption_average > 0
                    ? ((avgReal - v.consumption_average) / v.consumption_average) * 100
                    : 0;
                return {
                    id: v.license_plate,
                    consumption: `${formatNumber(avgReal)} L/100km`,
                    deviation: `${percentDiff >= 0 ? '+' : ''}${formatNumber(percentDiff)}%`,
                };
            })
            .filter((v: any) => parseFloat(v.deviation) > 0)
            .sort((a: any, b: any) => parseFloat(b.deviation) - parseFloat(a.deviation))
            .slice(0, 3);
    }, [data]);

    // Calculate annual projection
    const annualProjection = wastedData.wastedCost * 12;

    // Calculate top 5 vehicles impact percentage
    const top5Impact = useMemo(() => {
        const vehicles = data.reduce((acc, row) => {
            const plate = row.license_plate;
            if (!plate) return acc;

            if (!acc[plate]) {
                acc[plate] = {
                    license_plate: plate,
                    consumption_average: parseFloat(row.consumption_average) || 0,
                    consumption_real: [],
                    volume: 0,
                    price: 0,
                };
            }

            const real = parseFloat(row.consumption_real);
            if (!isNaN(real) && real > 0) {
                acc[plate].consumption_real.push(real);
            }
            acc[plate].volume += parseFloat(row.volume_liters) || 0;
            acc[plate].price = parseFloat(row.unit_price_euros) || 0;

            return acc;
        }, {} as Record<string, any>);

        const vehicleCosts = Object.values(vehicles)
            .map((v: any) => {
                const avgReal = v.consumption_real.length > 0
                    ? v.consumption_real.reduce((sum: number, val: number) => sum + val, 0) / v.consumption_real.length
                    : 0;
                if (v.consumption_average === 0 || avgReal <= v.consumption_average) return 0;
                const excessLiters = (avgReal - v.consumption_average) * (v.volume / avgReal);
                return excessLiters * v.price;
            })
            .filter((cost: number) => cost > 0)
            .sort((a: number, b: number) => b - a);

        const top5Cost = vehicleCosts.slice(0, 5).reduce((sum, cost) => sum + cost, 0);
        const totalCost = vehicleCosts.reduce((sum, cost) => sum + cost, 0);

        return totalCost > 0 ? (top5Cost / totalCost) * 100 : 0;
    }, [data]);

    const wastedCostFormatted = formatCurrency(wastedData.wastedCost);
    const wastedLitersFormatted = `${formatNumber(wastedData.wastedLiters)} L`;

    return (
        <div className="relative border border-[var(--border)] border-t-4 border-t-[#f59e0b] bg-white rounded-[var(--radius-lg)] p-3 mb-4">
            {/* Alert indicator */}
            <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 bg-[#f59e0b] text-white px-2 py-0.5 rounded-[var(--radius-sm)]">
                    <AlertTriangle className="size-3" />
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em' }}>ATTENTION</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3">
                {/* Main deviation metric */}
                <div>
                    <div className="mb-0.5">
                        <span className="text-[var(--muted-foreground)]" style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Écart vs Objectif Cible
                        </span>
                    </div>

                    {/* HERO VALUE */}
                    <div className="mb-1">
                        <span className="text-[#f59e0b]" style={{ fontSize: '60px', fontWeight: 'var(--font-weight-bold)', lineHeight: '0.85' }}>
                            {deviation >= 0 ? '+' : ''}{formatNumber(deviation)}%
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                        <TrendingUp className="size-3 text-[#f59e0b]" />
                        <span className="text-[#f59e0b]" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)' }}>
                            {trendValue}
                        </span>
                        <span className="text-[var(--muted-foreground)]" style={{ fontSize: '10px' }}>
                            • Léger écart par rapport à la moyenne flotte
                        </span>
                    </div>

                    {/* Explanation */}
                    <div className="mb-1.5">
                        <p className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                            Consommation mesurée: <span style={{ fontWeight: 'var(--font-weight-bold)' }}>{formatNumber(averageReal)} L/100km</span> • Moyenne flotte: <span className="text-[var(--muted-foreground)]">{formatNumber(fleetAverage)} L/100km</span>
                        </p>
                    </div>

                    {/* Statistical context */}
                    <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                        <div className="bg-[var(--muted)]/50 rounded-[var(--radius-sm)] px-1.5 py-1">
                            <div className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', letterSpacing: '0.03em' }}>
                                ÉCART-TYPE
                            </div>
                            <div className="text-[var(--foreground)]" style={{ fontSize: '16px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.1' }}>
                                ±{formatNumber(stdDeviation)} L
                            </div>
                        </div>
                        <div className="bg-[var(--muted)]/50 rounded-[var(--radius-sm)] px-1.5 py-1">
                            <div className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', letterSpacing: '0.03em' }}>
                                HORS NORME
                            </div>
                            <div className="text-[#f59e0b]" style={{ fontSize: '16px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.1' }}>
                                {outOfNorm} / {new Set(data.map((r: any) => r.license_plate).filter(Boolean)).size}
                            </div>
                        </div>
                        <div className="bg-[var(--muted)]/50 rounded-[var(--radius-sm)] px-1.5 py-1">
                            <div className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', letterSpacing: '0.03em' }}>
                                ANOMALIES
                            </div>
                            <div className="text-[#f59e0b]" style={{ fontSize: '16px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.1' }}>
                                {anomalies}
                            </div>
                        </div>
                    </div>

                    {/* Top 3 offenders */}
                    <div className="space-y-0.5">
                        <div className="text-neutral-600" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.03em' }}>
                            VÉHICULES LES PLUS IMPACTANTS
                        </div>
                        {topOffenders.map((vehicle: any) => (
                            <div
                                key={vehicle.id}
                                className="flex items-center justify-between rounded-[var(--radius-sm)] px-2 py-0.5 bg-[var(--muted)]/30"
                            >
                                <span className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                                    {vehicle.id}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--muted-foreground)]" style={{ fontSize: '9px', fontWeight: 'var(--font-weight-normal)' }}>
                                        {vehicle.consumption}
                                    </span>
                                    <span className="text-[#B91C1C]" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)' }}>
                                        {vehicle.deviation}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cost impact + ACTIONS */}
                <div className="space-y-2">
                    {/* Financial impact */}
                    <div className="bg-[#fff7ed] border-2 border-[#f59e0b] rounded-[var(--radius-md)] p-2.5">
                        <div className="mb-1">
                            <span className="text-[#92400e]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Impact Financier
                            </span>
                        </div>

                        <div className="mb-0.5">
                            <span className="text-[var(--muted-foreground)]" style={{ fontSize: '9px' }}>
                                Surconsommation ce mois
                            </span>
                        </div>
                        {/* MONTHLY COST */}
                        <div className="mb-0.5">
                            <span className="text-[#f59e0b]" style={{ fontSize: '40px', fontWeight: 'var(--font-weight-bold)', lineHeight: '0.95' }}>
                                {wastedCostFormatted}
                            </span>
                        </div>
                        <div className="text-[#92400e] mb-2" style={{ fontSize: '9px' }}>
                            {wastedLitersFormatted} gaspillés • <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Basé uniquement sur l'écart à la moyenne flotte</span>
                        </div>

                        {/* DATA INTEGRATION */}
                        <div className="mb-2 p-1.5 bg-white/60 rounded-[var(--radius-sm)]">
                            <span className="text-[var(--foreground)]" style={{ fontSize: '9px', lineHeight: '1.4' }}>
                                Les <span style={{ fontWeight: 'var(--font-weight-bold)' }}>5 véhicules</span> les plus écartés représentent <span style={{ fontWeight: 'var(--font-weight-bold)' }}>{formatNumber(top5Impact)}%</span> du surcoût total
                            </span>
                        </div>

                        {/* ANNUAL PROJECTION */}
                        <div className="pt-1.5 border-t border-[#f59e0b]/30">
                            <div className="mb-0.5">
                                <span className="text-[#92400e]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase' }}>
                                    Projection Annuelle
                                </span>
                            </div>
                            <div>
                                <span className="text-[#f59e0b]" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                                    ~{formatCurrency(annualProjection)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONABLE RECOMMENDATIONS */}
                    <div className="bg-white border border-[#f59e0b] rounded-[var(--radius-md)] p-2">
                        <div className="flex items-center gap-1 mb-1">
                            <Wrench className="size-3 text-[#f59e0b]" />
                            <span className="text-[#f59e0b]" style={{ fontSize: '9px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                Actions Recommandées
                            </span>
                        </div>
                        <div className="space-y-1">
                            {topOffenders.length > 0 && (
                                <div className="space-y-0.5">
                                    <div className="flex gap-1.5">
                                        <span className="flex-shrink-0 flex items-center justify-center size-3.5 rounded-full bg-[#f59e0b] text-white" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)' }}>
                                            1
                                        </span>
                                        <span className="text-[var(--foreground)]" style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.4' }}>
                                            {topOffenders[0].id} : {topOffenders[0].deviation} vs moyenne flotte
                                        </span>
                                    </div>
                                    <div className="ml-5">
                                        <span className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', lineHeight: '1.3' }}>
                                            {topOffenders[0].consumption} mesuré
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-0.5">
                                <div className="flex gap-1.5">
                                    <span className="flex-shrink-0 flex items-center justify-center size-3.5 rounded-full bg-[#f59e0b] text-white" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)' }}>
                                        2
                                    </span>
                                    <span className="text-[var(--foreground)]" style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.4' }}>
                                        Examiner les comportements des véhicules &gt; +20% vs flotte
                                    </span>
                                </div>
                                <div className="ml-5">
                                    <span className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', lineHeight: '1.3' }}>
                                        Identifier causes d'écarts élevés
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex gap-1.5">
                                    <span className="flex-shrink-0 flex items-center justify-center size-3.5 rounded-full bg-[#f59e0b] text-white" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)' }}>
                                        3
                                    </span>
                                    <span className="text-[var(--foreground)]" style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.4' }}>
                                        Prioriser actions sur les 5 véhicules concentrant {formatNumber(top5Impact)}% du coût
                                    </span>
                                </div>
                                <div className="ml-5">
                                    <span className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', lineHeight: '1.3' }}>
                                        Potentiel récupérable : ~{wastedCostFormatted}/mois
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Critical KPIs
function CriticalKPI({ label, value, change, trend, subtext }: {
    label: string;
    value: string;
    change: string;
    trend: "good" | "bad" | "neutral" | "warning";
    subtext: string;
}) {
    return (
        <div className="border border-[var(--border)] rounded-[var(--radius-md)] p-2.5 bg-[var(--card)]">
            <div className="mb-0.5">
                <span className="text-[var(--muted-foreground)]" style={{ fontSize: '9px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {label}
                </span>
            </div>

            <div className="mb-0.5">
                <span className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.1' }}>
                    {value}
                </span>
            </div>

            <div className="flex items-center gap-1 mb-0.5">
                {change.startsWith("+") ? (
                    <TrendingUp className={`size-3 ${getTrendColor(trend)}`} />
                ) : (
                    <TrendingDown className={`size-3 ${getTrendColor(trend)}`} />
                )}
                <span className={getTrendColor(trend)} style={{ fontSize: '10px', fontWeight: 'var(--font-weight-medium)' }}>
                    {change}
                </span>
            </div>

            <div>
                <span className="text-[var(--muted-foreground)]" style={{ fontSize: '9px' }}>
                    {subtext}
                </span>
            </div>
        </div>
    );
}

// Context KPI
function ContextKPI({ label, value, change, trend }: {
    label: string;
    value: string;
    change: string;
    trend: "good" | "bad" | "neutral" | "warning";
}) {
    return (
        <div className="p-1.5 bg-[var(--muted)]/20">
            <div className="mb-0.5">
                <span className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-medium)', letterSpacing: '0.02em' }}>
                    {label}
                </span>
            </div>

            <div className="mb-0.5">
                <span className="text-[var(--foreground)]" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)' }}>
                    {value}
                </span>
            </div>

            {change !== "N/A" && (
                <div className="flex items-center gap-0.5">
                    {change.startsWith("+") ? (
                        <TrendingUp className={`size-2 ${getTrendColor(trend)}`} />
                    ) : (
                        <TrendingDown className={`size-2 ${getTrendColor(trend)}`} />
                    )}
                    <span className={getTrendColor(trend)} style={{ fontSize: '9px', fontWeight: 'var(--font-weight-medium)' }}>
                        {change}
                    </span>
                </div>
            )}
        </div>
    );
}

export function FuelStatsCards({ data }: FuelStatsCardsProps) {
    // Calculate critical metrics
    const metrics = useMemo(() => {
        const totalCost = data.reduce((sum, row) => sum + (parseFloat(row.prix_plein_euros) || 0), 0);
        const totalVolume = data.reduce((sum, row) => sum + (parseFloat(row.volume_liters) || 0), 0);
        const avgPrice = totalVolume > 0 ? totalCost / totalVolume : 0;
        const costPerTransaction = data.length > 0 ? totalCost / data.length : 0;

        return {
            totalCost,
            totalVolume,
            avgPrice,
            costPerTransaction,
        };
    }, [data]);

    // Calculate min/max prices
    const prices = useMemo(() => {
        const priceValues = data
            .map(row => parseFloat(row.unit_price_euros))
            .filter(val => !isNaN(val) && val > 0);
        return {
            min: priceValues.length > 0 ? Math.min(...priceValues) : 0,
            max: priceValues.length > 0 ? Math.max(...priceValues) : 0,
        };
    }, [data]);

    return (
        <div className="space-y-4">
            {/* HERO: Efficiency Deviation */}
            <HeroKPI data={data} />

            {/* Critical Metrics */}
            <div>
                <div className="mb-1.5">
                    <h4 className="text-[var(--foreground)]" style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Métriques Critiques
                    </h4>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    <CriticalKPI
                        label="Dépenses Totales"
                        value={formatCurrency(metrics.totalCost)}
                        change="+3.9%"
                        trend="bad"
                        subtext={`${formatCurrency(metrics.totalCost)} total`}
                    />
                    <CriticalKPI
                        label="Prix Moyen Carburant"
                        value={`${formatNumber(metrics.avgPrice)} €/L`}
                        change="+1.3%"
                        trend="bad"
                        subtext="Stabilité des prix sur la période analysée"
                    />
                    <CriticalKPI
                        label="Coût par Transaction"
                        value={formatCurrency(metrics.costPerTransaction)}
                        change="−4.2%"
                        trend="good"
                        subtext="Coût par transaction en baisse — volume élevé"
                    />
                </div>
            </div>

            {/* Context */}
            <div>
                <div className="mb-1">
                    <h4 className="text-[var(--muted-foreground)]" style={{ fontSize: '8px', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Contexte Opérationnel
                    </h4>
                </div>
                <div className="grid gap-1 grid-cols-2 lg:grid-cols-4">
                    <ContextKPI
                        label="VOLUME TOTAL"
                        value={`${formatNumber(metrics.totalVolume)} L`}
                        change="+3.1%"
                        trend="neutral"
                    />
                    <ContextKPI
                        label="TRANSACTIONS"
                        value={`${data.length}`}
                        change="+0.0%"
                        trend="neutral"
                    />
                    <ContextKPI
                        label="PRIX MIN"
                        value={`${formatNumber(prices.min)} €/L`}
                        change="N/A"
                        trend="neutral"
                    />
                    <ContextKPI
                        label="PRIX MAX"
                        value={`${formatNumber(prices.max)} €/L`}
                        change="N/A"
                        trend="neutral"
                    />
                </div>
            </div>
        </div>
    );
}

