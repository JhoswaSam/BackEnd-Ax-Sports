import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../app/response/http.response";
import { ResponsableEconomicoDTO } from "../dto/responsableEconomico.dto";

export class ResponsableEconomicoMiddleware{
    
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    ResponsableEconomicoValidator(req: Request, res: Response, next: NextFunction){
        const {usuario,contrasenia,nombre,apellidos} = req.body;

        const valid = new ResponsableEconomicoDTO()

        valid.usuario = usuario;
        valid.contrasenia= contrasenia;
        valid.nombre = nombre;
        valid.apellidos = apellidos;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}