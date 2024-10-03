/*
  Warnings:

  - You are about to drop the column `user_email` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `user_target_email` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_target_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_email",
DROP COLUMN "user_id",
ADD COLUMN     "user_target_email" TEXT NOT NULL,
ADD COLUMN     "user_target_id" TEXT NOT NULL;
