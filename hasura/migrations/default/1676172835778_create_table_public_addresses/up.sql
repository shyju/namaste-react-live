CREATE TABLE "public"."addresses" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "address_line_1" text NOT NULL, "address_line_2" text, "city" text NOT NULL, "state" text NOT NULL, "pincode" bigint NOT NULL, "user_id" uuid NOT NULL, "primary" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
