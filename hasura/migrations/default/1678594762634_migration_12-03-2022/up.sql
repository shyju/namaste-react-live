ALTER TABLE order_details
ADD COLUMN order_state order_state_enum DEFAULT 'PENDING'::order_state_enum;
