-- DropIndex
DROP INDEX "users_email_login_sex_idx";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "background_image" DROP NOT NULL,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "time_for_training" DROP NOT NULL,
ALTER COLUMN "calories_to_reset" DROP NOT NULL,
ALTER COLUMN "calories_to_reset_per_day" DROP NOT NULL,
ALTER COLUMN "is_ready_to_train" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "users_email_login_sex_birthday_location_idx" ON "users"("email", "login", "sex", "birthday", "location");
