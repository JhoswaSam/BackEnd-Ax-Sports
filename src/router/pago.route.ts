import { RouterBase } from "../config/router";
import { PagoController } from "../controllers/pago.controller";
import { PagoMiddleware } from "../middlewares/pago.middleware";

export class PagoRouter extends RouterBase<PagoController,PagoMiddleware>{
    constructor(){
        super(PagoController,PagoMiddleware)
    }

    routers():void{
        this.router.get('/pagos',(req,res)=>this.controller.getPagos(req,res));
        this.router.get('/pago/:id',(req,res)=>this.controller.getPagoById(req,res));
        this.router.post('/createPago',(req,res,next)=>[this.middleware.PagoValidator(req,res,next)],(req,res)=>this.controller.createPago(req,res));
        this.router.put('/updatePago/:id',(req,res)=>this.controller.updatePago(req,res));
        this.router.delete('/deletePago/:id',(req,res)=>this.controller.detelePago(req,res));
    }
}