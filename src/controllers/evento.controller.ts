import { Request, Response } from "express";
import { EventoService } from "../services/evento.service";

export class EventoController{
    constructor(private readonly eventoService: EventoService = new EventoService()){

    }

    async getEventos(req: Request, res: Response) {
        try {
            const data = await this.eventoService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getEventoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createEvento(req: Request, res: Response) {
        try {
            const data = await this.eventoService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleEvento(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.eventoService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}