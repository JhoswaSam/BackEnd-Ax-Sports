import { Request, Response } from "express";
import { DistanciaService } from "../services/distancia.service";
import { HttpResponse } from "../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { AuthAdminService } from "../auth/services/auth.service";
import { GuardService } from "../auth/guards/verified.guard";

export class DistanciaController{
    constructor(
        private readonly distanciaService: DistanciaService = new DistanciaService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:GuardService = new GuardService()
    ){   }

    async getDistancias(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const data = await this.distanciaService.findAll();
            if (data.length ===0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

   

    async createDistancia(req: Request, res: Response) {
        try {

            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if(typeUser === 1 || typeUser === 2){
                const data = await this.distanciaService.create(req.body);
                return this.httpResponse.Ok(res, data)

            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
           
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {
                
                const data:UpdateResult = await this.distanciaService.update(id,req.body);
                
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al actualizar")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {

                const data: DeleteResult = await this.distanciaService.delete(id);
                
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al eliminar")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }


    /**
     * FUNCIONES OLVIDADAS POR QUE CREO QUE NO SON NECESARIAS
     * 
     */

    async getDistanciaById(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1 || typeUser === 2) {
                const data = await this.distanciaService.findbyid(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe datos")
                }
                return this.httpResponse.Ok(res, data)
            }

            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}