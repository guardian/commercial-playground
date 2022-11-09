-- CreateEnum
CREATE TYPE "TargetingOperator" AS ENUM ('Equals', 'Contains', 'Not');

-- CreateTable
CREATE TABLE "Targeting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "operator" "TargetingOperator" NOT NULL,
    "value" TEXT NOT NULL,
    "campaignId" INTEGER,

    CONSTRAINT "Targeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Targeting" ADD CONSTRAINT "Targeting_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
