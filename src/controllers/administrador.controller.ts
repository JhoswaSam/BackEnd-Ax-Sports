import { Request, Response } from "express";
import { AdministradorService } from "../services/administrador.service";

export class AdministradorController{
    constructor(private readonly administradorService: AdministradorService = new AdministradorService()){

    }

    async getAdministradors(req: Request, res: Response) {
        try {
            const data = await this.administradorService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getAdministradorById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.administradorService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createAdministrador(req: Request, res: Response) {
        try {
            const data = await this.administradorService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateAdministrador(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.administradorService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleAdministrador(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.administradorService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}