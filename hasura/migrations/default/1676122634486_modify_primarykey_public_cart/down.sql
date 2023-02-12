alter table "public"."cart" drop constraint "cart_pkey";
alter table "public"."cart"
    add constraint "cart_pkey"
    primary key ("price", "id");
