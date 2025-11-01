import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
    constructor(private prisma: PrismaService) { }

    async getPersonalizedFeed(userId: string) {
        // 1. Get the current user's interests to personalize the feed
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { interests: true },
        });
        const interests = user?.interests || [];

        // 2. Fetch recent publications, including their owner and counts of interactions
        const publications = await this.prisma.publication.findMany({
            take: 50, // Limit to the 50 most recent publications for performance
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                        saves: true,
                        views: true,
                    },
                },
                likes: {
                    where: { userId: userId }
                },
                saves: { where: { userId: userId } }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // 3. Sort the publications in memory to prioritize those matching user interests
        publications.sort((a, b) => {
            const scoreA = a.classifications.filter(c => interests.includes(c)).length;
            const scoreB = b.classifications.filter(c => interests.includes(c)).length;
            // Publications with more matching classifications get a higher score and appear first
            return scoreB - scoreA;
        });

        return publications;
    }
}