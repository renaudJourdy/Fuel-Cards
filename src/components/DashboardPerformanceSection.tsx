import React from "react";
import { ConsumptionChart } from "./ConsumptionChart";
import { FuelTypeChart } from "./FuelTypeChart";

type PerformanceSectionProps = {
  data: Array<Record<string, any>>;
  onVehicleClick?: (licensePlate: string) => void;
};

export function DashboardPerformanceSection({ data, onVehicleClick }: PerformanceSectionProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-[16px] flex-1 min-h-0">
      <div className="xl:col-span-2 bg-white border border-neutral-200 rounded-[16px] shadow-sm p-[20px] flex flex-col min-h-[380px]">
        <div className="flex items-center justify-between mb-[12px]">
          <div>
            <h4
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")', color: "var(--text-primary, #030712)" }}
            >
              Consommation par véhicule
            </h4>
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")', color: "var(--text-secondary, #6B7280)" }}
            >
              Surperformance vs moyenne constructeur, cliquable pour filtrer.
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[320px]">
          <ConsumptionChart data={data} onVehicleClick={onVehicleClick} />
        </div>
      </div>

      <div className="xl:col-span-1 bg-white border border-neutral-200 rounded-[16px] shadow-sm p-[20px] flex flex-col min-h-[360px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")', color: "var(--text-primary, #030712)" }}
          >
            Mix carburant
          </h4>
        </div>
        <div className="flex-1 min-h-[280px]">
          <FuelTypeChart data={data} />
        </div>
      </div>
    </div>
  );
}
