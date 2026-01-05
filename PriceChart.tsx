import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PricePoint } from '../types';

interface PriceChartProps {
  data: PricePoint[];
  color?: string;
  height?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, color = "#00dc82", height = 300 }) => {
  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            hide 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e212b', borderColor: '#2a2f3e', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            // Fix: Recharts should use 'price' key from PricePoint object
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;