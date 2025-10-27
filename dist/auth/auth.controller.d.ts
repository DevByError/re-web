import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
        createdAt: Date;
        updatedAt: Date;
        skills: string[];
        profileImage: string | null;
        recentActivity: string[];
        collaborators: string[];
        activeProjects: string[];
        achievements: string[];
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
