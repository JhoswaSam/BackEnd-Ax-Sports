import { Request, Response } from "express";
import { EventoService } from "../services/evento.service";
import { HttpResponse } from "../shared/response/http.response";
import { GuardService } from "../auth/guards/verified.guard";

export class EventoController{
    constructor(
        private readonly eventoService: EventoService = new EventoService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:GuardService = new GuardService()
    ){   }

    async getEventos(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 4) {
                
                return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
            }

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

            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);

            if (typeUser === 1 || typeUser === 2 ) {

                const data = await this.eventoService.findbyid(id);
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

    async createEvento(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 || typeUser === 2) {
                const data = await this.eventoService.create(req.body);
                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");

        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {

            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 || typeUser === 2) {
                const data = await this.eventoService.update(id,req.body);
                
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

    async deteleEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1) {
                const data = await this.eventoService.delete(id);
                
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al eliminar")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}