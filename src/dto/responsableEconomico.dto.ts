import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class ResponsableEconomicoDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    apellidos!:string;
}