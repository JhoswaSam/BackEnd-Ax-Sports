import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class InscripcionDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

}