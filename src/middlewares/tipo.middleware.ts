import { NextFunction ,Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../config/app/response/http.response";
import { TipoDTO } from "../dto/tipo.dto";

export class TipoMiddleware{
    
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    TipoValidator(req: Request, res: Response, next: NextFunction){
        const {nombre} = req.body;

        const valid = new TipoDTO()

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