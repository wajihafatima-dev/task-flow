import { CircleCheck, Clock, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  type: 'finished' | 'tracked' | 'efficiency';
  value: string | number;
  subtitle: string;
  change?: number;
  icon: LucideIcon;
}

export function StatsCard({ type, value, subtitle, change, icon: Icon }: StatsCardProps) {
  const getChangeColor = () => {
    if (change === undefined) return '';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangePrefix = () => {
    if (change === undefined) return '';
    return change > 0 ? '+' : '';
  };

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-2">{type === 'finished' ? 'Finished' : type === 'tracked' ? 'Tracked' : 'Efficiency'}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl">{value}</span>
            <span className="text-sm text-gray-500">{subtitle}</span>
          </div>
          {change !== undefined && (
            <div className={`text-sm mt-1 ${getChangeColor()}`}>
              {getChangePrefix()}{change} {type === 'tracked' ? 'hours' : '%'}
            </div>
          )}
        </div>
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
