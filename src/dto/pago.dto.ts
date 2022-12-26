import { IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { ResponsableEconomicoEntity } from "../models/responsableEconomico.entity";
import { EstudianteEntity } from "../models/estudiante.entity";

export class PagoDTO extends DTOBase{

    @IsNotEmpty()
    mes!:string;

    @IsNotEmpty()
    pagoTotal!:number;

    @IsNotEmpty()
    medio!:string;

    @IsNotEmpty()
    comprobante!:string;

    @IsOptional()
    responsableEconomico?:ResponsableEconomicoEntity;

    @IsOptional()
    estudiante?:EstudianteEntity;

}