import { 
  BarChart3, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  PieChart, 
  Map,
  Sparkles,
  Search,
  Plus
} from "lucide-react";
import { motion } from "motion/react";
import { DashboardType } from "../../types/dashboard";
import { cn } from "../../lib/utils";

interface SidebarProps {
  activeTab: DashboardType;
  setActiveTab: (tab: DashboardType) => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'finance', label: 'Financial', icon: TrendingUp },
  { id: 'sales', label: 'Sales', icon: BarChart3 },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'customers', label: 'Customers', icon: PieChart },
  { id: 'forecasting', label: 'Forecasting', icon: Sparkles },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-72 h-screen glass-dark border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Aura AI
          </h1>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-2">Intelligence</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as DashboardType)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
              activeTab === item.id 
                ? "bg-white/10 text-white shadow-xl shadow-black/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              activeTab === item.id ? "scale-110" : "group-hover:scale-110"
            )} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto space-y-2 pt-6 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <div className="p-4 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 mt-4">
          <p className="text-xs text-zinc-400 mb-2">Enterprise Plan</p>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
          <button className="w-full text-[10px] uppercase font-bold tracking-widest text-white py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            Upgrade Capacity
          </button>
        </div>
      </div>
    </div>
  );
}
