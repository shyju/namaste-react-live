CREATE TABLE "public"."restaurant_widget" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "restaurant_id" uuid NOT NULL, "widget_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("widget_id") REFERENCES "public"."widgets"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;