CREATE TABLE "public"."restaurant_menu" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "menu_id" uuid NOT NULL, "restaurant_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;