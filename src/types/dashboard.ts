export interface KPI {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  loading?: boolean;
  key?: string;
}

export interface ChartData {
  name: string;
  value: number;
  prevValue?: number;
}

export interface DashboardState {
  kpis: KPI[];
  revenueData: ChartData[];
  salesData: ChartData[];
  employeeStats: any[];
  customerInsights: any[];
}

export type DashboardType = 'overview' | 'finance' | 'sales' | 'employees' | 'customers' | 'forecasting';
