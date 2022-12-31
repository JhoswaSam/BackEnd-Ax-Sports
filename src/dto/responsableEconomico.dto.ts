import { IsNotEmpty, IsOptional } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class ResponsableEconomicoDTO extends DTOBase{

    @IsOptional()
    usuario!:string;

    @IsOptional()
    contrasenia!:string;
   
    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    apellidos!:string;
}