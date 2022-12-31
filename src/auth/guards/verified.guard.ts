import { verify } from "jsonwebtoken";
import { ConfigServer } from "../../config/config";

export class GuardService extends ConfigServer{
    constructor(  ){
        super();
    }

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

    private async getTipoToken(token: string):Promise<string>{

        const tipoAdmin = verify(token,this.getEnviroment("JWT_SECRET"))
        const data = JSON.stringify(tipoAdmin)
        const tipo = JSON.parse(data).tipo


        return tipo
    }

}