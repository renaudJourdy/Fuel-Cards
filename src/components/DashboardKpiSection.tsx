import React from "react";
import { Calendar } from "lucide-react";

type Kpi = {
  key: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: keyof typeof colorClasses;
};

type KpiSectionProps = {
  title: string;
  subtitle: string;
  periodLabel?: string;
  kpiGroups: Kpi[][];
  colorClasses: typeof colorClasses;
};

const colorClasses = {
  indigo: "bg-indigo-50 text-indigo-600",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export function DashboardKpiSection({ title, subtitle, periodLabel, kpiGroups, colorClasses: palette }: KpiSectionProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div>
          <h3
            style={{
              color: "var(--text-primary, #030712)",
              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: "28px",
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm"
            style={{
              color: "var(--text-secondary, #6B7280)",
              fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
            }}
          >
            {subtitle}
          </p>
        </div>
        {periodLabel && (
          <div className="flex items-center gap-[8px] bg-indigo-50 text-indigo-700 px-[14px] py-[8px] rounded-[10px] border border-indigo-100">
            <Calendar className="size-[16px]" />
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-family-sans-serif, "Readex Pro")' }}>
              {periodLabel}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
        {kpiGroups.flat().map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.key}
              className="bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[16px] p-[20px] flex flex-col gap-[10px] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div
                  className="text-sm font-medium"
                  style={{
                    color: "var(--text-secondary, #6B7280)",
                    fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                  }}
                >
                  {kpi.label}
                </div>
                <div className={`p-[8px] rounded-[10px] ${palette[kpi.color]}`}>
                  <Icon className="size-[18px]" />
                </div>
              </div>
              <div
                className="text-3xl font-bold"
                style={{
                  color: "var(--text-primary, #030712)",
                  fontFamily: 'var(--font-family-sans-serif, "Readex Pro")',
                }}
              >
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { colorClasses };
