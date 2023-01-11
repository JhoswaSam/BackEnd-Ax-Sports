import { Request, Response } from "express";
import { HorarioService } from "../services/horario.service";
import { HttpResponse } from "../shared/response/http.response";
import { GuardService } from "../auth/guards/verified.guard";
import { AdministradorEntity } from "../models/administrador.entity";
import { AdministradorService } from "../services/administrador.service";

export class HorarioController{
    constructor(
        private readonly horarioService: HorarioService = new HorarioService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:GuardService = new GuardService(),
        private readonly admin:AdministradorService = new AdministradorService()
    ){   }

    async getHorarios(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const data = await this.horarioService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getHorarioById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 || typeUser === 2) {
                const data = await this.horarioService.findbyid(id);
                if (!data) {
                    return this.httpResponse.NotFound(res, "No existe datos")
                }
                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createHorario(req: Request, res: Response) {
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 || typeUser === 2) {

                const data = await this.horarioService.create(req.body);
                return this.httpResponse.Ok(res, data)
            }
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateHorario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 || typeUser === 2) {
                const data = await this.horarioService.update(id,req.body);
                
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al actualizar")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleHorario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const typeUser = await this.auth.setPermissions(token);
            if (typeUser === 1 ) {
                const data = await this.horarioService.delete(id);
                
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "Hay un error al eliminar")
                }
    
                return this.httpResponse.Ok(res, data)
            }
            
            return this.httpResponse.Unauthorized(res,"No tiene permiso para esta accion");
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getHorarioByIdWithAdministrador(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const data = await this.horarioService.misProfesores(id)
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async addAdministrador(req: Request, res: Response) {
        const {id,idTeacher}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const respuesta = await this.horarioService.agregarProfesor(idTeacher,id);

            return this.httpResponse.Ok(res, respuesta)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async pushAdministrador(req: Request, res: Response) {
        const {id,idTeacher}= req.params;
        try {
            // Verificamos si esta logeado o no 
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"Inicie sesion primero");
            }

            const respuesta = await this.horarioService.eliminaProfesor(idTeacher,id);

             return this.httpResponse.Ok(res, respuesta)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}