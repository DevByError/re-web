import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) { }

  // Method to create a new publication
  create(ownerId: string, dto: CreatePublicationDto) {
    // Generate a simple slug from the title + a random component
    const slug =
      dto.title.toLowerCase().replace(/\s+/g, '-') +
      '-' +
      Math.random().toString(36).substring(2, 8);

    return this.prisma.publication.create({
      data: {
        ownerId: ownerId,
        slug: slug,
        title: dto.title,
        abstract: dto.abstract,
        year: dto.year,
        venue: dto.venue,
        doi: dto.doi,
        keywords: dto.keywords,
        classifications: dto.classifications,
      },
    });
  }

  // Method to find all publications for a specific user
  findAllForUser(userId: string) {
    return this.prisma.publication.findMany({
      where: { ownerId: userId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
            saves: true,
            views: true,
          },
        },
        likes: { where: { userId: userId } },
        saves: { where: { userId: userId } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.publication.findUnique({ where: { id } });
  }

  async update(userId: string, pubId: string, dto: UpdatePublicationDto) {
    // First, find the publication to make sure the user owns it
    const publication = await this.findOne(pubId);

    if (!publication || publication.ownerId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }

    // If they own it, proceed with the update
    return this.prisma.publication.update({
      where: { id: pubId },
      data: dto,
    });
  }


  async toggleLike(userId: string, pubId: string, isDislike: boolean = false) {
    const existingLike = await this.prisma.publicationLike.findUnique({
      where: { userId_publicationId: { userId, publicationId: pubId } },
    });

    if (existingLike) {
      // If the user is toggling the same reaction, delete it (unlike/undislike)
      if (existingLike.isDislike === isDislike) {
        return this.prisma.publicationLike.delete({ where: { id: existingLike.id } });
      } else {
        // If they are changing their reaction (like -> dislike), update it
        return this.prisma.publicationLike.update({
          where: { id: existingLike.id },
          data: { isDislike },
        });
      }
    } else {
      // If no reaction exists, create one
      return this.prisma.publicationLike.create({
        data: { userId, publicationId: pubId, isDislike },
      });
    }
  }

  async toggleSave(userId: string, pubId: string) {
    const existingSave = await this.prisma.publicationSave.findUnique({
      where: { userId_publicationId: { userId, publicationId: pubId } },
    });

    if (existingSave) {
      return this.prisma.publicationSave.delete({ where: { id: existingSave.id } });
    } else {
      return this.prisma.publicationSave.create({ data: { userId, publicationId: pubId } });
    }
  }

  async recordView(userId: string, pubId: string) {
    // Use upsert to create a view record if one doesn't exist.
    // If it exists, it does nothing, preventing duplicate view counts.
    return this.prisma.publicationView.upsert({
      where: { userId_publicationId: { userId, publicationId: pubId } },
      update: {},
      create: { userId, publicationId: pubId },
    });
  }
}