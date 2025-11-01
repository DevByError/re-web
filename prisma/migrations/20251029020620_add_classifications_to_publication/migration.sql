-- AlterTable
ALTER TABLE "public"."Publication" ADD COLUMN     "classifications" TEXT[] DEFAULT ARRAY[]::TEXT[];
