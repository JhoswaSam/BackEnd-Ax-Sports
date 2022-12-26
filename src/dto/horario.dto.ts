import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { SedeEntity } from "../models/sede.entity";

export class HorarioDTO extends DTOBase{

    @IsNotEmpty()
    dias!:string;
    
    @IsNotEmpty()
    monto!:number;
    
    @IsNotEmpty()
    categoria!:string;

    @IsNotEmpty()
    hora!:string;

    @IsNotEmpty()
    horaFin!:string;

    @IsNotEmpty()
    sede!:SedeEntity;

}