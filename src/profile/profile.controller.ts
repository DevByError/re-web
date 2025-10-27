
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';

type UserPayload = {
  userId: string;
  email: string;
};

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(
    @GetUser() userPayload: UserPayload,
  ): Promise<Omit<User, 'passwordHash'>> {

    const user = await this.profileService.findOne(userPayload.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(
    @GetUser() userPayload: UserPayload,
    @Body() dto: UpdateProfileDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.profileService.update(userPayload.userId, dto);
    const { passwordHash, ...result } = user;
    return result;
  }
}
