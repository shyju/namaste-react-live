CREATE
OR REPLACE VIEW "public"."sales_count_by_time" AS
SELECT
  order_details.created_at,
  count(order_details.id) AS total_orders
FROM
  order_details
WHERE
  order_details.order_status = 'ORDER_COMPLETED'
GROUP BY
  order_details.created_at;
  
CREATE OR REPLACE VIEW public.report_data AS
SELECT 
    o.created_at, 
    o.total_orders, 
    s.total_orders AS total_sales
FROM 
    public.order_count_by_time o
LEFT JOIN 
    public.sales_count_by_time s ON o.created_at = s.created_at;
