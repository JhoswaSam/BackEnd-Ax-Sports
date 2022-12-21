import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class SedeDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

    @IsNotEmpty()
    direccion!:string;

}