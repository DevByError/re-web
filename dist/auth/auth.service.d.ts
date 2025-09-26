import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: SignupDto): Promise<{
        email: string;
        name: string;
        handle: string;
        id: string;
        orcid: string | null;
        bio: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
