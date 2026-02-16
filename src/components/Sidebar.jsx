import React from 'react';
import { LayoutDashboard, Wallet, PieChart, Settings, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", id: 'overview' },
    { icon: Wallet, label: "Transactions", id: 'transactions' },
    { icon: PieChart, label: "Analytics", id: 'analytics' },
    { icon: Settings, label: "Settings", id: 'settings' },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
    // Common sidebar content
    const SidebarContent = () => (
        <div className="h-full flex flex-col p-6">
            {/* Logo Area */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="font-bold text-white">V</span>
                    </div>
                    <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Valora</span>
                </div>
                {/* Close Button (Mobile Only) */}
                <button onClick={onClose} className="lg:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            onClose(); // Close sidebar on mobile when item clicked
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                            activeTab === item.id
                                ? "text-blue-600 dark:text-white"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                    >
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-blue-50 dark:bg-zinc-800 rounded-xl -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <item.icon size={20} className={cn("transition-colors", activeTab === item.id ? "text-blue-600 dark:text-white" : "group-hover:text-zinc-900 dark:group-hover:text-white")} />
                        <span className="font-medium">{item.label}</span>
                    </motion.button>
                ))}
            </nav>

            <button className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar: Visible only on lg screens */}
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 z-50">
                <SidebarContent />
            </div>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 z-50"
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}