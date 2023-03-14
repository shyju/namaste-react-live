CREATE OR REPLACE VIEW "public"."orders_sales_by_date" AS 
 SELECT o.order_date,
    o.total_orders AS orders_count,
    s.total_sales AS sales_count
   FROM (order_count_by_date o
     LEFT JOIN sales_count_by_date s ON ((o.order_date = s.order_date)));
