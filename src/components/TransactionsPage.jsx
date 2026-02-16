import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function TransactionsPage({ transactions, currency }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, income, expense

    // Filter Logic
    const filteredData = transactions.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >

            {/* 1. Toolbar Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-0 z-30">

                {/* Search Input */}
                <div className="relative w-full sm:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all shadow-sm"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                    {/* Filter Pills */}
                    <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                        {['all', 'income', 'expense'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-300 relative ${filterType === type
                                        ? 'text-zinc-900 dark:text-white'
                                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                                    }`}
                            >
                                {filterType === type && (
                                    <motion.div
                                        layoutId="filter-pill"
                                        className="absolute inset-0 bg-white dark:bg-zinc-600 rounded-lg shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{type}</span>
                            </button>
                        ))}
                    </div>

                    {/* Export Button */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300 text-sm font-medium whitespace-nowrap">
                        <Download size={16} />
                        <span className="hidden sm:inline">Export CSV</span>
                    </button>
                </div>
            </div>

            {/* 2. Glassmorphic Table */}
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg shadow-zinc-200/20 dark:shadow-black/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">

                        <thead className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs">Transaction</th>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs">Category</th>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs">Date</th>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs text-right">Amount</th>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs text-right">Status</th>
                                <th className="p-5 font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                            <AnimatePresence mode="popLayout">
                                {filteredData.map((t) => (
                                    <motion.tr
                                        key={t.id}
                                        layout // Smooth shuffle animation
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                                    >

                                        {/* Title & Icon */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${t.type === 'income'
                                                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                        : 'bg-white border border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
                                                    }`}>
                                                    {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{t.title}</p>
                                                    <p className="text-xs text-zinc-400 hidden sm:block">ID: #{t.id.toString().slice(-4)}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="p-5">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                {t.category}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="p-5 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                                            {t.date}
                                        </td>

                                        {/* Amount - Uses Dynamic Currency */}
                                        <td className={`p-5 text-right font-bold font-mono ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'
                                            }`}>
                                            {t.type === 'income' ? '+' : ''}{currency}{t.amount.toFixed(2)}
                                        </td>

                                        {/* Status Pill */}
                                        <td className="p-5 text-right">
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${t.status === 'Completed'
                                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${t.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'
                                                    }`}></span>
                                                {t.status}
                                            </div>
                                        </td>

                                        {/* Action Menu */}
                                        <td className="p-5 text-center">
                                            <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>

                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredData.length === 0 && (
                        <div className="p-12 flex flex-col items-center justify-center text-zinc-400">
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                <Search size={24} className="opacity-50" />
                            </div>
                            <p className="text-lg font-medium text-zinc-900 dark:text-white">No transactions found</p>
                            <p className="text-sm">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>

                {/* 3. Pagination Footer */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex justify-between items-center">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Showing <span className="font-medium text-zinc-900 dark:text-white">{filteredData.length}</span> results
                    </span>
                    <div className="flex gap-2">
                        <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}