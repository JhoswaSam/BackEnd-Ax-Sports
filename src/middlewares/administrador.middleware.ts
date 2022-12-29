import { NextFunction ,Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../app/response/http.response";
import { AdministradorDTO } from "../dto/administrador.dto";

export class AdministradorMiddleware{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }
    
    AdministradorValidator(req: Request, res: Response, next: NextFunction){
        const {nombre, apellidos, dni, telefono,usuario,contrasenia,tipo,sede} = req.body;

        const valid = new AdministradorDTO()

        valid.nombre = nombre;
        valid.apellidos = apellidos;
        valid.dni = dni;
        valid.telefono = telefono;
        valid.usuario = usuario;
        valid.contrasenia = contrasenia;
        valid.tipo = tipo;
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