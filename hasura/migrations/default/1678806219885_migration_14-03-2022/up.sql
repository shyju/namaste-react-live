CREATE OR REPLACE VIEW "public"."sales_count_by_date" AS
SELECT
  DATE_TRUNC('day', order_details.created_at) AS order_date,
  COUNT(order_details.id) AS total_sales
FROM
  order_details
WHERE
  order_details.order_state = 'COMPLETED'::order_state_enum
GROUP BY
  order_date;
