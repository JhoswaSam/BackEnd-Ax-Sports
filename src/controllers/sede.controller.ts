import { Request, Response } from "express";
import { SedeService } from "../services/sede.service";

export class SedeController{
    constructor(private readonly sedeService: SedeService = new SedeService()){

    }

    async getSedes(req: Request, res: Response) {
        try {
            const data = await this.sedeService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getSedeById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createSede(req: Request, res: Response) {
        try {
            const data = await this.sedeService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateSede(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleSede(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.sedeService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}