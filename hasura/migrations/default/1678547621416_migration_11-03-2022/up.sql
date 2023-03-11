CREATE OR REPLACE VIEW "public"."orders_sales_by_time" AS
SELECT 
    o.created_at,
    o.total_orders AS orders_count,
    s.total_sales AS sales_count
FROM 
    public.order_count_by_time o
    LEFT JOIN public.sales_count_by_time s ON o.created_at = s.created_at;
