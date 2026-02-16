import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Globe, Check, ChevronDown } from 'lucide-react';

const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function SettingsPage({ currency, setCurrency, notifications, setNotifications }) {
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

    
    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >

            {}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
                        <div className="w-full h-full rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 flex items-center justify-center overflow-hidden">
                            <span className="text-3xl font-bold text-zinc-400">AS</span>
                        </div>
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white border-4 border-white dark:border-zinc-900 hover:bg-blue-700 transition-colors">
                        <User size={14} />
                    </button>
                </div>

                <div className="text-center sm:text-left flex-1">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Ananth S</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">ananths4798@gmail.com</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 text-xs font-bold">Pro Member</span>
                    </div>
                </div>

                <button className="px-5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <Globe size={20} className="text-blue-500" />
                        General Preferences
                    </h3>

                    <div className="space-y-6">
                        {}
                        <div className="relative">
                            <label className="block text-sm text-zinc-500 dark:text-zinc-400 mb-2">Display Currency</label>
                            <button
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 transition-colors"
                            >
                                <span className="font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                                        {currency.symbol}
                                    </span>
                                    {currency.name} ({currency.code})
                                </span>
                                <ChevronDown size={16} className={`text-zinc-500 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {}
                            <AnimatePresence>
                                {isCurrencyOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden"
                                    >
                                        {CURRENCIES.map((c) => (
                                            <button
                                                key={c.code}
                                                onClick={() => {
                                                    setCurrency(c);
                                                    setIsCurrencyOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors text-left"
                                            >
                                                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                                                    <span className="font-mono text-zinc-400 w-6">{c.symbol}</span>
                                                    {c.name}
                                                </span>
                                                {currency.code === c.code && <Check size={16} className="text-blue-500" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <Bell size={20} className="text-amber-500" />
                        Notifications
                    </h3>
                    <div className="space-y-6">

                        {}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-zinc-900 dark:text-white font-medium">Email Alerts</span>
                                <span className="text-xs text-zinc-500">Weekly summaries</span>
                            </div>
                            <button
                                onClick={() => toggleNotification('email')}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifications.email ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'
                                    }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifications.email ? 'left-7' : 'left-1'
                                    }`} />
                            </button>
                        </div>

                        {}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-zinc-900 dark:text-white font-medium">Push Notifications</span>
                                <span className="text-xs text-zinc-500">Real-time transactions</span>
                            </div>
                            <button
                                onClick={() => toggleNotification('push')}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifications.push ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'
                                    }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifications.push ? 'left-7' : 'left-1'
                                    }`} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}