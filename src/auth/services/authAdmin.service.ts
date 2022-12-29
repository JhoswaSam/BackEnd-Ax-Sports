import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import { AdministradorService } from "../../services/administrador.service";
import { AdministradorEntity } from "../../models/administrador.entity";
import { PayloadTokenAdmin } from "../../app/interfaces/authAdmin.interface";

export class AuthAdminService extends ConfigServer{
    constructor(
        private readonly administradorService: AdministradorService = new AdministradorService(),
        private readonly jwtInstance = jwt
    ){
        super();
    }

    public async validateAdmin(usuario : string, contrasenia : string): Promise<AdministradorEntity| null>{
        const user = await this.administradorService.findUser(usuario);
        if (user) {
            const isIqual = await bcrypt.compare(contrasenia,user.contrasenia);
            if(isIqual){
                return user;
            }
        }
        return null;
    }

    public async validateUser(User: AdministradorEntity): Promise<AdministradorEntity| null>{
        const user = await this.administradorService.findUser(User.usuario);
        if (user) {
            const isIqual = await bcrypt.compare(User.contrasenia,user.contrasenia);
            if(isIqual){
                return user;
            }
        }
        return null;
    }

    sing(payload: jwt.JwtPayload, secret:any){
        return this.jwtInstance.sign(payload,secret, { expiresIn: "1h" })
    }

    public async generateJWT(user: AdministradorEntity):Promise<{accessToken: string; user: AdministradorEntity|null}>{
        
        const userConsult = await this.administradorService.findAdminWithTipo(user.usuario);
        
        const payload: PayloadTokenAdmin = {
            tipo : userConsult!.tipo.nombre,
            sub : userConsult!.id
        }

        return {
            accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET")),
            user: userConsult
        };
    }
}