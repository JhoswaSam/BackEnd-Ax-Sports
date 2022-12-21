import { Request, Response } from "express";
import { DistanciaService } from "../services/distancia.service";

export class DistanciaController{
    constructor(private readonly distanciaService: DistanciaService = new DistanciaService()){

    }

    async getDistancias(req: Request, res: Response) {
        try {
            const data = await this.distanciaService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getDistanciaById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createDistancia(req: Request, res: Response) {
        try {
            const data = await this.distanciaService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleDistancia(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.distanciaService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}