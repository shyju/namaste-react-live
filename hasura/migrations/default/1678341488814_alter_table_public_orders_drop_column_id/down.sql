alter table "public"."orders" alter column "id" set default gen_random_uuid();
alter table "public"."orders" alter column "id" drop not null;
alter table "public"."orders" add column "id" uuid;
