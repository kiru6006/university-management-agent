import React, { useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { MetricCard } from '../components/common/MetricCard';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Award
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { cases, metrics } = useCases();

  // Category distribution calculation
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    cases.forEach(c => {
      map[c.category] = (map[c.category] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [cases]);

  // Department distribution calculation
  const departmentCounts = useMemo(() => {
    const map: Record<string, number> = {};
    cases.forEach(c => {
      map[c.assignedDepartment] = (map[c.assignedDepartment] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [cases]);

  const overriddenCasesCount = cases.filter(c => c.isOverridden).length;
  const humanOverrideRate = Math.round((overriddenCasesCount / (cases.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-navy-900 to-slate-900 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <BarChart3 className="w-4 h-4" /> Management Intelligence Suite
          </div>
          <h2 className="text-xl font-bold tracking-tight">University AI Operations Analytics & SLA Report</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Real-time telemetry measuring semantic routing precision, departmental throughput, and SLA adherence.
          </p>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Automation Rate"
          value="88.5%"
          subtitle="Direct AI resolution & classification"
          icon={<Zap className="w-5 h-5" />}
          highlight
        />
        <MetricCard
          title="Average Resolution Turnaround"
          value="4.2 Hours"
          subtitle="Baseline was 48.0 hours"
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: '91% Faster', isPositive: true }}
        />
        <MetricCard
          title="Human Override Rate"
          value={`${humanOverrideRate}%`}
          subtitle={`${overriddenCasesCount} cases manually adjusted`}
          icon={<ShieldCheck className="w-5 h-5" />}
        />
        <MetricCard
          title="SLA Compliance Score"
          value="98.2%"
          subtitle="Cases actioned within target"
          icon={<Award className="w-5 h-5" />}
          trend={{ value: '+4.1%', isPositive: true }}
        />
      </div>

      {/* Visual Distributions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-brand-600" />
              Request Volume by Category
            </h3>
            <span className="text-xs text-slate-400">{cases.length} Total Requests</span>
          </div>

          <div className="space-y-3">
            {categoryCounts.map(([cat, count]) => {
              const pct = Math.round((count / (cases.length || 1)) * 100);
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-800">{cat}</span>
                    <span className="text-slate-500 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Workload Breakdown */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Departmental Queue Distribution
            </h3>
            <span className="text-xs text-slate-400">11 Active Units</span>
          </div>

          <div className="space-y-3">
            {departmentCounts.map(([dept, count]) => {
              const pct = Math.round((count / (cases.length || 1)) * 100);
              return (
                <div key={dept} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-800">{dept}</span>
                    <span className="text-slate-500 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
