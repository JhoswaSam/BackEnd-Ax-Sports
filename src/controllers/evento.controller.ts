import { Request, Response } from "express";
import { EventoService } from "../services/evento.service";
import { HttpResponse } from "../config/app/response/http.response";

export class EventoController{
    constructor(
        private readonly eventoService: EventoService = new EventoService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){   }

    async getEventos(req: Request, res: Response) {
        try {
            const data = await this.eventoService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getEventoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createEvento(req: Request, res: Response) {
        try {
            const data = await this.eventoService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.update(id,req.body);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.delete(id);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}