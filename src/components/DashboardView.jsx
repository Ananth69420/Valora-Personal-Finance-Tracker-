import React from 'react';
import { BentoGrid, BentoCard } from './BentoGrid';
import OverviewChart from './OverviewChart';
import RecentTransactions from './RecentTransactions';
import AnimatedCounter from './AnimatedCounter';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    CreditCard,
    Wallet
} from 'lucide-react';

export default function DashboardView({ transactions, setActiveTab, currency }) {
    return (
        <BentoGrid className="max-w-4xl mx-0">

            {/* 1. Main Balance Card - Spans 2 columns */}
            <BentoCard
                title="Total Balance"
                description="Available across all accounts"
                icon={Wallet}
                className="md:col-span-2"
                header={
                    <div className="flex items-center justify-center w-full h-full bg-zinc-50 dark:bg-zinc-900/50">
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                            {/* Pass the dynamic currency symbol here */}
                            <AnimatedCounter value={24562.00} prefix={currency} />
                        </h1>
                        <span className="ml-3 px-2 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs rounded-full font-medium">
                            +12%
                        </span>
                    </div>
                }
            />

            {/* 2. Monthly Budget Card */}
            <BentoCard
                title="Monthly Budget"
                description="You have spent 65% of your limit."
                icon={CreditCard}
                className="md:col-span-1"
                header={
                    <div className="p-4 w-full h-full flex items-center justify-center">
                        <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 w-[65%] shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1000 ease-out"
                                style={{ width: '65%' }}
                            />
                        </div>
                    </div>
                }
            />

            {/* 3. Income Card */}
            <BentoCard
                title="Income"
                description="Last 30 days"
                icon={TrendingUp}
                className="md:col-span-1"
            >
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                    <AnimatedCounter value={8250.00} prefix={currency} />
                </div>
            </BentoCard>

            {/* 4. Expenses Card */}
            <BentoCard
                title="Expenses"
                description="Last 30 days"
                icon={TrendingDown}
                className="md:col-span-1"
            >
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-2">
                    <AnimatedCounter value={3400.00} prefix={currency} />
                </div>
            </BentoCard>

            {/* 5. Recent Activity */}
            <BentoCard
                title="Recent Activity"
                description="Latest 5 transactions"
                icon={Activity}
                className="md:col-span-1 md:row-span-2"
            >
                <div className="mt-4 h-[320px]">
                    <RecentTransactions
                        data={transactions}
                        onViewAll={() => setActiveTab('transactions')}
                        currency={currency} // Optional: Pass currency if RecentTransactions uses it
                    />
                </div>
            </BentoCard>

            {/* 6. Cash Flow Chart */}
            <BentoCard
                title="Cash Flow"
                description="Income vs Expenses over time"
                icon={Activity}
                className="md:col-span-2 md:row-span-2 min-h-[300px]"
                header={
                    <div className="w-full h-64 p-4">
                        <OverviewChart />
                    </div>
                }
            />

        </BentoGrid>
    );
}