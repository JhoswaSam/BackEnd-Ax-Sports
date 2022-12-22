import { Request, Response } from "express";
import { ResponsableEconomicoService } from "../services/responsableEconomico.service";

export class ResponsableEconomicoController{
    constructor(private readonly responsableEconomicoService: ResponsableEconomicoService = new ResponsableEconomicoService()){

    }

    async getResponsableEconomicos(req: Request, res: Response) {
        try {
            const data = await this.responsableEconomicoService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getResponsableEconomicoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createResponsableEconomico(req: Request, res: Response) {
        try {
            const data = await this.responsableEconomicoService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateResponsableEconomico(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleResponsableEconomico(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.responsableEconomicoService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}