alter table "public"."order_details"
  add constraint "order_details_restaurant_id_fkey"
  foreign key ("restaurant_id")
  references "public"."restaurants"
  ("id") on update restrict on delete restrict;
