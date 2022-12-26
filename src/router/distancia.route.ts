import { RouterBase } from "../config/router";
import { DistanciaController } from "../controllers/distancia.controller";
import { DistanciaMiddleware } from "../middlewares/distancia.middleware";

export class DistanciaRouter extends RouterBase<DistanciaController,DistanciaMiddleware>{
    constructor(){
        super(DistanciaController,DistanciaMiddleware)
    }

    routers():void{
        this.router.get('/distancias',(req,res)=>this.controller.getDistancias(req,res));
        this.router.get('/distancia/:id',(req,res)=>this.controller.getDistanciaById(req,res));
        
        this.router.post('/createDistancia',(req,res,next)=>[this.middleware.DistanciaValidator(req,res,next)],(req,res)=>this.controller.createDistancia(req,res));
        
        this.router.put('/updateDistancia/:id',(req,res)=>this.controller.updateDistancia(req,res));
        this.router.delete('/deleteDistancia/:id',(req,res)=>this.controller.deteleDistancia(req,res));
    }
}