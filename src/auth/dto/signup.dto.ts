import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;


    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    handle: string;

    @IsString()
    @IsNotEmpty()
    institution: string;

    @IsString()
    @IsOptional()
    department?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    interests?: string[]; // New optional field
}