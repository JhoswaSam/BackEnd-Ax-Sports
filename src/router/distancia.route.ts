import { RouterBase } from "../config/router";
import { DistanciaController } from "../controllers/distancia.controller";

export class DistanciaRouter extends RouterBase<DistanciaController>{
    constructor(){
        super(DistanciaController)
    }

    routers():void{
        this.router.get('/distancias',(req,res)=>this.controller.getDistancias(req,res));
        this.router.get('/distancia/:id',(req,res)=>this.controller.getDistanciaById(req,res));
        this.router.post('/createDistancia',(req,res)=>this.controller.createDistancia(req,res));
        this.router.put('/updateDistancia/:id',(req,res)=>this.controller.updateDistancia(req,res));
        this.router.delete('/deleteDistancia/:id',(req,res)=>this.controller.deteleDistancia(req,res));
    }
}