import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onAdd, currencySymbol }) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        onAdd({
            id: Date.now(),
            ...formData,
            amount: parseFloat(formData.amount),
            status: "Completed"
        });

        setFormData({ title: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0] });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Add Transaction</h2>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                <X size={20} className="text-zinc-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                {['expense', 'income'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type })}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${formData.type === type
                                            ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white'
                                            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                    placeholder="e.g. Grocery Shopping"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Amount ({currencySymbol})</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                    >
                                        <option>Food</option>
                                        <option>Transport</option>
                                        <option>Utilities</option>
                                        <option>Entertainment</option>
                                        <option>Salary</option>
                                        <option>Freelance</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Add Transaction
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}