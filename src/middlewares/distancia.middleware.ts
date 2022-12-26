import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../config/app/response/http.response";
import { DistanciaDTO } from "../dto/distancia.dto";

export class DistanciaMiddleware{
    
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }
    
    DistanciaValidator(req: Request, res: Response, next: NextFunction){
        const {nombre} = req.body;

        const valid = new DistanciaDTO()

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