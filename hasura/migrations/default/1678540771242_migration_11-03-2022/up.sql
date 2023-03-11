CREATE VIEW order_count_by_time AS 
SELECT created_at, COUNT(id) as total_orders
FROM order_details
GROUP BY created_at;
