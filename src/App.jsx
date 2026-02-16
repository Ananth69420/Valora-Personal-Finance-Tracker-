import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import TransactionsPage from './components/TransactionsPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import AddTransactionModal from './components/AddTransactionModal';
import ThemeToggle from './components/ThemeToggle';
import ShinyButton from './components/ShinyButton';

// Initial Dummy Data (Used only if Local Storage is empty)
const INITIAL_DATA = [
  { id: 1, title: "Starbucks Coffee", category: "Food & Drink", amount: 450.00, date: "2026-02-16", type: "expense", status: "Completed" },
  { id: 2, title: "Freelance Client", category: "Income", amount: 24500.00, date: "2026-02-15", type: "income", status: "Completed" },
  { id: 3, title: "Apple Services", category: "Entertainment", amount: 1499.00, date: "2026-02-14", type: "expense", status: "Pending" },
  { id: 4, title: "Whole Foods", category: "Groceries", amount: 1250.00, date: "2026-02-12", type: "expense", status: "Completed" },
  { id: 5, title: "Uber Ride", category: "Transport", amount: 350.00, date: "2026-02-10", type: "expense", status: "Completed" },
];

const Background = () => (
  <div className="fixed inset-0 z-[-1] h-full w-full bg-gray-50 dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] transition-colors duration-300">
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-gray-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-300"></div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // --- STATE: Transactions with Persistence ---
  const [transactions, setTransactions] = useState(() => {
    // 1. Check local storage on load
    const saved = localStorage.getItem("finance_transactions");
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_DATA;
  });

  // --- STATE: Settings ---
  // Default to Indian Rupee (₹)
  const [currency, setCurrency] = useState({
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee'
  });

  const [notifications, setNotifications] = useState({ email: true, push: false });

  // --- EFFECT: Auto-save transactions ---
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    // Add new item to the TOP of the list
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="min-h-screen relative font-sans text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-blue-500/30">

      {/* Background Layer */}
      <Background />

      {/* Sidebar with Mobile Logic */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
        currencySymbol={currency.symbol} // Pass currency to modal
      />

      {/* Main Content Area */}
      <main className="lg:pl-64 transition-all duration-300 min-h-screen flex flex-col">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">

          {/* Header Section */}
          <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            {/* Mobile Menu & Title Group */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Hamburger Button (Mobile Only) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <Menu size={20} />
              </button>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold capitalize tracking-tight">
                  {activeTab}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1 hidden sm:block">
                  {activeTab === 'overview'
                    ? 'Welcome back, here is your financial health.'
                    : `Manage and track your ${activeTab}.`}
                </p>
              </div>
            </div>

            {/* Actions Group */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <ThemeToggle />
              <ShinyButton onClick={() => setIsModalOpen(true)}>
                <span className="hidden sm:inline">+ Add Transaction</span>
                <span className="sm:hidden">+ Add</span>
              </ShinyButton>
            </div>
          </header>

          {/* Dynamic Content Switching */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {activeTab === 'overview' && (
              <DashboardView
                transactions={transactions}
                setActiveTab={setActiveTab}
                currency={currency.symbol}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionsPage
                transactions={transactions}
                currency={currency.symbol}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsPage currency={currency.symbol} />
            )}

            {activeTab === 'settings' && (
              <SettingsPage
                currency={currency}
                setCurrency={setCurrency}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}

          </div>

        </div>
      </main>
    </div>
  );
}