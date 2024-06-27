-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER,
    "name" TEXT NOT NULL,
    "background_image" TEXT,
    "userLevel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" INTEGER,
    "amount_of_calories" INTEGER,
    "description" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "is_special" BOOLEAN NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "avatar" TEXT,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "background_image" TEXT,
    "sex" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "level" TEXT NOT NULL,
    "training_type" TEXT NOT NULL,
    "time_for_training" TEXT NOT NULL,
    "calories_to_reset" INTEGER NOT NULL,
    "calories_to_reset_per_day" INTEGER NOT NULL,
    "is_ready_to_train" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sum" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_created_at_user_id_product_id_idx" ON "comments"("created_at", "user_id", "product_id");

-- CreateIndex
CREATE INDEX "products_created_at_name_type_sex_coach_userLevel_is_specia_idx" ON "products"("created_at", "name", "type", "sex", "coach", "userLevel", "is_special");

-- CreateIndex
CREATE INDEX "users_email_login_sex_idx" ON "users"("email", "login", "sex");

-- CreateIndex
CREATE INDEX "orders_created_at_type_payment_type_idx" ON "orders"("created_at", "type", "payment_type");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
