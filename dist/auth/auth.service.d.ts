import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        handle: string;
        institution: string | null;
        department: string | null;
        position: string | null;
        interests: string[];
        id: string;
        orcid: string | null;
        bio: string | null;
        skills: string[];
        profileImage: string | null;
        recentActivity: string[];
        collaborators: string[];
        activeProjects: string[];
        achievements: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
