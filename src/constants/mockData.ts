import { DashboardState } from "../types/dashboard";

export const MOCK_DASHBOARD_DATA: Record<string, DashboardState> = {
  overview: {
    kpis: [
      { label: "Total Revenue", value: "$4.2M", change: 12.5, trend: 'up' },
      { label: "Net Profit", value: "$1.8M", change: 8.2, trend: 'up' },
      { label: "Active Customers", value: "1,240", change: -2.4, trend: 'down' },
      { label: "Growth Rate", value: "24%", change: 4.1, trend: 'up' },
    ],
    revenueData: [
      { name: 'Jan', value: 400, prevValue: 350 },
      { name: 'Feb', value: 300, prevValue: 320 },
      { name: 'Mar', value: 600, prevValue: 450 },
      { name: 'Apr', value: 800, prevValue: 600 },
      { name: 'May', value: 500, prevValue: 400 },
      { name: 'Jun', value: 900, prevValue: 700 },
    ],
    salesData: [
      { name: 'Direct', value: 400 },
      { name: 'Referral', value: 300 },
      { name: 'Social', value: 200 },
      { name: 'Search', value: 100 },
    ],
    employeeStats: [],
    customerInsights: []
  },
  finance: {
    kpis: [
      { label: "Operating Cash Flow", value: "$1.2M", change: 5.4, trend: 'up' },
      { label: "EBITDA", value: "$2.1M", change: 10.1, trend: 'up' },
      { label: "Burn Rate", value: "$420K", change: -15.2, trend: 'down' },
      { label: "Runway", value: "18 Months", change: 0, trend: 'neutral' },
    ],
    revenueData: [
      { name: 'Week 1', value: 120, prevValue: 110 },
      { name: 'Week 2', value: 140, prevValue: 130 },
      { name: 'Week 3', value: 135, prevValue: 145 },
      { name: 'Week 4', value: 180, prevValue: 160 },
    ],
    salesData: [
      { name: 'OpEx', value: 30 },
      { name: 'CapEx', value: 20 },
      { name: 'Wages', value: 40 },
      { name: 'Fixed', value: 10 },
    ],
    employeeStats: [],
    customerInsights: []
  },
  sales: {
    kpis: [
      { label: "New Leads", value: "842", change: 18.2, trend: 'up' },
      { label: "Conversion Rate", value: "3.4%", change: 0.5, trend: 'up' },
      { label: "Avg Deal Size", value: "$12.5K", change: -2.1, trend: 'down' },
      { label: "Sales Velocity", value: "24 Days", change: -12.4, trend: 'up' },
    ],
    revenueData: [
      { name: 'Q1', value: 2400 },
      { name: 'Q2', value: 3200 },
      { name: 'Q3', value: 2800 },
      { name: 'Q4', value: 3900 },
    ],
    salesData: [
      { name: 'Enterprise', value: 55 },
      { name: 'Mid-Market', value: 25 },
      { name: 'SMB', value: 20 },
    ],
    employeeStats: [],
    customerInsights: []
  },
  employees: {
    kpis: [
      { label: "Headcount", value: "142", change: 4.2, trend: 'up' },
      { label: "Retention Rate", value: "94%", change: 1.2, trend: 'up' },
      { label: "eNPS Score", value: "72", change: 5, trend: 'up' },
      { label: "Revenue / Head", value: "$29.5K", change: 8.4, trend: 'up' },
    ],
    revenueData: [
      { name: 'Eng', value: 60 },
      { name: 'Sales', value: 40 },
      { name: 'Ops', value: 20 },
      { name: 'HR', value: 10 },
      { name: 'Design', value: 12 },
    ],
    salesData: [
      { name: 'On-site', value: 30 },
      { name: 'Remote', value: 50 },
      { name: 'Hybrid', value: 20 },
    ],
    employeeStats: [],
    customerInsights: []
  },
  customers: {
    kpis: [
      { label: "CLV", value: "$4,200", change: 12.4, trend: 'up' },
      { label: "CAC", value: "$850", change: -5.2, trend: 'up' },
      { label: "Churn Rate", value: "1.8%", change: -0.4, trend: 'up' },
      { label: "NPS", value: "68", change: 4, trend: 'up' },
    ],
    revenueData: [
      { name: 'US', value: 500 },
      { name: 'EU', value: 300 },
      { name: 'Asia', value: 200 },
      { name: 'RoW', value: 100 },
    ],
    salesData: [
      { name: 'Retained', value: 80 },
      { name: 'New', value: 20 },
    ],
    employeeStats: [],
    customerInsights: []
  }
};
