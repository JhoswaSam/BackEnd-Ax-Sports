import { verify } from "jsonwebtoken";
import { ConfigServer } from "../../config/config";
import { AdministradorService } from "../../services/administrador.service";
import { EstudianteService } from "../../services/estudiante.service";
import { ResponsableEconomicoService } from "../../services/responsableEconomico.service";
import { AdministradorEntity } from "../../models/administrador.entity";
import { EstudianteEntity } from "../../models/estudiante.entity";
import { ResponsableEconomicoEntity } from "../../models/responsableEconomico.entity";

export class GuardService extends ConfigServer{
    constructor( 
        private readonly adminService: AdministradorService = new AdministradorService(),
        private readonly studentService: EstudianteService = new EstudianteService(),
        private readonly responsableService: ResponsableEconomicoService = new ResponsableEconomicoService()
     ){
        super();
    }

    /**
     * 
     * @param token Token de acceso o de inicio de sesion 
     * @returns Nos retorna el tipo de usuario que se segun esta leyenda
     * 1    ->  super
     * 2    ->  docente
     * 3    ->  estudiente
     * 4    ->  responsable
     * -1   ->  ninguno
     */
    public async setPermissions(token: string):Promise<number>{

        const tipo = await this.getTipoToken(token);
        let respuesta:number

        switch (tipo) {
            case "super":
                respuesta = 1
                break;

            case "docente":
                respuesta = 2
                break;

            case "estudiante":
                respuesta = 3
                break;

            case "responsable":
                respuesta = 4
                break;
        
            default:
                respuesta = -1
                break;
        }

        return  respuesta
    }

    /**
     * 
     * @param token Token de acceso o de inicio de sesion 
     * @returns Nos retorna la data de usuario no importa el tipo
     */
    public async setDataProfile(token:string):Promise<any>{
        const tipo = await this.setPermissions(token);
        const id = await this.getSubToken(token);
        let data

        switch (tipo) {
            case 1:
                data = this.adminService.findAdminWithRelationsById(id);
                break;
            case 2:
                data = this.adminService.findAdminWithRelationsById(id);
                break;
            case 3:
                data = this.studentService.findbyid(id);
                break;
            case 4:
                data = this.responsableService.findbyid(id);
                break;
            default:
                data = null;
                break;
        }
        return data
    }

    /**
     * 
     * @param token Token de acceso o de inicio de sesion 
     * @returns Nos retorna el id de usuario no importa el tipo
     */
    public async getSubToken(token:string):Promise<string>{
        const subToken = verify(token,this.getEnviroment("JWT_SECRET"))
        const data = JSON.stringify(subToken)
        const id = JSON.parse(data).sub
        return id
    }

    private async getTipoToken(token: string):Promise<string>{

        const tipoAdmin = verify(token,this.getEnviroment("JWT_SECRET"))
        const data = JSON.stringify(tipoAdmin)
        const tipo = JSON.parse(data).tipo


        return tipo
    }

}