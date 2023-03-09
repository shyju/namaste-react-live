CREATE TABLE "public"."orders" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "order_timestamp" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
