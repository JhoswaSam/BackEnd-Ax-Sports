import { Request, Response } from "express";
import { TipoService } from "../services/tipo.service";

export class TipoController{
    constructor(private readonly tipoService: TipoService = new TipoService()){

    }

    async getTipos(req: Request, res: Response) {
        try {
            const data = await this.tipoService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getTipoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createTipo(req: Request, res: Response) {
        try {
            const data = await this.tipoService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateTipo(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleTipo(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.tipoService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}