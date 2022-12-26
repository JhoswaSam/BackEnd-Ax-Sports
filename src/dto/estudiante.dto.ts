import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { SedeEntity } from "../models/sede.entity";
import { ResponsableEconomicoEntity } from "../models/responsableEconomico.entity";

export class EstudianteDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    apellidos!:string;

    @IsNotEmpty()
    dni!:string;

    @IsNotEmpty()
    telefono!:string;

    @IsDate()
    @IsOptional()
    fechaNacimiento?:Date;

    @IsNotEmpty()
    usuario!:string;

    @IsNotEmpty()
    contrasenia!:string;
    
    @IsNotEmpty()
    sexo!:string;

    @IsNotEmpty()
    sede!:SedeEntity;

    @IsOptional()
    responsableEconomico?:ResponsableEconomicoEntity;
    

}