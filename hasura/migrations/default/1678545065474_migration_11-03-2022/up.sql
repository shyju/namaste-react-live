CREATE OR REPLACE VIEW public.order_sale_report AS
SELECT 
    o.created_at, 
    o.total_orders
FROM 
    public.order_count_by_time o
UNION ALL 
SELECT 
    s.created_at, 
    s.total_sales
FROM 
    public.sales_count_by_time s;
