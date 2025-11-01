import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

type UserPayload = { userId: string; };

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() user: UserPayload, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(user.userId, dto);
  }

  @Get('for-publication/:pubId')
  findAllForPublication(@Param('pubId') pubId: string) {
    return this.commentsService.findAllForPublication(pubId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @GetUser() user: UserPayload, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserPayload) {
    return this.commentsService.remove(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  toggleLike(@Param('id') id: string, @GetUser() user: UserPayload) {
    return this.commentsService.toggleLike(user.userId, id);
  }
}