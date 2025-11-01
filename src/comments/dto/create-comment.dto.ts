import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateCommentDto {
    @IsString() @IsNotEmpty() text: string;
    @IsUUID() @IsNotEmpty() publicationId: string;
    @IsUUID() @IsOptional() parentId?: string;
}