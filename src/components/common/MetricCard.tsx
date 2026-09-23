import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlight,
  alert,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-xl border transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-brand-300' : ''
      } ${
        alert
          ? 'bg-rose-50/60 border-rose-200'
          : highlight
          ? 'bg-gradient-to-br from-brand-50/50 to-white border-brand-200 shadow-sm'
          : 'bg-white border-slate-200/80 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        <div className={`p-2.5 rounded-lg ${alert ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-brand-600'}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-2xl font-bold tracking-tight ${alert ? 'text-rose-700' : 'text-slate-900'}`}>
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};
