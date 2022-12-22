import { Request, Response } from "express";
import { InscripcionService } from "../services/inscripcion.service";

export class InscripcionController{
    constructor(private readonly inscripcionService: InscripcionService = new InscripcionService()){

    }

    async getInscripcions(req: Request, res: Response) {
        try {
            const data = await this.inscripcionService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getInscripcionById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createInscripcion(req: Request, res: Response) {
        try {
            const data = await this.inscripcionService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateInscripcion(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleInscripcion(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.inscripcionService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}