import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  Download, 
  Share2, 
  Calendar,
  Sparkles,
  LogOut,
  LogIn
} from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { StatCard } from './components/dashboard/StatCard';
import { DashboardCharts } from './components/dashboard/Charts';
import { FileUpload } from './components/dashboard/FileUpload';
import { AIAssistant } from './components/dashboard/AIAssistant';
import { DashboardType, DashboardState } from './types/dashboard';
import { MOCK_DASHBOARD_DATA } from './constants/mockData';
import { cn } from './lib/utils';
import { useAuth } from './lib/AuthContext';

export default function App() {
  const { user, signIn, logout, userProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [customData, setCustomData] = useState<Record<string, DashboardState>>({});

  const userRole = userProfile?.role || 'viewer';
  const canEdit = userRole === 'admin' || userRole === 'editor';
  const isAdmin = userRole === 'admin';

  const data = customData[activeTab] || MOCK_DASHBOARD_DATA[activeTab] || MOCK_DASHBOARD_DATA.overview;

  const getDashboardTitle = () => {
    switch (activeTab) {
      case 'overview': return { main: 'Executive', sub: 'Overview' };
      case 'finance': return { main: 'Financial', sub: 'Analytics' };
      case 'sales': return { main: 'Sales', sub: 'Directives' };
      case 'employees': return { main: 'Human', sub: 'Capital' };
      case 'customers': return { main: 'Customer', sub: 'Intelligence' };
      case 'forecasting': return { main: 'Predictive', sub: 'Forecasting' };
      default: return { main: 'Executive', sub: 'Overview' };
    }
  };

  const title = getDashboardTitle();

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 ml-72 overflow-hidden flex flex-col pb-20">
        {/* Top Header */}
        <header className="h-20 glass-dark border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
              />
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>Oct 12 - Nov 12, 2024</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-xl transition-all">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-zinc-950" />
            </button>
            <div className="h-8 w-[1px] bg-white/5" />
            
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={logout}
                  className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">{user.displayName || user.email}</p>
                    <p className="text-[10px] text-zinc-500 font-medium capitalize">{userProfile?.role || 'Executive'}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-105 transition-transform">
                    {user.photoURL ? <img src={user.photoURL} alt="User" /> : <User className="w-5 h-5 text-zinc-400" />}
                  </div>
                </button>
              </div>
            ) : (
              <button 
                onClick={signIn}
                className="flex items-center gap-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-bold">Sign In</span>
              </button>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8 space-y-8 max-w-7xl mx-auto w-full"
          >
            {/* Hero Section */}
            <section className="flex items-end justify-between">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    Enterprise Dashboard
                  </div>
                </motion.div>
                <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
                  {title.main} <span className="text-zinc-500">{title.sub}</span>
                </h2>
                <p className="text-zinc-500 text-sm max-w-md">
                  {activeTab === 'overview' && "Real-time correlation of business performance metrics across all departments."}
                  {activeTab === 'finance' && "Deep dive into profit margins, operational expenditure, and capital efficiency."}
                  {activeTab === 'sales' && "Monitoring pipeline health, conversion velocities, and regional performance."}
                  {activeTab === 'employees' && "Strategic workforce planning, retention analytics, and productivity metrics."}
                  {activeTab === 'customers' && "Understanding behavioral cohorts, lifetime value, and sentiment trends."}
                  {activeTab === 'forecasting' && "AI-driven predictive modeling for future quarters based on historical data."}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 glass rounded-xl text-sm font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="px-4 py-2 glass rounded-xl text-sm font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export
                </button>
                {canEdit && (
                  <button className="px-5 py-2 bg-white text-zinc-950 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/10">
                    <Plus className="w-4 h-4" /> Add Widget
                  </button>
                )}
              </div>
            </section>

            {/* KPI Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.kpis.map((kpi, i) => (
                <StatCard 
                  key={`${activeTab}-${i}`} 
                  label={kpi.label}
                  value={kpi.value}
                  change={kpi.change}
                  trend={kpi.trend}
                  loading={kpi.loading}
                />
              ))}
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCharts 
                title={activeTab === 'overview' ? 'Revenue Correlation' : 'Growth Vectors'} 
                data={data.revenueData} 
                type="area" 
              />
              <DashboardCharts 
                title={activeTab === 'overview' ? 'Channel Acquisition' : 'Segment Distribution'} 
                data={data.salesData} 
                type={activeTab === 'sales' ? 'bar' : 'pie'} 
              />
            </section>

            {/* File Upload & More */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={cn(canEdit ? "lg:col-span-2" : "hidden")}>
                <FileUpload onDataAnalyzed={(newData) => {
                  setCustomData(prev => ({
                    ...prev,
                    [activeTab]: newData
                  }));
                }} />
              </div>
              <div className={cn("glass p-8 rounded-[32px] flex flex-col justify-between group overflow-hidden relative", !canEdit && "lg:col-span-3")}>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Aura AI Insights</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Based on current {activeTab} trends, your {activeTab === 'finance' ? 'burn rate' : 'efficiency'} is predicted to improve by <span className="text-emerald-400 font-bold">14%</span> in the next quarter.
                  </p>
                </div>
                
                <button className="relative z-10 w-full mt-8 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">
                  Full AI Report
                </button>

                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </section>
          </motion.div>
        </AnimatePresence>

        {/* AIAssistant */}
        <AIAssistant currentDashboardData={data} />
      </main>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}
