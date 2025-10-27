import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

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
      },
    });
  }

  // Method to find all publications for a specific user
  findAllForUser(userId: string) {
    return this.prisma.publication.findMany({
      where: { ownerId: userId },
      orderBy: {
        year: 'desc', // Show the most recent ones first
      },
    });
  }
}