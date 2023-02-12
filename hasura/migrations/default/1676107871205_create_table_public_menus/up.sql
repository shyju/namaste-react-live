CREATE TABLE "public"."menus" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "image_id" text NOT NULL, "price" float8 NOT NULL, "veg" boolean NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
