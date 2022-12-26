import { NextFunction ,Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../config/app/response/http.response";
import { HorarioDTO } from "../dto/horario.dto";

export class HorarioMiddleware{
    
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }
    
    HorarioValidator(req: Request, res: Response, next: NextFunction){
        const {dias, monto, categoria, hora, horaFin,sede} = req.body;

        const valid = new HorarioDTO()

        valid.dias = dias;
        valid.monto = monto;
        valid.categoria = categoria;
        valid.hora = hora;
        valid.horaFin = horaFin;
        valid.sede = sede;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}