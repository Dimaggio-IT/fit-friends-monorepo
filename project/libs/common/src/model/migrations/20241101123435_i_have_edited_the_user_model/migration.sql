-- AlterTable
ALTER TABLE "users" ADD COLUMN     "achievement" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "is_personal_training" BOOLEAN;
