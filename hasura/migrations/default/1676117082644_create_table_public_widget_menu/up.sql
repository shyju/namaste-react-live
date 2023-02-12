CREATE TABLE "public"."widget_menu" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "widget_id" uuid NOT NULL, "menu_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("widget_id") REFERENCES "public"."widgets"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
