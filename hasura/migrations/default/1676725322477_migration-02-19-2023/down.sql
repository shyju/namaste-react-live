
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "auth_id" text
--  null;

alter table "public"."user" alter column "id" set default gen_random_uuid();

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."cart" add column "restaurant_image_id" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."cart" add column "restaurant_name" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."cart" add column "restaurant_id" uuid
--  not null;

DROP TABLE "public"."addresses";

alter table "public"."cart" drop constraint "cart_pkey";
alter table "public"."cart"
    add constraint "cart_pkey"
    primary key ("price", "id");

DROP TABLE "public"."cart";

DROP TABLE "public"."widget_menu";

DROP TABLE "public"."restaurant_widget";

DROP TABLE "public"."widgets";

alter table "public"."menus" alter column "image_id" set not null;

alter table "public"."cuisines" drop constraint "cuisines_name_key";

DROP TABLE "public"."restaurant_offer";

DROP TABLE "public"."offers";

DROP TABLE "public"."restaurant_menu";

DROP TABLE "public"."menus";

DROP TABLE "public"."restraunt_cuisine";

DROP TABLE "public"."cuisines";

DROP TABLE "public"."restaurants";

DROP TABLE "public"."user";
