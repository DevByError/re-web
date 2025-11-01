import { IsBoolean, IsOptional } from 'class-validator';
export class LikePublicationDto {
    @IsBoolean()
    @IsOptional()
    isDislike?: boolean;
}