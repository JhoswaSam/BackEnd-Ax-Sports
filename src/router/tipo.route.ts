import { TipoController } from "../controllers/tipo.controller";
import { RouterBase } from "../config/router";
import { TipoMiddleware } from "../middlewares/tipo.middleware";

export class TipoRouter extends RouterBase<TipoController,TipoMiddleware>{
    constructor(){
        super(TipoController,TipoMiddleware)
    }

    routers():void{
        this.router.get('/tipos',(req,res)=>this.controller.getTipos(req,res));
        this.router.get('/tipo/:id',(req,res)=>this.controller.getTipoById(req,res));
        this.router.post('/createTipo',(req,res,next)=>[this.middleware.TipoValidator(req,res,next)],(req,res)=>this.controller.createTipo(req,res));
        this.router.put('/updateTipo/:id',(req,res)=>this.controller.updateTipo(req,res));
        this.router.delete('/deleteTipo/:id',(req,res)=>this.controller.deteleTipo(req,res));
    }
}