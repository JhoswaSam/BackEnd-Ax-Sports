import { RouterBase } from "../config/router";
import { InscripcionController } from "../controllers/inscripcion.controller";

export class InscripcionRouter extends RouterBase<InscripcionController>{
    constructor(){
        super(InscripcionController)
    }

    routers():void{
        this.router.get('/inscripcions',(req,res)=>this.controller.getInscripcions(req,res));
        this.router.get('/inscripcion/:id',(req,res)=>this.controller.getInscripcionById(req,res));
        this.router.post('/createInscripcion',(req,res)=>this.controller.createInscripcion(req,res));
        this.router.put('/updateInscripcion/:id',(req,res)=>this.controller.updateInscripcion(req,res));
        this.router.delete('/deleteInscripcion/:id',(req,res)=>this.controller.deteleInscripcion(req,res));
    }
}