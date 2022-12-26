import { NextFunction ,Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../config/app/response/http.response";
import { PagoDTO } from "../dto/pago.dto";

export class PagoMiddleware{
    
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    
    PagoValidator(req: Request, res: Response, next: NextFunction){
        const {mes, pagoTotal,medio,comprobante} = req.body;

        const valid = new PagoDTO()

        valid.mes = mes;
        valid.pagoTotal= pagoTotal;
        valid.medio = medio;
        valid.comprobante = comprobante;

        validate(valid).then((err)=>{
            if (err.length > 0) {
                return this.httpResponse.Error(res,err)
            }else{
                next()
            }
        })
    }
}