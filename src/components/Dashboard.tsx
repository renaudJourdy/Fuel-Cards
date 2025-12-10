import React, { useMemo, useState } from "react";
import {
  X,
  Filter,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FuelStatsCards } from "./FuelStatsCards";
import { FuelChartsSection } from "./FuelChartsSection";
import { FuelInsightsSection } from "./FuelInsightsSection";

interface DashboardProps {
  data: Array<Record<string, any>> | null;
  onFilterChange?: (filters: DashboardFilters) => void;
}

interface DashboardFilters {
  licensePlate?: string;
  fuelType?: string;
  city?: string;
  dateFrom?: string;
  dateTo?: string;
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const selectArrow =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")";

export function Dashboard({ data, onFilterChange }: DashboardProps) {
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<"kpis" | "performance" | "costs">("kpis");

  const filteredData = useMemo(() => {
    if (!data) return null;

    return data.filter((row) => {
      if (filters.licensePlate && row.license_plate !== filters.licensePlate) return false;
      if (filters.fuelType && row.fuel_type !== filters.fuelType) return false;
      if (filters.city && row.city !== filters.city && row.city_department !== filters.city) return false;

      if (filters.dateFrom || filters.dateTo) {
        const rowDate = new Date(row.date_time);
        if (filters.dateFrom && rowDate < new Date(filters.dateFrom)) return false;
        if (filters.dateTo && rowDate > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }, [data, filters]);

  const dataToUse = filteredData || data;

  const uniqueValues = useMemo(() => {
    if (!data) return { licensePlates: [], fuelTypes: [], cities: [] };

    const licensePlates = Array.from(new Set(data.map((row) => row.license_plate).filter(Boolean))).sort();
    const fuelTypes = Array.from(new Set(data.map((row) => row.fuel_type).filter(Boolean))).sort();
    const cities = Array.from(new Set(data.map((row) => row.city || row.city_department).filter(Boolean))).sort();

    return { licensePlates, fuelTypes, cities };
  }, [data]);

  const handleFilterChange = (key: keyof DashboardFilters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const today = new Date();
    let dateFrom: string | undefined;
    let dateTo: string | undefined;

    switch (period) {
      case "last30": {
        const last30 = new Date(today);
        last30.setDate(today.getDate() - 30);
        dateFrom = last30.toISOString().split("T")[0];
        dateTo = today.toISOString().split("T")[0];
        break;
      }
      case "currentMonth":
        dateFrom = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
        dateTo = today.toISOString().split("T")[0];
        break;
      case "lastMonth": {
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        dateFrom = firstDayLastMonth.toISOString().split("T")[0];
        dateTo = lastDayLastMonth.toISOString().split("T")[0];
        break;
      }
      case "custom":
        dateFrom = filters.dateFrom;
        dateTo = filters.dateTo;
        break;
      default:
        dateFrom = undefined;
        dateTo = undefined;
    }

    const newFilters = { ...filters, dateFrom, dateTo };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedPeriod("all");
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "");

  if (!dataToUse || dataToUse.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="text-center"
          style={{
            color: "var(--text-secondary, #6B7280)",
            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            fontSize: "var(--font-size-1rem, 16px)",
            fontWeight: "var(--font-weight-Medium, 500)",
            lineHeight: "var(--line-height-15-rem, 24px)",
            letterSpacing: "var(--letter-spacing-15-em, 0.25px)",
          }}
        >
          Aucune donnée disponible. Veuillez importer un fichier CSV.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-foreground leading-tight">
            Cartes Carburant
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Analysez vos transactions et optimisez vos dépenses carburant
          </p>
        </div>

        <motion.div
          className="bg-white border border-[var(--border)] rounded-[12px] shadow-sm w-full overflow-hidden"
          initial={false}
          animate={{ height: showFilters ? "auto" : "auto" }}
        >
          <div className="flex items-center justify-between p-[20px]">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-[10px] px-[16px] py-[10px] rounded-[10px] transition-all duration-200 hover:bg-neutral-50 active:scale-[0.98]"
              style={{
                color: "var(--text-primary, #030712)",
                fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <Filter className="size-[18px]" />
              <span>Filtres</span>
              {hasActiveFilters && (
                <span className="bg-indigo-600 text-white text-xs px-[8px] py-[3px] rounded-full font-medium">
                  {Object.values(filters).filter((v) => v).length}
                </span>
              )}
              <ChevronDown className={`size-[16px] transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-[6px] px-[12px] py-[8px] rounded-[8px] text-sm transition-colors hover:bg-neutral-50 active:scale-[0.98]"
                style={{
                  color: "var(--text-secondary, #6B7280)",
                  fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                }}
              >
                <X className="size-[14px]" />
                Réinitialiser
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-[20px] pb-[20px] border-t border-neutral-100">
                  <div className="mb-[20px]">
                    <label
                      className="block mb-[10px] text-sm font-medium"
                      style={{
                        color: "var(--text-secondary, #6B7280)",
                        fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                      }}
                    >
                      <Calendar className="inline size-[14px] mr-[6px]" />
                      Période
                    </label>
                    <div className="flex flex-wrap gap-[8px]">
                      {[
                        { value: "all", label: "Toutes les périodes" },
                        { value: "last30", label: "30 derniers jours" },
                        { value: "currentMonth", label: "Mois en cours" },
                        { value: "lastMonth", label: "Mois dernier" },
                        { value: "custom", label: "Période personnalisée" },
                      ].map((period) => (
                        <button
                          key={period.value}
                          onClick={() => handlePeriodChange(period.value)}
                          className={`px-[16px] py-[8px] rounded-[8px] text-sm font-medium transition-all duration-200 ${selectedPeriod === period.value
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            } active:scale-[0.98]`}
                          style={{
                            fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                          }}
                        >
                          {period.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedPeriod === "custom" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-[20px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                        <div className="flex flex-col gap-[8px]">
                          <label
                            className="text-sm font-medium"
                            style={{
                              color: "var(--text-secondary, #6B7280)",
                              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                            }}
                          >
                            Date de début
                          </label>
                          <input
                            type="date"
                            value={filters.dateFrom || ""}
                            onChange={(e) => {
                              handleFilterChange("dateFrom", e.target.value || undefined);
                              setSelectedPeriod("custom");
                            }}
                            className="px-[14px] py-[10px] border border-neutral-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            style={{
                              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[8px]">
                          <label
                            className="text-sm font-medium"
                            style={{
                              color: "var(--text-secondary, #6B7280)",
                              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                            }}
                          >
                            Date de fin
                          </label>
                          <input
                            type="date"
                            value={filters.dateTo || ""}
                            onChange={(e) => {
                              handleFilterChange("dateTo", e.target.value || undefined);
                              setSelectedPeriod("custom");
                            }}
                            className="px-[14px] py-[10px] border border-neutral-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            style={{
                              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                    <div className="flex flex-col gap-[8px]">
                      <label
                        className="text-sm font-medium"
                        style={{
                          color: "var(--text-secondary, #6B7280)",
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                        }}
                      >
                        Immatriculation
                      </label>
                      <select
                        value={filters.licensePlate || ""}
                        onChange={(e) => handleFilterChange("licensePlate", e.target.value || undefined)}
                        className="px-[14px] py-[10px] border border-neutral-200 rounded-[10px] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                          backgroundImage: selectArrow,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          paddingRight: "36px",
                        }}
                      >
                        <option value="">Toutes</option>
                        {uniqueValues.licensePlates.map((plate) => (
                          <option key={plate} value={plate}>
                            {plate}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <label
                        className="text-sm font-medium"
                        style={{
                          color: "var(--text-secondary, #6B7280)",
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                        }}
                      >
                        Type de Carburant
                      </label>
                      <select
                        value={filters.fuelType || ""}
                        onChange={(e) => handleFilterChange("fuelType", e.target.value || undefined)}
                        className="px-[14px] py-[10px] border border-neutral-200 rounded-[10px] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                          backgroundImage: selectArrow,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          paddingRight: "36px",
                        }}
                      >
                        <option value="">Tous</option>
                        {uniqueValues.fuelTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <label
                        className="text-sm font-medium"
                        style={{
                          color: "var(--text-secondary, #6B7280)",
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                        }}
                      >
                        Ville
                      </label>
                      <select
                        value={filters.city || ""}
                        onChange={(e) => handleFilterChange("city", e.target.value || undefined)}
                        className="px-[14px] py-[10px] border border-neutral-200 rounded-[10px] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        style={{
                          fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                          backgroundImage: selectArrow,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          paddingRight: "36px",
                        }}
                      >
                        <option value="">Toutes</option>
                        {uniqueValues.cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col gap-6 w-full">
          <FuelStatsCards data={dataToUse || []} />
          <FuelChartsSection data={dataToUse || []} />
          <FuelInsightsSection data={dataToUse || []} />
        </div>
      </div>
    </div>
  );
}
