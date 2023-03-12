BEGIN TRANSACTION;
ALTER TABLE "public"."order_state_enum" DROP CONSTRAINT "order_state_enum_pkey";

ALTER TABLE "public"."order_state_enum"
    ADD CONSTRAINT "order_state_enum_pkey" PRIMARY KEY ("name");
COMMIT TRANSACTION;
