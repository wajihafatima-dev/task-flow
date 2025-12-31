import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { PerformanceData } from '../types/page';

interface PerformanceChartProps {
  data: PerformanceData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">Performance</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">01-07 May</span>
          <button className="text-sm text-gray-400 hover:text-gray-600">▼</button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#9ca3af' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="lastMonth" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#f97316' }}
              activeDot={{ r: 6 }}
              name="Last month"
            />
            <Line 
              type="monotone" 
              dataKey="thisMonth" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#3b82f6' }}
              activeDot={{ r: 6 }}
              name="This month"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">This month</span>
          <span>7h</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">Last month</span>
          <span>6h</span>
        </div>
      </div>
    </div>
  );
}
