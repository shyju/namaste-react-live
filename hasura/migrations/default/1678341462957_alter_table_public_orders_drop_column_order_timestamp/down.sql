alter table "public"."orders" alter column "order_timestamp" set default now();
alter table "public"."orders" alter column "order_timestamp" drop not null;
alter table "public"."orders" add column "order_timestamp" timestamptz;
