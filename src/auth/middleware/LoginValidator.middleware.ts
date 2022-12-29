import { NextFunction ,Request, Response } from "express";
import { Validate, validate } from "class-validator";
import { HttpResponse } from "../../app/response/http.response";
import { AdministradorDTO } from "../../dto/administrador.dto";
import { AuthAdminService } from "../services/authAdmin.service";
import { AdministradorEntity } from "../../models/administrador.entity";


export class LoginValidatorMiddleware{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly loginService: AuthAdminService = new AuthAdminService()
    ){  }
    
    validateAdmin(req: Request, res: Response, next: NextFunction){
        const user =  req.body;

        const dataUser = this.loginService.validateUser(user)
        if (!dataUser) {
            return this.httpResponse.Error(res,"Usuario o contraseña incorrecta")
        }else{
            next()
        }
        
    }
}