import { Request, Response } from "express";

export class HorarioController{
    
    getHorario(req: Request, res: Response) {
        res.status(200).json({
            user:"Jhoswa Sam"
        });
    }
}