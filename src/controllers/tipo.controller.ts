import { Request, Response } from "express";
import { TipoService } from "../services/tipo.service";
import { HttpResponse } from "../app/response/http.response";

export class TipoController{
    constructor(
        private readonly tipoService: TipoService = new TipoService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }

    async getTipos(req: Request, res: Response) {
        try {
            const data = await this.tipoService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getTipoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createTipo(req: Request, res: Response) {
        try {
            const data = await this.tipoService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateTipo(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleTipo(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}