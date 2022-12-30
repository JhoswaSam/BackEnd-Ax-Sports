import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";

export class SedeMiddleware{
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    SedeValidator(req: Request, res: Response, next: NextFunction){
        const {nombre, direccion} = req.body;

        const valid = new SedeDTO()

        valid.nombre = nombre;
        valid.direccion = direccion;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}