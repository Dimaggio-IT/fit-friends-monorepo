/*
  Warnings:

  - You are about to drop the column `certificates` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_private_lessons` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "certificates",
DROP COLUMN "is_private_lessons";
