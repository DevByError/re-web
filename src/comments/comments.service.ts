import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }

    create(authorId: string, dto: CreateCommentDto) {
        return this.prisma.comment.create({
            data: {
                authorId,
                publicationId: dto.publicationId,
                parentId: dto.parentId,
                text: dto.text,
            },
        });
    }

    findAllForPublication(publicationId: string) {
        return this.prisma.comment.findMany({
            where: { publicationId },
            include: {
                author: { select: { firstName: true, lastName: true, profileImage: true } },
                _count: { select: { likes: true, replies: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(userId: string, commentId: string, dto: UpdateCommentDto) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment || comment.authorId !== userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return this.prisma.comment.update({ where: { id: commentId }, data: dto });
    }

    async remove(userId: string, commentId: string) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment || comment.authorId !== userId) {
            throw new ForbiddenException('Access to resource denied');
        }
        return this.prisma.comment.delete({ where: { id: commentId } });
    }

    async toggleLike(userId: string, commentId: string) {
        const existingLike = await this.prisma.commentLike.findUnique({
            where: { userId_commentId: { userId, commentId } },
        });

        if (existingLike) {
            return this.prisma.commentLike.delete({ where: { id: existingLike.id } });
        } else {
            return this.prisma.commentLike.create({ data: { userId, commentId } });
        }
    }
}