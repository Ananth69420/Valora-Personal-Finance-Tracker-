import React from "react";
import { motion } from "framer-motion";

export default function ShinyButton({ onClick, children, className }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative group overflow-hidden px-6 py-2.5 rounded-xl font-bold text-white shadow-xl shadow-blue-500/20 transition-all ${className}`}
        >
            {}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-colors" />

            {}
            <div
                className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
                style={{ transform: 'skewX(-20deg)' }}
            />

            {}
            <div className="relative z-20 flex items-center gap-2">
                {children}
            </div>

            {}
            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
        </motion.button>
    );
}