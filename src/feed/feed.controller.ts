import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

type UserPayload = { userId: string; };

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getFeed(@GetUser() user: UserPayload) {
    return this.feedService.getPersonalizedFeed(user.userId);
  }
}