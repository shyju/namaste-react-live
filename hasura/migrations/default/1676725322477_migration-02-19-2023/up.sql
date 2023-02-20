
CREATE TABLE "public"."user" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "firstname" text NOT NULL, "lastname" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."restaurants" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "image_id" text NOT NULL, "rating" float8 NOT NULL, "delivery_time" numeric NOT NULL, "price" float8 NOT NULL, "veg" boolean NOT NULL, "promoted" boolean NOT NULL, "area" text NOT NULL, "total_rating" float8 NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."cuisines" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."restraunt_cuisine" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "restaurant_id" uuid NOT NULL, "cuisine_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("cuisine_id") REFERENCES "public"."cuisines"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."menus" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "image_id" text NOT NULL, "price" float8 NOT NULL, "veg" boolean NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."restaurant_menu" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "menu_id" uuid NOT NULL, "restaurant_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."offers" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "description" text NOT NULL, "coupon_code" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."restaurant_offer" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "offer_id" uuid NOT NULL, "restaurant_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."cuisines" add constraint "cuisines_name_key" unique ("name");

alter table "public"."menus" alter column "image_id" drop not null;

CREATE TABLE "public"."widgets" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."restaurant_widget" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "restaurant_id" uuid NOT NULL, "widget_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("widget_id") REFERENCES "public"."widgets"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."widget_menu" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "widget_id" uuid NOT NULL, "menu_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("widget_id") REFERENCES "public"."widgets"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."cart" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "menu_id" UUID NOT NULL, "quantity" integer NOT NULL, "price" float8 NOT NULL, "total" float8 NOT NULL, PRIMARY KEY ("price","id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN TRANSACTION;
ALTER TABLE "public"."cart" DROP CONSTRAINT "cart_pkey";

ALTER TABLE "public"."cart"
    ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;

CREATE TABLE "public"."addresses" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "address_line_1" text NOT NULL, "address_line_2" text, "city" text NOT NULL, "state" text NOT NULL, "pincode" bigint NOT NULL, "user_id" uuid NOT NULL, "primary" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."cart" add column "restaurant_id" uuid
 not null;

alter table "public"."cart" add column "restaurant_name" text
 not null;

alter table "public"."cart" add column "restaurant_image_id" text
 not null;

ALTER TABLE "public"."user" ALTER COLUMN "id" drop default;

ALTER TABLE public."user"
ADD COLUMN IF NOT EXISTS auth_id TEXT NULL;

SET check_function_bodies = false;
CREATE TABLE public.addresses (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    address_line_1 text NOT NULL,
    address_line_2 text,
    city text NOT NULL,
    state text NOT NULL,
    pincode bigint NOT NULL,
    user_id uuid NOT NULL,
    "primary" boolean NOT NULL
);
CREATE TABLE public.cart (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    menu_id uuid NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    total double precision NOT NULL,
    restaurant_id uuid NOT NULL,
    restaurant_name text NOT NULL,
    restaurant_image_id text NOT NULL
);
CREATE TABLE public.cuisines (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.menus (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    image_id text,
    price double precision NOT NULL,
    veg boolean NOT NULL
);
CREATE TABLE public.offers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    description text NOT NULL,
    coupon_code text NOT NULL
);
CREATE TABLE public.restaurant_menu (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    menu_id uuid NOT NULL,
    restaurant_id uuid NOT NULL
);
CREATE TABLE public.restaurant_offer (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    offer_id uuid NOT NULL,
    restaurant_id uuid NOT NULL
);
CREATE TABLE public.restaurant_widget (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    restaurant_id uuid NOT NULL,
    widget_id uuid NOT NULL
);
CREATE TABLE public.restaurants (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    image_id text NOT NULL,
    rating double precision NOT NULL,
    delivery_time numeric NOT NULL,
    price double precision NOT NULL,
    veg boolean NOT NULL,
    promoted boolean NOT NULL,
    area text NOT NULL,
    total_rating double precision NOT NULL
);
CREATE TABLE public.restraunt_cuisine (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    restaurant_id uuid NOT NULL,
    cuisine_id uuid NOT NULL
);
CREATE TABLE public."user" (
    id uuid NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    auth_id text
);
CREATE TABLE public.widget_menu (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    widget_id uuid NOT NULL,
    menu_id uuid NOT NULL
);
CREATE TABLE public.widgets (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL
);
ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cuisines
    ADD CONSTRAINT cuisines_name_key UNIQUE (name);
ALTER TABLE ONLY public.cuisines
    ADD CONSTRAINT cuisines_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restaurant_offer
    ADD CONSTRAINT restaurant_offer_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restaurant_widget
    ADD CONSTRAINT restaurant_widget_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.restraunt_cuisine
    ADD CONSTRAINT restraunt_cuisine_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.widget_menu
    ADD CONSTRAINT widget_menu_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.widgets
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_menu
    ADD CONSTRAINT restaurant_menu_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_offer
    ADD CONSTRAINT restaurant_offer_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_offer
    ADD CONSTRAINT restaurant_offer_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_widget
    ADD CONSTRAINT restaurant_widget_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restaurant_widget
    ADD CONSTRAINT restaurant_widget_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES public.widgets(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restraunt_cuisine
    ADD CONSTRAINT restraunt_cuisine_cuisine_id_fkey FOREIGN KEY (cuisine_id) REFERENCES public.cuisines(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.restraunt_cuisine
    ADD CONSTRAINT restraunt_cuisine_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.widget_menu
    ADD CONSTRAINT widget_menu_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.widget_menu
    ADD CONSTRAINT widget_menu_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES public.widgets(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
