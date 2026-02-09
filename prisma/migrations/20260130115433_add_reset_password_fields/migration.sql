-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpiry" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" VARCHAR(64);
