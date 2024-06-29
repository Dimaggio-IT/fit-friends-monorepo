/*
  Warnings:

  - Made the column `rating` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `background_image` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount_of_calories` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password_hash` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `background_image` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "background_image" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "amount_of_calories" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL,
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "background_image" SET NOT NULL;
