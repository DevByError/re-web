// src/auth/auth.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

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
}