import { RouterBase } from "../config/router";
import { ResponsableEconomicoController } from "../controllers/responsableEconomico.controller";
import { ResponsableEconomicoMiddleware } from "../middlewares/responsableEconomico.middleware";

export class ResponsableEconomicoRouter extends RouterBase<ResponsableEconomicoController,ResponsableEconomicoMiddleware>{
    constructor(){
        super(ResponsableEconomicoController,ResponsableEconomicoMiddleware)
    }

    routers():void{
        this.router.get('/responsableEconomicos',(req,res)=>this.controller.getResponsableEconomicos(req,res));
        this.router.get('/responsableEconomico/:id',(req,res)=>this.controller.getResponsableEconomicoById(req,res));
        this.router.post('/createResponsableEconomico',(req,res,next)=>[this.middleware.ResponsableEconomicoValidator(req,res,next)],(req,res)=>this.controller.createResponsableEconomico(req,res));
        this.router.put('/updateResponsableEconomico/:id',(req,res)=>this.controller.updateResponsableEconomico(req,res));
        this.router.delete('/deleteResponsableEconomico/:id',(req,res)=>this.controller.deteleResponsableEconomico(req,res));
    }
}