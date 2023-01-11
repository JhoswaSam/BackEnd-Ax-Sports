import { HttpResponse } from "../../shared/response/http.response";
import { ExtentionsServices } from "../services/userExtentions.service";
import { Request, Response } from "express";

export class ExtentionsController extends ExtentionsServices{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){
        super()
    }

    async Payments(req:Request,res:Response){
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }
             
            const profile = await this.myPayments(token);
            return this.httpResponse.Ok(res,profile)
        } catch (error) {
            return this.httpResponse.Error(res,error)
        }
    }

    async Children(req:Request,res:Response){
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const Children = await this.myChildren(token);
            return this.httpResponse.Ok(res,Children)
        } catch (error) {
            return this.httpResponse.Error(res,error)
        }
    }

    async Schedule(req:Request,res:Response){
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const schedule = await this.mySchedule(token);
            return this.httpResponse.Ok(res,schedule)
            
        } catch (error) {
            return this.httpResponse.Error(res,error)
        }
    }
}
