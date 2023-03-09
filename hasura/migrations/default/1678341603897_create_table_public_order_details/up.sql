CREATE TABLE "public"."order_details" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "total" float8 NOT NULL, "payment_id" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("payment_id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
