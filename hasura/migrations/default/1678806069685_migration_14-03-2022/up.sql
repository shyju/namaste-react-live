CREATE OR REPLACE VIEW "public"."order_count_by_date" AS
SELECT
  DATE_TRUNC('day', order_details.created_at) AS order_date,
  COUNT(order_details.id) AS total_orders
FROM
  order_details
GROUP BY
  order_date;
