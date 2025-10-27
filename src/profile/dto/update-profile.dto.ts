import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    @MaxLength(500) // reasonable character limit
    bio?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    skills?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    recentActivity?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    collaborators?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    activeProjects?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    achievements?: string[];
}
