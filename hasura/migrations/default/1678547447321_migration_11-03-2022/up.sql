CREATE OR REPLACE VIEW "public"."orders_sales_by_time" AS
SELECT 
    o.created_at, 
    o.total_orders, 
    o.total_orders AS orders_count
FROM 
    public.order_count_by_time o
UNION ALL 
SELECT 
    s.created_at, 
    s.total_sales, 
    s.total_sales AS sales_count
FROM 
    public.sales_count_by_time s;
