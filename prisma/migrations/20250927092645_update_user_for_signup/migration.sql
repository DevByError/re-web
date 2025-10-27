/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "position" TEXT;
