CREATE TABLE "public"."order_state_enum" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "value" Text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
