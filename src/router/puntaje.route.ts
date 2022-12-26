import { RouterBase } from "../config/router";
import { PuntajeController } from "../controllers/puntaje.controller";
import { PuntajeMiddleware } from "../middlewares/puntaje.middleware";

export class PuntajeRouter extends RouterBase<PuntajeController,PuntajeMiddleware>{
    constructor(){
        super(PuntajeController,PuntajeMiddleware)
    }

    routers():void{
        this.router.get('/puntajes',(req,res)=>this.controller.getPuntajes(req,res));
        this.router.get('/puntaje/:id',(req,res)=>this.controller.getPuntajeById(req,res));
        this.router.post('/createPuntaje',(req,res,next)=>[this.middleware.PuntajeValidator(req,res,next)],(req,res)=>this.controller.createPuntaje(req,res));
        this.router.put('/updatePuntaje/:id',(req,res)=>this.controller.updatePuntaje(req,res));
        this.router.delete('/deletePuntaje/:id',(req,res)=>this.controller.detelePuntaje(req,res));
    }
}