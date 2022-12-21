import { RouterBase } from "../config/router";
import { AdministradorController } from "../controllers/administrador.controller";

export class AdministradorRouter extends RouterBase<AdministradorController>{
    constructor(){
        super(AdministradorController)
    }

    routers():void{
        this.router.get('/administradores',(req,res)=>this.controller.getAdministradors(req,res));
        this.router.get('/administrador/:id',(req,res)=>this.controller.getAdministradorById(req,res));
        this.router.post('/createAdministrador',(req,res)=>this.controller.createAdministrador(req,res));
        this.router.put('/updateAdministrador/:id',(req,res)=>this.controller.updateAdministrador(req,res));
        this.router.delete('/deleteAdministrador/:id',(req,res)=>this.controller.deteleAdministrador(req,res));
    }
}