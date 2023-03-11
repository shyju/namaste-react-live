CREATE VIEW summary AS
SELECT 'total_orders' AS metric_name, COUNT(*) AS metric_value
FROM order_details
UNION ALL
SELECT 'total_restaurants' AS metric_name, COUNT(*) AS metric_value
FROM restaurants
UNION ALL
SELECT 'total_users' AS metric_name, COUNT(*) AS metric_value
FROM user
UNION ALL
SELECT 'total_items_sold' AS metric_name, COUNT(*) AS metric_value
FROM order_items
INNER JOIN order_details ON order_items.order_id = order_details.id
WHERE order_details.order_status = 'ORDER_COMPLETED'
UNION ALL
SELECT 'cancelled_orders' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_CANCELLED'
UNION ALL
SELECT 'pending_orders' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_PENDING'
UNION ALL
SELECT 'completed_orders' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_COMPLETED';
