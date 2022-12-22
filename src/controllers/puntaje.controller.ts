import { Request, Response } from "express";
import { PuntajeService } from "../services/puntaje.service";

export class PuntajeController{
    constructor(private readonly puntajeService: PuntajeService = new PuntajeService()){

    }

    async getPuntajes(req: Request, res: Response) {
        try {
            const data = await this.puntajeService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getPuntajeById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createPuntaje(req: Request, res: Response) {
        try {
            const data = await this.puntajeService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updatePuntaje(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async detelePuntaje(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.puntajeService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}