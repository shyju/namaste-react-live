alter table "public"."order_details" alter column "order_state" drop not null;
alter table "public"."order_details" add column "order_state" order_state_enum;
