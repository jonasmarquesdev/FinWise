-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_customer_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT,
ADD COLUMN     "subscription_plan" TEXT;
