import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { TipoEntity } from "../models/tipo.entity";
import { SedeEntity } from "../models/sede.entity";

export class AdministradorDTO extends DTOBase{

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

    @IsOptional()
    usuario!:string;

    @IsOptional()
    contrasenia!:string;

    @IsNotEmpty()
    tipo!:TipoEntity;

    @IsNotEmpty()
    sede!:SedeEntity;

}