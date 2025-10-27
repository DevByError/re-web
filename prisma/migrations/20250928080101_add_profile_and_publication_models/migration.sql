-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "public"."Publication" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "year" INTEGER,
    "venue" TEXT,
    "doi" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "license" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PublicationAuthor" (
    "authorName" TEXT NOT NULL,
    "authorOrder" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "publicationId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PublicationAuthor_pkey" PRIMARY KEY ("publicationId","authorOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slug_key" ON "public"."Publication"("slug");

-- AddForeignKey
ALTER TABLE "public"."Publication" ADD CONSTRAINT "Publication_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PublicationAuthor" ADD CONSTRAINT "PublicationAuthor_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "public"."Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PublicationAuthor" ADD CONSTRAINT "PublicationAuthor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
