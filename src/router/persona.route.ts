import { RouterBase } from "../config/router";
import { PersonaController } from "../controllers/persona.controller";

export class PersonaRouter extends RouterBase<PersonaController>{
    constructor(){
        super(PersonaController)
    }

    routers():void{
        this.router.get('/personas',(req,res)=>this.controller.getPersonas(req,res));
        this.router.get('/persona/:id',(req,res)=>this.controller.getPersonaById(req,res));
        this.router.post('/createPersona',(req,res)=>this.controller.createPersona(req,res));
        this.router.put('/updatePersona/:id',(req,res)=>this.controller.updatePersona(req,res));
        this.router.delete('/deletePersona/:id',(req,res)=>this.controller.detelePersona(req,res));
    }
}