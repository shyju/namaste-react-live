CREATE OR REPLACE VIEW "public"."sales_count_by_time" AS 
 SELECT order_details.created_at,
    count(order_details.id) AS total_sales
   FROM order_details
  WHERE (order_details.order_state = 'COMPLETED'::order_state_enum)
  GROUP BY order_details.created_at;
