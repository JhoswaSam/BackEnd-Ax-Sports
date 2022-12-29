import { Request, Response } from "express";
import { InscripcionService } from "../services/inscripcion.service";
import { HttpResponse } from "../app/response/http.response";

export class InscripcionController{
    constructor(
        private readonly inscripcionService: InscripcionService = new InscripcionService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }

    async getInscripcions(req: Request, res: Response) {
        try {
            const data = await this.inscripcionService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getInscripcionById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createInscripcion(req: Request, res: Response) {
        try {
            const data = await this.inscripcionService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateInscripcion(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleInscripcion(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}