import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

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