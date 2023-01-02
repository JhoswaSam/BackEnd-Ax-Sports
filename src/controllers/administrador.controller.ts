import { Request, Response } from "express";
import { AdministradorService } from "../services/administrador.service";
import { HttpResponse } from "../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { AuthAdminService } from "../auth/services/auth.service";
import { GuardService } from "../auth/guards/verified.guard";

export class AdministradorController{
    constructor(
        private readonly administradorService: AdministradorService = new AdministradorService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:GuardService = new GuardService()
    ){    }

    async getAdministradors(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {
                const data = await this.administradorService.findAll();
                if (data.length === 0) {
                    return this.httpResponse.NotFound(res, "No existen datos")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");

        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getAdministradorById(req: Request, res: Response) {
        
        const {id}= req.params;
        try {

            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {
                const data = await this.administradorService.findbyid(id);
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

    async createAdministrador(req: Request, res: Response) {
        
        try {
            
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {
                const data = await this.administradorService.create(req.body);
                if (data) {
                    return this.httpResponse.Ok(res, data)
                }else{
                    return this.httpResponse.UserExists(res,"El usuario ya existe")
                }
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");


            
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateAdministrador(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }
            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1) {
                const data: UpdateResult = await this.administradorService.update(id,req.body);
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

    async deteleAdministrador(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1) {
                const data: DeleteResult = await this.administradorService.delete(id);

                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al eliminar")
                }

                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"Usted no tiene permiso para ver estos datos");


            
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

}