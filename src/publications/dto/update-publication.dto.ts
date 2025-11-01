// src/publications/dto/update-publication.dto.ts
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    abstract?: string;

    @IsInt()
    @IsOptional()
    year?: number;

    @IsString()
    @IsOptional()
    venue?: string;

    @IsString()
    @IsOptional()
    doi?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    keywords?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    classifications?: string[];
}