import { motion } from "framer-motion";
import { cn } from "../lib/utils";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 // Delay between each card showing up
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const BentoGrid = ({ className, children }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export const BentoCard = ({ className, title, icon: Icon, description, header, children }) => {
    return (
        <motion.div
            variants={itemVariants} // Use item variant
            whileHover={{ y: -5, scale: 1.01 }} // Added scale for pop
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-sm p-4 justify-between flex flex-col space-y-4",
                "bg-white border border-zinc-200",
                "dark:bg-zinc-900 dark:border-zinc-800",
                className
            )}
        >
            {header && (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                    {header}
                </div>
            )}

            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {Icon && (
                    <div className="mb-2 p-2 w-fit rounded-md transition-colors bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 group-hover/bento:text-white group-hover/bento:bg-blue-600 dark:group-hover/bento:bg-blue-600">
                        <Icon size={18} />
                    </div>
                )}
                <div className="font-bold mb-1 mt-2 text-zinc-900 dark:text-zinc-100">
                    {title}
                </div>
                <div className="font-normal text-xs text-zinc-500 dark:text-zinc-400">
                    {description}
                </div>
                {children}
            </div>
        </motion.div>
    );
};