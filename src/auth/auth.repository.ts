import { AuthService } from "./auth.usecase";

class AuthController {
    private authService : AuthService
    constructor() {
        this.authService = new AuthService();
    }

    async login(email:string,senha:string) {
        
        if (!email || !senha) {
            return { code: 400, body: { message: "Email e senha são obrigatórios!" } };
        }

        try {
            const body = this.authService.login(email,senha);
            return body;
        } catch (error) {
            return error;
        }
    }
}

module.exports = AuthController;