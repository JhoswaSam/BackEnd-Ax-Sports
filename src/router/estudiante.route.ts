import { RouterBase } from "../config/router";
import { EstudianteController } from "../controllers/estudiante.controller";

export class EstudianteRouter extends RouterBase<EstudianteController>{
    constructor(){
        super(EstudianteController)
    }

    routers():void{
        this.router.get('/estudiantes',(req,res)=>this.controller.getEstudiantes(req,res));
        this.router.get('/estudiante/:id',(req,res)=>this.controller.getEstudianteById(req,res));
        this.router.post('/createEstudiante',(req,res)=>this.controller.createEstudiante(req,res));
        this.router.put('/updateEstudiante/:id',(req,res)=>this.controller.updateEstudiante(req,res));
        this.router.delete('/deleteEstudiante/:id',(req,res)=>this.controller.deteleEstudiante(req,res));
        /**
         *  ROUTES OF THE RELATIONS
         */
        this.router.get('/estudianteSede/:id',(req,res)=>this.controller.findEstudianteWithSede(req,res));
    }
}