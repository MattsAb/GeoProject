/*
  Warnings:

  - You are about to drop the column `countryLongName` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `countryShortName` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Place` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "countryLongName",
DROP COLUMN "countryShortName",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "name",
ADD COLUMN     "place_id" TEXT NOT NULL;
