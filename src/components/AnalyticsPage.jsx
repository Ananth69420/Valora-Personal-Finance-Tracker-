import React from 'react';
import { motion } from 'framer-motion';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, AlertCircle, Wallet } from 'lucide-react';

const CATEGORY_DATA = [
    { name: 'Food', value: 4000, color: '#10b981' },
    { name: 'Rent', value: 12000, color: '#3b82f6' },
    { name: 'Transport', value: 3000, color: '#f59e0b' },
    { name: 'Ent.', value: 2000, color: '#ec4899' },
];

const HISTORY_DATA = [
    { month: 'Jan', income: 40000, expense: 24000 },
    { month: 'Feb', income: 30000, expense: 13980 },
    { month: 'Mar', income: 20000, expense: 58000 },
    { month: 'Apr', income: 27800, expense: 39080 },
];


const CustomTooltip = ({ active, payload, label, currency }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-2xl">
                <p className="text-zinc-400 text-xs mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm font-bold">
                        {entry.name}: {currency}{entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


export default function AnalyticsPage({ currency }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl"><TrendingUp size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Spending Alert</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Your expense on <span className="text-zinc-900 dark:text-white font-medium">Food & Dining</span> is <span className="text-red-500 font-bold">15% higher</span> than last month.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Expense by Category</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                {}
                                <Tooltip content={<CustomTooltip currency={currency} />} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-6">Income vs Expenses</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={HISTORY_DATA} barGap={8}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.2} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12 }}
                                    tickFormatter={(val) => `${currency}${val}`} 
                                />
                                <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: 'transparent' }} />
                                <Legend iconType="circle" />
                                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {}
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg"><Wallet size={20} /></div>
                        <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">Healthy</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-4">25% Saved</div>
                        <p className="text-xs text-emerald-600/60 dark:text-emerald-400/60 mt-1">You are saving 5% more than average.</p>
                    </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg"><AlertCircle size={20} /></div>
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold">Warning</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-4">Subscription Overload</div>
                        <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">You have 5 recurring payments this week.</p>
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                    <h4 className="text-zinc-500 text-sm mb-2">Total Net Worth</h4>
                    {}
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                        {currency}45,231.89
                    </div>
                    <div className="text-green-500 text-xs font-bold mt-2">+8.4% this year</div>
                </div>
            </div>
        </motion.div>
    );
}