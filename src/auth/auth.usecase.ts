
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
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

        const token = jwt.sign({ id: usuario.usuario_id, email: usuario.email }, process.env.JWT_SECRET ? process.env.JWT_SECRET : "", { expiresIn: "1d" });
        return { token, usuario };
    }

    async verifyToken(token: string) {
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET? process.env.JWT_SECRET : "");
        const usuario = await this.usuarioRepository.findByEmail(decodedToken.email);
        return usuario;
    }
}

export {AuthService}