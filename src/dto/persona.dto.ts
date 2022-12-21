import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class PersonaDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    apellidos!:string;

    @IsNotEmpty()
    dni!:string;

    @IsNotEmpty()
    telefono!:string;

}