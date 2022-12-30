import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { EventoDTO } from "../dto/evento.dto";

export class EventoMiddleware{
    
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}
    
    EventoValidator(req: Request, res: Response, next: NextFunction){
        const {nombre} = req.body;

        const valid = new EventoDTO()

        valid.nombre = nombre;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}