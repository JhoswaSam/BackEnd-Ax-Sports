import { RouterBase } from "../config/router";
import { SedeController } from "../controllers/sede.controller";
import { SedeMiddleware } from "../middlewares/sede.middleware";

export class SedeRouter extends RouterBase<SedeController,SedeMiddleware>{
    constructor(){
        super(SedeController,SedeMiddleware)
    }

    routers():void{
        this.router.get('/sedes',(req,res)=>this.controller.getSedes(req,res));
        this.router.get('/sede/:id',(req,res)=>this.controller.getSedeById(req,res));
        
        this.router.post('/createSede',(req, res, next) => [this.middleware.SedeValidator(req,res,next)],(req,res)=>this.controller.createSede(req,res));
        
        this.router.put('/updateSede/:id',(req,res)=>this.controller.updateSede(req,res));
        this.router.delete('/deleteSede/:id',(req,res)=>this.controller.deteleSede(req,res));
    }
}