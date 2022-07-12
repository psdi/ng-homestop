export interface Finance {
  id?: number;
  date: string;
  description: string;
  amount: number;
  is_expense: boolean;
  category_id: number;
  last_updated?: string;
  standing_order_id?: number;
}
