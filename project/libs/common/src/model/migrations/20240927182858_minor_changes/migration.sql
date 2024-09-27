/*
  Warnings:

  - You are about to drop the column `experience` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "experience",
ALTER COLUMN "description" SET DEFAULT '';
