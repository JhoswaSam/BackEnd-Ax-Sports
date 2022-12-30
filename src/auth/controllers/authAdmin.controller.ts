import { Request, Response } from "express";
import { AuthAdminService } from "../services/authAdmin.service";
import { HttpResponse } from "../../shared/response/http.response";

import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from "passport-jwt"
import { AdministradorEntity } from "../../models/administrador.entity";
import { AdministradorService } from "../../services/administrador.service";
import { verify } from "jsonwebtoken";

export class AuthAdminController extends AuthAdminService{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){
        super();
    }

    async login(req:Request, res: Response){
        try {
            
            const adminEncode = req.body
            const encode = await this.generateJWT(adminEncode);

            if (!encode) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }

            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge: 60000*60});
            res.write(JSON.stringify(encode));
            res.end();
        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res,error)
        }
    }

    async postLogin(req:Request,res:Response){
        try {
            const {usuario,contrasenia} = req.body
            const dataResult = await this.validateAdmin(usuario,contrasenia)
            if (!dataResult) {
                return this.httpResponse.UserDenied(res,"Usuario y/o contraseña incorrectos")
            }

            const encode = await this.generateJWT(dataResult);
            if (!encode) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }

            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge: 60000*60});
            res.write(JSON.stringify(encode));
            res.end();
          
        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res,error)
        }
    }

    async postLogout(req:Request,res:Response){
        try {
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }
            const data = verify(token,this.getEnviroment("JWT_SECRET"))
            return this.httpResponse.Ok(res,data)
          
        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res,error)
        }
    }


}