import { NextFunction ,Request, Response } from "express";
import { SedeDTO } from "../dto/sede.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/response/http.response";
import { EstudianteDTO } from "../dto/estudiante.dto";

export class EstudianteMiddleware{
    
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){  }
    
    EstudianteValidator(req: Request, res: Response, next: NextFunction){
        const {nombre, apellidos, dni, telefono, fechaNacimiento,usuario,contrasenia,sexo,sede} = req.body;

        const valid = new EstudianteDTO()

        valid.nombre = nombre;
        valid.apellidos = apellidos;
        valid.dni = dni;
        valid.telefono = telefono;
        valid.fechaNacimiento = fechaNacimiento;
        valid.usuario = usuario;
        valid.contrasenia = contrasenia;
        valid.sexo = sexo;
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