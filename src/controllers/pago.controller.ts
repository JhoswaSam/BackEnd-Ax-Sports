import { Request, Response } from "express";
import { PagoService } from "../services/pago.service";

export class PagoController{
    constructor(private readonly pagoService: PagoService = new PagoService()){

    }

    async getPagos(req: Request, res: Response) {
        try {
            const data = await this.pagoService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getPagoById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createPago(req: Request, res: Response) {
        try {
            const data = await this.pagoService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updatePago(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async detelePago(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.pagoService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}