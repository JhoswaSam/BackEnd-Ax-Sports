import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService = new UsuarioService()){

    }

    async getUsuarios(req: Request, res: Response) {
        try {
            const data = await this.usuarioService.findAll();
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.usuarioService.findbyid(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async createUsuario(req: Request, res: Response) {
        try {
            const data = await this.usuarioService.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async updateUsuario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.usuarioService.update(id,req.body);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async deteleUsuario(req: Request, res: Response) {
        const {id}= req.params;
        try {
            const data = await this.usuarioService.delete(id);
            res.status(200).json(data);
        } catch (e) {
            console.log(e);
        }
    }
}