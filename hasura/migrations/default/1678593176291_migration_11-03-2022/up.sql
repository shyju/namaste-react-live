-- Drop the rule for the view
DROP RULE IF EXISTS _RETURN ON public.total_items_sold CASCADE;

-- Drop the view
DROP VIEW IF EXISTS public.total_items_sold CASCADE;

-- -- Alter the column type
-- ALTER TABLE public.order_details
-- ALTER COLUMN order_status TYPE order_status
-- USING order_status::text::order_status;

-- -- Recreate the view
-- CREATE VIEW public.total_items_sold AS
-- SELECT sum(quantity) as total_items_sold, menu_id, order_status, date_trunc('day', created_at) as day
-- FROM public.order_items
-- JOIN public.order_details ON public.order_details.id = public.order_items.order_id
-- GROUP BY menu_id, order_status, date_trunc('day', created_at);

-- -- Recreate the rule for the view
-- CREATE RULE _RETURN AS ON SELECT TO public.total_items_sold DO INSTEAD
-- SELECT sum(quantity) as total_items_sold, menu_id, order_status, date_trunc('day', created_at) as day
-- FROM public.order_items
-- JOIN public.order_details ON public.order_details.id = public.order_items.order_id
-- WHERE order_status IN ('COMPLETED', 'FULFILLED')
-- GROUP BY menu_id, order_status, date_trunc('day', created_at);
