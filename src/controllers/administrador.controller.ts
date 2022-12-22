import { Request, Response } from "express";
import { AdministradorService } from "../services/administrador.service";
import { HttpResponse } from "../config/app/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class AdministradorController{
    constructor(
        private readonly administradorService: AdministradorService = new AdministradorService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
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
            return this.httpResponse.Ok(res, data)
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
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}