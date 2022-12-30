import { Request, Response } from "express";
import { PuntajeService } from "../services/puntaje.service";
import { HttpResponse } from "../shared/response/http.response";

export class PuntajeController{
    constructor(
        private readonly puntajeService: PuntajeService = new PuntajeService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }

    async getPuntajes(req: Request, res: Response) {
        try {
            const data = await this.puntajeService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getPuntajeById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createPuntaje(req: Request, res: Response) {
        try {
            const data = await this.puntajeService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updatePuntaje(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async detelePuntaje(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}