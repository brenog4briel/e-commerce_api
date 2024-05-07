
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { UsuarioRepository } from "../interfaces/usuario.interface";
import { UsuarioRepositoryPrisma } from "../repository/usuario.repository";

class AuthService {
    private usuarioRepository : UsuarioRepository
    constructor() {
        this.usuarioRepository = new UsuarioRepositoryPrisma();
    }

    async login(email:string, senha:string) {
        const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario) {throw new Error("Usuário não cadastrado!")};
        
        
        const comparaSenha = bcrypt.compareSync(senha, usuario.senha);
        if (!comparaSenha) {throw new Error("Email ou senha incorreto!")};

        const token = jwt.sign({ id: usuario.usuario_id, email: usuario.email }, "helloworld", { expiresIn: "1d" });
        return { token, usuario };
    }

    async verifyToken(token: string) {
        const decodedToken:any = jwt.verify(token, "helloworld");
        const usuario = await this.usuarioRepository.findByEmail(decodedToken.email);
        return usuario;
    }
}

export {AuthService}