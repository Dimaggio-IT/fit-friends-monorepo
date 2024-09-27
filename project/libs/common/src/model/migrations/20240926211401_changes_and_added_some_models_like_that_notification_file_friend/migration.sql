/*
  Warnings:

  - You are about to drop the column `coach` on the `products` table. All the data in the column will be lost.
  - Added the required column `coach_id` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coach_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coach_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_created_at_name_type_sex_coach_user_level_is_speci_idx";

-- AlterTable
ALTER TABLE "balances" ADD COLUMN     "coach_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "coach_id" TEXT NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "sum" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "coach",
ADD COLUMN     "coach_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "certificates" TEXT DEFAULT '',
ADD COLUMN     "experience" TEXT DEFAULT '',
ADD COLUMN     "is_private_lessons" BOOLEAN,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "hashName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_created_at_name_type_sex_coach_id_user_level_is_sp_idx" ON "products"("created_at", "name", "type", "sex", "coach_id", "user_level", "is_special");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
