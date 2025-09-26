import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
