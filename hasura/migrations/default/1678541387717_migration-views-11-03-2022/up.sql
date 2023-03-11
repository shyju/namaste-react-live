CREATE VIEW total_orders AS
SELECT COUNT(*) AS total_orders
FROM order_details;

CREATE VIEW total_restaurants AS
SELECT COUNT(*) AS total_restaurants
FROM restaurants;

CREATE VIEW total_users AS
SELECT COUNT(*) AS total_users
FROM user;

CREATE VIEW total_items_sold AS
SELECT COUNT(*) AS total_items_sold
FROM order_items
INNER JOIN order_details ON order_items.order_id = order_details.id
WHERE order_details.order_status = 'ORDER_COMPLETED';

CREATE VIEW cancelled_orders AS
SELECT COUNT(*) AS cancelled_orders
FROM order_details
WHERE order_status = 'ORDER_CANCELLED';

CREATE VIEW pending_orders AS
SELECT COUNT(*) AS pending_orders
FROM order_details
WHERE order_status = 'ORDER_PENDING';

CREATE VIEW completed_orders AS
SELECT COUNT(*) AS completed_orders
FROM order_details
WHERE order_status = 'ORDER_COMPLETED';
