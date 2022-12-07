import { HorarioController } from "../controllers/horarios.controller";
import { RouterBase } from "../config/router";

export class HorarioRouter extends RouterBase<HorarioController>{
    constructor(){
        super(HorarioController)
    }

    routers():void{
        this.router.get('/horarios',(req,res)=>this.controller.getHorario(req,res));
    }
}