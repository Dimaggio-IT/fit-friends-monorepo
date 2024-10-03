/*
  Warnings:

  - You are about to drop the column `user_target_email` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_target_email";
