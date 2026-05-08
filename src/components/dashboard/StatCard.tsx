import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { KPI } from "../../types/dashboard";
import { cn } from "../../lib/utils";

export function StatCard({ label, value, change, trend, loading }: KPI) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500"
    >
      <div className="relative z-10">
        <p className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
          <span className={cn(
            "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
            trend === 'up' ? "bg-emerald-500/10 text-emerald-400" : 
            trend === 'down' ? "bg-rose-500/10 text-rose-400" : 
            "bg-zinc-500/10 text-zinc-400"
          )}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      
      {/* Decorative gradient background */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-all duration-700" />
    </motion.div>
  );
}
