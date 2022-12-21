import { Request, Response } from "express";
import { PersonaService } from "../services/persona.service";

export class PersonaController{
    constructor(private readonly personaService: PersonaService = new PersonaService()){

    }

    async getPersonas(req: Request, res: Response) {
        try {
            const data = await this.personaService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getPersonaById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.personaService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createPersona(req: Request, res: Response) {
        try {
            const data = await this.personaService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updatePersona(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.personaService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async detelePersona(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.personaService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}