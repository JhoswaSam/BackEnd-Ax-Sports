import { RouterBase } from "../config/router";
import { EventoController } from "../controllers/evento.controller";

export class EventoRouter extends RouterBase<EventoController>{
    constructor(){
        super(EventoController)
    }

    routers():void{
        this.router.get('/eventos',(req,res)=>this.controller.getEventos(req,res));
        this.router.get('/evento/:id',(req,res)=>this.controller.getEventoById(req,res));
        this.router.post('/createEvento',(req,res)=>this.controller.createEvento(req,res));
        this.router.put('/updateEvento/:id',(req,res)=>this.controller.updateEvento(req,res));
        this.router.delete('/deleteEvento/:id',(req,res)=>this.controller.deteleEvento(req,res));
    }
}