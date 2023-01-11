import { GuardService } from "../../auth/guards/verified.guard";
import { ConfigServer } from "../../config/config";
import { AdministradorService } from "../../services/administrador.service";
import { EstudianteService } from "../../services/estudiante.service";
import { ResponsableEconomicoService } from "../../services/responsableEconomico.service";
import { calcularEdad } from "../../shared/functions/calcularEdad";

export class ExtentionsServices extends ConfigServer{
    constructor(
        private readonly auth:GuardService = new GuardService(),
        private readonly student: EstudianteService = new EstudianteService(),
        private readonly responsable: ResponsableEconomicoService = new ResponsableEconomicoService(),
        private readonly admin: AdministradorService = new AdministradorService()
    ){
        super();
    }

    async myPayments(token: string):Promise<any>{
        const type = await this.auth.setPermissions(token);

        if (type === 4) {
            return this.responsable.misPagos(await this.auth.getSubToken(token))
        }

        const fechaNacimiento = await this.auth.setDataProfile(token);
        const edad = calcularEdad(fechaNacimiento.fechaNacimiento!)

        if (edad >= 18 && type === 3) {
            return this.student.misPagos(await this.auth.getSubToken(token))
        }

        return null
    }

    async myChildren(token: string):Promise<any>{
        const type = await this.auth.setPermissions(token);

        if(type === 4){
            return this.responsable.misHijos(await this.auth.getSubToken(token))
        }
        return null
    }

    async mySchedule(token: string):Promise<any>{
        const type = await this.auth.setPermissions(token);

        if (type === 2) {
            return this.admin.mySchedules(await this.auth.getSubToken(token))
        }
        return null
    }
}