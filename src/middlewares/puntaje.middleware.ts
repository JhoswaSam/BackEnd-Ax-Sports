import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { PuntajeDTO } from "../dto/puntaje.dto";

export class PuntajeMiddleware{
    
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    PuntajeValidator(req: Request, res: Response, next: NextFunction){
        const {fecha,estudiante,distancia,evento} = req.body;

        const valid = new PuntajeDTO()

        valid.fecha = fecha;
        valid.distancia= distancia;
        valid.evento = evento;
        valid.estudiante = estudiante;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}