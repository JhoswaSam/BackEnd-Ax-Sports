import { Request, Response } from "express";
import { DistanciaService } from "../services/distancia.service";
import { HttpResponse } from "../app/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class DistanciaController{
    constructor(
        private readonly distanciaService: DistanciaService = new DistanciaService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){   }

    async getDistancias(req: Request, res: Response) {
        try {
            const data = await this.distanciaService.findAll();
            if (data.length ===0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getDistanciaById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createDistancia(req: Request, res: Response) {
        try {
            const data = await this.distanciaService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.update(id,req.body);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.delete(id);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}