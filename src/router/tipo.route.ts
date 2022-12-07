import { TipoController } from "../controllers/tipo.controller";
import { RouterBase } from "../config/router";

export class TipoRouter extends RouterBase<TipoController>{
    constructor(){
        super(TipoController)
    }

    routers():void{
        this.router.get('/tipos',(req,res)=>this.controller.getTipos(req,res));
        this.router.get('/tipo/:id',(req,res)=>this.controller.getTipoById(req,res));
        this.router.post('/createTipo',(req,res)=>this.controller.createTipo(req,res));
        this.router.put('/updateTipo/:id',(req,res)=>this.controller.updateTipo(req,res));
        this.router.delete('/deleteTipo/:id',(req,res)=>this.controller.deteleTipo(req,res));
    }
}