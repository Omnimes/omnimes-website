/*
  Warnings:

  - Made the column `website` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "streetAddress" SET DEFAULT '',
ALTER COLUMN "postalCode" SET DEFAULT '',
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "industry" SET DEFAULT '',
ALTER COLUMN "phoneNumber" SET DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "website" SET DEFAULT '';
