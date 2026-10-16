export interface Product {
  product_id: string;
  category: string;
  unit_cost: number;
  list_price: number;
  supplier_lead_days: number;
}

export interface Customer {
  customer_id: string;
  region: string;
  customer_segment: string;
  signup_date: string;
  preferred_channel: string;
}

export interface Transaction {
  transaction_id: string;
  customer_id: string;
  product_id: string;
  timestamp: string;
  quantity: number;
  unit_price: number;
  discount_pct: number;
  status: 'Completed' | 'Cancelled' | 'Returned' | 'Pending';
  channel: 'App' | 'Web' | 'Store';
  payment_method: 'Card' | 'Cash' | 'NetBanking' | 'UPI' | 'Wallet';
  // Calculated fields
  gross_sales: number;
  net_sales: number;
  total_cost: number;
  profit: number;
  is_loss: boolean;
}

export interface InventoryRecord {
  inventory_record_id: string;
  product_id: string;
  date: string;
  stock_on_hand: number;
  reorder_threshold: number;
  stockout_flag: number;
  supplier_delay_days: number;
}

export interface Campaign {
  campaign_id: string;
  date: string;
  channel: string;
  category: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  // Calculated fields
  is_impossible: boolean;
  cpc: number;
  ctr: number;
  cvr: number;
  reported_roas: number;
  adjusted_roas: number;
}

export interface SKUInventoryRisk {
  product_id: string;
  category: string;
  unit_cost: number;
  list_price: number;
  stock_on_hand: number;
  reorder_threshold: number;
  supplier_lead_days: number;
  supplier_delay_days: number;
  daily_velocity: number;
  days_remaining: number;
  risk_level: 'Critical' | 'High' | 'Moderate' | 'Safe';
  estimated_weekly_loss: number;
}

export interface RecommendedAction {
  id: string;
  category: 'Pricing' | 'Inventory' | 'Marketing' | 'Operations';
  title: string;
  description: string;
  whyFlagged: string;
  estimatedWeeklySaving: number;
  confidence: number;
  urgency: 'Immediate' | 'High' | 'Medium';
  status: 'Pending' | 'Executed';
  metricsImpact: string;
}

export interface DashboardMetrics {
  totalRevenue30d: number;
  revenueGrowthMoM: number;
  totalCompletedSales: number;
  totalLeaksDollar: number;
  leakOrderCount: number;
  leakOrderPercent: number;
  pricingLeakDollar: number;
  pricingLeakCount: number;
  discountLeakDollar: number;
  totalReturnsDollar: number;
  returnRate: number;
  totalCancelledDollar: number;
  cancellationRate: number;
  stockoutRiskCount: number;
  criticalStockoutCount: number;
  ghostCampaignCount: number;
  ghostCampaignSpend: number;
  beautyCategoryLeak: number;
  averageOrderValue: number;
}
