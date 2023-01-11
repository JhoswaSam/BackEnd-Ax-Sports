import { RouterBase } from "../config/router";
import { HorarioController } from "../controllers/horario.controller";
import { HorarioMiddleware } from "../middlewares/horario.middleware";

export class HorarioRouter extends RouterBase<HorarioController,HorarioMiddleware>{
    constructor(){
        super(HorarioController,HorarioMiddleware)
    }

    routers():void{
        this.router.get('/horarios',(req,res)=>this.controller.getHorarios(req,res));
        this.router.get('/horario/:id',(req,res)=>this.controller.getHorarioById(req,res));
        this.router.post('/createHorario',(req,res,next) =>[this.middleware.HorarioValidator(req,res,next)],(req,res)=>this.controller.createHorario(req,res));
        this.router.put('/updateHorario/:id',(req,res)=>this.controller.updateHorario(req,res));
        this.router.delete('/deleteHorario/:id',(req,res)=>this.controller.deteleHorario(req,res));
        this.router.get('/horarioTeacher/:id',(req,res)=>this.controller.getHorarioByIdWithAdministrador(req,res));
        this.router.post('/addTeacher/:id/:idTeacher',(req,res)=>this.controller.addAdministrador(req,res));
        this.router.post('/pushTeacher/:id/:idTeacher',(req,res)=>this.controller.pushAdministrador(req,res));
    }
}