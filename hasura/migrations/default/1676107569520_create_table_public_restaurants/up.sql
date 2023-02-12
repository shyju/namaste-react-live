CREATE TABLE "public"."restaurants" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "image_id" text NOT NULL, "rating" float8 NOT NULL, "delivery_time" numeric NOT NULL, "price" float8 NOT NULL, "veg" boolean NOT NULL, "promoted" boolean NOT NULL, "area" text NOT NULL, "total_rating" float8 NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
