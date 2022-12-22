import { RouterBase } from "../config/router";
import { PuntajeController } from "../controllers/puntaje.controller";

export class PuntajeRouter extends RouterBase<PuntajeController>{
    constructor(){
        super(PuntajeController)
    }

    routers():void{
        this.router.get('/puntajes',(req,res)=>this.controller.getPuntajes(req,res));
        this.router.get('/puntaje/:id',(req,res)=>this.controller.getPuntajeById(req,res));
        this.router.post('/createPuntaje',(req,res)=>this.controller.createPuntaje(req,res));
        this.router.put('/updatePuntaje/:id',(req,res)=>this.controller.updatePuntaje(req,res));
        this.router.delete('/deletePuntaje/:id',(req,res)=>this.controller.detelePuntaje(req,res));
    }
}