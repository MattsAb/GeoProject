/*
  Warnings:

  - A unique constraint covering the columns `[place_id]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Place_place_id_key" ON "Place"("place_id");
