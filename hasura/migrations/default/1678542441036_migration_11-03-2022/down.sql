-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW foodvilla_statistics AS
-- SELECT
--     CASE
--         WHEN metric_name = 'TOTAL_ORDERS' THEN 'ORDERS'
--         WHEN metric_name = 'TOTAL_RESTAURANTS' THEN 'RESTAURANTS'
--         WHEN metric_name = 'TOTAL_USERS' THEN 'USERS'
--         WHEN metric_name = 'TOTAL_ITEMS_SOLD' THEN 'ITEMS SOLD'
--         WHEN metric_name = 'CANCELLED_ORDERS' THEN 'CANCELLED ORDERS'
--         WHEN metric_name = 'PENDING_ORDERS' THEN 'PENDING ORDERS'
--         WHEN metric_name = 'COMPLETED_ORDERS' THEN 'COMPLETED ORDERS'
--     END AS metric_name,
--     metric_value
-- FROM foodvilla_statistics;