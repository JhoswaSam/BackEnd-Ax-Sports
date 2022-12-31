import { Request, Response } from "express";
import { EstudianteService } from "../services/estudiante.service";
import { HttpResponse } from "../shared/response/http.response";
import { AuthAdminService } from "../auth/services/auth.service";

export class EstudianteController{
    constructor(
        private readonly estudianteService: EstudianteService = new EstudianteService(), 
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly auth:AuthAdminService = new AuthAdminService()
    ){   }

    async getEstudiantes(req: Request, res: Response) {
        try {
            // Valid token
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }

            // Valid super
            const validSuper = await this.auth.verifiedIsSuper(token);

            if (!validSuper) {
                return this.httpResponse.Unauthorized(res,"No tiene permisos")
            }

            const data = await this.estudianteService.findAll();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async getEstudianteById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            // Valid token
            const token = req.cookies.accessToken
            if (!token) {
                return this.httpResponse.Unauthorized(res,"No tienes permisos");
            }
    
            // Valid super
            const validSuper = await this.auth.verifiedIsSuper(token);
    
            if (!validSuper) {
                return this.httpResponse.Unauthorized(res,"No tiene permisos")
            }
            const data = await this.estudianteService.findbyid(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async createEstudiante(req: Request, res: Response) {
        try {
            const data = await this.estudianteService.create(req.body);

            if (data) {
                return this.httpResponse.Ok(res, data)
            }else{
                return this.httpResponse.UserExists(res,"El usuario ya existe")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async updateEstudiante(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.update(id,req.body);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    async deteleEstudiante(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.delete(id);
            
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "Hay un error al actualizar")
            }

            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }

    /**
     *  CONTROLLERS OF THE RELATIONS
     */


    /**
     * @returns Estudiante con la sede a la que pertenece
     */
    async findEstudianteWithSede(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.findEstudianteWithSede(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe datos")
            }
            return this.httpResponse.Ok(res, data)
        } catch (e) {
            return this.httpResponse.NotFound(res, e)
        }
    }
}