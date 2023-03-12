alter table "public"."order_state_enum" alter column "id" set default gen_random_uuid();
alter table "public"."order_state_enum" alter column "id" drop not null;
alter table "public"."order_state_enum" add column "id" uuid;
