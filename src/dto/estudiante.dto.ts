import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class EstudianteDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    edad!:string;

    @IsNotEmpty()
    sexo!:string;

}