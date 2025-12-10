import React from "react";
import { MonthlyCostChart } from "./MonthlyCostChart";
import { TopLocationsChart } from "./TopLocationsChart";

type CostsSectionProps = {
  data: Array<Record<string, any>>;
};

export function DashboardCostsSection({ data }: CostsSectionProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-[16px] flex-1 min-h-0">
      <div className="xl:col-span-1 bg-white border border-neutral-200 rounded-[16px] shadow-sm p-[20px] flex flex-col min-h-[380px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")', color: "var(--text-primary, #030712)" }}
          >
            Évolution mensuelle des coûts
          </h4>
        </div>
        <div className="flex-1 min-h-[320px]">
          <MonthlyCostChart data={data} />
        </div>
      </div>

      <div className="xl:col-span-2 bg-white border border-neutral-200 rounded-[16px] shadow-sm p-[20px] flex flex-col min-h-[360px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")', color: "var(--text-primary, #030712)" }}
          >
            Top 10 des localisations
          </h4>
        </div>
        <div className="flex-1 min-h-[280px]">
          <TopLocationsChart data={data} topN={10} />
        </div>
      </div>
    </div>
  );
}
