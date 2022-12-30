import { Request, Response } from "express";
import { ResponsableEconomicoService } from "../services/responsableEconomico.service";
import { HttpResponse } from "../shared/response/http.response";

export class ResponsableEconomicoController{
    constructor(
        private readonly responsableEconomicoService: ResponsableEconomicoService = new ResponsableEconomicoService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }

    async getResponsableEconomicos(req: Request, res: Response) {
        try {
            const data = await this.responsableEconomicoService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getResponsableEconomicoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createResponsableEconomico(req: Request, res: Response) {
        try {
            const data = await this.responsableEconomicoService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateResponsableEconomico(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleResponsableEconomico(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}