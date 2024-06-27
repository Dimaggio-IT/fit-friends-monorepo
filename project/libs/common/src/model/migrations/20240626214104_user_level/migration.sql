/*
  Warnings:

  - You are about to drop the column `userLevel` on the `products` table. All the data in the column will be lost.
  - Added the required column `user_level` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_created_at_name_type_sex_coach_userLevel_is_specia_idx";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "userLevel",
ADD COLUMN     "user_level" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "products_created_at_name_type_sex_coach_user_level_is_speci_idx" ON "products"("created_at", "name", "type", "sex", "coach", "user_level", "is_special");
