import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import { AdministradorService } from "../../services/administrador.service";
import { AdministradorEntity } from "../../models/administrador.entity";
import { PayloadTokenAdmin } from "../../shared/interfaces/authAdmin.interface";

import { verify, JwtPayload } from "jsonwebtoken";

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

    public async verifiedIsSuper(token: any):Promise<boolean>{

        const tipoAdmin = verify(token,this.getEnviroment("JWT_SECRET"))
        const data = JSON.stringify(tipoAdmin)
        const tipo = JSON.parse(data).tipo

        if (!tipo) {
            return false
        }
        if (tipo!=="super") {
            return false
        }
        return true
    }

}