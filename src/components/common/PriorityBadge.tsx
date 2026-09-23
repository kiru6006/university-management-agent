import React from 'react';
import { Priority } from '../../types';
import { AlertCircle, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, showIcon = true }) => {
  const getStyle = () => {
    switch (priority) {
      case 'Critical':
        return {
          classes: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
          icon: <AlertCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />
        };
      case 'High':
        return {
          classes: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
          icon: <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />
        };
      case 'Medium':
        return {
          classes: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <ArrowUp className="w-3.5 h-3.5 mr-1 text-blue-600" />
        };
      case 'Low':
        return {
          classes: 'bg-slate-100 text-slate-600 border-slate-200',
          icon: <ArrowDown className="w-3.5 h-3.5 mr-1 text-slate-500" />
        };
      default:
        return {
          classes: 'bg-slate-100 text-slate-600 border-slate-200',
          icon: null
        };
    }
  };

  const { classes, icon } = getStyle();

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${classes}`}>
      {showIcon && icon}
      {priority}
    </span>
  );
};
