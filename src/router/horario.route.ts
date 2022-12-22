import { RouterBase } from "../config/router";
import { HorarioController } from "../controllers/horario.controller";

export class HorarioRouter extends RouterBase<HorarioController>{
    constructor(){
        super(HorarioController)
    }

    routers():void{
        this.router.get('/horarios',(req,res)=>this.controller.getHorarios(req,res));
        this.router.get('/horario/:id',(req,res)=>this.controller.getHorarioById(req,res));
        this.router.post('/createHorario',(req,res)=>this.controller.createHorario(req,res));
        this.router.put('/updateHorario/:id',(req,res)=>this.controller.updateHorario(req,res));
        this.router.delete('/deleteHorario/:id',(req,res)=>this.controller.deteleHorario(req,res));
    }
}