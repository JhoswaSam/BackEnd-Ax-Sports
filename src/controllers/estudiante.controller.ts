import { Request, Response } from "express";
import { EstudianteService } from "../services/estudiante.service";

export class EstudianteController{
    constructor(private readonly estudianteService: EstudianteService = new EstudianteService()){

    }

    async getEstudiantes(req: Request, res: Response) {
        try {
            const data = await this.estudianteService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getEstudianteById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createEstudiante(req: Request, res: Response) {
        try {
            const data = await this.estudianteService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateEstudiante(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleEstudiante(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.estudianteService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}