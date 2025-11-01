import { IsString, IsOptional } from 'class-validator';
export class UpdateCommentDto { @IsString() @IsOptional() text?: string; }