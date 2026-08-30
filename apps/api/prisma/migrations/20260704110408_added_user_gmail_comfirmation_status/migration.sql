-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ConfirmationStatus" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "avatarUrl" SET DEFAULT 'https://geoapp-s3-postbucket.s3.eu-north-1.amazonaws.com/posts/geoapp_default_avatar.png.png';
