import { RouterBase } from "../config/router";
import { PagoController } from "../controllers/pago.controller";

export class PagoRouter extends RouterBase<PagoController>{
    constructor(){
        super(PagoController)
    }

    routers():void{
        this.router.get('/pagos',(req,res)=>this.controller.getPagos(req,res));
        this.router.get('/pago/:id',(req,res)=>this.controller.getPagoById(req,res));
        this.router.post('/createPago',(req,res)=>this.controller.createPago(req,res));
        this.router.put('/updatePago/:id',(req,res)=>this.controller.updatePago(req,res));
        this.router.delete('/deletePago/:id',(req,res)=>this.controller.detelePago(req,res));
    }
}