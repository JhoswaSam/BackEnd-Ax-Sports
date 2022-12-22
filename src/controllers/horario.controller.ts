import { Request, Response } from "express";
import { HorarioService } from "../services/horario.service";

export class HorarioController{
    constructor(private readonly horarioService: HorarioService = new HorarioService()){

    }

    async getHorarios(req: Request, res: Response) {
        try {
            const data = await this.horarioService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getHorarioById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.horarioService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createHorario(req: Request, res: Response) {
        try {
            const data = await this.horarioService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateHorario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.horarioService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleHorario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.horarioService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}