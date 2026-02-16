import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Wallet } from 'lucide-react';

export default function RecentTransactions({ data = [], onViewAll }) {
    // Only show the latest 5 items
    const recentData = data.slice(0, 5);

    return (
        <div className="w-full h-full flex flex-col justify-between">

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {recentData.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-400 opacity-50">
                        <Wallet size={32} className="mb-2" />
                        <p className="text-sm">No recent transactions</p>
                    </div>
                ) : (
                    recentData.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 shadow-sm hover:shadow-md"
                        >
                            {/* Icon & Title Group */}
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income'
                                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500'
                                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                    }`}>
                                    {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>

                                <div>
                                    <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                                        {t.title}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.date}</p>
                                </div>
                            </div>

                            {/* Amount Display */}
                            <div className="text-right">
                                <p className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'
                                    }`}>
                                    {t.type === 'income' ? '+' : ''}{t.amount.toFixed(2)}
                                </p>
                                <p className={`text-xs ${t.status === 'Pending' ? 'text-amber-500' : 'text-zinc-400'
                                    }`}>
                                    {t.status}
                                </p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Animated Bottom Action Button */}
            <motion.button
                onClick={onViewAll}
                whileHover="hover"
                className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-4 transition-colors uppercase tracking-wider"
            >
                <span>View All Transactions</span>
                <motion.span
                    variants={{
                        hover: { x: 5 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <ArrowRight size={14} />
                </motion.span>
            </motion.button>
        </div>
    );
}