import { Request, Response } from "express";
import { PagoService } from "../services/pago.service";
import { HttpResponse } from "../shared/response/http.response";
import { GuardService } from "../auth/guards/verified.guard";

export class PagoController{
    constructor(
        private readonly pagoService: PagoService = new PagoService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:GuardService = new GuardService()
    ){  }

    async getPagos(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 ) {
                const data = await this.pagoService.findAll();
                if (data.length === 0) {
                    return this.httpResponse.NotFound(res, "No existen datos")
                }
                return this.httpResponse.Ok(res, data)
            }
            
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");

        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getPagoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createPago(req: Request, res: Response) {
        try {
            const data = await this.pagoService.create(req.body);
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updatePago(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.update(id,req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async detelePago(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.delete(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }


    
}
