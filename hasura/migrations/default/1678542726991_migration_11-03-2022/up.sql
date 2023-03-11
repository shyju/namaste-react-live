CREATE VIEW foodvilla_statistics AS
SELECT 'ORDERS' AS metric_name, COUNT(*) AS metric_value
FROM order_details
UNION ALL
SELECT 'RESTAURANTS' AS metric_name, COUNT(*) AS metric_value
FROM restaurants
UNION ALL
SELECT 'USERS' AS metric_name, COUNT(*) AS metric_value
FROM user
UNION ALL
SELECT 'ITEMS SOLD' AS metric_name, COUNT(*) AS metric_value
FROM order_items
INNER JOIN order_details ON order_items.order_id = order_details.id
WHERE order_details.order_status = 'ORDER_COMPLETED'
UNION ALL
SELECT 'CANCELLED ORDERS' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_CANCELLED'
UNION ALL
SELECT 'PENDING ORDERS' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_PENDING'
UNION ALL
SELECT 'COMPLETED ORDERS' AS metric_name, COUNT(*) AS metric_value
FROM order_details
WHERE order_status = 'ORDER_COMPLETED';
