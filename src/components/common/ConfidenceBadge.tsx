import React from 'react';
import { Sparkles } from 'lucide-react';

interface ConfidenceBadgeProps {
  score: number; // 0.0 - 1.0
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score }) => {
  const percentage = Math.round(score * 100);

  const getStyle = () => {
    if (percentage >= 90) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (percentage >= 75) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    } else {
      return 'bg-amber-50 text-amber-700 border-amber-300 ring-1 ring-amber-400/40';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${getStyle()}`}>
      <Sparkles className="w-3 h-3 mr-1 text-purple-600" />
      {percentage}% AI Match
    </span>
  );
};
