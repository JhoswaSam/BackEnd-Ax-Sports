import { ConfigServer } from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import { AdministradorService } from "../../services/administrador.service";
import { AdministradorEntity } from "../../models/administrador.entity";
import { PayloadTokenAdmin } from "../../shared/interfaces/authAdmin.interface";

import { verify, JwtPayload } from "jsonwebtoken";
import { EstudianteService } from "../../services/estudiante.service";
import { ResponsableEconomicoService } from "../../services/responsableEconomico.service";
import { GuardService } from "../guards/verified.guard";

export class AuthAdminService extends ConfigServer{
    constructor(
        private readonly administradorService: AdministradorService = new AdministradorService(),
        private readonly estudianteService: EstudianteService = new EstudianteService(),
        private readonly responsableService: ResponsableEconomicoService = new ResponsableEconomicoService(),
        private readonly guard:GuardService = new GuardService(),
        private readonly jwtInstance = jwt,
    ){
        super();
    }

    public async validateUser(usuario : string, contrasenia : string): Promise<any>{
        const userAdmin = await this.administradorService.findUser(usuario);
        const userEstudent = await this.estudianteService.findUser(usuario);
        const userResponsible = await this.responsableService.findUser(usuario);
        if (userAdmin) {

            const isIqual = await bcrypt.compare(contrasenia,userAdmin.contrasenia);
            if(isIqual) return userAdmin;
            
        }if(userEstudent) {
            
            const isIqual = await bcrypt.compare(contrasenia,userEstudent.contrasenia);
            if(isIqual) return userEstudent;

        }if (userResponsible) {
            
            const isIqual = await bcrypt.compare(contrasenia,userResponsible.contrasenia);
            if(isIqual) return userResponsible;

        }
        return null;
    }

    private sing(payload: jwt.JwtPayload, secret:any){
        return this.jwtInstance.sign(payload,secret, { expiresIn: "1h" })
    }

    public async generateJWT(user: any):Promise<{accessToken: string; user: any}>{
        
        const userConsult = await this.administradorService.findAdminWithTipo(user.usuario);
        const userEstudent = await this.estudianteService.findUser(user.usuario);
        const userResponsible = await this.responsableService.findUser(user.usuario);

        if (userConsult) {
            const payload: PayloadTokenAdmin = {
                tipo : userConsult!.tipo.nombre,
                sub : userConsult!.id
            }

            userConsult.contrasenia = "No tiene permiso de ver"

            return {
                accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET")),
                user: userConsult
            };

        }if (userEstudent) {
            const payload: PayloadTokenAdmin = {
                tipo : "estudiante",
                sub : userEstudent!.id
            }

            userEstudent.contrasenia = "No tiene permiso de ver"

            return {
                accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET")),
                user: userEstudent
            };
        } else {
            const payload: PayloadTokenAdmin = {
                tipo : "responsable",
                sub : userResponsible!.id
            }

            userResponsible!.contrasenia = "No tiene permiso de ver"

            return {
                accessToken: this.sing(payload, this.getEnviroment("JWT_SECRET")),
                user: userResponsible
            };
        }

    }

    public async dataProfile(token:string):Promise<any>{
        const profile = await this.guard.setDataProfile(token)

        return profile
    }

}