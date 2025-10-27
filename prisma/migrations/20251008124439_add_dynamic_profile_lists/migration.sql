-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "activeProjects" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "collaborators" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "recentActivity" TEXT[] DEFAULT ARRAY[]::TEXT[];
