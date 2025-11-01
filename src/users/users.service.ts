import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            // You can add includes here to get their publications, etc.
        });

        if (user) {
            // CRITICAL: Never send the password hash to the frontend
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
}