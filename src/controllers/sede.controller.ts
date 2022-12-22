import { Request, Response } from "express";
import { SedeService } from "../services/sede.service";
import { HttpResponse } from "../config/app/response/http.response";

export class SedeController{
    constructor(
        private readonly sedeService: SedeService = new SedeService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }

    async getSedes(req: Request, res: Response) {
        try {
            const data = await this.sedeService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getSedeById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createSede(req: Request, res: Response) {
        try {
            const data = await this.sedeService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateSede(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleSede(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}