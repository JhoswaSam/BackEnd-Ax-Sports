import { RouterBase } from "../config/router";
import { ResponsableEconomicoController } from "../controllers/responsableEconomico.controller";

export class ResponsableEconomicoRouter extends RouterBase<ResponsableEconomicoController>{
    constructor(){
        super(ResponsableEconomicoController)
    }

    routers():void{
        this.router.get('/responsableEconomicos',(req,res)=>this.controller.getResponsableEconomicos(req,res));
        this.router.get('/responsableEconomico/:id',(req,res)=>this.controller.getResponsableEconomicoById(req,res));
        this.router.post('/createResponsableEconomico',(req,res)=>this.controller.createResponsableEconomico(req,res));
        this.router.put('/updateResponsableEconomico/:id',(req,res)=>this.controller.updateResponsableEconomico(req,res));
        this.router.delete('/deleteResponsableEconomico/:id',(req,res)=>this.controller.deteleResponsableEconomico(req,res));
    }
}