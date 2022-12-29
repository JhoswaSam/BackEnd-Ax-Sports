import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../app/response/http.response";
import { InscripcionDTO } from "../dto/inscripcion.dto";

export class InscripcionMiddleware{
    
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    InscripcionValidator(req: Request, res: Response, next: NextFunction){
        const {pago,estudiante,horario} = req.body;

        const valid = new InscripcionDTO()

        valid.pago = pago;
        valid.estudiante= estudiante;
        valid.horario = horario;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}