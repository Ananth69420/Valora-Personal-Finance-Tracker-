import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useTheme } from '../hooks/useTheme';

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl z-50">
                <p className="text-zinc-400 text-xs mb-1">{label}</p>
                <p className="text-emerald-400 text-sm font-bold">
                    +${payload[0].value}
                </p>
                <p className="text-rose-400 text-sm font-bold">
                    -${payload[1].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function OverviewChart() {
    const { theme } = useTheme();

    
    const gridColor = theme === 'dark' ? "#27272a" : "#e4e4e7"; 
    const axisColor = theme === 'dark' ? "#52525b" : "#71717a"; 

    return (
        <div className="h-full w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

                    <XAxis
                        dataKey="name"
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                    />
                    <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorExpense)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}