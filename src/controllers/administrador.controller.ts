import { Request, Response } from "express";
import { AdministradorService } from "../services/administrador.service";
import { HttpResponse } from "../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { AuthAdminService } from "../auth/services/auth.service";

export class AdministradorController{
    constructor(
        private readonly administradorService: AdministradorService = new AdministradorService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:AuthAdminService = new AuthAdminService()
    ){    }

    async getAdministradors(req: Request, res: Response) {
        try {
            

            const data = await this.administradorService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getAdministradorById(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            
            const data = await this.administradorService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createAdministrador(req: Request, res: Response) {
        
        try {
            
            const data = await this.administradorService.create(req.body);
            if (data) {
                return this.httpResponse.Ok(res, data)
            }else{
                return this.httpResponse.UserExists(res,"El usuario ya existe")
            }
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateAdministrador(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            
            const data: UpdateResult = await this.administradorService.update(id,req.body);

            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleAdministrador(req: Request, res: Response) {
        
        const {id}= req.params;
        try {
            
            const data: DeleteResult = await this.administradorService.delete(id);

            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al eliminar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async findAdministradorWithTipo(req: Request, res: Response) {
        const {id}= req.params;
        try {

            const data = await this.administradorService.findAdminWithTipo(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }


}