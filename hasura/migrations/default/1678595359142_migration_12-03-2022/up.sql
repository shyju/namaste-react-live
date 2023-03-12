CREATE OR REPLACE VIEW "public"."foodvilla_statistics" AS 
 SELECT 'ORDERS'::text AS metric_name,
    count(*) AS metric_value
   FROM order_details
UNION ALL
 SELECT 'RESTAURANTS'::text AS metric_name,
    count(*) AS metric_value
   FROM restaurants
UNION ALL
 SELECT 'USERS'::text AS metric_name,
    count(*) AS metric_value
   FROM USER "user"("user")
UNION ALL
 SELECT 'ITEMS SOLD'::text AS metric_name,
    count(*) AS metric_value
   FROM (order_items
     JOIN order_details ON ((order_items.order_id = order_details.id)))
  WHERE (order_details.order_state = 'COMPLETED'::order_state_enum)
UNION ALL
 SELECT 'CANCELLED ORDERS'::text AS metric_name,
    count(*) AS metric_value
   FROM order_details
  WHERE (order_details.order_state = 'CANCELLED'::order_state_enum)
UNION ALL
 SELECT 'PENDING ORDERS'::text AS metric_name,
    count(*) AS metric_value
   FROM order_details
  WHERE (order_details.order_state = 'PENDING'::order_state_enum)
UNION ALL
 SELECT 'COMPLETED ORDERS'::text AS metric_name,
    count(*) AS metric_value
   FROM order_details
  WHERE (order_details.order_state = 'COMPLETED'::order_state_enum);
