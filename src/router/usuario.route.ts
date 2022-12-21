import { RouterBase } from "../config/router";
import { UsuarioController } from "../controllers/usuario.controller";

export class UsuarioRouter extends RouterBase<UsuarioController>{
    constructor(){
        super(UsuarioController)
    }

    routers():void{
        this.router.get('/usuarios',(req,res)=>this.controller.getUsuarios(req,res));
        this.router.get('/usuario/:id',(req,res)=>this.controller.getUsuarioById(req,res));
        this.router.post('/createUsuario',(req,res)=>this.controller.createUsuario(req,res));
        this.router.put('/updateUsuario/:id',(req,res)=>this.controller.updateUsuario(req,res));
        this.router.delete('/deleteUsuario/:id',(req,res)=>this.controller.deteleUsuario(req,res));
    }
}