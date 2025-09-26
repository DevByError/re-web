import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async signup(dto: SignupDto) {
        // 1. Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        // 2. Try to save the new user to the database
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hashedPassword,
                    name: dto.name,
                    handle: dto.handle,
                },
            });

            // 3. THIS IS THE CORRECTED PART //
            // Destructure passwordHash out and get the 'rest' of the properties
            const { passwordHash, ...result } = user;
            return result; // Return the new object without the password hash

        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Email or handle already in use.');
            }
            throw error;
        }
    }

    async login(dto: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {

            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatch = await bcrypt.compare(dto.password, user.passwordHash);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
        };
    }

}