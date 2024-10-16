-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accessToken" TEXT DEFAULT '',
ADD COLUMN     "refreshToken" TEXT DEFAULT '';
