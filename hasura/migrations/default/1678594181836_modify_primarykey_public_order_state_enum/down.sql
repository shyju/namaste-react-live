alter table "public"."order_state_enum" drop constraint "order_state_enum_pkey";
alter table "public"."order_state_enum"
    add constraint "order_state_enum_pkey"
    primary key ("id");
