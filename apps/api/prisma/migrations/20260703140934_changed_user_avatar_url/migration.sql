/*
  Warnings:

  - Made the column `avatarUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" SET NOT NULL,
ALTER COLUMN "avatarUrl" SET DEFAULT 'https://geoapp-s3-postbucket.s3.eu-north-1.amazonaws.com/posts/geoapp_default_avatar.svg';
