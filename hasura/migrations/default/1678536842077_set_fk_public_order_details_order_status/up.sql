alter table "public"."order_details"
  add constraint "order_details_order_status_fkey"
  foreign key ("order_status")
  references "public"."order_status"
  ("name") on update restrict on delete restrict;
