import { RouterBase } from "../config/router";
import { EventoController } from "../controllers/evento.controller";
import { EventoMiddleware } from "../middlewares/evento.middleware";

export class EventoRouter extends RouterBase<EventoController,EventoMiddleware>{
    constructor(){
        super(EventoController,EventoMiddleware)
    }

    routers():void{
        this.router.get('/eventos',(req,res)=>this.controller.getEventos(req,res));
        this.router.get('/evento/:id',(req,res)=>this.controller.getEventoById(req,res));
        this.router.post('/createEvento',(req,res,next)=>[this.middleware.EventoValidator(req,res,next)],(req,res)=>this.controller.createEvento(req,res));
        this.router.put('/updateEvento/:id',(req,res)=>this.controller.updateEvento(req,res));
        this.router.delete('/deleteEvento/:id',(req,res)=>this.controller.deteleEvento(req,res));
    }
}