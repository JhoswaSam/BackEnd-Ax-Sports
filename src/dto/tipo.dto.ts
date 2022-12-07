import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class TipoDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

}