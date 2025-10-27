import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) { }

  findOne(userId: string) {
    // Find the user by their ID and include their publications
    return this.prisma.user.findUnique({
      where: { id: userId },
      // We can add more includes here later
    });
  }


  update(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        bio: dto.bio,
        skills: dto.skills,
        recentActivity: dto.recentActivity,
        collaborators: dto.collaborators,
        activeProjects: dto.activeProjects,
        achievements: dto.achievements
      },

    });
  }
}
