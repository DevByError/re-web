import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

type UserPayload = { userId: string; email: string; };

@Controller('publications') // All routes are prefixed with /publications
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  // POST /publications
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() user: UserPayload, @Body() dto: CreatePublicationDto) {
    return this.publicationsService.create(user.userId, dto);
  }

  // GET /publications/mine
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findAllForUser(@GetUser() user: UserPayload) {
    return this.publicationsService.findAllForUser(user.userId);
  }
}